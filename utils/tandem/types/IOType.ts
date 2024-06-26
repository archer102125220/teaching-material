/* eslint-disable no-use-before-define */
// Copyright 2020-2024, University of Colorado Boulder

/**
 * IOTypes form a synthetic type system used to describe PhET-iO Elements. A PhET-iO Element is an instrumented PhetioObject
 * that is interoperable from the "wrapper" frame (outside the sim frame). An IOType includes documentation, methods,
 * names, serialization, etc.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import _ from 'lodash';

import validate from '@/utils/axon/validate';
import Validation, { type Validator } from '@/utils/axon/Validation';
import optionize from '@/utils/phet-core/optionize';
import PhetioConstants from '@/utils/tandem/PhetioConstants';
import TandemConstants, { type IOTypeName, type PhetioElementMetadata } from '@/utils/tandem/TandemConstants';
import tandemNamespace from '@/utils/tandem/tandemNamespace';
import StateSchema, { type CompositeSchema, type CompositeStateObjectType } from '@/utils/tandem/types/StateSchema';
import type PhetioObject from '@/utils/tandem/PhetioObject';
import type IntentionalAny from '@/utils/phet-core/types/IntentionalAny.js';
import PhetioDynamicElementContainer from '@/utils/tandem/PhetioDynamicElementContainer';

// constants
const VALIDATE_OPTIONS_FALSE = { validateValidator: false };

/**
 * Estimate the core type name from a given IOType name.
 */
const getCoreTypeName = (ioTypeName: IOTypeName): string => {
  const index = ioTypeName.indexOf(PhetioConstants.IO_TYPE_SUFFIX);
  window.assert && window.assert(index >= 0, 'IO should be in the type name');
  return ioTypeName.substring(0, index);
};

type AddChildElement = (group: PhetioDynamicElementContainer<PhetioObject>, componentName: string, stateObject: unknown) => PhetioObject;

export type IOTypeMethod = {
  returnType: IOType;
  parameterTypes: IOType[];

  // the function to execute when this method is called. This function's parameters will be based on `parameterTypes`,
  // and should return the type specified by `returnType`
  implementation: (...args: IntentionalAny[]) => unknown;
  documentation: string;

  // by default, all methods are invocable for all elements. However, for some read-only elements, certain methods
  // should not be invocable. In that case, they are marked as invocableForReadOnlyElements: false.
  invocableForReadOnlyElements?: boolean;
};

type DeserializationType = 'fromStateObject' | 'applyState';

type StateSchemaOption<T, StateType extends SelfStateType, SelfStateType> = (
  (ioType: IOType<T, StateType, SelfStateType>) => CompositeSchema<SelfStateType>) |
  StateSchema<T, StateType> |
  CompositeSchema<SelfStateType> |
  null;

