// Copyright 2018-2023, University of Colorado Boulder

/**
 * Shows one node if the property is true or another node if the property is false. Used to indicate boolean state.
 * This is a convenience API for true/false nodes, see SelectedNode for the general case.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import sun from '@/utils/sun/sun';
import ToggleNode, { type ToggleNodeOptions } from '@/utils/sun/ToggleNode';
import { Node } from '@/utils/scenery/imports';
import type TProperty from '@/utils/axon/TProperty';
import { type EmptySelfOptions } from '@/utils/phet-core/optionize';

type SelfOptions = EmptySelfOptions;

export type BooleanToggleNodeOptions = SelfOptions & ToggleNodeOptions;

export default class BooleanToggleNode extends ToggleNode<boolean> {

  /**
   * @param booleanProperty
   * @param trueNode - shown when booleanProperty is true
   * @param falseNode - shown when booleanProperty is false
   * @param providedOptions?
   */
  public constructor(booleanProperty: TProperty<boolean>,
    trueNode: Node,
    falseNode: Node,
    providedOptions?: BooleanToggleNodeOptions) {
    super(booleanProperty, [
      { value: true, createNode: () => trueNode },
      { value: false, createNode: () => falseNode }
    ], providedOptions);
  }
}

sun.register('BooleanToggleNode', BooleanToggleNode);
