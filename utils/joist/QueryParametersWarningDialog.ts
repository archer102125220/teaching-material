// Copyright 2020-2022, University of Colorado Boulder

/**
 * Message dialog displayed when any public query parameters have invalid values, see https://github.com/phetsims/joist/issues/593
 *
 * @author Chris Klusendorf (PhET Interactive Simulations)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { type EmptySelfOptions } from '../phet-core/optionize';
import OopsDialog, { type OopsDialogOptions } from '../scenery-phet/OopsDialog';
import PhetFont from '../scenery-phet/PhetFont';
import { Text } from '../scenery/imports';
import joist from './joist';
import JoistStrings from './JoistStrings';

type SelfOptions = EmptySelfOptions;
export type QueryParametersWarningDialogOptions = SelfOptions & OopsDialogOptions;

class QueryParametersWarningDialog extends OopsDialog {

  /**
   * @param warnings - see QueryStringMachine.warnings
   * @param [providedOptions]
   */
  public constructor(
    // See phet-types.d.ts
    warnings: Warning[], // eslint-disable-line no-undef
    providedOptions?: QueryParametersWarningDialogOptions) {

    window.assert && window.assert(warnings.length > 0, `expected 1 or more warnings: ${warnings.length}`);

    const options = optionize<QueryParametersWarningDialogOptions, SelfOptions, OopsDialogOptions>()({

      // OopsDialogOptions
      richTextOptions: {
        font: new PhetFont(16)
      },
      title: new Text(JoistStrings.queryParametersWarningDialog.invalidQueryParametersStringProperty, {
        font: new PhetFont(28)
      })

    }, providedOptions);

    // add warnings to generic message
    let message = `${JoistStrings.queryParametersWarningDialog.oneOrMoreQueryParametersStringProperty.value}<br><br>`;
    warnings.forEach(warning => {
      message += `${warning.key}=${warning.value}<br>`;
    });
    message += `<br>${JoistStrings.queryParametersWarningDialog.theSimulationWillStartStringProperty.value}`;

    super(message, options);
  }
}

joist.register('QueryParametersWarningDialog', QueryParametersWarningDialog);
export default QueryParametersWarningDialog;