// Copyright 2020-2023, University of Colorado Boulder

/**
 * Help section for explaining how to use a keyboard to interact with a ComboBox.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import PatternStringProperty from '@/utils/axon/PatternStringProperty';
import StringProperty from '@/utils/axon/StringProperty';
import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';
import optionize from '@/utils/phet-core/optionize';
import sceneryPhet from '@/utils/scenery-phet/sceneryPhet';
import SceneryPhetStrings from '@/utils/scenery-phet/SceneryPhetStrings';
import TextKeyNode from '@/utils/scenery-phet/keyboard/TextKeyNode';
import KeyboardHelpIconFactory from '@/utils/scenery-phet/keyboard/help/KeyboardHelpIconFactory';
import KeyboardHelpSection, { type KeyboardHelpSectionOptions } from '@/utils/scenery-phet/keyboard/help/KeyboardHelpSection';
import KeyboardHelpSectionRow from '@/utils/scenery-phet/keyboard/help/KeyboardHelpSectionRow';
import Tandem from '@/utils/tandem/Tandem';

type SelfOptions = {

  // Heading for the section, should be capitalized as a title
  headingString?: string | TReadOnlyProperty<string>;

  // the item being changed by the combo box, lower case as used in a sentence
  thingAsLowerCaseSingular?: string | TReadOnlyProperty<string>;

  // plural version of thingAsLowerCaseSingular
  thingAsLowerCasePlural?: string | TReadOnlyProperty<string>;
};

export type ComboBoxKeyboardHelpSectionOptions = SelfOptions & KeyboardHelpSectionOptions;

export default class ComboBoxKeyboardHelpSection extends KeyboardHelpSection {

  public constructor(providedOptions?: ComboBoxKeyboardHelpSectionOptions) {

    const options = optionize<ComboBoxKeyboardHelpSectionOptions, SelfOptions, KeyboardHelpSectionOptions>()({

      // SelfOptions
      headingString: SceneryPhetStrings.keyboardHelpDialog.comboBox.headingStringStringProperty,
      thingAsLowerCaseSingular: SceneryPhetStrings.keyboardHelpDialog.comboBox.optionStringProperty,
      thingAsLowerCasePlural: SceneryPhetStrings.keyboardHelpDialog.comboBox.optionsStringProperty,

      // KeyboardHelpSectionOptions
      a11yContentTagName: 'ol', // ordered list
      vBoxOptions: {
        spacing: 8 // A bit tighter so that it looks like one set of instructions
      }
    }, providedOptions);

    // options may be string or TReadOnlyProperty<string>, so ensure that we have a TReadOnlyProperty<string>.
    const thingAsLowerCasePluralStringProperty = (typeof options.thingAsLowerCasePlural === 'string') ?
      new StringProperty(options.thingAsLowerCasePlural) :
      options.thingAsLowerCasePlural;
    const thingAsLowerCaseSingularStringProperty = (typeof options.thingAsLowerCaseSingular === 'string') ?
      new StringProperty(options.thingAsLowerCaseSingular) :
      options.thingAsLowerCaseSingular;

    // Create a PatternStringProperty that fills in a plural/singular pattern, and support dynamic locale.
    const createPatternStringProperty = (providedStringProperty: TReadOnlyProperty<string>) => {
      return new PatternStringProperty(
        providedStringProperty, {
        thingPlural: thingAsLowerCasePluralStringProperty,
        thingSingular: thingAsLowerCaseSingularStringProperty
      }, { tandem: Tandem.OPT_OUT });
    };

    const spaceKeyNode = TextKeyNode.space();
    const enterKeyNode = TextKeyNode.enter();
    const spaceOrEnterIcon = KeyboardHelpIconFactory.iconOrIcon(spaceKeyNode, enterKeyNode);

    const popUpList = KeyboardHelpSectionRow.labelWithIcon(
      createPatternStringProperty(SceneryPhetStrings.keyboardHelpDialog.comboBox.popUpListPatternStringProperty),
      spaceOrEnterIcon, {
      labelInnerContent: createPatternStringProperty(SceneryPhetStrings.a11y.keyboardHelpDialog.comboBox.popUpListPatternDescriptionStringProperty)
    });

    const moveThrough = KeyboardHelpSectionRow.labelWithIcon(
      createPatternStringProperty(SceneryPhetStrings.keyboardHelpDialog.comboBox.moveThroughPatternStringProperty),
      KeyboardHelpIconFactory.upDownArrowKeysRowIcon(), {
      labelInnerContent: createPatternStringProperty(SceneryPhetStrings.a11y.keyboardHelpDialog.comboBox.moveThroughPatternDescriptionStringProperty)
    });

    const chooseNew = KeyboardHelpSectionRow.labelWithIcon(
      createPatternStringProperty(SceneryPhetStrings.keyboardHelpDialog.comboBox.chooseNewPatternStringProperty),
      enterKeyNode, {
      labelInnerContent: createPatternStringProperty(SceneryPhetStrings.a11y.keyboardHelpDialog.comboBox.chooseNewPatternDescriptionStringProperty)
    });

    const escapeKeyNode = TextKeyNode.esc();
    const closeWithoutChanging = KeyboardHelpSectionRow.labelWithIcon(
      SceneryPhetStrings.keyboardHelpDialog.comboBox.closeWithoutChangingStringProperty,
      escapeKeyNode, {
      labelInnerContent: SceneryPhetStrings.a11y.keyboardHelpDialog.comboBox.closeWithoutChangingDescriptionStringProperty
    });

    // order the rows of content
    const rows = [popUpList, moveThrough, chooseNew, closeWithoutChanging];
    super(options.headingString, rows, options);
  }
}

sceneryPhet.register('ComboBoxKeyboardHelpSection', ComboBoxKeyboardHelpSection);