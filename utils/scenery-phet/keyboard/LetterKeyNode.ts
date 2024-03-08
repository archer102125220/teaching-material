// Copyright 2017-2024, University of Colorado Boulder

/**
 * LetterKeyNode is a TextKeyNode with layout and spacing defaults that look best for a single letter. A letter key is
 * square and that looks best for a single character.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import optionize, { type EmptySelfOptions } from '../../phet-core/optionize';
import type StrictOmit from '../../phet-core/types/StrictOmit';
import sceneryPhet from '../sceneryPhet';
import TextKeyNode, { type TextKeyNodeOptions } from './TextKeyNode';
import KeyNode from './KeyNode';
import SceneryPhetStrings from '../SceneryPhetStrings';
import type TReadOnlyProperty from '../../axon/TReadOnlyProperty';

type SelfOptions = EmptySelfOptions;

export type LetterKeyNodeOptions = SelfOptions & StrictOmit<TextKeyNodeOptions, 'forceSquareKey'>;

export default class LetterKeyNode extends TextKeyNode {

  public constructor(letter: string | TReadOnlyProperty<string>, providedOptions?: LetterKeyNodeOptions) {
    const options = optionize<LetterKeyNodeOptions, SelfOptions, TextKeyNodeOptions>()({
      xPadding: 5,
      forceSquareKey: true
    }, providedOptions);

    super(letter, options);
  }

  // -------------------------------------------------------------------------------------------------
  // Static factory methods for specific letter key strings.
  // -------------------------------------------------------------------------------------------------

  public static a(providedOptions?: LetterKeyNodeOptions): KeyNode {
    return new LetterKeyNode(SceneryPhetStrings.key.aStringProperty, providedOptions);
  }

  public static c(providedOptions?: LetterKeyNodeOptions): KeyNode {
    return new LetterKeyNode(SceneryPhetStrings.key.cStringProperty, providedOptions);
  }

  public static d(providedOptions?: LetterKeyNodeOptions): KeyNode {
    return new LetterKeyNode(SceneryPhetStrings.key.dStringProperty, providedOptions);
  }

  public static l(providedOptions?: LetterKeyNodeOptions): KeyNode {
    return new LetterKeyNode(SceneryPhetStrings.key.lStringProperty, providedOptions);
  }

  public static r(providedOptions?: LetterKeyNodeOptions): KeyNode {
    return new LetterKeyNode(SceneryPhetStrings.key.rStringProperty, providedOptions);
  }

  public static s(providedOptions?: LetterKeyNodeOptions): KeyNode {
    return new LetterKeyNode(SceneryPhetStrings.key.sStringProperty, providedOptions);
  }

  public static w(providedOptions?: LetterKeyNodeOptions): KeyNode {
    return new LetterKeyNode(SceneryPhetStrings.key.wStringProperty, providedOptions);
  }

  public static one(providedOptions?: LetterKeyNodeOptions): KeyNode {
    return new LetterKeyNode(SceneryPhetStrings.key.oneStringProperty, providedOptions);
  }

  public static two(providedOptions?: LetterKeyNodeOptions): KeyNode {
    return new LetterKeyNode(SceneryPhetStrings.key.twoStringProperty, providedOptions);
  }

  public static three(providedOptions?: LetterKeyNodeOptions): KeyNode {
    return new LetterKeyNode(SceneryPhetStrings.key.threeStringProperty, providedOptions);
  }
}

sceneryPhet.register('LetterKeyNode', LetterKeyNode);