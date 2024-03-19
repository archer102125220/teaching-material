// Copyright 2020-2023, University of Colorado Boulder

/**
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import BasicActionsKeyboardHelpSection from '@/utils/scenery-phet/keyboard/help/BasicActionsKeyboardHelpSection';
import { Node } from '@/utils/scenery/imports';
import joist from '@/utils/joist/joist';

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