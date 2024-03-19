// Copyright 2018-2022, University of Colorado Boulder

/**
 * Standard PhET button for 'info', uses the international symbol for 'information'.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import InstanceRegistry from '@/utils/phet-core/documentation/InstanceRegistry';
import type StrictOmit from '@/utils/phet-core/types/StrictOmit';
import optionize from '@/utils/phet-core/optionize';
import { type TColor, Path } from '@/utils/scenery/imports';
import infoCircleSolidShape from '@/utils/sherpa/fontawesome-5/infoCircleSolidShape';
import RoundPushButton, { type RoundPushButtonOptions } from '@/utils/sun/buttons/RoundPushButton';
import sceneryPhet from '@/utils/scenery-phet/sceneryPhet';

type SelfOptions = {
  iconFill?: TColor;
};

export type InfoButtonOptions = SelfOptions & StrictOmit<RoundPushButtonOptions, 'content'>;

export default class InfoButton extends RoundPushButton {

  public constructor(providedOptions?: InfoButtonOptions) {

    const options = optionize<InfoButtonOptions, SelfOptions, RoundPushButtonOptions>()({

      // SelfOptions
      iconFill: 'black',

      // RoundPushButtonOptions
      baseColor: 'rgb( 238, 238, 238 )',
      xMargin: 10,
      yMargin: 10,
      touchAreaDilation: 10
    }, providedOptions);

    options.content = new Path(infoCircleSolidShape, {
      scale: 0.08,
      fill: options.iconFill
    });

    super(options);

    // support for binder documentation, stripped out in builds and only runs when ?binder is specified
    assert && phet.chipper.queryParameters.binder && InstanceRegistry.registerDataURL('scenery-phet', 'InfoButton', this);
  }
}

sceneryPhet.register('InfoButton', InfoButton);