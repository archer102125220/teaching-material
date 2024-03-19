// Copyright 2022-2023, University of Colorado Boulder

/**
 * RaysSubpanel is a subpanel of the main control panel. It has a 'Rays' title above a set of vertical radio buttons.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Martin Veillette
 */

import Property from '@/utils/axon/Property';
import { Text, VBox } from '@/utils/scenery/imports';
import Tandem from '@/utils/tandem/Tandem';
import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import GeometricOpticsStrings from '@/utils/geometric-optics/GeometricOpticsStrings';
import GOConstants from '@/utils/geometric-optics/common/GOConstants';
import { type RaysType } from '@/utils/geometric-optics/common/model/RaysType';
import RaysRadioButtonGroup from '@/utils/geometric-optics/common/view/RaysRadioButtonGroup';

export default class RaysSubpanel extends VBox {

  /**
   * @param raysTypeProperty - representation used for rays
   * @param tandem
   */
  public constructor(raysTypeProperty: Property<RaysType>, tandem: Tandem) {

    // title
    const titleText = new Text(GeometricOpticsStrings.raysStringProperty, {
      font: GOConstants.TITLE_FONT,
      maxWidth: 90,
      tandem: tandem.createTandem('titleText')
    });

    // radio buttons
    const raysRadioButtonGroup = new RaysRadioButtonGroup(raysTypeProperty, {
      tandem: tandem.createTandem('raysRadioButtonGroup')
    });

    // title + radio buttons
    super({

      // VBox options
      children: [titleText, raysRadioButtonGroup],
      align: 'left',
      spacing: 4,
      visiblePropertyOptions: {
        phetioFeatured: true
      },
      tandem
    });
  }
}

geometricOptics.register('RaysSubpanel', RaysSubpanel);