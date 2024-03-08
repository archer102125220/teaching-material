// Copyright 2020-2022, University of Colorado Boulder

/**
 * A ZoomButtonGroup that shows magnifying glass icons on the buttons
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import NumberProperty from '../axon/NumberProperty';
import type StrictOmit from '../phet-core/types/StrictOmit';
import Dimension2 from '../dot/Dimension2';
import MagnifyingGlassNode, { type MagnifyingGlassNodeOptions } from './MagnifyingGlassNode';
import MinusNode from './MinusNode';
import PhetColorScheme from './PhetColorScheme';
import PlusNode from './PlusNode';
import sceneryPhet from './sceneryPhet';
import ZoomButtonGroup, { type ZoomButtonGroupOptions } from './ZoomButtonGroup';
import optionize, { combineOptions } from '../phet-core/optionize';

type SelfOptions = {

  // options propagated to MagnifyingGlassNode
  magnifyingGlassNodeOptions?: StrictOmit<MagnifyingGlassNodeOptions, 'icon'>;
};

export type MagnifyingGlassZoomButtonGroupOptions = SelfOptions & ZoomButtonGroupOptions;

export default class MagnifyingGlassZoomButtonGroup extends ZoomButtonGroup {

  /**
   * @param zoomLevelProperty - smaller value means more zoomed out
   * @param providedOptions
   */
  public constructor(zoomLevelProperty: NumberProperty, providedOptions?: MagnifyingGlassZoomButtonGroupOptions) {

    const options = optionize<MagnifyingGlassZoomButtonGroupOptions, SelfOptions, ZoomButtonGroupOptions>()({

      // SelfOptions
      magnifyingGlassNodeOptions: {
        glassRadius: 15 // like ZoomButton
      },

      // ZoomButtonGroupOptions
      buttonOptions: {
        baseColor: PhetColorScheme.BUTTON_YELLOW // like ZoomButton
      }
    }, providedOptions);

    const magnifyingGlassRadius = options.magnifyingGlassNodeOptions.glassRadius!;

    // options for '+' and '-' signs
    const signOptions = {
      size: new Dimension2(1.3 * magnifyingGlassRadius, magnifyingGlassRadius / 3)
    };

    // magnifying glass with '+'
    const zoomInIcon = new MagnifyingGlassNode(combineOptions<MagnifyingGlassNodeOptions>({
      icon: new PlusNode(signOptions)
    }, options.magnifyingGlassNodeOptions));

    // magnifying glass with '-'
    const zoomOutIcon = new MagnifyingGlassNode(combineOptions<MagnifyingGlassNodeOptions>({
      icon: new MinusNode(signOptions)
    }, options.magnifyingGlassNodeOptions));

    super(zoomLevelProperty, zoomInIcon, zoomOutIcon, options);
  }
}

sceneryPhet.register('MagnifyingGlassZoomButtonGroup', MagnifyingGlassZoomButtonGroup);