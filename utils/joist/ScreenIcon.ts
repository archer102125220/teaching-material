// Copyright 2015-2023, University of Colorado Boulder

/**
 * ScreenIcon is an icon that is suitable for one of the screen-selection buttons on the home screen or navigation bar.
 * By default, the size is optimized for the home screen.
 * To optimize for the navigation bar, use options.size: Screen.MINIMUM_NAVBAR_ICON_SIZE
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '@/utils/phet-core/optionize';
import { Node, type NodeOptions, Rectangle, type TColor } from '@/utils/scenery/imports';
import joist from '@/utils/joist/joist';
import Screen from '@/utils/joist/Screen';
import Dimension2 from '@/utils/dot/Dimension2';
import type StrictOmit from '@/utils/phet-core/types/StrictOmit';

console.log('joist/ScreenIcon.ts');

type SelfOptions = {
  size?: Dimension2; // size of the background
  maxIconWidthProportion?: number; // max proportion of the background width occupied by iconNode, (0,1]
  maxIconHeightProportion?: number; // max proportion of the background height occupied by iconNode, (0,1]
  fill?: TColor; // {Color|string} background fill
  stroke?: TColor; // {Color|string} background stroke
};

export type ScreenIconOptions = SelfOptions & StrictOmit<NodeOptions, 'children'>;

export default class ScreenIcon extends Node {

  private readonly disposeScreenIcon: () => void;

  public constructor(iconNode: Node, providedOptions?: ScreenIconOptions) {
    console.log('ScreenIcon.constructor');

    const options = optionize<ScreenIconOptions, SelfOptions, NodeOptions>()({

      // SelfOptions
      size: Screen.MINIMUM_HOME_SCREEN_ICON_SIZE,
      maxIconWidthProportion: 0.85,
      maxIconHeightProportion: 0.85,
      fill: 'white',
      stroke: null
    }, providedOptions);

    window.assert && window.assert(options.maxIconWidthProportion > 0 && options.maxIconWidthProportion <= 1);
    window.assert && window.assert(options.maxIconHeightProportion > 0 && options.maxIconHeightProportion <= 1);

    const background = new Rectangle(0, 0, options.size.width, options.size.height, {
      fill: options.fill,
      stroke: options.stroke
    });

    iconNode.pickable = false;

    // iconNode may have a dynamic size - for example, if it involves a string Property.
    // So if it's size changes, adjust its scale and re-center.
    const localBoundsListener = () => {
      iconNode.setScaleMagnitude(1);
      iconNode.setScaleMagnitude(Math.min(
        options.maxIconWidthProportion * background.width / iconNode.width,
        options.maxIconHeightProportion * background.height / iconNode.height
      ));
      iconNode.center = background.center;
    };
    iconNode.localBoundsProperty.link(localBoundsListener);

    options.children = [background, iconNode];

    super(options);

    this.disposeScreenIcon = () => {
      if (iconNode.localBoundsProperty.hasListener(localBoundsListener)) {
        iconNode.localBoundsProperty.unlink(localBoundsListener);
      }
    };
  }

  public override dispose(): void {
    this.disposeScreenIcon();
    super.dispose();
  }
}

joist.register('ScreenIcon', ScreenIcon);