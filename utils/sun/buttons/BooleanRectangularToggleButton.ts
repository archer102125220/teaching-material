// Copyright 2013-2024, University of Colorado Boulder

/**
 * This toggle button uses a boolean Property and a trueNode and falseNode to display its content.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import Tandem from '../../tandem/Tandem';
import BooleanToggleNode from '../BooleanToggleNode';
import sun from '../sun';
import RectangularToggleButton, { type RectangularToggleButtonOptions } from './RectangularToggleButton';
import { Node } from '../../scenery/imports';
import optionize, { type EmptySelfOptions } from '../../phet-core/optionize';
import type StrictOmit from '../../phet-core/types/StrictOmit';
import Property from '../../axon/Property';

type SelfOptions = EmptySelfOptions;

export type BooleanRectangularToggleButtonOptions = SelfOptions & StrictOmit<RectangularToggleButtonOptions, 'content'>;

export default class BooleanRectangularToggleButton extends RectangularToggleButton<boolean> {

  private readonly disposeBooleanRectangularToggleButton: () => void;

  /**
   * @param booleanProperty
   * @param trueNode - shown when booleanProperty is true
   * @param falseNode - shown when booleanProperty is false
   * @param providedOptions?
   */
  public constructor(booleanProperty: Property<boolean>, trueNode: Node, falseNode: Node,
    providedOptions?: BooleanRectangularToggleButtonOptions) {

    const content = new BooleanToggleNode(booleanProperty, trueNode, falseNode);

    const options = optionize<BooleanRectangularToggleButtonOptions, SelfOptions, RectangularToggleButtonOptions>()({
      content: content,
      tandem: Tandem.REQUIRED,
      tandemNameSuffix: 'Button'
    }, providedOptions);

    super(booleanProperty, false, true, options);

    this.disposeBooleanRectangularToggleButton = () => {
      content.dispose();
    };
  }

  public override dispose(): void {
    this.disposeBooleanRectangularToggleButton();
    super.dispose();
  }
}

sun.register('BooleanRectangularToggleButton', BooleanRectangularToggleButton);
