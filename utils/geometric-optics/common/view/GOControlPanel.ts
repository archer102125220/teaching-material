// Copyright 2021-2023, University of Colorado Boulder

/**
 * GOControlPanel is the main control panel for both screens.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Martin Veillette
 */

import Property from '@/utils/axon/Property';
import { HBox, VSeparator } from '@/utils/scenery/imports';
import Panel, { type PanelOptions } from '@/utils/sun/Panel';
import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import GOColors from '@/utils/geometric-optics/common/GOColors';
import Optic from '@/utils/geometric-optics/common/model/Optic';
import { type RaysType } from '@/utils/geometric-optics/common/model/RaysType';
import VisibilityCheckboxGroup from '@/utils/geometric-optics/common/view/VisibilityCheckboxGroup';
import VisibleProperties from '@/utils/geometric-optics/common/view/VisibleProperties';
import optionize from '@/utils/phet-core/optionize';
import type PickRequired from '@/utils/phet-core/types/PickRequired';
import RaysSubpanel from '@/utils/geometric-optics/common/view/RaysSubpanel';
import OpticSubpanel from '@/utils/geometric-optics/common/view/OpticSubpanel';
import type PickOptional from '@/utils/phet-core/types/PickOptional';
import { type GOSimOptions } from '@/utils/geometric-optics/GOSim';
import EnumerationProperty from '@/utils/axon/EnumerationProperty';
import OpticalObjectChoice from '@/utils/geometric-optics/common/model/OpticalObjectChoice';

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