// Copyright 2014-2023, University of Colorado Boulder

/**
 * Minus sign, created using window.phet.scenery.Rectangle because scenery.Text("-") looks awful on Windows and cannot be accurately
 * centered. The origin is at the upper left.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '@/utils/dot/Dimension2';
import optionize from '@/utils/phet-core/optionize';
import { Rectangle, type RectangleOptions } from '@/utils/scenery/imports';
import sceneryPhet from '@/utils/scenery-phet/sceneryPhet';

// constants
const DEFAULT_SIZE = new Dimension2(20, 5);

type SelfOptions = {
  size?: Dimension2;
};

export type MinusNodeOptions = SelfOptions & RectangleOptions;

class MinusNode extends Rectangle {

  public constructor(providedOptions: MinusNodeOptions) {

    const options = optionize<MinusNodeOptions, SelfOptions, RectangleOptions>()({

      // SelfOptions
      size: DEFAULT_SIZE,

      // RectangleOptions
      fill: 'black'
    }, providedOptions);

    window.assert && window.assert(options.size.width >= options.size.height);

    super(0, 0, options.size.width, options.size.height, options);
  }
}

sceneryPhet.register('MinusNode', MinusNode);
export default MinusNode;