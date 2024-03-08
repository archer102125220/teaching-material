// Copyright 2021-2023, University of Colorado Boulder

/**
 * GuidesNode is a pair of guides, at the top and bottom of the optic.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Node, type NodeOptions, type TColor } from '../../../scenery/imports';
import geometricOptics from '../../geometricOptics';
import GuideNode from './GuideNode';
import ModelViewTransform2 from '../../../phetcommon/view/ModelViewTransform2';
import Guides from '../model/Guides';
import optionize, { type EmptySelfOptions } from '../../../phet-core/optionize';
import type PickRequired from '../../../phet-core/types/PickRequired';
import type PickOptional from '../../../phet-core/types/PickOptional';

type SelfOptions = EmptySelfOptions;

type GuidesNodeOptions = SelfOptions &
  PickRequired<NodeOptions, 'visibleProperty' | 'tandem'> &
  PickOptional<NodeOptions, 'phetioDocumentation'>;

export default class GuidesNode extends Node {

  public constructor(guides: Guides, armColor: TColor,
    modelViewTransform: ModelViewTransform2, providedOptions: GuidesNodeOptions) {
    super(optionize<GuidesNodeOptions, SelfOptions, NodeOptions>()({

      // NodeOptions
      children: [
        new GuideNode(guides.topGuide, armColor, modelViewTransform),
        new GuideNode(guides.bottomGuide, armColor, modelViewTransform)
      ]
    }, providedOptions));
  }
}

geometricOptics.register('GuidesNode', GuidesNode);
