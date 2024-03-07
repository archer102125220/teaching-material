// Copyright 2022-2023, University of Colorado Boulder

/**
 * GOSim is the subclass of Sim used by both geometric-optics and geometric-optics-basics.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Sim, { SimOptions } from '../joist/Sim';
import Tandem from '../tandem/Tandem';
import geometricOptics from './geometricOptics';
import LensScreen from './lens/LensScreen';
import MirrorScreen from './mirror/MirrorScreen';
import GOConstants from './common/GOConstants';
import optionize from '../phet-core/optionize';
import GOPreferencesNode from './common/view/GOPreferencesNode';
import PickOptional from '../phet-core/types/PickOptional';
import PreferencesModel from '../joist/preferences/PreferencesModel';
import TReadOnlyProperty from '../../axon/TReadOnlyProperty';
import { Node } from '../scenery/imports';
import GOKeyboardHelpContent from './common/view/GOKeyboardHelpContent';

type SelfOptions = {

  // Is this 'Geometric Optics: Basics', aka the 'Basics version' of the sim?
  // This flag is propagated to many components of the sim. To identify how the Basics version is customized,
  // search the code base for isBasicsVersion, and inspect geometric-optics-basics-main.ts.
  isBasicsVersion: boolean;
};

export type GOSimOptions = SelfOptions & PickOptional<SimOptions, 'phetioDesigned'>;

export default class GOSim extends Sim {

  public constructor( titleProperty: TReadOnlyProperty<string>, providedOptions: GOSimOptions, displayOptions?: { container: HTMLElement | Element | null } ) {

    const options = optionize<GOSimOptions, SelfOptions, SimOptions>()( {

      // SimOptions
      credits: GOConstants.CREDITS,
      preferencesModel: new PreferencesModel( {
        simulationOptions: {
          customPreferences: [ {
            createContent: tandem => new GOPreferencesNode( {
              isBasicsVersion: providedOptions.isBasicsVersion,
              tandem: tandem.createTandem( 'simPreferences' )
            } )
          } ]
        }
      } )
    }, providedOptions );

    // Since keyboard-help is identical for both screens, save memory by reusing the same instance of keyboardHelpNode
    // for both screens, without creating a memory leak.
    let keyboardHelpNode: null | Node = null;
    const createKeyboardHelpNode = () => {
      if ( !keyboardHelpNode ) {
        keyboardHelpNode = new GOKeyboardHelpContent();
        keyboardHelpNode.disposeEmitter.addListener( function disposeListener() {
          if ( keyboardHelpNode ) {
            if ( keyboardHelpNode.disposeEmitter.hasListener( disposeListener ) ) {
              keyboardHelpNode.disposeEmitter.removeListener( disposeListener );
            }
            keyboardHelpNode = null;
          }
        } );
      }
      return keyboardHelpNode;
    };

    super( titleProperty, [
      new LensScreen( {
        isBasicsVersion: options.isBasicsVersion,
        createKeyboardHelpNode: createKeyboardHelpNode,
        tandem: Tandem.ROOT.createTandem( 'lensScreen' )
      } ),
      new MirrorScreen( {
        isBasicsVersion: options.isBasicsVersion,
        createKeyboardHelpNode: createKeyboardHelpNode,
        tandem: Tandem.ROOT.createTandem( 'mirrorScreen' )
      } )
    ], options, displayOptions );
  }
}

geometricOptics.register( 'GOSim', GOSim );