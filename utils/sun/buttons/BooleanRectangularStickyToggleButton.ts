// Copyright 2014-2022, University of Colorado Boulder

/**
 * A rectangular toggle button that switches the value of a boolean Property.  It sticks in the down position when
 * pressed, popping back up when pressed again.
 *
 * This class inherits from the more general RectangularStickyToggleButton, which can take any values.
 *
 * @author John Blanco (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import type TProperty from '@/utils/axon/TProperty';
import { type EmptySelfOptions } from '@/utils/phet-core/optionize';
import sun from '@/utils/sun/sun';
import RectangularStickyToggleButton, { type RectangularStickyToggleButtonOptions } from '@/utils/sun/buttons/RectangularStickyToggleButton';

type SelfOptions = EmptySelfOptions;

export type BooleanRectangularStickyToggleButtonOptions = SelfOptions & RectangularStickyToggleButtonOptions;

export default class BooleanRectangularStickyToggleButton extends RectangularStickyToggleButton<boolean> {
  public constructor(booleanProperty: TProperty<boolean>, providedOptions?: BooleanRectangularStickyToggleButtonOptions) {
    super(booleanProperty, false, true, providedOptions);
  }
}

sun.register('BooleanRectangularStickyToggleButton', BooleanRectangularStickyToggleButton);