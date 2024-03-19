// Copyright 2019-2023, University of Colorado Boulder

/**
 * TwoColumnKeyboardHelpContentOptions handles layout of KeyboardHelpSections in 2 columns.
 *
 * @author Jesse Greenberg
 */

import optionize, { combineOptions } from '@/utils/phet-core/optionize';
import type StrictOmit from '@/utils/phet-core/types/StrictOmit';
import { HBox, Node, type NodeOptions, VBox, type VBoxOptions } from '@/utils/scenery/imports';
import sceneryPhet from '@/utils/scenery-phet/sceneryPhet';
import KeyboardHelpSection from '@/utils/scenery-phet/keyboard/help/KeyboardHelpSection';

type SelfOptions = {

  // spacing between the left and right columns of the help content
  columnSpacing?: number;

  // vertical spacing between KeyboardHelpSections in each column
  sectionSpacing?: number;
};

export type TwoColumnKeyboardHelpContentOptions = SelfOptions & StrictOmit<NodeOptions, 'children'>;

export default class TwoColumnKeyboardHelpContent extends Node {

  /**
   * @param leftSections - KeyboardHelpSections for the left column
   * @param rightSections -  KeyboardHelpSections for the right column
   * @param [providedOptions]
   */
  public constructor(leftSections: KeyboardHelpSection[], rightSections: KeyboardHelpSection[],
    providedOptions?: TwoColumnKeyboardHelpContentOptions) {

    const options = optionize<TwoColumnKeyboardHelpContentOptions, SelfOptions, NodeOptions>()({
      columnSpacing: 40,
      sectionSpacing: 40
    }, providedOptions);

    const columnOptions: StrictOmit<VBoxOptions, 'children'> = {
      align: 'left',
      spacing: options.sectionSpacing
    };
    const leftColumn = new VBox(combineOptions<VBoxOptions>({
      children: leftSections
    }, columnOptions));
    const rightColumn = new VBox(combineOptions<VBoxOptions>({
      children: rightSections
    }, columnOptions));

    const hBox = new HBox({
      children: [leftColumn, rightColumn],
      spacing: options.columnSpacing,
      align: 'top'
    });

    options.children = [hBox];

    super(options);
  }
}

sceneryPhet.register('TwoColumnKeyboardHelpContent', TwoColumnKeyboardHelpContent);