// Copyright 2019-2022, University of Colorado Boulder

/**
 * A sound generator that plays sounds each time a property changes to a new value.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import Property from '@/utils/axon/Property';
import tambo from '@/utils/tambo/tambo';
import MultiClip, { type MultiClipOptions } from '@/utils/tambo/sound-generators/MultiClip';
import WrappedAudioBuffer from '@/utils/tambo/WrappedAudioBuffer';
import optionize from '@/utils/phet-core/optionize';

type SelfOptions = {

  // Controls whether the linkage to the property is "lazy", meaning that the first sound isn't played until a
  // change of value occurs.  If set to false, this will attempt to play a sound when the link is initially set up.
  linkLazily?: boolean;
};

export type PropertyMultiClipOptions = SelfOptions & MultiClipOptions;

class PropertyMultiClip<T> extends MultiClip<T> {

  private readonly disposePropertyMultiClip: () => void;

  /**
   * @param property - the property for which sounds are played on value changes
   * @param valueToSoundMap - a map of values to WrappedAudioBuffer objects that is used to define the association
   *                          between values and sounds.
   * @param [providedOptions]
   */
  public constructor(property: Property<T>, valueToSoundMap: Map<T, WrappedAudioBuffer>, providedOptions?: PropertyMultiClipOptions) {

    const options = optionize<PropertyMultiClipOptions, SelfOptions, MultiClipOptions>()({
      linkLazily: true
    }, providedOptions);

    super(valueToSoundMap, options);

    const playSoundForValue = (value: T) => { this.playAssociatedSound(value); };

    if (options.linkLazily) {
      property.lazyLink(playSoundForValue);
    }
    else {
      property.link(playSoundForValue);
    }

    // dispose function
    this.disposePropertyMultiClip = () => { property.unlink(playSoundForValue); };
  }

  /**
   * dispose function
   */
  public override dispose(): void {
    this.disposePropertyMultiClip();
  }
}

tambo.register('PropertyMultiClip', PropertyMultiClip);

export default PropertyMultiClip;