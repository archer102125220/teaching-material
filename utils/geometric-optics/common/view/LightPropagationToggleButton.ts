// Copyright 2021-2023, University of Colorado Boulder

/**
 * LightPropagationToggleButton is a toggle button used to turn light propagation on and off.
 *
 * @author Sarah Chang (Swarthmore College)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import SceneryPhetConstants from '@/utils/scenery-phet/SceneryPhetConstants';
import { Image } from '@/utils/scenery/imports';
import BooleanRoundToggleButton, { type BooleanRoundToggleButtonOptions } from '@/utils/sun/buttons/BooleanRoundToggleButton';
import lightPropagationOffIcon_png from '@/assets/images/geometric-optics/lightPropagationOffIcon_png';
import lightPropagationOnIcon_png from '@/assets/images/geometric-optics/lightPropagationOnIcon_png';
import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import GOColors from '@/utils/geometric-optics/common/GOColors';
import type PickRequired from '@/utils/phet-core/types/PickRequired';
import optionize, { type EmptySelfOptions } from '@/utils/phet-core/optionize';
import Property from '@/utils/axon/Property';

type SelfOptions = EmptySelfOptions;

type LightPropagationToggleButtonOptions = SelfOptions & PickRequired<BooleanRoundToggleButtonOptions, 'tandem'>;

export default class LightPropagationToggleButton extends BooleanRoundToggleButton {

  public constructor(booleanProperty: Property<boolean>, providedOptions: LightPropagationToggleButtonOptions) {

    const options = optionize<LightPropagationToggleButtonOptions, SelfOptions, BooleanRoundToggleButtonOptions>()({

      // BooleanRoundToggleButtonOptions
      radius: SceneryPhetConstants.DEFAULT_BUTTON_RADIUS, // so that this button will be the same size as ResetAllButton
      xMargin: 4,
      yMargin: 4,
      touchAreaDilation: 5.2, // same as ResetAllButton
      baseColor: GOColors.lightPropagationToggleButtonFillProperty,
      isDisposable: false
    }, providedOptions);

    // create nodes for open and closed eye icons
    const onNode = new Image(lightPropagationOnIcon_png);
    const offNode = new Image(lightPropagationOffIcon_png);

    super(booleanProperty, onNode, offNode, options);
  }
}

geometricOptics.register('LightPropagationToggleButton', LightPropagationToggleButton);