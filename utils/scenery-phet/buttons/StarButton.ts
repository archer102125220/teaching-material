// Copyright 2014-2022, University of Colorado Boulder

/**
 * Button for returning to the level selection screen.
 *
 * @author John Blanco
 */

import optionize, { type EmptySelfOptions } from '@/utils/phet-core/optionize';
import type StrictOmit from '@/utils/phet-core/types/StrictOmit';
import { Path } from '@/utils/scenery/imports';
import RectangularPushButton, { type RectangularPushButtonOptions } from '@/utils/sun/buttons/RectangularPushButton';
import PhetColorScheme from '@/utils/scenery-phet/PhetColorScheme';
import sceneryPhet from '@/utils/scenery-phet/sceneryPhet';
import StarShape from '@/utils/scenery-phet/StarShape';

type SelfOptions = EmptySelfOptions;

export type StarButtonOptions = SelfOptions & StrictOmit<RectangularPushButtonOptions, 'content'>;

export default class StarButton extends RectangularPushButton {

  public constructor(providedOptions?: StarButtonOptions) {

    const options = optionize<StarButtonOptions, SelfOptions, RectangularPushButtonOptions>()({

      // RectangularPushButtonOptions
      baseColor: PhetColorScheme.BUTTON_YELLOW,

      // Match the size of the star button to the refresh buttons, since they often appear together.
      // see https://github.com/phetsims/scenery/-phet/issues/44
      xMargin: 8.134152255572697
    }, providedOptions);

    options.content = new Path(new StarShape(), { fill: 'black' });

    super(options);
  }
}

sceneryPhet.register('StarButton', StarButton);