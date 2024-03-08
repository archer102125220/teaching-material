// Copyright 2021-2023, University of Colorado Boulder

/**
 * OpticalObjectChoiceComboBox is the combo box for selecting the object representation.
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import EnumerationProperty from '../../../axon/EnumerationProperty';
import { AlignBox, AlignGroup, HBox, Image, Node, type NodeTranslationOptions, Text } from '../../../scenery/imports';
import ComboBox, { type ComboBoxItem, type ComboBoxOptions } from '../../../sun/ComboBox';
import geometricOptics from '../../geometricOptics';
import GOConstants from '../GOConstants';
import OpticalObjectChoice from '../model/OpticalObjectChoice';
import type PickRequired from '../../../phet-core/types/PickRequired';
import optionize, { type EmptySelfOptions } from '../../../phet-core/optionize';

type SelfOptions = EmptySelfOptions;

type OpticalObjectChoiceComboBoxOptions = SelfOptions &
  PickRequired<ComboBoxOptions, 'tandem'> &
  NodeTranslationOptions;

export default class OpticalObjectChoiceComboBox extends ComboBox<OpticalObjectChoice> {

  /**
   * @param opticalObjectChoiceProperty
   * @param listParent - parent for the listbox popup
   * @param providedOptions
   */
  public constructor(opticalObjectChoiceProperty: EnumerationProperty<OpticalObjectChoice>, listParent: Node,
    providedOptions: OpticalObjectChoiceComboBoxOptions) {

    const options = optionize<OpticalObjectChoiceComboBoxOptions, SelfOptions, ComboBoxOptions>()({

      // ComboBoxOptions
      highlightFill: 'rgb( 168, 192, 245 )',
      listPosition: 'below',
      xMargin: 10,
      yMargin: 5,
      buttonTouchAreaXDilation: 5,
      buttonTouchAreaYDilation: 5
    }, providedOptions);

    // To make all icons have the same effective dimensions
    const iconsAlignGroup = new AlignGroup();

    // Create a ComboBoxItem for each representation.
    const items: ComboBoxItem<OpticalObjectChoice>[] = [];
    assert && assert(opticalObjectChoiceProperty.validValues); // {OpticalObjectChoice[]|undefined}
    opticalObjectChoiceProperty.validValues!.forEach((opticalObjectChoice: OpticalObjectChoice) => {

      const itemTandemName = `${opticalObjectChoice.tandemPrefix}${ComboBox.ITEM_TANDEM_NAME_SUFFIX}`;

      // create text
      const labelText = new Text(opticalObjectChoice.labelStringProperty, {
        font: GOConstants.CONTROL_FONT,
        maxWidth: 100,
        tandem: options.tandem.createTandem(itemTandemName).createTandem('labelText')
      });

      // create icon
      const icon = (opticalObjectChoice.icon instanceof Node) ?
        new Node({ children: [opticalObjectChoice.icon] }) :
        new Image(opticalObjectChoice.icon, { scale: 0.5 });
      const iconAlignBox = new AlignBox(icon, {
        group: iconsAlignGroup
      });

      const hBox = new HBox({
        spacing: 5,
        children: [iconAlignBox, labelText]
      });

      // create and add combo box item to the array
      items.push({
        value: opticalObjectChoice,
        createNode: () => hBox,
        tandemName: itemTandemName
      });
    });

    super(opticalObjectChoiceProperty, items, listParent, options);
  }
}

geometricOptics.register('OpticalObjectChoiceComboBox', OpticalObjectChoiceComboBox);