type SelfOptions<T, StateType extends SelfStateType, SelfStateType> = {

  // IOTypes form an object tree like a type hierarchy. If the supertype is specified, attributes such as
  // toStateObject, fromStateObject, stateObjectToCreateElementArguments, applyState, addChildElement
  // will be inherited from the supertype (unless overridden).  It is also used in features such as schema validation,
  // data/metadata default calculations.
  supertype?: IOType | null;

  // The list of events that can be emitted at this level (does not include events from supertypes).
  events?: string[];

  // Key/value pairs indicating the defaults for the IOType data, just for this level (do not specify parent defaults)
  dataDefaults?: Record<string, unknown>;

  // Key/value pairs indicating the defaults for the IOType metadata.
  // If anything is provided here, then corresponding PhetioObjects that use this IOType should override
  // PhetioObject.getMetadata() to add what keys they need for their specific type.  Cannot specify redundant values
  // (that an ancestor already specified).
  metadataDefaults?: Partial<PhetioElementMetadata>;

  // Text that describes the IOType, presented to the PhET-iO Client in Studio, supports HTML markup.
  documentation?: string;

  // The public methods available for this IOType. Each method is not just a function,
  // but a collection of metadata about the method to be able to serialize parameters and return types and provide
  // better documentation.
  methods?: Record<string, IOTypeMethod>;

  // IOTypes can specify the order that methods appear in the documentation by putting their names in this
  // list. This list is only for the methods defined at this level in the type hierarchy. After the methodOrder
  // specified, the methods follow in the order declared in the implementation (which isn't necessarily stable).
  methodOrder?: string[];

  // For parametric types, they must indicate the types of the parameters here. Empty array if non-parametric.
  parameterTypes?: IOType[];

  // For internal phet-io use only. Functions cannot be sent from one iframe to another, so must be wrapped. See
  // phetioCommandProcessor.wrapFunction
  isFunctionType?: boolean;

  // ******** STATE ******** //

  // The specification for how the PhET-iO state will look for instances of this type. null specifies that the object
  // is not serialized. A composite StateSchema can supply a toStateObject and applyState serialization strategy. This
  // default serialization strategy only applies to this level, and does not recurse to parents. If you need to add
  // serialization from parent levels, this can be done by manually implementing a custom toStateObject. By default, it
  // will assume that each composite child of this stateSchema deserializes via "fromStateObject", if instead it uses
  // applyState, please specify that per IOType with defaultDeserializationMethod.
  // For phetioState: true objects, this should be required, but may be specified in the parent IOType, like in DerivedPropertyIO
  stateSchema?: StateSchemaOption<T, StateType, SelfStateType>;

  // Serialize the core object. Most often this looks like an object literal that holds data about the PhetioObject
  // instance. This is likely superfluous to just providing a stateSchema of composite key/IOType values, which will
  // create a default toStateObject based on the schema.
  toStateObject?: (t: T) => StateType;

  // ******** DESERIALIZATION ******** //

  // For Data Type Deserialization. Decodes the object from a state (see toStateObject) into an instance of the core type.
  // see https://github.com/phetsims/phet-io/blob/main/doc/phet-io-instrumentation-technical-guide.md#three-types-of-deserialization
  fromStateObject?: (s: StateType) => T;

  // For Dynamic Element Deserialization: converts the state object to arguments
  // for a `create` function in PhetioGroup or other PhetioDynamicElementContainer creation function. Note that
  // other non-serialized args (not dealt with here) may be supplied as closure variables. This function only needs
  // to be implemented on IOTypes whose core type is phetioDynamicElement: true, such as PhetioDynamicElementContainer
  // elements.
  // see https://github.com/phetsims/phet-io/blob/main/doc/phet-io-instrumentation-technical-guide.md#three-types-of-deserialization
  stateObjectToCreateElementArguments?: (s: StateType) => unknown[];

  // For Reference Type Deserialization:  Applies the state (see toStateObject)
  // value to the instance. When setting PhET-iO state, this function will be called on an instrumented instance to set the
  // stateObject's value to it. StateSchema makes this method often superfluous. A composite stateSchema can be used
  // to automatically formulate the applyState function. If using stateSchema for the applyState method, make sure that
  // each compose IOType has the correct defaultDeserializationMethod. Most of the time, composite IOTypes use fromStateObject
  // to deserialize each sub-component, but in some circumstances, you will want your child to deserialize by also using applyState.
  // See options.defaultDeserializationMethod to configure this case.
  // see https://github.com/phetsims/phet-io/blob/main/doc/phet-io-instrumentation-technical-guide.md#three-types-of-deserialization
  applyState?: (t: T, state: StateType) => void;

  // For use when this IOType is part of a composite stateSchema in another IOType.  When
  // using serialization methods by supplying only stateSchema, then deserialization
  // can take a variety of forms, and this will vary based on the IOType. In most cases deserialization of a component
  // is done via fromStateObject. If not, specify this option so that the stateSchema will be able to know to call
  // the appropriate deserialization method when deserializing something of this IOType.
  defaultDeserializationMethod?: DeserializationType;

  // For dynamic element containers, see examples in IOTypes for PhetioDynamicElementContainer classes
  addChildElement?: AddChildElement;
};

type IOTypeOptions<T, StateType extends SelfStateType, SelfStateType> = SelfOptions<T, StateType, SelfStateType> & Validator<T>;

