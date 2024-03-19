// Copyright 2022-2023, University of Colorado Boulder

/**
 * GOTool is the base class for all tools in this sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '@/utils/axon/BooleanProperty';
import Property from '@/utils/axon/Property';
import Vector2 from '@/utils/dot/Vector2';
import Vector2Property from '@/utils/dot/Vector2Property';
import PhetioObject, { type PhetioObjectOptions } from '@/utils/tandem/PhetioObject';
import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import type PickRequired from '@/utils/phet-core/types/PickRequired';
import optionize, { type EmptySelfOptions } from '@/utils/phet-core/optionize';

type SelfOptions = EmptySelfOptions;

export type GOToolOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

class GOTool extends PhetioObject {

  // position of the tool, in cm
  public readonly positionProperty: Property<Vector2>;

  // whether the tool is in the toolbox
  public readonly isInToolboxProperty: Property<boolean>;

  // Resets things that are specific to this class.
  private readonly resetGOTool: () => void;

  protected constructor(providedOptions: GOToolOptions) {

    const options = optionize<GOToolOptions, SelfOptions, PhetioObjectOptions>()({

      // PhetioObjectOptions
      isDisposable: false,
      phetioState: false
    }, providedOptions);

    super(options);

    this.positionProperty = new Vector2Property(Vector2.ZERO, {
      tandem: options.tandem.createTandem('positionProperty'),
      phetioFeatured: true
    });

    this.isInToolboxProperty = new BooleanProperty(true, {
      tandem: options.tandem.createTandem('isInToolboxProperty'),
      phetioFeatured: true,
      phetioDocumentation: 'Controls whether the tool is in the toolbox.'
    });

    this.resetGOTool = () => {
      this.positionProperty.reset();
      this.isInToolboxProperty.reset();
    };
  }

  public reset(): void {
    this.resetGOTool();
  }
}

geometricOptics.register('GOTool', GOTool);
export { GOTool as default };