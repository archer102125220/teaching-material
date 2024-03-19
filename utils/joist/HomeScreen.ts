// Copyright 2015-2023, University of Colorado Boulder

/**
 * Screen for the home screen, which shows icons for selecting the sim content screens.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';
import Property from '@/utils/axon/Property';
import ReadOnlyProperty from '@/utils/axon/ReadOnlyProperty';
import optionize from '@/utils/phet-core/optionize';
import { Color, Node } from '@/utils/scenery/imports';
import HomeScreenKeyboardHelpContent from '@/utils/joist/HomeScreenKeyboardHelpContent';
import HomeScreenModel from '@/utils/joist/HomeScreenModel';
import HomeScreenView from '@/utils/joist/HomeScreenView';
import joist from '@/utils/joist/joist';
import JoistStrings from '@/utils/joist/JoistStrings';
import Screen, { type ScreenOptions } from '@/utils/joist/Screen';
import type IntentionalAny from '@/utils/phet-core/types/IntentionalAny';

// constants
const homeStringProperty = JoistStrings.a11y.homeStringProperty;
const BACKGROUND_COLOR = Color.BLACK;

type SelfOptions = {
  warningNode: Node | null;
};
type HomeScreenOptions = SelfOptions & ScreenOptions;

class HomeScreen extends Screen<HomeScreenModel, HomeScreenView> {
  public static readonly BACKGROUND_COLOR = BACKGROUND_COLOR;

  public constructor(
    simNameProperty: TReadOnlyProperty<string>,
    getScreenProperty: () => Property<Screen<IntentionalAny, IntentionalAny>>,
    simScreens: Screen<IntentionalAny, IntentionalAny>[],
    activeSimScreensProperty: ReadOnlyProperty<Screen<IntentionalAny, IntentionalAny>[]>,
    providedOptions: HomeScreenOptions
  ) {

    const options = optionize<HomeScreenOptions, SelfOptions, ScreenOptions>()({

      // TODO get this color from LookAndFeel, see https://github.com/phetsims/joist/issues/222
      backgroundColorProperty: new Property(BACKGROUND_COLOR),

      name: homeStringProperty,

      createKeyboardHelpNode: () => new HomeScreenKeyboardHelpContent(),

      // phet-io
      instrumentNameProperty: false // requested by designers, see https://github.com/phetsims/joist/issues/627
    }, providedOptions);

    super(
      // at the time of construction, the Sim.screenProperty is not yet assigned (because it may itself include the
      // HomeScreen), so we must use a function to lazily get it after it is assigned
      () => new HomeScreenModel(getScreenProperty(), simScreens, activeSimScreensProperty, options.tandem.createTandem('model')),
      model => new HomeScreenView(simNameProperty, model, {
        warningNode: options.warningNode,
        tandem: options.tandem.createTandem('view')
      }),
      options
    );
  }
}

joist.register('HomeScreen', HomeScreen);

export default HomeScreen;