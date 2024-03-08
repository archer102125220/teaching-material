// Copyright 2021-2023, University of Colorado Boulder

/**
 * GOControlPanel is the main control panel for both screens.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Martin Veillette
 */

import Property from '../../../axon/Property';
import { HBox, VSeparator } from '../../../scenery/imports';
import Panel, { type PanelOptions } from '../../../sun/Panel';
import geometricOptics from '../../geometricOptics';
import GOColors from '../GOColors';
import Optic from '../model/Optic';
import { type RaysType } from '../model/RaysType';
import VisibilityCheckboxGroup from './VisibilityCheckboxGroup';
import VisibleProperties from './VisibleProperties';
import optionize from '../../../phet-core/optionize';
import type PickRequired from '../../../phet-core/types/PickRequired';
import RaysSubpanel from './RaysSubpanel';
import OpticSubpanel from './OpticSubpanel';
import type PickOptional from '../../../phet-core/types/PickOptional';
import { type GOSimOptions } from '../../GOSim';
import EnumerationProperty from '../../../axon/EnumerationProperty';
import OpticalObjectChoice from '../model/OpticalObjectChoice';

type SelfOptions = PickRequired<GOSimOptions, 'isBasicsVersion'>;

type GOControlPanelOptions = SelfOptions & PickOptional<PanelOptions, 'bottom'> & PickRequired<PanelOptions, 'tandem'>;

export default class GOControlPanel extends Panel {

  /**
   * @param optic
   * @param raysTypeProperty - representation for rays
   * @param opticalObjectChoiceProperty
   * @param visibleProperties
   * @param providedOptions
   */
  public constructor(optic: Optic,
    raysTypeProperty: Property<RaysType>,
    opticalObjectChoiceProperty: EnumerationProperty<OpticalObjectChoice>,
    visibleProperties: VisibleProperties,
    providedOptions: GOControlPanelOptions) {

    const options = optionize<GOControlPanelOptions, SelfOptions, PanelOptions>()({

      // PanelOptions
      isDisposable: false,
      xMargin: 15,
      yMargin: 10,
      fill: GOColors.panelFillProperty,
      stroke: GOColors.panelStrokeProperty,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    }, providedOptions);

    const raysSubpanel = new RaysSubpanel(raysTypeProperty, options.tandem.createTandem('raysSubpanel'));

    const opticSubpanel = new OpticSubpanel(optic, options.tandem.createTandem('opticSubpanel'));

    const checkboxGroup = new VisibilityCheckboxGroup(visibleProperties, optic, opticalObjectChoiceProperty, {
      isBasicsVersion: options.isBasicsVersion,
      tandem: options.tandem.createTandem('checkboxGroup')
    });

    // Vertical separators between sections of the control panel
    const leftSeparator = new VSeparator({
      stroke: GOColors.panelSeparatorStrokeProperty
    });
    const rightSeparator = new VSeparator({
      stroke: GOColors.panelSeparatorStrokeProperty
    });

    const content = new HBox({
      children: [raysSubpanel, leftSeparator, opticSubpanel, rightSeparator, checkboxGroup],
      spacing: 15,
      align: 'center'
    });

    super(content, options);
  }
}

geometricOptics.register('GOControlPanel', GOControlPanel);