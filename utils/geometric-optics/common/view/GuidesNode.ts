// Copyright 2021-2023, University of Colorado Boulder

/**
 * GuidesNode is a pair of guides, at the top and bottom of the optic.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Node, type NodeOptions, type TColor } from '@/utils/scenery/imports';
import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import GuideNode from '@/utils/geometric-optics/common/view/GuideNode';
import ModelViewTransform2 from '@/utils/phetcommon/view/ModelViewTransform2';
import Guides from '@/utils/geometric-optics/common/model/Guides';
import optionize, { type EmptySelfOptions } from '@/utils/phet-core/optionize';
import type PickRequired from '@/utils/phet-core/types/PickRequired';
import type PickOptional from '@/utils/phet-core/types/PickOptional';

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
