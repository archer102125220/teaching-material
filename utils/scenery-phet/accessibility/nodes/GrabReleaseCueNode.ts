// Copyright 2018-2022, University of Colorado Boulder

/**
 * A Node that displays a visual queue to use space to grab and release a component.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import optionize from '@/utils/phet-core/optionize';
import { HBox, RichText } from '@/utils/scenery/imports';
import Panel, { type PanelOptions } from '@/utils/sun/Panel';
import TextKeyNode from '@/utils/scenery-phet/keyboard/TextKeyNode';
import PhetFont from '@/utils/scenery-phet/PhetFont';
import sceneryPhet from '@/utils/scenery-phet/sceneryPhet';
import SceneryPhetStrings from '@/utils/scenery-phet/SceneryPhetStrings';

type SelfOptions = {

  // properties of the space key
  spaceKeyWidth?: number;
  keyHeight?: number;
};
export type GrabReleaseCueNodeOptions = SelfOptions & PanelOptions;

export default class GrabReleaseCueNode extends Panel {

  public constructor(providedOptions?: GrabReleaseCueNodeOptions) {

    const options = optionize<GrabReleaseCueNodeOptions, SelfOptions, PanelOptions>()({

      // SelfOptions
      spaceKeyWidth: 50, // this space key is wider than default space key
      keyHeight: 24, // height of the space key, larger than default KeyNode height

      // PanelOptions
      fill: 'white',
      stroke: 'black',
      xMargin: 15,
      yMargin: 5,
      cornerRadius: 0
    }, providedOptions);


    // Create the help content for the space key to pick up the draggable item
    const spaceKeyNode = TextKeyNode.space({
      keyHeight: options.keyHeight,
      minKeyWidth: options.spaceKeyWidth
    });
    const spaceLabelText = new RichText(SceneryPhetStrings.key.toGrabOrReleaseStringProperty, {
      maxWidth: 200,
      font: new PhetFont(12)
    });
    const spaceKeyHBox = new HBox({
      children: [spaceKeyNode, spaceLabelText],
      spacing: 10
    });

    // rectangle containing the content, not visible until focused the first time
    super(spaceKeyHBox, options);
  }
}

sceneryPhet.register('GrabReleaseCueNode', GrabReleaseCueNode);