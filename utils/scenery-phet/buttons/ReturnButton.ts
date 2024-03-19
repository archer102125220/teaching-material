// Copyright 2022-2023, University of Colorado Boulder

/**
 * ReturnButton is a push button for undoing a previous operation.
 *
 * @author John Blanco
 * @author Chris Malley (PixelZoom, Inc.)
 */

import RectangularPushButton, { type RectangularPushButtonOptions } from '@/utils/sun/buttons/RectangularPushButton';
import sceneryPhet from '@/utils/scenery-phet/sceneryPhet';
import optionize from '@/utils/phet-core/optionize';
import type StrictOmit from '@/utils/phet-core/types/StrictOmit';
import ReturnIcon, { type ReturnIconOptions } from '@/utils/scenery-phet/ReturnIcon';
import PhetColorScheme from '@/utils/scenery-phet//PhetColorScheme';

type SelfOptions = {
  iconOptions?: ReturnIconOptions;
};

export type ReturnButtonOptions = SelfOptions & StrictOmit<RectangularPushButtonOptions, 'content'>;

export default class ReturnButton extends RectangularPushButton {

  public constructor(providedOptions?: ReturnButtonOptions) {

    const options = optionize<ReturnButtonOptions, StrictOmit<SelfOptions, 'iconOptions'>, RectangularPushButtonOptions>()({

      // RectangularPushButtonOptions
      xMargin: 5,
      yMargin: 5,
      baseColor: PhetColorScheme.BUTTON_YELLOW
    }, providedOptions);

    options.content = new ReturnIcon(options.iconOptions);

    super(options);
  }
}

sceneryPhet.register('ReturnButton', ReturnButton);