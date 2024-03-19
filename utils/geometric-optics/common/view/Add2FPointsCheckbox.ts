// Copyright 2022, University of Colorado Boulder

/**
 * Add2FPointsCheckbox is the "Add 2F Points checkbox" checkbox that appears in the Preferences dialog.
 * The name should technically be Add2FPointsCheckboxCheckbox, but that confused everyone who saw it.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '@/utils/axon/Property';
import PreferencesDialog from '@/utils/joist/preferences/PreferencesDialog';
import optionize, { type EmptySelfOptions } from '@/utils/phet-core/optionize';
import type PickRequired from '@/utils/phet-core/types/PickRequired';
import { Text } from '@/utils/scenery/imports';
import Checkbox, { type CheckboxOptions } from '@/utils/sun/Checkbox';
import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import GeometricOpticsStrings from '@/utils/geometric-optics/GeometricOpticsStrings';
import GOConstants from '@/utils/geometric-optics/common/GOConstants';

type SelfOptions = EmptySelfOptions;

type Add2FPointsCheckboxOptions = SelfOptions & PickRequired<CheckboxOptions, 'tandem'>;

export default class Add2FPointsCheckbox extends Checkbox {

  private readonly disposeAdd2FPointsCheckbox: () => void;

  public constructor(add2FPointsCheckboxProperty: Property<boolean>, providedOptions: Add2FPointsCheckboxOptions) {

    const options = optionize<Add2FPointsCheckboxOptions, SelfOptions, CheckboxOptions>()({
      boxWidth: GOConstants.CHECKBOX_BOX_WIDTH
    }, providedOptions);

    const labelText = new Text(GeometricOpticsStrings.checkbox.add2FPointsCheckboxStringProperty, {
      font: PreferencesDialog.CONTENT_FONT,
      maxWidth: 500,
      tandem: options.tandem.createTandem('labelText')
    });

    super(add2FPointsCheckboxProperty, labelText, options);

    this.disposeAdd2FPointsCheckbox = () => {
      labelText.dispose();
    };
  }

  public override dispose(): void {
    super.dispose();
    this.disposeAdd2FPointsCheckbox();
  }
}

geometricOptics.register('Add2FPointsCheckbox', Add2FPointsCheckbox);