// Copyright 2021-2023, University of Colorado Boulder

/**
 * Base type for a line-divider (when put in a layout container, it will be hidden if it is before/after all visible
 * components, or if it's after another a divider in the visible order).
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import optionize, { type EmptySelfOptions } from '../../../phet-core/optionize';
import type StrictOmit from '../../../phet-core/types/StrictOmit';
import { Line, type LineOptions, scenery } from '../../imports';

type SelfOptions = EmptySelfOptions;

// Separators are automatically shown/hidden and hence should not be instrumented for PhET-iO control.
export type SeparatorOptions = SelfOptions & StrictOmit<LineOptions, 'tandem'>;

export const DEFAULT_SEPARATOR_LAYOUT_OPTIONS = {
  stretch: true,
  isSeparator: true
};

export default class Separator extends Line {
  public constructor(providedOptions?: SeparatorOptions) {
    super(optionize<SeparatorOptions, SelfOptions, LineOptions>()({
      layoutOptions: DEFAULT_SEPARATOR_LAYOUT_OPTIONS,

      // dark gray
      stroke: 'rgb(100,100,100)'
    }, providedOptions));
  }
}

scenery.register('Separator', Separator);