// StateType is the whole thing, SelfStateType is just at this level
// export default class IOType<T = any, SelfStateType = any, ParentStateType = EmptyParent, StateType extends SelfStateType & ParentStateType = SelfStateType & ParentStateType> { // eslint-disable-line @typescript-eslint/no-explicit-any
export default class IOType<T = any, StateType extends SelfStateType = any, SelfStateType = StateType> { // eslint-disable-line @typescript-eslint/no-explicit-any
  // See documentation in options type declaration
  public readonly supertype?: IOType;
  public readonly documentation?: string;
  public readonly methods?: Record<string, IOTypeMethod>;
  public readonly events: string[];
  public readonly metadataDefaults?: Partial<PhetioElementMetadata>;
  public readonly dataDefaults?: Record<string, unknown>;
  public readonly methodOrder?: string[];
  public readonly parameterTypes?: IOType[];
  public readonly toStateObject: (t: T) => StateType;
  public readonly fromStateObject: (state: StateType) => T;
  public readonly stateObjectToCreateElementArguments: (s: StateType) => unknown[]; // TODO: instead of unknown this is the second parameter type for PhetioDynamicElementContainer. How? https://github.com/phetsims/tandem/issues/261
  public readonly applyState: (object: T, state: StateType) => void;
  public readonly addChildElement: AddChildElement;
  public readonly validator: Validator<T>;
  public readonly defaultDeserializationMethod: DeserializationType;
  public readonly isFunctionType: boolean;

  // The StateSchema (type) that the option is made into. The option is more flexible than the class.
  public readonly stateSchema: StateSchema<T, SelfStateType>;

  // The base IOType for the entire hierarchy.
  public static ObjectIO: IOType;

