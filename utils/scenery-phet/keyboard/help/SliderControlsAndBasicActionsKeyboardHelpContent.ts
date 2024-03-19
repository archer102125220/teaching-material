// Copyright 2019-2022, University of Colorado Boulder

/**
 * Content for a KeyboardHelpDialog that contains a BasicActionsKeyboardHelpSection and a SliderControlsKeyboardHelpSection.
 * Often sim interaction only involves sliders and basic tab and button interaction. For those sims, this
 * content will be usable for the Dialog.
 *
 * @author Jesse Greenberg
 */

import sceneryPhet from '@/utils/scenery-phet/sceneryPhet';
import BasicActionsKeyboardHelpSection, { type BasicActionsKeyboardHelpSectionOptions } from '@/utils/scenery-phet/keyboard/help/BasicActionsKeyboardHelpSection';
import SliderControlsKeyboardHelpSection, { type SliderControlsKeyboardHelpSectionOptions } from '@/utils/scenery-phet/keyboard/help/SliderControlsKeyboardHelpSection';
import TwoColumnKeyboardHelpContent, { type TwoColumnKeyboardHelpContentOptions } from '@/utils/scenery-phet/keyboard/help/TwoColumnKeyboardHelpContent';

type SelfOptions = {

  // options passed to the SliderControlsKeyboardHelpSection
  sliderSectionOptions?: SliderControlsKeyboardHelpSectionOptions;

  // options passed to the BasicActionsKeyboardHelpSection
  generalSectionOptions?: BasicActionsKeyboardHelpSectionOptions;
};

export type SliderControlsAndBasicActionsKeyboardHelpContentOptions = SelfOptions & TwoColumnKeyboardHelpContentOptions;

export default class SliderControlsAndBasicActionsKeyboardHelpContent extends TwoColumnKeyboardHelpContent {

  public constructor(providedOptions?: SliderControlsAndBasicActionsKeyboardHelpContentOptions) {
    const options = providedOptions || {};

    const sliderHelpSection = new SliderControlsKeyboardHelpSection(options.sliderSectionOptions);
    const basicActionsHelpSection = new BasicActionsKeyboardHelpSection(options.generalSectionOptions);

    super([sliderHelpSection], [basicActionsHelpSection], options);
  }
}

sceneryPhet.register('SliderControlsAndBasicActionsKeyboardHelpContent', SliderControlsAndBasicActionsKeyboardHelpContent);