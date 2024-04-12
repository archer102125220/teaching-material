// Copyright 2018-2024, University of Colorado Boulder

/**
 * Convenience type for horizontal slider.
 * See https://github.com/phetsims/sun/issues/380
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Range from '@/utils/dot/Range';
import InstanceRegistry from '@/utils/phet-core/documentation/InstanceRegistry';
import Orientation from '@/utils/phet-core/Orientation';
import Slider, { type SliderOptions } from '@/utils/sun/Slider';
import sun from '@/utils/sun/sun';
import optionize, { type EmptySelfOptions } from '@/utils/phet-core/optionize';
import type StrictOmit from '@/utils/phet-core/types/StrictOmit';
import type PhetioProperty from '@/utils/axon/PhetioProperty';

type SelfOptions = EmptySelfOptions;

export type HSliderOptions = SelfOptions & StrictOmit<SliderOptions, 'orientation'>;

export default class HSlider extends Slider {

  public constructor(valueProperty: PhetioProperty<number>, range: Range, options?: HSliderOptions) {

    super(valueProperty, range, optionize<HSliderOptions, SelfOptions, SliderOptions>()({
      orientation: Orientation.HORIZONTAL
    }, options));

    // support for binder documentation, stripped out in builds and only runs when ?binder is specified
    window.assert && window.phet?.chipper?.queryParameters?.binder && InstanceRegistry.registerDataURL('sun', 'HSlider', this);
  }
}

sun.register('HSlider', HSlider);
