// Copyright 2021-2023, University of Colorado Boulder

/**
 * MirrorModel is the model for the 'Mirror' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../dot/Vector2';
import GOModel, { type GOModelOptions } from '../../common/model/GOModel';
import geometricOptics from '../../geometricOptics';
import Mirror from './Mirror';
import OpticalObjectChoice from '../../common/model/OpticalObjectChoice';
import optionize from '../../../phet-core/optionize';
import type PickRequired from '../../../phet-core/types/PickRequired';
import { type GOSimOptions } from '../../GOSim';
import GOQueryParameters from '../../common/GOQueryParameters';

type SelfOptions = PickRequired<GOSimOptions, 'isBasicsVersion'>;

type MirrorModelOptions = SelfOptions & PickRequired<GOModelOptions, 'tandem'>;

export default class MirrorModel extends GOModel {

  public readonly mirror: Mirror;

  public constructor(providedOptions: MirrorModelOptions) {

    // See https://github.com/phetsims/geometric-optics/issues/397
    let opticalObjectChoices;
    if (GOQueryParameters.scene === 'framed') {
      opticalObjectChoices = [OpticalObjectChoice.PENCIL];
    }
    else if (GOQueryParameters.scene === 'arrow') {
      opticalObjectChoices = [OpticalObjectChoice.ARROW];
    }
    else {
      opticalObjectChoices = [
        OpticalObjectChoice.PENCIL,
        OpticalObjectChoice.PENGUIN,
        OpticalObjectChoice.STAR,
        OpticalObjectChoice.ARROW
      ];
    }

    const options = optionize<MirrorModelOptions, SelfOptions, GOModelOptions>()({

      // GOModelOptions
      opticalObjectChoices,
      arrowObject1Position: new Vector2(-150, 60),
      arrowObject2Position: new Vector2(-165, 30),
      framedObjectPosition: (providedOptions.isBasicsVersion) ?
        new Vector2(-170, 27) : // empirically set so that it is vertically centered on the optical axis
        new Vector2(-150, 72.5) // empirically set so that it appears to sit on the optical axis

    }, providedOptions);

    window.assert && window.assert(!options.opticalObjectChoices.includes(OpticalObjectChoice.LIGHT),
      'Mirror screen does not support Light as an optical object choice');

    const mirror = new Mirror({
      isBasicsVersion: options.isBasicsVersion,
      tandem: options.tandem.createTandem('mirror')
    });

    super(mirror, options);

    this.mirror = mirror;
  }

  public override reset(): void {
    super.reset();
    this.mirror.reset();
  }
}

geometricOptics.register('MirrorModel', MirrorModel);