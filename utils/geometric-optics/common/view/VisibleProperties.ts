// Copyright 2021-2023, University of Colorado Boulder

/**
 * VisibleProperties contains visibleProperty instances for things in the view. These Properties are controlled
 * by checkboxes and toggle buttons.
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '@/utils/axon/BooleanProperty';
import Property from '@/utils/axon/Property';
import { type PhetioObjectOptions } from '@/utils/tandem/PhetioObject';
import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import type PickRequired from '@/utils/phet-core/types/PickRequired';
import Tandem from '@/utils/tandem/Tandem';
import Optic from '@/utils/geometric-optics/common/model/Optic';
import Mirror from '@/utils/geometric-optics/mirror/model/Mirror';

type VisiblePropertiesOptions = PickRequired<PhetioObjectOptions, 'tandem'>;

export default class VisibleProperties {

  // visibility of the focal points (F)
  public readonly focalPointsVisibleProperty: Property<boolean>;

  // visibility of the 2F points
  public readonly twoFPointsVisibleProperty: Property<boolean>;

  // visibility of the virtual Image, when present
  public readonly virtualImageVisibleProperty: Property<boolean>;

  // visibility of the labels
  public readonly labelsVisibleProperty: Property<boolean>;

  // visibility of the second optical object
  public readonly secondPointVisibleProperty: Property<boolean>;

  // visibility of the guides, which are irrelevant for mirror
  public readonly guidesVisibleProperty: Property<boolean>;

  // Determines whether the optical axis is visible.
  // PhET-iO only, cannot be controlled from the sim UI, and is not subject to reset.
  // See https://github.com/phetsims/geometric-optics/issues/252
  public readonly opticalAxisVisibleProperty: Property<boolean>;

  // Resets things that are specific to this class.
  private readonly resetVisibleProperties: () => void;

  public constructor(optic: Optic, providedOptions: VisiblePropertiesOptions) {

    const isMirror = (optic instanceof Mirror);
    const isExclusivelyFlatMirror = optic.isExclusivelyFlatMirror();

    this.focalPointsVisibleProperty = new BooleanProperty(true, {
      // Because a flat mirror's F point is at infinity, so this Property is irrelevant
      tandem: isExclusivelyFlatMirror ? Tandem.OPT_OUT : providedOptions.tandem.createTandem('focalPointsVisibleProperty'),
      phetioFeatured: true
    });

    this.twoFPointsVisibleProperty = new BooleanProperty(false, {
      // Because a flat mirror's 2F point is at infinity, so this Property is irrelevant
      tandem: isExclusivelyFlatMirror ? Tandem.OPT_OUT : providedOptions.tandem.createTandem('twoFPointsVisibleProperty'),
      phetioFeatured: true
    });

    this.virtualImageVisibleProperty = new BooleanProperty(true, {
      tandem: providedOptions.tandem.createTandem('virtualImageVisibleProperty'),
      phetioFeatured: true
    });

    this.labelsVisibleProperty = new BooleanProperty(false, {
      tandem: providedOptions.tandem.createTandem('labelsVisibleProperty'),
      phetioFeatured: true
    });

    this.secondPointVisibleProperty = new BooleanProperty(false, {
      tandem: providedOptions.tandem.createTandem('secondPointVisibleProperty'),
      phetioFeatured: true
    });

    // Mirrors cannot have guides, and guidesVisibleProperty should not be instrumented.
    // See https://github.com/phetsims/geometric-optics/issues/456
    const guidesVisiblePropertyOptions = isMirror ?
      { validValues: [false] } :
      { tandem: providedOptions.tandem.createTandem('guidesVisibleProperty') };
    this.guidesVisibleProperty = new BooleanProperty(false, guidesVisiblePropertyOptions);

    this.opticalAxisVisibleProperty = new BooleanProperty(true, {
      tandem: providedOptions.tandem.createTandem('opticalAxisVisibleProperty'),
      phetioFeatured: true,
      phetioDocumentation: 'PhET-iO only, not settable in the sim'
    });

    this.resetVisibleProperties = () => {
      this.focalPointsVisibleProperty.reset();
      this.twoFPointsVisibleProperty.reset();
      this.virtualImageVisibleProperty.reset();
      this.labelsVisibleProperty.reset();
      this.secondPointVisibleProperty.reset();
      this.guidesVisibleProperty.reset();
      // Do not reset opticalAxisVisibleProperty, it's PhET-iO only.
    };
  }

  public reset(): void {
    this.resetVisibleProperties();
  }
}

geometricOptics.register('VisibleProperties', VisibleProperties);