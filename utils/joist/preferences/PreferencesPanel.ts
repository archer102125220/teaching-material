// Copyright 2022-2023, University of Colorado Boulder

/**
 * A superclass for a panel of content in the Preferences Dialog. Mostly responsible for visibility of panel content.
 *
 * @author Jesse Greenberg
 */

import joist from '../joist';
import { Node, type NodeOptions } from '../../scenery/imports';
import Multilink from '../../axon/Multilink';
import type TReadOnlyProperty from '../../axon/TReadOnlyProperty';
import PreferencesType from './PreferencesType';
import optionize, { type EmptySelfOptions } from '../../phet-core/optionize';
import type StrictOmit from '../../phet-core/types/StrictOmit';
import Tandem from '../../tandem/Tandem';

type SelfOptions = EmptySelfOptions;
export type PreferencesPanelOptions = StrictOmit<NodeOptions, 'tagName' | 'labelTagName'>;

class PreferencesPanel extends Node {

  /**
   * @param preferencesType - PreferencesType for this panel
   * @param selectedTabProperty - Property representing the selected tab to be displayed.
   * @param tabVisibleProperty - Is the Tab for this panel invisible (so this panel should also be invisible)?
   * @param providedOptions
   */
  public constructor(preferencesType: PreferencesType, selectedTabProperty: TReadOnlyProperty<PreferencesType>, tabVisibleProperty: TReadOnlyProperty<boolean>, providedOptions?: PreferencesPanelOptions) {
    const options = optionize<PreferencesPanelOptions, SelfOptions, NodeOptions>()({

      // pdom
      tagName: 'div',
      labelTagName: 'h2'
    }, providedOptions);

    // don't instrument the Panel Node itself, though many subclasses make it required for subcomponents
    options.tandem = Tandem.OPT_OUT;

    super(options);

    // This panel is only visible when selected tab is this preferencesType, but it can also be hidden explicitly by
    // PhET-iO.
    Multilink.multilink([selectedTabProperty, tabVisibleProperty], (selectedTab, tabVisible) => {
      this.visible = selectedTab === preferencesType && tabVisible;
    });
  }
}

joist.register('PreferencesPanel', PreferencesPanel);
export default PreferencesPanel;