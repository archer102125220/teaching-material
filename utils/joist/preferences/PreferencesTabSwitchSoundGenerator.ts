// Copyright 2022-2024, University of Colorado Boulder

/**
 * @author John Blanco (PhET Interactive Simulations)
 */
import Disposable from '../../axon/Disposable';
import EnumerationProperty from '../../axon/EnumerationProperty';
import SoundClip, { type SoundClipOptions } from '../../tambo/sound-generators/SoundClip';
import cardFlip_mp3 from '@/assets/sounds/joist/cardFlip_mp3';
import joist from '../joist';
import PreferencesType from './PreferencesType';

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
