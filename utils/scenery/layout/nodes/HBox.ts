// Copyright 2022-2023, University of Colorado Boulder

/**
 * HBox is a convenience specialization of FlowBox with horizontal orientation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import optionize, { type EmptySelfOptions } from '../../../phet-core/optionize';
import type StrictOmit from '../../../phet-core/types/StrictOmit';
import { FlowBox, type FlowBoxOptions, scenery, Node, HSeparator } from '../../imports';

type SelfOptions = EmptySelfOptions;
export type HBoxOptions = StrictOmit<FlowBoxOptions, 'orientation'>;

export default class HBox extends FlowBox {
  public constructor(providedOptions?: HBoxOptions) {
    window.assert && window.assert(!providedOptions || !(providedOptions as FlowBoxOptions).orientation, 'HBox sets orientation');

    super(optionize<HBoxOptions, SelfOptions, FlowBoxOptions>()({
      orientation: 'horizontal'
    }, providedOptions));
  }

  protected override onFlowBoxChildInserted(node: Node, index: number): void {
    window.assert && window.assert(!(node instanceof HSeparator), 'HSeparator should not be used in an HBox. Use VSeparator instead');

    super.onFlowBoxChildInserted(node, index);
  }

  public override mutate(options?: HBoxOptions): this {
    return super.mutate(options);
  }
}

scenery.register('HBox', HBox);
