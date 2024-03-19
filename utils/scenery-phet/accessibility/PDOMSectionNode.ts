// Copyright 2017-2022, University of Colorado Boulder

/**
 * A container type for content in the PDOM for screen reader accessibility. The container is a Node
 * (Scenery display object), so its children will be other Nodes that may or may not have accessible content.
 * The accessible content is a 'section' element under the an 'H2' label.  Children are contained under a 'div'
 * element, and labels will come before the accessible content of the children.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';
import optionize, { type EmptySelfOptions } from '@/utils/phet-core/optionize';
import type StrictOmit from '@/utils/phet-core/types/StrictOmit';
import { Node, type NodeOptions } from '@/utils/scenery/imports';
import sceneryPhet from '@/utils/scenery-phet/sceneryPhet';

type SelfOptions = EmptySelfOptions;
export type PDOMSectionNodeOptions = SelfOptions &
  StrictOmit<NodeOptions, 'containerTagName' | 'tagName' | 'labelContent' | 'labelTagName'>;

export default class PDOMSectionNode extends Node {

  public constructor(labelStringProperty: TReadOnlyProperty<string>, providedOptions?: PDOMSectionNodeOptions) {
    super(optionize<PDOMSectionNodeOptions, SelfOptions, NodeOptions>()({

      // accessibility options controlled by PDOMSectionNode
      containerTagName: 'section',
      tagName: 'div',
      labelContent: labelStringProperty,
      labelTagName: 'h2'
    }, providedOptions));
  }
}

sceneryPhet.register('PDOMSectionNode', PDOMSectionNode);