  /**
   * @param typeName - The name that this IOType will have in the public PhET-iO API. In general, this should
   *    only be word characters, ending in "IO". Parametric types are a special subset of IOTypes that include their
   *    parameters in their typeName. If an IOType's parameters are other IOType(s), then they should be included within
   *    angle brackets, like "PropertyIO<BooleanIO>". Some other types use a more custom format for displaying their
   *    parameter types, in this case the parameter section of the type name (immediately following "IO") should begin
   *    with an open paren, "(". Thus the schema for a typeName could be defined (using regex) as `[A-Z]\w*IO([(<].*){0,1}`.
   *    Parameterized types should also include a `parameterTypes` field on the IOType.
   * @param providedOptions
   */
  public constructor(public readonly typeName: IOTypeName, providedOptions: IOTypeOptions<T, StateType, SelfStateType>) {

    // For reference in the options
    const supertype = providedOptions.supertype || IOType.ObjectIO;
    const toStateObjectSupplied = !!(providedOptions.toStateObject);
    const applyStateSupplied = !!(providedOptions.applyState);
    const stateSchemaSupplied = !!(providedOptions.stateSchema);

    const options = optionize<IOTypeOptions<T, StateType, SelfStateType>, SelfOptions<T, StateType, SelfStateType>>()({

      supertype: IOType.ObjectIO,
      methods: {},
      events: [],
      metadataDefaults: {},

      //  Most likely this will remain PhET-iO internal, and shouldn't need to be used when creating IOTypes outside of tandem/.
      dataDefaults: {},
      methodOrder: [],
      parameterTypes: [],
      documentation: `PhET-iO Type for ${getCoreTypeName(typeName)}`,
      isFunctionType: false,

      /** ** STATE ****/

      toStateObject: supertype && supertype.toStateObject,
      fromStateObject: supertype && supertype.fromStateObject,
      stateObjectToCreateElementArguments: supertype && supertype.stateObjectToCreateElementArguments,
      applyState: supertype && supertype.applyState,

      stateSchema: null,
      defaultDeserializationMethod: 'fromStateObject',
      addChildElement: supertype && supertype.addChildElement
    }, providedOptions);

    if (window.assert && supertype) {
      (Object.keys(options.metadataDefaults) as (keyof PhetioElementMetadata)[]).forEach(metadataDefaultKey => {
        // eslint-disable-next-line no-prototype-builtins
        window.assert && supertype.getAllMetadataDefaults().hasOwnProperty(metadataDefaultKey) &&
          window.assert(supertype.getAllMetadataDefaults()[metadataDefaultKey] !== options.metadataDefaults[metadataDefaultKey],
            `${metadataDefaultKey} should not have the same default value as the ancestor metadata default.`);
      });
    }
    this.supertype = supertype;
    this.documentation = options.documentation;
    this.methods = options.methods;
    this.events = options.events;
    this.metadataDefaults = options.metadataDefaults;
    this.dataDefaults = options.dataDefaults;
    this.methodOrder = options.methodOrder;
    this.parameterTypes = options.parameterTypes;

    // Validation
    this.validator = _.pick(options, Validation.VALIDATOR_KEYS);
    this.validator.validationMessage = this.validator.validationMessage || `Validation failed IOType Validator: ${this.typeName}`;

    this.defaultDeserializationMethod = options.defaultDeserializationMethod;

    if (options.stateSchema === null || options.stateSchema instanceof StateSchema) {
      // @ts-expect-error https://github.com/phetsims/tandem/issues/263
      this.stateSchema = options.stateSchema;
    }
    else {
      const compositeSchema = typeof options.stateSchema === 'function' ? options.stateSchema(this) : options.stateSchema;

      this.stateSchema = new StateSchema<T, SelfStateType>({ compositeSchema });
    }

    // Assert that toStateObject method is provided for value StateSchemas. Do this with the following logic:
    // 1. It is acceptable to not provide a stateSchema (for IOTypes that aren't stateful)
    // 2. You must either provide a toStateObject, or have a composite StateSchema. Composite state schemas support default serialization methods.
    window.assert && window.assert(!this.stateSchema || (toStateObjectSupplied || this.stateSchema.isComposite()),
      'toStateObject method must be provided for value StateSchemas');

    this.toStateObject = (coreObject: T) => {
      validate(coreObject, this.validator, VALIDATE_OPTIONS_FALSE);

      let toStateObject;

      // Only do this non-standard toStateObject function if there is a stateSchema but no toStateObject provided
      if (!toStateObjectSupplied && stateSchemaSupplied && this.stateSchema && this.stateSchema.isComposite()) {
        toStateObject = this.defaultToStateObject(coreObject);
      }
      else {
        toStateObject = options.toStateObject(coreObject);
      }

      // Validate, but only if this IOType instance has more to validate than the supertype
      if (toStateObjectSupplied || stateSchemaSupplied) {

        // Only validate the stateObject if it is phetioState:true.
        // This is an n*m algorithm because for each time toStateObject is called and needs validation, this.validateStateObject
        // looks all the way up the IOType hierarchy. This is not efficient, but gains us the ability to make sure that
        // the stateObject doesn't have any superfluous, unexpected keys. The "m" portion is based on how many sub-properties
        // in a state call `toStateObject`, and the "n" portion is based on how many IOTypes in the hierarchy define a
        // toStateObject or stateSchema. In the future we could potentially improve performance by having validateStateObject
        // only check against the schema at this level, but then extra keys in the stateObject would not be caught. From work done in https://github.com/phetsims/phet-io/issues/1774
        window.assert && this.validateStateObject(toStateObject);
      }
      return toStateObject;
    };
    this.fromStateObject = options.fromStateObject;
    this.stateObjectToCreateElementArguments = options.stateObjectToCreateElementArguments;

    this.applyState = (coreObject: T, stateObject: StateType) => {
      validate(coreObject, this.validator, VALIDATE_OPTIONS_FALSE);

      // Validate, but only if this IOType instance has more to validate than the supertype
      if (applyStateSupplied || stateSchemaSupplied) {

        // Validate that the provided stateObject is of the expected schema
        // NOTE: Cannot use this.validateStateObject because options adopts supertype.applyState, which is bounds to the
        // parent IOType. This prevents correct validation because the supertype doesn't know about the subtype schemas.
        // @ts-expect-error we cannot type check against PhetioObject from this file
        window.assert && coreObject.phetioType && coreObject.phetioType.validateStateObject(stateObject);
      }

      // Only do this non-standard applyState function from stateSchema if there is a stateSchema but no applyState provided
      if (!applyStateSupplied && stateSchemaSupplied && this.stateSchema && this.stateSchema.isComposite()) {
        this.defaultApplyState(coreObject, stateObject as CompositeStateObjectType);
      }
      else {
        options.applyState(coreObject, stateObject);
      }
    };

    this.isFunctionType = options.isFunctionType;
    this.addChildElement = options.addChildElement;

    if (window.assert) {

      window.assert && window.assert(supertype || this.typeName === 'ObjectIO', 'supertype is required');
      window.assert && window.assert(!this.typeName.includes('.'), 'Dots should not appear in type names');
      window.assert && window.assert(this.typeName.split(/[<(]/)[0].endsWith(PhetioConstants.IO_TYPE_SUFFIX), `IOType name must end with ${PhetioConstants.IO_TYPE_SUFFIX}`);
      // eslint-disable-next-line no-prototype-builtins
      window.assert && window.assert(this.hasOwnProperty('typeName'), 'this.typeName is required');

      // assert that each public method adheres to the expected schema
      this.methods && Object.values(this.methods).forEach((methodObject: IOTypeMethod) => {
        if (typeof methodObject === 'object') {
          window.assert && methodObject.invocableForReadOnlyElements && window.assert(typeof methodObject.invocableForReadOnlyElements === 'boolean',
            `invocableForReadOnlyElements must be of type boolean: ${methodObject.invocableForReadOnlyElements}`);
        }
      });
      window.assert && window.assert(this.documentation.length > 0, 'documentation must be provided');

      // eslint-disable-next-line no-prototype-builtins
      this.methods && this.hasOwnProperty('methodOrder') && this.methodOrder.forEach(methodName => {
        window.assert && window.assert(this.methods![methodName], `methodName not in public methods: ${methodName}`);
      });

      if (supertype) {
        const typeHierarchy = supertype.getTypeHierarchy();
        window.assert && this.events && this.events.forEach(event => {

          // Make sure events are not listed again
          window.assert && window.assert(!_.some(typeHierarchy, t => t.events.includes(event)), `IOType should not declare event that parent also has: ${event}`);
        });
      }
      else {

        // The root IOType must supply all 4 state methods.
        window.assert && window.assert(typeof options.toStateObject === 'function', 'toStateObject must be defined');
        window.assert && window.assert(typeof options.fromStateObject === 'function', 'fromStateObject must be defined');
        window.assert && window.assert(typeof options.stateObjectToCreateElementArguments === 'function', 'stateObjectToCreateElementArguments must be defined');
        window.assert && window.assert(typeof options.applyState === 'function', 'applyState must be defined');
      }
    }
  }

  // Include state from all composite state schemas up and down the type hierarchy (children overriding parents).
  private defaultToStateObject(coreObject: T): StateType {

    let superStateObject: Partial<StateType> = {};
    if (this.supertype) {
      superStateObject = this.supertype.defaultToStateObject(coreObject);
    }

    if (this.stateSchema && this.stateSchema.isComposite()) {
      return _.merge(superStateObject, this.stateSchema.defaultToStateObject(coreObject)) as StateType;
    }
    else {
      return superStateObject as StateType;
    }
  }

  // Include state from all composite state schemas up and down the type hierarchy (children overriding parents).
  private defaultApplyState(coreObject: T, stateObject: CompositeStateObjectType): void {

    if (this.supertype) {
      this.supertype.defaultApplyState(coreObject, stateObject);
    }

    if (this.stateSchema && this.stateSchema.isComposite()) {
      this.stateSchema.defaultApplyState(coreObject, stateObject);
    }
  }

  /**
   * Gets an array of IOTypes of the self type and all the supertype ancestors.
   */
  private getTypeHierarchy(): IOType<IntentionalAny, IntentionalAny, IntentionalAny>[] {
    const array = [];

    let ioType: IOType = this; // eslint-disable-line consistent-this, @typescript-eslint/no-this-alias
    while (ioType) {
      array.push(ioType);
      ioType = ioType.supertype!;
    }
    return array;
  }

  /**
   * Returns true if this IOType is a subtype of the passed-in type (or if they are the same).
   */
  public extends(type: IOType<unknown, unknown>): boolean {

    // memory-based implementation OK since this method is only used in assertions
    return this.getTypeHierarchy().includes(type);
  }

  /**
   * Return all the metadata defaults (for the entire IOType hierarchy)
   */
  public getAllMetadataDefaults(): Partial<PhetioElementMetadata> {
    return _.merge({}, this.supertype ? this.supertype.getAllMetadataDefaults() : {}, this.metadataDefaults);
  }

  /**
   * Return all the data defaults (for the entire IOType hierarchy)
   */
  public getAllDataDefaults(): Record<string, unknown> {
    return _.merge({}, this.supertype ? this.supertype.getAllDataDefaults() : {}, this.dataDefaults);
  }

  /**
   * @param stateObject - the stateObject to validate against
   * @param toAssert=false - whether to assert when invalid
   * @param schemaKeysPresentInStateObject=[]
   * @returns if the stateObject is valid or not.
   */
  public isStateObjectValid(stateObject: StateType, toAssert = false, schemaKeysPresentInStateObject: string[] = []): boolean {

    // Set to false when invalid
    let valid = true;

    // make sure the stateObject has everything the schema requires and nothing more
    if (this.stateSchema) {
      const validSoFar = this.stateSchema.checkStateObjectValid(stateObject as SelfStateType, toAssert, schemaKeysPresentInStateObject);

      // null as a marker to keep checking up the hierarchy, otherwise we reached our based case because the stateSchema was a value, not a composite
      if (validSoFar !== null) {
        return validSoFar;
      }
    }

    if (this.supertype) {
      return valid && this.supertype.isStateObjectValid(stateObject, toAssert, schemaKeysPresentInStateObject);
    }

    // When we reach the root, make sure there isn't anything in the stateObject that isn't described by a schema
    if (!this.supertype && stateObject && typeof stateObject !== 'string' && !Array.isArray(stateObject)) {

      // Visit the state
      Object.keys(stateObject).forEach(key => {
        const keyValid = schemaKeysPresentInStateObject.includes(key);
        if (!keyValid) {
          valid = false;
        }
        window.assert && toAssert && window.assert(keyValid, `stateObject provided a key that is not in the schema: ${key}`);
      });

      return valid;
    }
    return true;
  }

  /**
   * Assert if the provided stateObject is not valid to this IOType's stateSchema
   */
  public validateStateObject(stateObject: StateType): void {
    this.isStateObjectValid(stateObject, true);
  }

  public toString(): IOTypeName {
    return this.typeName;
  }
}

// default state value
const DEFAULT_STATE = null;

// This must be declared after the class declaration to avoid a circular dependency with PhetioObject.
// @readonly
IOType.ObjectIO = new IOType<PhetioObject, null>(TandemConstants.OBJECT_IO_TYPE_NAME, {
  isValidValue: () => true,
  supertype: null,
  documentation: 'The root of the PhET-iO Type hierarchy',
  toStateObject: (coreObject: PhetioObject) => {

    if (window.phet && window.phet.tandem && window.phet.tandem.Tandem.VALIDATION) {

      window.assert && window.assert(coreObject.tandem, 'coreObject must be PhET-iO object');

      window.assert && window.assert(!coreObject.phetioState,
        `fell back to root serialization state for ${coreObject.tandem.phetioID}. Potential solutions:
         * mark the type as phetioState: false
         * create a custom toStateObject method in your IOType
         * perhaps you have everything right, but forgot to pass in the IOType via phetioType in the constructor` );
    }
    return DEFAULT_STATE;
  },
  fromStateObject: () => {
    throw new Error('ObjectIO.fromStateObject should not be called');
  },
  stateObjectToCreateElementArguments: () => [],
  applyState: _.noop,
  metadataDefaults: TandemConstants.PHET_IO_OBJECT_METADATA_DEFAULTS,
  dataDefaults: {
    initialState: DEFAULT_STATE
  },
  stateSchema: null
});

tandemNamespace.register('IOType', IOType);