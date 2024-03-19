// Copyright 2019-2023, University of Colorado Boulder

/**
 * OopsDialog is displayed when some limitation of the simulation is encountered.
 * So named because the messages typically begin with 'Oops!', so that's how people referred to it.
 * See https://github.com/phetsims/equality-explorer/issues/48
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { type EmptySelfOptions } from '@/utils/phet-core/optionize';
import type StrictOmit from '@/utils/phet-core/types/StrictOmit';
import { HBox, Image, Node, RichText, type RichTextOptions } from '@/utils/scenery/imports';
import Dialog, { type DialogOptions } from '@/utils/sun/Dialog';
import IOType from '@/utils/tandem/types/IOType';
import phetGirlWaggingFinger_png from '@/assets/images/scenery-phet/phetGirlWaggingFinger_png';
import PhetFont from '@/utils/scenery-phet/PhetFont';
import sceneryPhet from '@/utils/scenery-phet/sceneryPhet';
import ReadOnlyProperty from '@/utils/axon/ReadOnlyProperty';

type SelfOptions = {

  // Optional icon that will be placed to the right of the image.
  // If not provided, then a PhET Girl image is used.
  // If provided, the caller is responsible for all aspects of the icon, including scale.
  iconNode?: Node;

  // Passed to RichText node that displays messageString
  richTextOptions?: RichTextOptions;
};

export type OopsDialogOptions = SelfOptions & DialogOptions;

export default class OopsDialog extends Dialog {

  private readonly disposeOopsDialog: () => void;

  /**
   * @param messageString - supports RichText formatting
   * @param [providedOptions]
   */
  public constructor(messageString: string | ReadOnlyProperty<string>, providedOptions?: OopsDialogOptions) {

    const options = optionize<OopsDialogOptions, StrictOmit<SelfOptions, 'iconNode' | 'richTextOptions'>, DialogOptions>()({

      // DialogOptions
      topMargin: 20,
      bottomMargin: 20,

      // phet-io
      phetioType: OopsDialog.OopsDialogIO
    }, providedOptions);

    const text = new RichText(messageString, optionize<RichTextOptions, EmptySelfOptions, RichTextOptions>()({
      font: new PhetFont(20),
      maxWidth: 600,
      maxHeight: 400
    }, options.richTextOptions));

    const iconNode = options.iconNode || new Image(phetGirlWaggingFinger_png, {
      maxHeight: 132 // determined empirically
    });

    const content = new HBox({
      spacing: 20,
      children: [text, iconNode]
    });

    super(content, options);

    this.disposeOopsDialog = () => {
      text.dispose();
    };

    if (typeof messageString !== 'string') {
      this.addLinkedElement(messageString);
    }
  }

  public override dispose(): void {
    this.disposeOopsDialog();
    super.dispose();
  }

  public static readonly OopsDialogIO = new IOType('OopsDialogIO', {
    valueType: OopsDialog,
    supertype: Dialog.DialogIO
  });
}

sceneryPhet.register('OopsDialog', OopsDialog);