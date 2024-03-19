// Copyright 2022-2023, University of Colorado Boulder

/**
 * IndirectFocalLengthModel is the model where focal length is set indirectly.
 * ROC and IOR are settable, and used to derive focal length.
 * See https://github.com/phetsims/geometric-optics/issues/255
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { type OpticSurfaceType } from '@/utils/geometric-optics/common/model/OpticSurfaceType';
import type FocalLengthModel from '@/utils/geometric-optics/common/model/FocalLengthModel';
import RangeWithValue from '@/utils/dot/RangeWithValue';
import PhetioObject, { type PhetioObjectOptions } from '@/utils/tandem/PhetioObject';
import NumberProperty from '@/utils/axon/NumberProperty';
import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';
import DerivedProperty from '@/utils/axon/DerivedProperty';
import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import NumberIO from '@/utils/tandem/types/NumberIO';
import GOPreferences from '@/utils/geometric-optics/common/model/GOPreferences';
import optionize from '@/utils/phet-core/optionize';
import type PickRequired from '@/utils/phet-core/types/PickRequired';

type SelfOptions = {
  radiusOfCurvatureMagnitudeRange: RangeWithValue; // range of radiusOfCurvatureMagnitudeProperty
  radiusOfCurvatureMagnitudePropertyFeatured?: boolean; // Whether radiusOfCurvatureMagnitudeProperty is phetioFeatured
  indexOfRefractionRange: RangeWithValue; // range of indexOfRefractionProperty
  indexOfRefractionPropertyFeatured?: boolean; // Whether indexOfRefractionProperty is phetioFeatured
};

export type IndirectFocalLengthModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class IndirectFocalLengthModel extends PhetioObject implements FocalLengthModel {

  // see FocalLengthModel
  public readonly radiusOfCurvatureMagnitudeProperty: NumberProperty;
  public readonly indexOfRefractionProperty: NumberProperty;
  public readonly focalLengthMagnitudeProperty: TReadOnlyProperty<number>;

  // Resets things that are specific to this class.
  private readonly resetIndirectFocalLengthModel: () => void;

  public constructor(opticSurfaceTypeProperty: TReadOnlyProperty<OpticSurfaceType>,
    providedOptions: IndirectFocalLengthModelOptions) {

    const options = optionize<IndirectFocalLengthModelOptions, SelfOptions, PhetioObjectOptions>()({

      // SelfOptions
      radiusOfCurvatureMagnitudePropertyFeatured: true,
      indexOfRefractionPropertyFeatured: true,

      // PhetioObjectOptions
      isDisposable: false,
      phetioState: false,
      phetioDocumentation: 'Model of focal length that is used when ' +
        `${GOPreferences.focalLengthModelTypeProperty.tandem.phetioID} ` +
        'is set to \'indirect\'. Ignored for flat mirror. In this model:' +
        '<ul>' +
        '<li>radius of curvature and index of refraction are settable' +
        '<li>focal length is derived' +
        '</ul>'
    }, providedOptions);

    super(options);

    this.radiusOfCurvatureMagnitudeProperty = new NumberProperty(options.radiusOfCurvatureMagnitudeRange.defaultValue, {
      units: 'cm',
      range: options.radiusOfCurvatureMagnitudeRange,
      tandem: options.tandem.createTandem('radiusOfCurvatureMagnitudeProperty'),
      phetioFeatured: options.radiusOfCurvatureMagnitudePropertyFeatured,
      phetioDocumentation: 'magnitude of the radius of curvature (no sign)'
    });

    this.indexOfRefractionProperty = new NumberProperty(options.indexOfRefractionRange.defaultValue, {
      // units: unitless
      range: options.indexOfRefractionRange,
      tandem: options.tandem.createTandem('indexOfRefractionProperty'),
      phetioFeatured: options.indexOfRefractionPropertyFeatured
    });

    this.focalLengthMagnitudeProperty = new DerivedProperty(
      [opticSurfaceTypeProperty, this.radiusOfCurvatureMagnitudeProperty, this.indexOfRefractionProperty],
      (opticSurfaceType, radiusOfCurvatureMagnitude, indexOfRefraction) =>
        radiusOfCurvatureMagnitude / (2 * (indexOfRefraction - 1)), {
      units: 'cm',
      tandem: options.tandem.createTandem('focalLengthMagnitudeProperty'),
      phetioDocumentation: 'magnitude of the focal length (no sign)',
      phetioValueType: NumberIO
    });

    this.resetIndirectFocalLengthModel = () => {
      this.radiusOfCurvatureMagnitudeProperty.reset();
      this.indexOfRefractionProperty.reset();
    };
  }

  /**
   * Synchronizes with another focal-length model by copying the values that are settable in this model.
   * Constrain values so that floating-point error doesn't cause range exceptions.
   */
  public syncToModel(model: FocalLengthModel): void {
    window.assert && window.assert(model !== this);

    this.radiusOfCurvatureMagnitudeProperty.value =
      this.radiusOfCurvatureMagnitudeProperty.range.constrainValue(model.radiusOfCurvatureMagnitudeProperty.value);

    this.indexOfRefractionProperty.value =
      this.indexOfRefractionProperty.range.constrainValue(model.indexOfRefractionProperty.value);
  }

  public reset(): void {
    this.resetIndirectFocalLengthModel();
  }
}

geometricOptics.register('IndirectFocalLengthModel', IndirectFocalLengthModel);