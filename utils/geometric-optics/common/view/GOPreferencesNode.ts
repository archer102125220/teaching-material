// Copyright 2021-2023, University of Colorado Boulder

/**
 * GOPreferencesNode is the user interface for sim-specific preferences, accessed via the Preferences dialog.
 * These preferences are global, and affect all screens.
 *
 * The Preferences dialog is created on demand by joist, using a PhetioCapsule. So GOPreferencesNode and its
 * subcomponents must implement dispose.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { VBox, type VBoxOptions } from '@/utils/scenery/imports';
import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import optionize from '@/utils/phet-core/optionize';
import FocalLengthModelTypeControl from '@/utils/geometric-optics/common/view/FocalLengthModelTypeControl';
import GOPreferences from '@/utils/geometric-optics/common/model/GOPreferences';
import type PickRequired from '@/utils/phet-core/types/PickRequired';
import { type GOSimOptions } from '@/utils/geometric-optics/GOSim';
import Add2FPointsCheckbox from '@/utils/geometric-optics/common/view/Add2FPointsCheckbox';

type SelfOptions = PickRequired<GOSimOptions, 'isBasicsVersion'>;

type GOPreferencesNodeOptions = SelfOptions & PickRequired<VBoxOptions, 'tandem'>;

export default class GOPreferencesNode extends VBox {

  public constructor(providedOptions: GOPreferencesNodeOptions) {

    const options = optionize<GOPreferencesNodeOptions, SelfOptions, VBoxOptions>()({

      // VBoxOptions
      align: 'left',
      spacing: 20,
      phetioVisiblePropertyInstrumented: false
    }, providedOptions);

    super(options);

    // 'Add "2F Points" checkbox' checkbox
    // The name should technically be add2FPointsCheckboxCheckbox, but that confused everyone who saw it.
    const add2FPointsCheckbox = new Add2FPointsCheckbox(GOPreferences.add2FPointsCheckboxProperty, {
      tandem: options.tandem.createTandem('add2FPointsCheckbox')
    });

    // 'Focal Length control' radio buttons
    const focalLengthModelTypeControl = new FocalLengthModelTypeControl(GOPreferences.focalLengthModelTypeProperty, {
      tandem: options.tandem.createTandem('focalLengthModelTypeControl')
    });

    this.children = [add2FPointsCheckbox, focalLengthModelTypeControl];
  }

}

geometricOptics.register('GOPreferencesNode', GOPreferencesNode);