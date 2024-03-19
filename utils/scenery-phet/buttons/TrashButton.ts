// Copyright 2022, University of Colorado Boulder

/**
 * TrashButton is a rectangular push button with PhET's standard 'trash' icon.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '@/utils/phet-core/optionize';
import type StrictOmit from '@/utils/phet-core/types/StrictOmit';
import { Path, type PathOptions } from '@/utils/scenery/imports';
import trashAltRegularShape from '@/utils/sherpa/fontawesome-5/trashAltRegularShape';
import RectangularPushButton, { type RectangularPushButtonOptions } from '@/utils/sun/buttons/RectangularPushButton';
import sceneryPhet from '@/utils/scenery-phet/sceneryPhet';

type SelfOptions = {
  iconOptions?: PathOptions; // nested options for customizing the trash icon
};

export type TrashButtonOptions = SelfOptions & StrictOmit<RectangularPushButtonOptions, 'content'>;

export default class TrashButton extends RectangularPushButton {

  public constructor(providedOptions?: TrashButtonOptions) {

    const options = optionize<TrashButtonOptions, SelfOptions, RectangularPushButtonOptions>()({
      iconOptions: {
        scale: 0.05,
        fill: 'black'
      }
    }, providedOptions);

    options.content = new Path(trashAltRegularShape, options.iconOptions);

    super(options);
  }
}

sceneryPhet.register('TrashButton', TrashButton);