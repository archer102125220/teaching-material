// Copyright 2021-2023, University of Colorado Boulder

/**
 * The content for the "Simulation" tab in the PreferencesDialog. Contains controls for any simulation-specific
 * preferences.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import { Node, VBox, type VBoxOptions } from '@/utils/scenery/imports';
import joist from '@/utils/joist/joist';
import PreferencesDialog from '@/utils/joist/preferences/PreferencesDialog';
import { type SimulationModel } from '@/utils/joist/preferences/PreferencesModel';
import optionize, { type EmptySelfOptions } from '@/utils/phet-core/optionize';
import type PickRequired from '@/utils/phet-core/types/PickRequired';
import PreferencesPanelSection from '@/utils/joist/preferences/PreferencesPanelSection';
import PreferencesType from '@/utils/joist/preferences/PreferencesType';
import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';
import PreferencesPanel, { type PreferencesPanelOptions } from '@/utils/joist/preferences/PreferencesPanel';

type SelfOptions = EmptySelfOptions;
type SimulationPreferencesPanelOptions = SelfOptions &
  PreferencesPanelOptions &

  // Still required, even though it is preferences because the Simulation tab houses sim-specific elements that
  // should support customization. https://github.com/phetsims/joist/issues/744#issuecomment-1196028362
  PickRequired<PreferencesPanelOptions, 'tandem'>;

class SimulationPreferencesPanel extends PreferencesPanel {

  /**
   * @param simulationModel - configuration for the Tab, see PreferencesModel for entries
   * @param selectedTabProperty
   * @param tabVisibleProperty
   * @param [providedOptions]
   */
  public constructor(simulationModel: SimulationModel, selectedTabProperty: TReadOnlyProperty<PreferencesType>, tabVisibleProperty: TReadOnlyProperty<boolean>, providedOptions?: SimulationPreferencesPanelOptions) {
    const options = optionize<SimulationPreferencesPanelOptions, SelfOptions, VBoxOptions>()({
      labelContent: 'Simulation',

      // phet-io
      phetioVisiblePropertyInstrumented: false
    }, providedOptions);

    super(PreferencesType.SIMULATION, selectedTabProperty, tabVisibleProperty, options);

    const panelContent = new VBox({
      align: 'left',
      spacing: PreferencesDialog.CONTENT_SPACING
    });
    this.addChild(panelContent);

    // Just the provided panel content with its own spacing
    const providedChildren: Node[] = [];

    simulationModel.customPreferences.forEach(customPreference => {
      const contentNode = customPreference.createContent(options.tandem);
      const preferencesPanelSection = new PreferencesPanelSection({ contentNode });
      providedChildren.push(preferencesPanelSection);
    });

    panelContent.children = providedChildren;
  }
}

joist.register('SimulationPreferencesPanel', SimulationPreferencesPanel);
export default SimulationPreferencesPanel;