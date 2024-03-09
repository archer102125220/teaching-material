// Copyright 2022-2024, University of Colorado Boulder

/**
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import EnumerationValue from '../../phet-core/EnumerationValue';
import type TEnumeration from '../../phet-core/TEnumeration';
import type { EnumerationContainer } from '../../phet-core/TEnumeration';
import IOType from './IOType';
import StateSchema from './StateSchema';
import tandemNamespace from '../tandemNamespace';
import IOTypeCache from '../IOTypeCache';

// Cache each parameterized IOType so that it is only created once.
const cache = new IOTypeCache<TEnumeration<EnumerationValue>>();

const joinKeys = (keys: string[]) => keys.join('|');

const EnumerationIO = <T extends EnumerationValue>(enumerationContainer: EnumerationContainer<T>): IOType => {
  const enumeration = enumerationContainer.enumeration;

  // This caching implementation should be kept in sync with the other parametric IOType caching implementations.
  if (!cache.has(enumeration)) {

    // Enumeration supports additional documentation, so the values can be described.
    const additionalDocs = enumeration.phetioDocumentation ? ` ${enumeration.phetioDocumentation}` : '';

    const keys = enumeration.keys;
    const values = enumeration.values;

    const ioTypeName = `EnumerationIO(${joinKeys(keys)})`;

    window.assert && window.assert(
      !Array.from(cache.values()).find(ioType => ioType.typeName === ioTypeName),
      'There was already another IOType with the same name: ' + ioTypeName
    );

    cache.set(enumeration, new IOType<T, string>(ioTypeName, {
      validValues: values,
      documentation: `Possible values: ${keys.join(', ')}.${additionalDocs}`,
      toStateObject: (value: T) => enumeration.getKey(value),
      fromStateObject: (stateObject: string): T => {
        window.assert && window.assert(typeof stateObject === 'string', 'unsupported EnumerationIO value type, expected string'); // eslint-disable-line no-simple-type-checking-assertions
        window.assert && window.assert(keys.includes(stateObject), `Unrecognized value: ${stateObject}`);
        return enumeration.getValue(stateObject)!;
      },
      stateSchema: StateSchema.asValue<EnumerationValue, string>(`${joinKeys(keys)}`, {
        isValidValue: (key: string) => keys.includes(key)
      })
    }));
  }

  return cache.get(enumeration)!;
};

tandemNamespace.register('EnumerationIO', EnumerationIO);
export default EnumerationIO;