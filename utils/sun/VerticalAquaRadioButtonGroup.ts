// Copyright 2013-2023, University of Colorado Boulder

/**
 * VerticalAquaRadioButtonGroup is a convenience class for creating a vertical AquaRadioButtonGroup.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import type StrictOmit from '../phet-core/types/StrictOmit';
import optionize, { type EmptySelfOptions } from '../phet-core/optionize';
import AquaRadioButtonGroup, { type AquaRadioButtonGroupItem, type AquaRadioButtonGroupOptions } from './AquaRadioButtonGroup';
import sun from './sun';
import type PhetioProperty from '../axon/PhetioProperty';

type SelfOptions = EmptySelfOptions;

export type VerticalAquaRadioButtonGroupOptions = SelfOptions & StrictOmit<AquaRadioButtonGroupOptions, 'orientation'>;

export default class VerticalAquaRadioButtonGroup<T> extends AquaRadioButtonGroup<T> {

  public constructor(property: PhetioProperty<T>, items: AquaRadioButtonGroupItem<T>[], options?: VerticalAquaRadioButtonGroupOptions) {
    super(property, items, optionize<VerticalAquaRadioButtonGroupOptions, SelfOptions, AquaRadioButtonGroupOptions>()({
      orientation: 'vertical',
      align: 'left'
    }, options));
  }
}

sun.register('VerticalAquaRadioButtonGroup', VerticalAquaRadioButtonGroup);