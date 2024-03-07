// Copyright 2022-2023, University of Colorado Boulder

/**
 * VBox is a convenience specialization of FlowBox with vertical orientation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import optionize, { type EmptySelfOptions } from '../../../phet-core/optionize';
import type StrictOmit from '../../../phet-core/types/StrictOmit';
import { FlowBox, type FlowBoxOptions, scenery, Node, VSeparator } from '../../imports';

type SelfOptions = EmptySelfOptions;
export type VBoxOptions = StrictOmit<FlowBoxOptions, 'orientation'>;

export default class VBox extends FlowBox {
  public constructor(providedOptions?: VBoxOptions) {
    assert && assert(!providedOptions || !(providedOptions as FlowBoxOptions).orientation, 'VBox sets orientation');

    super(optionize<VBoxOptions, SelfOptions, FlowBoxOptions>()({
      orientation: 'vertical'
    }, providedOptions));
  }

  protected override onFlowBoxChildInserted(node: Node, index: number): void {
    assert && assert(!(node instanceof VSeparator), 'VSeparator should not be used in an VBox. Use HSeparator instead');

    super.onFlowBoxChildInserted(node, index);
  }

  public override mutate(options?: VBoxOptions): this {
    return super.mutate(options);
  }
}

scenery.register('VBox', VBox);
