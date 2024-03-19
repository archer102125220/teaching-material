// Copyright 2021-2024, University of Colorado Boulder

/**
 * VisibilityCheckboxGroup is a group of checkboxes for controlling visibility of things in the user interface.
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { HBox, Node, Text } from '@/utils/scenery/imports';
import VerticalCheckboxGroup, { type VerticalCheckboxGroupItem, type VerticalCheckboxGroupOptions } from '@/utils/sun/VerticalCheckboxGroup';
import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import GeometricOpticsStrings from '@/utils/geometric-optics/GeometricOpticsStrings';
import GuideNode from '@/utils/geometric-optics/common/view/GuideNode';
import GOConstants from '@/utils/geometric-optics/common/GOConstants';
import VisibleProperties from '@/utils/geometric-optics/common/view/VisibleProperties';
import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';
import optionize from '@/utils/phet-core/optionize';
import type PickRequired from '@/utils/phet-core/types/PickRequired';
import type PickOptional from '@/utils/phet-core/types/PickOptional';
import SecondPointNode from '@/utils/geometric-optics/common/view/SecondPointNode';
import FocalPointNode from '@/utils/geometric-optics/common/view/FocalPointNode';
import TwoFPointNode from '@/utils/geometric-optics/common/view/TwoFPointNode';
import GOPreferences from '@/utils/geometric-optics/common/model/GOPreferences';
import GOQueryParameters from '@/utils/geometric-optics/common/GOQueryParameters';
import { type GOSimOptions } from '@/utils/geometric-optics/GOSim';
import Optic from '@/utils/geometric-optics/common/model/Optic';
import Lens from '@/utils/geometric-optics/lens/model/Lens';
import Property from '@/utils/axon/Property';
import EnumerationProperty from '@/utils/axon/EnumerationProperty';
import OpticalObjectChoice from '@/utils/geometric-optics/common/model/OpticalObjectChoice';
import DerivedProperty from '@/utils/axon/DerivedProperty';
import BooleanIO from '@/utils/tandem/types/BooleanIO';

type SelfOptions = PickRequired<GOSimOptions, 'isBasicsVersion'>;

export type VisibilityCheckboxGroupOptions = SelfOptions & PickRequired<VerticalCheckboxGroupOptions, 'tandem'>;

export default class VisibilityCheckboxGroup extends VerticalCheckboxGroup {

  /**
   * @param visibleProperties - Properties controlled by these check boxes
   * @param optic
   * @param opticalObjectChoiceProperty
   * @param providedOptions
   */
  public constructor(visibleProperties: VisibleProperties,
    optic: Optic,
    opticalObjectChoiceProperty: EnumerationProperty<OpticalObjectChoice>,
    providedOptions: VisibilityCheckboxGroupOptions) {

    const options = optionize<VisibilityCheckboxGroupOptions, SelfOptions, VerticalCheckboxGroupOptions>()({

      // VerticalCheckboxGroupOptions
      spacing: 4,
      checkboxOptions: {
        boxWidth: GOConstants.CHECKBOX_BOX_WIDTH
      },
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    }, providedOptions);

    // These checkboxes are not present in Geometric Optics: Basics, because it only has a flat mirror, with infinite
    // focal length. See https://github.com/phetsims/geometric-optics-basics/issues/2#issuecomment-998203690
    const focalPointItems = optic.isExclusivelyFlatMirror() ? [] : [

      // Focal Points (F)
      createItem(GeometricOpticsStrings.checkbox.focalPointsStringProperty, visibleProperties.focalPointsVisibleProperty, {
        iconNode: FocalPointNode.createIcon(),
        tandemName: 'focalPointsCheckbox'
      }),

      // 2F Points
      createItem(GeometricOpticsStrings.checkbox.twoFPointsStringProperty, visibleProperties.twoFPointsVisibleProperty, {
        iconNode: TwoFPointNode.createIcon(),
        options: {
          visibleProperty: GOPreferences.add2FPointsCheckboxProperty
        },
        tandemName: 'twoFPointsCheckbox'
      })
    ];

    const virtualImageCheckboxTandemName = 'virtualImageCheckbox';

    const items = [
      ...focalPointItems,

      // Virtual Image
      createItem(GeometricOpticsStrings.checkbox.virtualImageStringProperty, visibleProperties.virtualImageVisibleProperty, {
        options: {

          // Disable the 'Virtual Image' checkbox for lights, see https://github.com/phetsims/geometric-optics/issues/216
          enabledProperty: new DerivedProperty(
            [opticalObjectChoiceProperty],
            opticalObjectChoice => (opticalObjectChoice.type !== 'light'), {
            tandem: options.tandem.createTandem(virtualImageCheckboxTandemName).createTandem('enabledProperty'),
            phetioValueType: BooleanIO,
            phetioFeatured: true
          })
        },
        tandemName: virtualImageCheckboxTandemName
      }),

      // Labels
      createItem(GeometricOpticsStrings.checkbox.labelsStringProperty, visibleProperties.labelsVisibleProperty, {
        tandemName: 'labelsCheckbox'
      }),

      // Second Point
      createItem(GeometricOpticsStrings.checkbox.secondPointStringProperty, visibleProperties.secondPointVisibleProperty, {
        iconNode: SecondPointNode.createIcon(),
        options: {
          visible: !options.isBasicsVersion // 'Second Point' checkbox is hidden in the Basics version
        },
        tandemName: 'secondPointCheckbox'
      })
    ];

    // Guides
    if (optic instanceof Lens) {
      items.push(createItem(GeometricOpticsStrings.checkbox.guidesStringProperty, visibleProperties.guidesVisibleProperty, {
        iconNode: GuideNode.createIcon(),
        options: {
          visible: GOQueryParameters.addGuidesCheckbox,
          visiblePropertyOptions: {
            phetioFeatured: false
          },
          enabledPropertyOptions: {
            phetioFeatured: false
          }
        },
        tandemName: 'guidesCheckbox'
      }));
    }

    super(items, options);
  }
}

type ItemOptions = {
  iconNode?: Node;
} & PickRequired<VerticalCheckboxGroupItem, 'tandemName'> & PickOptional<VerticalCheckboxGroupItem, 'options'>;

function createItem(labelStringProperty: TReadOnlyProperty<string>,
  property: Property<boolean>, providedOptions: ItemOptions): VerticalCheckboxGroupItem {

  return {
    createNode: tandem => {
      const labelText = new Text(labelStringProperty, {
        font: GOConstants.CONTROL_FONT,
        maxWidth: 90,
        tandem: tandem.createTandem('labelText')
      });

      // Create HBox if icon is present, otherwise the label is just text.
      return providedOptions.iconNode ?
        new HBox({ children: [labelText, providedOptions.iconNode], spacing: 8 }) :
        labelText;
    },
    property,
    options: providedOptions.options,
    tandemName: providedOptions.tandemName
  };
}

geometricOptics.register('VisibilityCheckboxGroup', VisibilityCheckboxGroup);