// Copyright 2014-2022, University of Colorado Boulder

/**
 * Restart button.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { Shape } from '@/utils/kite/imports';
import type StrictOmit from '@/utils/phet-core/types/StrictOmit';
import InstanceRegistry from '@/utils/phet-core/documentation/InstanceRegistry';
import optionize, { type EmptySelfOptions } from '@/utils/phet-core/optionize';
import { HBox, Path, Rectangle } from '@/utils/scenery/imports';
import RoundPushButton, { type RoundPushButtonOptions } from '@/utils/sun/buttons/RoundPushButton';
import sceneryPhet from '@/utils/scenery-phet/sceneryPhet';

// constants
const scale = 0.75;
const vscale = 1.15;
const barWidth = 4 * scale;
const barHeight = 19 * scale * vscale;
const triangleWidth = 15 * scale;
const triangleHeight = 19 * scale * vscale;

type SelfOptions = EmptySelfOptions;

export type RestartButtonOptions = SelfOptions & StrictOmit<RoundPushButtonOptions, 'content'>;

export default class RestartButton extends RoundPushButton {

  public constructor(providedOptions?: RestartButtonOptions) {

    const options = optionize<RestartButtonOptions, SelfOptions, RoundPushButtonOptions>()({}, providedOptions);

    const barPath = new Rectangle(0, 0, barWidth, barHeight, { fill: 'black' });
    const trianglePath = new Path(new Shape().moveTo(0, triangleHeight / 2).lineTo(-triangleWidth, 0).lineTo(0, -triangleHeight / 2).close(), {
      fill: 'black'
    });
    const trianglePath2 = new Path(new Shape().moveTo(0, triangleHeight / 2).lineTo(-triangleWidth, 0).lineTo(0, -triangleHeight / 2).close(), {
      fill: 'black'
    });

    options.content = new HBox({ children: [barPath, trianglePath, trianglePath2], spacing: -1 });

    super(options);

    // support for binder documentation, stripped out in builds and only runs when ?binder is specified
    window.assert && window.phet.chipper.queryParameters.binder && InstanceRegistry.registerDataURL('scenery-phet', 'RestartButton', this);
  }
}

sceneryPhet.register('RestartButton', RestartButton);