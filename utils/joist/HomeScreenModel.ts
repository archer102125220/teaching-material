// Copyright 2020-2023, University of Colorado Boulder

/**
 * Model for the home screen.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Chris Klusendorf (PhET Interactive Simulations)
 */

import _ from 'lodash';

import Property from '@/utils/axon/Property';
import ReadOnlyProperty from '@/utils/axon/ReadOnlyProperty';
import type IntentionalAny from '@/utils/phet-core/types/IntentionalAny';
import Tandem from '@/utils/tandem/Tandem';
import joist from '@/utils/joist/joist';
import Screen, { type AnyScreen } from '@/utils/joist/Screen';
import type TModel from '@/utils/joist/TModel';

class HomeScreenModel implements TModel {
  public simScreens: AnyScreen[]; // screens in the simulations that are not the HomeScreen
  public screenProperty: Property<AnyScreen>;
  public selectedScreenProperty: Property<AnyScreen>;
  public readonly activeSimScreensProperty: ReadOnlyProperty<AnyScreen[]>;

  /**
   * @param screenProperty - the screen that is displayed to the user in the main area above the
   *                                           - navigation bar
   * @param simScreens
   * @param tandem
   */
  public constructor(screenProperty: Property<Screen<IntentionalAny, IntentionalAny>>, simScreens: Screen<IntentionalAny, IntentionalAny>[], activeSimScreensProperty: ReadOnlyProperty<AnyScreen[]>, tandem: Tandem) {

    this.simScreens = simScreens;
    this.screenProperty = screenProperty;
    this.activeSimScreensProperty = activeSimScreensProperty;
    this.selectedScreenProperty = new Property(simScreens[0], {
      validValues: simScreens,
      phetioValueType: Screen.ScreenIO,
      tandem: tandem.createTandem('selectedScreenProperty'),
      phetioFeatured: true
    });

    // the correct screen icon is selected when returning to the home screen
    this.screenProperty.link(screen => {
      if (_.includes(simScreens, screen)) {
        this.selectedScreenProperty.value = screen;
      }
    });
  }

  public reset(): void { /* nothing to do */ }
}

joist.register('HomeScreenModel', HomeScreenModel);

export default HomeScreenModel;