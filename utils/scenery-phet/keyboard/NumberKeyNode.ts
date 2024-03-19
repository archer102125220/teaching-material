// Copyright 2020-2022, University of Colorado Boulder

/**
 * NumberKeyNode looks like a keyboard key with a single letter. See LetterKeyNode for implementation details. This is
 * a useful type to separate out usages for numbers in case we need to tweak all of them in the future.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import { type EmptySelfOptions } from '@/utils/phet-core/optionize';
import sceneryPhet from '@/utils/scenery-phet/sceneryPhet';
import LetterKeyNode, { type LetterKeyNodeOptions } from '@/utils/scenery-phet/keyboard/LetterKeyNode';

type SelfOptions = EmptySelfOptions;

export type NumberKeyNodeOptions = SelfOptions & LetterKeyNodeOptions;

export default class NumberKeyNode extends LetterKeyNode {
  public constructor(value: number, providedOptions?: NumberKeyNodeOptions) {
    window.assert && window.assert(value >= 0 && Number.isInteger(value));
    super(value.toString(), providedOptions);
  }
}

sceneryPhet.register('NumberKeyNode', NumberKeyNode);