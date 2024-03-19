// Copyright 2021-2023, University of Colorado Boulder

/**
 * RichText that composes ReadingBlock, adding support for Voicing and input listeners that speak content upon
 * user activation.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';
import optionize, { type EmptySelfOptions } from '@/utils/phet-core/optionize';
import { ReadingBlock, ReadingBlockHighlight, type ReadingBlockOptions, RichText, type RichTextOptions, scenery } from '@/utils/scenery/imports';
import type StrictOmit from '@/utils/phet-core/types/StrictOmit';

type SelfOptions = EmptySelfOptions;

// focusHighlight will always be set by this class
type ParentOptions = ReadingBlockOptions & StrictOmit<RichTextOptions, 'focusHighlight'>;
export type VoicingRichTextOptions = SelfOptions & ParentOptions;

class VoicingRichText extends ReadingBlock(RichText) {

  public constructor(text: string | TReadOnlyProperty<string>, providedOptions?: VoicingRichTextOptions) {

    const options = optionize<VoicingRichTextOptions, SelfOptions, ParentOptions>()({

      // {string|null} - if provided, alternative text that will be read that is different from the
      // visually displayed text
      readingBlockNameResponse: text,

      // pdom
      innerContent: text,

      // voicing
      // default tag name for a ReadingBlock, but there are cases where you may want to override this (such as
      // RichText links)
      readingBlockTagName: 'button'
    }, providedOptions);

    super(text, options);

    this.focusHighlight = new ReadingBlockHighlight(this);
  }
}

scenery.register('VoicingRichText', VoicingRichText);
export default VoicingRichText;
