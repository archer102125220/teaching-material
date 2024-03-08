// Copyright 2022, University of Colorado Boulder

/**
 * Enumeration for the types of Preferences that can appear in the Preferences Dialog.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Enumeration from '../../phet-core/Enumeration';
import EnumerationValue from '../../phet-core/EnumerationValue';
import joist from '../joist';

export default class PreferencesType extends EnumerationValue {
  public static readonly OVERVIEW = new PreferencesType();
  public static readonly SIMULATION = new PreferencesType();
  public static readonly VISUAL = new PreferencesType();
  public static readonly AUDIO = new PreferencesType();
  public static readonly INPUT = new PreferencesType();
  public static readonly LOCALIZATION = new PreferencesType();

  public static readonly enumeration = new Enumeration(PreferencesType);
}

joist.register('PreferencesType', PreferencesType);
