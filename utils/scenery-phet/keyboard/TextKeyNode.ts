// Copyright 2017-2023, University of Colorado Boulder

/**
 * TextKeyNode is a KeyNode with a text icon. It has layout, spacing, and defaults for KeyNode that are suited for text.
 *
 * @author Jesse Greenberg
 */

import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';
import optionize from '@/utils/phet-core/optionize';
import platform from '@/utils/phet-core/platform';
import { Font, RichText, type TColor } from '@/utils/scenery/imports';
import PhetFont from '@/utils/scenery-phet/PhetFont';
import sceneryPhet from '@/utils/scenery-phet/sceneryPhet';
import SceneryPhetStrings from '@/utils/scenery-phet/SceneryPhetStrings';
import KeyNode, { type KeyNodeOptions } from '@/utils/scenery-phet/keyboard/KeyNode';
import type PhetioProperty from '@/utils/axon/PhetioProperty';

type SelfOptions = {
  font?: Font;
  fill?: TColor;
  textMaxWidth?: number;
};

export type TextKeyNodeOptions = SelfOptions & KeyNodeOptions;

export default class TextKeyNode extends KeyNode {

  public constructor(string: string | TReadOnlyProperty<string>, providedOptions?: TextKeyNodeOptions) {

    // margins, width, and height in ScreenView coordinates
    const options = optionize<TextKeyNodeOptions, SelfOptions, KeyNodeOptions>()({

      // text options
      font: new PhetFont({ size: 16 }),
      fill: 'black',
      textMaxWidth: 55, // Long keys like Space, Enter, Tab, Shift are all smaller than this.

      // by default, key should tightly surround the text, with a bit more horizontal space
      xPadding: 11
    }, providedOptions);

    // use RichText because some keys (like page up/page down/caps lock) might span multiple lines
    const text = new RichText(string, {
      font: options.font,
      fill: options.fill,
      maxWidth: options.textMaxWidth
    });

    super(text, options);
    this.disposeEmitter.addListener(() => text.dispose());
  }

  /**
   * Returns the correct platform dependent key string for "Alt". "Alt" on Windows, "Option" on Mac.
   */
  public static getAltKeyString(): PhetioProperty<string> {
    return platform.mac ?
      SceneryPhetStrings.key.optionStringProperty :
      SceneryPhetStrings.key.altStringProperty;
  }

  // -------------------------------------------------------------------------------------------------
  // Static factory methods for specific text strings. For brevity, these methods have the same names
  // as their string keys. For example SceneryPhetStrings.key.esc is rendered by the esc method.
  // -------------------------------------------------------------------------------------------------

  // Note that this will render "Alt" OR "Options", depending on platform. If there is a description of this icon
  // in the PDOM please use getAltKeyString().
  public static altOrOption(providedOptions?: KeyNodeOptions): KeyNode {
    return new TextKeyNode(TextKeyNode.getAltKeyString(), providedOptions);
  }

  public static capsLock(providedOptions?: KeyNodeOptions): KeyNode {
    return new TextKeyNode(SceneryPhetStrings.key.capsLockStringProperty, providedOptions);
  }

  public static esc(providedOptions?: KeyNodeOptions): KeyNode {
    return new TextKeyNode(SceneryPhetStrings.key.escStringProperty, providedOptions);
  }

  public static end(providedOptions?: KeyNodeOptions): KeyNode {
    return new TextKeyNode(SceneryPhetStrings.key.endStringProperty, providedOptions);
  }

  public static enter(providedOptions?: KeyNodeOptions): KeyNode {
    return new TextKeyNode(SceneryPhetStrings.key.enterStringProperty, providedOptions);
  }

  public static fn(providedOptions?: KeyNodeOptions): KeyNode {
    return new TextKeyNode(SceneryPhetStrings.key.fnStringProperty, providedOptions);
  }

  public static home(providedOptions?: KeyNodeOptions): KeyNode {
    return new TextKeyNode(SceneryPhetStrings.key.homeStringProperty, providedOptions);
  }

  public static pageDown(providedOptions?: KeyNodeOptions): KeyNode {
    return new TextKeyNode(SceneryPhetStrings.key.pageDownStringProperty, providedOptions);
  }

  public static pageUp(providedOptions?: KeyNodeOptions): KeyNode {
    return new TextKeyNode(SceneryPhetStrings.key.pageUpStringProperty, providedOptions);
  }

  public static space(providedOptions?: KeyNodeOptions): KeyNode {
    return new TextKeyNode(SceneryPhetStrings.key.spaceStringProperty, providedOptions);
  }

  public static shift(providedOptions?: KeyNodeOptions): KeyNode {
    return new TextKeyNode(SceneryPhetStrings.key.shiftStringProperty, providedOptions);
  }

  public static tab(providedOptions?: KeyNodeOptions): KeyNode {
    return new TextKeyNode(SceneryPhetStrings.key.tabStringProperty, providedOptions);
  }
}

sceneryPhet.register('TextKeyNode', TextKeyNode);