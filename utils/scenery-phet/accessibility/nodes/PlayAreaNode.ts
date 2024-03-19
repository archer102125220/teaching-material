// Copyright 2018-2022, University of Colorado Boulder

/**
 * A node that creates a "Play Area" accessible section in the PDOM. This organizational Node should have accessible
 * content to be displayed under it in the PDOM. This content can be added as a child, or added via `pdomOrder`.
 * Items in this section are designed to be the "main interaction and pedagogical learning" to be had for the screen.
 * See ScreenView for more documentation and usage explanation.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import { type EmptySelfOptions } from '@/utils/phet-core/optionize';
import sceneryPhet from '@/utils/scenery-phet/sceneryPhet';
import SceneryPhetStrings from '@/utils/scenery-phet/accessibility/SceneryPhetStrings';
import PDOMSectionNode, { type PDOMSectionNodeOptions } from '@/utils/scenery-phet/accessibility/PDOMSectionNode';

type SelfOptions = EmptySelfOptions;
export type PlayAreaNodeOptions = SelfOptions & PDOMSectionNodeOptions;

export default class PlayAreaNode extends PDOMSectionNode {
  public constructor(providedOptions?: PlayAreaNodeOptions) {
    super(SceneryPhetStrings.a11y.simSection.playAreaStringProperty, providedOptions);
  }
}

sceneryPhet.register('PlayAreaNode', PlayAreaNode);