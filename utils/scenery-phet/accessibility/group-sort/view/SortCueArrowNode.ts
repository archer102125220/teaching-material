// Copyright 2024, University of Colorado Boulder

/**
 * Creates a double-headed, dashed arrow used to cue sorting in the "group sort" interaction.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
import _ from 'lodash';

import { HBox, type HBoxOptions, Node, Rectangle } from '@/utils/scenery/imports';
import TriangleNode, { type TriangleNodeOptions } from '@/utils/scenery-phet/TriangleNode';
import optionize, { combineOptions } from '@/utils/phet-core/optionize';
import type StrictOmit from '@/utils/phet-core/types/StrictOmit';
import sceneryPhet from '@/utils/scenery-phet/sceneryPhet';

type SelfOptions = {
  numberOfDashes: number;
  doubleHead: boolean;
  dashHeight?: number;
  dashWidth?: number;
  triangleNodeOptions?: TriangleNodeOptions;
};

type SortCueArrowNodeOptions = SelfOptions & StrictOmit<HBoxOptions, 'children'>;

export default class SortCueArrowNode extends HBox {

  public constructor(providedOptions: SortCueArrowNodeOptions) {

    const options = optionize<SortCueArrowNodeOptions, SelfOptions, HBoxOptions>()({
      dashHeight: 2,
      dashWidth: 2,
      triangleNodeOptions: {},

      isDisposable: false
    }, providedOptions);

    const createArrowHead = (pointDirection: 'right' | 'left') => {

      const triangleNodeOptions = combineOptions<TriangleNodeOptions>({
        pointDirection,
        triangleWidth: 6,
        triangleHeight: 5,
        fill: 'black'
      }, options.triangleNodeOptions);

      return new TriangleNode(triangleNodeOptions);
    };

    const dashes: Node[] = [];

    _.times(options.numberOfDashes, () => {
      dashes.push(new Rectangle(0, 0, options.dashWidth, options.dashHeight, { fill: 'black' }));
    });

    const superOptions = combineOptions<HBoxOptions>({
      children: [
        ...(options.doubleHead ? [createArrowHead('left')] : []),
        ...dashes,
        createArrowHead('right')
      ],
      spacing: 2
    }, providedOptions);

    super(superOptions);
  }
}

sceneryPhet.register('SortCueArrowNode', SortCueArrowNode);