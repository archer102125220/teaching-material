// Copyright 2014-2022, University of Colorado Boulder

/**
 * A DerivedProperty that maps PushButtonModel states to the states needed by the button view.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import { DerivedProperty4, type DerivedPropertyOptions } from '@/utils/axon/DerivedProperty';
import { type EmptySelfOptions } from '@/utils/phet-core/optionize';
import sun from '@/utils/sun/sun';
import ButtonInteractionState from '@/utils/sun/buttons/ButtonInteractionState';
import PushButtonModel from '@/utils/sun/buttons/PushButtonModel';

type SelfOptions = EmptySelfOptions;

export type PushButtonInteractionStatePropertyOptions = SelfOptions & DerivedPropertyOptions<ButtonInteractionState>;

export default class PushButtonInteractionStateProperty extends DerivedProperty4<ButtonInteractionState, boolean, boolean, boolean, boolean> {
  public constructor(buttonModel: PushButtonModel) {
    super(
      [buttonModel.focusedProperty, buttonModel.overProperty, buttonModel.looksOverProperty, buttonModel.looksPressedProperty],
      (focused, over, looksOver, looksPressed) => {
        return looksOver && !looksPressed ? ButtonInteractionState.OVER :
          (over || focused) && looksPressed ? ButtonInteractionState.PRESSED :
            ButtonInteractionState.IDLE;
      },
      { valueType: ButtonInteractionState }
    );
  }
}

sun.register('PushButtonInteractionStateProperty', PushButtonInteractionStateProperty);