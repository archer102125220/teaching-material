// Copyright 2018-2022, University of Colorado Boulder

/**
 * Standard PhET button for 'refresh'.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import InstanceRegistry from '@/utils/phet-core/documentation/InstanceRegistry';
import type StrictOmit from '@/utils/phet-core/types/StrictOmit';
import optionize from '@/utils/phet-core/optionize';
import { Path } from '@/utils/scenery/imports';
import syncAltSolidShape from '@/utils/sherpa/fontawesome-5/syncAltSolidShape';
import RectangularPushButton, { type RectangularPushButtonOptions } from '@/utils/sun/buttons/RectangularPushButton';
import PhetColorScheme from '@/utils/scenery-phet/PhetColorScheme';
import sceneryPhet from '@/utils/scenery-phet/sceneryPhet';

type SelfOptions = {
  iconHeight?: number;
};

export type RefreshButtonOptions = SelfOptions & StrictOmit<RectangularPushButtonOptions, 'content'>;

export default class RefreshButton extends RectangularPushButton {

  public constructor(providedOptions?: RefreshButtonOptions) {

    const options = optionize<RefreshButtonOptions, SelfOptions, RectangularPushButtonOptions>()({

      // RefreshButtonOptions
      iconHeight: 35,

      // RectangularPushButtonOptions
      baseColor: PhetColorScheme.BUTTON_YELLOW,

      tandemNameSuffix: 'RefreshButton'
    }, providedOptions);

    options.content = new Path(syncAltSolidShape, {
      fill: 'black'
    });
    options.content.setScaleMagnitude(options.iconHeight / options.content.height);

    super(options);

    // support for binder documentation, stripped out in builds and only runs when ?binder is specified
    assert && phet.chipper.queryParameters.binder && InstanceRegistry.registerDataURL('scenery-phet', 'RefreshButton', this);
  }
}

sceneryPhet.register('RefreshButton', RefreshButton);