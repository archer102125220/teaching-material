// Copyright 2013-2024, University of Colorado Boulder

/**
 * This toggle button uses a boolean Property and a trueNode and falseNode to display its content.
 *
 * @author Sam Reid
 */

import Tandem from '../../tandem/Tandem';
import BooleanToggleNode from '../BooleanToggleNode';
import sun from '../sun';
import RoundToggleButton, { type RoundToggleButtonOptions } from './RoundToggleButton';
import { Node } from '../../scenery/imports';
import optionize, { type EmptySelfOptions } from '../../phet-core/optionize';
import type StrictOmit from '../../phet-core/types/StrictOmit';
import Property from '../../axon/Property';

type SelfOptions = EmptySelfOptions;

export type BooleanRoundToggleButtonOptions = SelfOptions & StrictOmit<RoundToggleButtonOptions, 'content'>;

class BooleanRoundToggleButton extends RoundToggleButton<boolean> {

  private readonly disposeBooleanRoundToggleButton: () => void;

  /**
   * @param booleanProperty
   * @param trueNode - shown when booleanProperty is true
   * @param falseNode - shown when booleanProperty is false
   * @param providedOptions?
   */
  public constructor(booleanProperty: Property<boolean>, trueNode: Node, falseNode: Node,
    providedOptions?: BooleanRoundToggleButtonOptions) {

    const options = optionize<BooleanRoundToggleButtonOptions, SelfOptions, RoundToggleButtonOptions>()({
      content: null,
      tandem: Tandem.REQUIRED,
      tandemNameSuffix: 'Button'
    }, providedOptions);

    const toggleNode = new BooleanToggleNode(booleanProperty, trueNode, falseNode, {
      tandem: options.tandem.createTandem('toggleNode')
    });
    options.content = toggleNode;

    super(booleanProperty, false, true, options);

    this.disposeBooleanRoundToggleButton = function () {
      toggleNode.dispose();
    };
  }

  public override dispose(): void {
    this.disposeBooleanRoundToggleButton();
    super.dispose();
  }
}

sun.register('BooleanRoundToggleButton', BooleanRoundToggleButton);
export default BooleanRoundToggleButton;