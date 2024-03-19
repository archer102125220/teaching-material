// Copyright 2022-2024, University of Colorado Boulder

/**
 * @author John Blanco (PhET Interactive Simulations)
 */
import Disposable from '@/utils/axon/Disposable';
import EnumerationProperty from '@/utils/axon/EnumerationProperty';
import SoundClip, { type SoundClipOptions } from '@/utils/tambo/sound-generators/SoundClip';
import cardFlip_mp3 from '@/assets/sounds/joist/cardFlip_mp3';
import joist from '@/utils/joist/joist';
import PreferencesType from '@/utils/joist/preferences/PreferencesType';

class PreferencesTabSwitchSoundGenerator extends SoundClip {

  public constructor(selectedTabProperty: EnumerationProperty<PreferencesType>, options: SoundClipOptions) {

    super(cardFlip_mp3, options);

    const playSound = () => { this.play(); };

    selectedTabProperty.lazyLink(playSound);
  }

  public override dispose(): void {
    Disposable.assertNotDisposable();
  }
}

joist.register('PreferencesTabSwitchSoundGenerator', PreferencesTabSwitchSoundGenerator);
export default PreferencesTabSwitchSoundGenerator;
