// Copyright 2020-2023, University of Colorado Boulder

/**
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import BasicActionsKeyboardHelpSection from '../scenery-phet/keyboard/help/BasicActionsKeyboardHelpSection';
import { Node } from '../scenery/imports';
import joist from './joist';

class HomeScreenKeyboardHelpContent extends Node {
  public constructor() {
    const basicActionsKeyboardHelpSection = new BasicActionsKeyboardHelpSection();
    super({
      children: [basicActionsKeyboardHelpSection]
    });
  }
}

joist.register('HomeScreenKeyboardHelpContent', HomeScreenKeyboardHelpContent);

export default HomeScreenKeyboardHelpContent;