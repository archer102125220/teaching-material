// Copyright 2014-2023, University of Colorado Boulder

/**
 * TextPushButton is a convenience class for creating a rectangular push button with a text label.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import type StrictOmit from '@/utils/phet-core/types/StrictOmit';
import optionize, { combineOptions } from '@/utils/phet-core/optionize';
import { Font, Text, type TextOptions, type TPaint } from '@/utils/scenery/imports';
import Tandem from '@/utils/tandem/Tandem';
import sun from '@/utils/sun/sun';
import RectangularPushButton, { type RectangularPushButtonOptions } from '@/utils/sun/buttons/RectangularPushButton';
import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';

type SelfOptions = {
  font?: Font;
  textFill?: TPaint;
  maxTextWidth?: number | null;
  textNodeOptions?: TextOptions;
};

export type TextPushButtonOptions = SelfOptions & StrictOmit<RectangularPushButtonOptions, 'content'>;

export default class TextPushButton extends RectangularPushButton {

  private readonly disposeTextPushButton: () => void;

  public constructor(string: string | TReadOnlyProperty<string>, providedOptions?: TextPushButtonOptions) {

    const options = optionize<TextPushButtonOptions, StrictOmit<SelfOptions, 'textNodeOptions'>, RectangularPushButtonOptions>()({

      // TextPushButtonOptions
      font: Font.DEFAULT,
      textFill: 'black',
      maxTextWidth: null,

      // RectangularPushButtonOptions
      tandem: Tandem.REQUIRED,
      tandemNameSuffix: 'Button',
      innerContent: string
    }, providedOptions);

    const text = new Text(string, combineOptions<TextOptions>({
      font: options.font,
      fill: options.textFill,
      maxWidth: options.maxTextWidth
    }, options.textNodeOptions));
    options.content = text;

    super(options);

    this.disposeTextPushButton = () => {
      text.dispose();
    };
  }

  public override dispose(): void {
    this.disposeTextPushButton();
    super.dispose();
  }
}

sun.register('TextPushButton', TextPushButton);