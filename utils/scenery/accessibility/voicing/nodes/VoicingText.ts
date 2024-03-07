// Copyright 2021-2022, University of Colorado Boulder

/**
 * Text that mixes ReadingBlock, supporting features of Voicing and adding listeners that speak the text string
 * upon user input.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import type TReadOnlyProperty from '../../../../axon/TReadOnlyProperty';
import optionize, { type EmptySelfOptions } from '../../../../phet-core/optionize';
import { ReadingBlock, ReadingBlockHighlight, type ReadingBlockOptions, scenery, Text, type TextOptions } from '../../../imports';

type SelfOptions = EmptySelfOptions;
type ParentOptions = ReadingBlockOptions & TextOptions;
export type VoicingTextOptions = SelfOptions & ParentOptions;

class VoicingText extends ReadingBlock(Text) {

  public constructor(text: string | TReadOnlyProperty<string>, providedOptions?: VoicingTextOptions) {

    const options = optionize<VoicingTextOptions, SelfOptions, ParentOptions>()({

      // {string|null} - if provided, alternative text that will be spoken that is different from the
      // visually displayed text
      readingBlockNameResponse: text,

      // pdom
      tagName: 'p',
      innerContent: text
    }, providedOptions);

    super(text);

    // unique highlight for non-interactive components
    this.focusHighlight = new ReadingBlockHighlight(this);

    this.mutate(options);
  }
}

scenery.register('VoicingText', VoicingText);
export default VoicingText;
