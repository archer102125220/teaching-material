// Copyright 2014-2022, University of Colorado Boulder

/**
 * A round toggle button that toggles the value of a boolean Property.
 *
 * @author John Blanco (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import type TProperty from '@/utils/axon/TProperty.js';
import { type EmptySelfOptions } from '@/utils/phet-core/optionize.js';
import sun from '@/utils/sun/sun.js';
import RoundStickyToggleButton, { type RoundStickyToggleButtonOptions } from '@/utils/sun/buttons/RoundStickyToggleButton.js';

type SelfOptions = EmptySelfOptions;

export type BooleanRoundStickyToggleButtonOptions = SelfOptions & RoundStickyToggleButtonOptions;

export default class BooleanRoundStickyToggleButton extends RoundStickyToggleButton<boolean> {
  public constructor(booleanProperty: TProperty<boolean>, providedOptions?: BooleanRoundStickyToggleButtonOptions) {
    super(booleanProperty, false, true, providedOptions);
  }
}

sun.register('BooleanRoundStickyToggleButton', BooleanRoundStickyToggleButton);