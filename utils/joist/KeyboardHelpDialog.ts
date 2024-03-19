// Copyright 2016-2023, University of Colorado Boulder

/**
 * Shows a Dialog with content describing keyboard interactions. Opened via a button in the navigation bar.
 *
 * @author Jesse Greenberg
 */

import Multilink from '@/utils/axon/Multilink';
import Property from '@/utils/axon/Property';
import optionize, { type EmptySelfOptions } from '@/utils/phet-core/optionize';
import type PickRequired from '@/utils/phet-core/types/PickRequired';
import type StrictOmit from '@/utils/phet-core/types/StrictOmit';
import KeyboardHelpSectionRow from '@/utils/scenery-phet/keyboard/help/KeyboardHelpSectionRow';
import TextKeyNode from '@/utils/scenery-phet/keyboard/TextKeyNode';
import PhetFont from '@/utils/scenery-phet/PhetFont';
import { HBox, Node, type NodeOptions, PDOMPeer, ReadingBlock, type ReadingBlockOptions, VBox, VoicingText } from '@/utils/scenery/imports';
import Dialog, { type DialogOptions } from '@/utils/sun/Dialog';
import joist from '@/utils/joist/joist';
import JoistStrings from '@/utils/joist/JoistStrings';
import { type AnyScreen } from '@/utils/joist/Screen';
import Tandem from '@/utils/tandem/Tandem';

// constants
const TITLE_MAX_WIDTH = 670;

const tabToGetStartedStringProperty = JoistStrings.a11y.keyboardHelp.tabToGetStartedStringProperty;

type SelfOptions = EmptySelfOptions;

export type KeyboardHelpDialogOptions = SelfOptions & StrictOmit<DialogOptions, 'title'> & PickRequired<DialogOptions, 'tandem'>;

export default class KeyboardHelpDialog extends Dialog {

  public constructor(screens: AnyScreen[], screenProperty: Property<AnyScreen>, providedOptions?: KeyboardHelpDialogOptions) {

    const options = optionize<KeyboardHelpDialogOptions, SelfOptions, DialogOptions>()({
      titleAlign: 'center',
      fill: 'rgb( 214, 237, 249 )',
      ySpacing: 15,

      // phet-io
      phetioReadOnly: true, // the KeyboardHelpDialog should not be settable
      phetioDynamicElement: true,

      // Append the title to the close button
      closeButtonVoicingDialogTitle: JoistStrings.keyboardShortcuts.titleStringProperty,
      isDisposable: false,

      // Because of the special titleNode, we set the aria-labelledby attribute manually; see below.
      addAriaLabelledByFromTitle: false
    }, providedOptions);

    const content = new Node({
      tagName: 'div'
    });

    const contentTandem = options.tandem.createTandem('content');
    const screenContentNodes: Node[] = [];
    screens.forEach(screen => {
      window.assert && window.assert(screen.createKeyboardHelpNode, 'if any screen has keyboard help content, then all screens need content');
      const screenTandem = screen.tandem.supplied ? contentTandem.createTandem(screen.tandem.name) : Tandem.REQUIRED;
      const keyboardHelpNode = screen.createKeyboardHelpNode!(screenTandem);
      screenContentNodes.push(keyboardHelpNode);
    });

    const shortcutsTitleText = new VoicingText(JoistStrings.keyboardShortcuts.titleStringProperty, {
      font: new PhetFont({
        weight: 'bold',
        size: 24
      }),
      maxWidth: TITLE_MAX_WIDTH,

      // pdom options
      tagName: 'h1',
      innerContent: JoistStrings.a11y.keyboardHelp.keyboardShortcutsStringProperty
    });

    // a 'tab to get started' hint
    const tabHintLine = new TabHintLine();

    // stack the two items with a bit of spacing
    window.assert && window.assert(!options.title, 'KeyboardHelpDialog sets title');
    const titleVBox = new VBox({
      children: [shortcutsTitleText, tabHintLine],
      spacing: 5,

      // pdom
      tagName: 'div'
    }
    );
    options.title = titleVBox;

    // help content surrounded by a div unless already specified, so that all content is read when dialog opens

    super(content, options);

    // When the screen changes, swap out keyboard help content to the selected screen's content
    Multilink.multilink([screenProperty, this.isShowingProperty], (screen, isShowing) => {
      window.assert && window.assert(screens.includes(screen), 'double check that this is an expected screen');
      const currentContentNode = screenContentNodes[screens.indexOf(screen)]!;
      if (isShowing) {
        window.assert && window.assert(currentContentNode, 'a displayed KeyboardHelpButton for a screen should have content');
        content.children = [currentContentNode];
      }
    });

    // (a11y) Make sure that the title passed to the Dialog has an accessible name.
    this.addAriaLabelledbyAssociation({
      thisElementName: PDOMPeer.PRIMARY_SIBLING,
      otherNode: shortcutsTitleText,
      otherElementName: PDOMPeer.PRIMARY_SIBLING
    });
  }
}

/**
 * An inner class that assembles the "Tab to get started" content of the Dialog title. This content
 * is interactive with Voicing in that it can be clicked to hear this content (when Voicing is enabled).
 */

type TabHintLineSelfOptions = EmptySelfOptions;
type TabHintLineOptions = TabHintLineSelfOptions & NodeOptions & ReadingBlockOptions;

class TabHintLine extends ReadingBlock(Node) {

  public constructor(providedOptions?: TabHintLineOptions) {

    const options = optionize<TabHintLineOptions, TabHintLineSelfOptions, ReadingBlockOptions>()({
      readingBlockNameResponse: tabToGetStartedStringProperty
    }, providedOptions);

    super();

    const tabIcon = TextKeyNode.tab();

    // a line to say "tab to get started" below the "Keyboard Shortcuts" 'title'
    const labelWithIcon = KeyboardHelpSectionRow.labelWithIcon(JoistStrings.keyboardShortcuts.toGetStartedStringProperty,
      tabIcon, {
      labelInnerContent: tabToGetStartedStringProperty,
      iconOptions: {
        tagName: 'p' // because there is only one, and the default is an li tag
      }
    });

    // labelWithIcon is meant to be passed to KeyboardHelpSection, so we have to hack a bit here
    const hBox = new HBox({
      children: [labelWithIcon.icon, labelWithIcon.label],
      spacing: 4
    });

    this.addChild(hBox);
    this.mutate(options);
  }
}

joist.register('KeyboardHelpDialog', KeyboardHelpDialog);