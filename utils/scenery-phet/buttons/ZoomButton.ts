// Copyright 2014-2022, University of Colorado Boulder

/**
 * Zoom button, has an icon with a magnifying glass, with either a plus or minus sign in the center of the glass.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '@/utils/dot/Dimension2';
import type StrictOmit from '@/utils/phet-core/types/StrictOmit';
import InstanceRegistry from '@/utils/phet-core/documentation/InstanceRegistry';
import optionize, { combineOptions } from '@/utils/phet-core/optionize';
import RectangularPushButton, { type RectangularPushButtonOptions } from '@/utils/sun/buttons/RectangularPushButton';
import Tandem from '@/utils/tandem/Tandem';
import MagnifyingGlassNode, { type MagnifyingGlassNodeOptions } from '@/utils/scenery-phet/MagnifyingGlassNode';
import MinusNode from '@/utils/scenery-phet/MinusNode';
import PhetColorScheme from '@/utils/scenery-phet/PhetColorScheme';
import PlusNode from '@/utils/scenery-phet/PlusNode';
import sceneryPhet from '@/utils/scenery-phet/sceneryPhet';

type SelfOptions = {
  in?: boolean; // true: zoom-in button, false: zoom-out button
  magnifyingGlassOptions?: StrictOmit<MagnifyingGlassNodeOptions, 'icon'>;
};

export type ZoomButtonOptions = SelfOptions & StrictOmit<RectangularPushButtonOptions, 'content'>;

export default class ZoomButton extends RectangularPushButton {

  public constructor(providedOptions?: ZoomButtonOptions) {

    const options = optionize<ZoomButtonOptions, SelfOptions, RectangularPushButtonOptions>()({

      // SelfOptions
      in: true,
      magnifyingGlassOptions: { glassRadius: 15 },

      // RectangularPushButtonOptions
      baseColor: PhetColorScheme.BUTTON_YELLOW,
      tandem: Tandem.REQUIRED,
      tandemNameSuffix: 'Button'
    }, providedOptions);

    // Plus or minus sign in middle of magnifying glass
    const glassRadius = options.magnifyingGlassOptions.glassRadius!;
    const signOptions = {
      size: new Dimension2(1.3 * glassRadius, glassRadius / 3)
    };
    const icon = options.in ? new PlusNode(signOptions) : new MinusNode(signOptions);

    options.content = new MagnifyingGlassNode(combineOptions<MagnifyingGlassNodeOptions>({
      icon
    }, options.magnifyingGlassOptions));

    super(options);

    // support for binder documentation, stripped out in builds and only runs when ?binder is specified
    window.assert && window.phet.chipper.queryParameters.binder && InstanceRegistry.registerDataURL('scenery-phet', 'ZoomButton', this);
  }
}

sceneryPhet.register('ZoomButton', ZoomButton);