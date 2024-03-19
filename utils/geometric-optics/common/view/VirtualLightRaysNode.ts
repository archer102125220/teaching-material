// Copyright 2022, University of Colorado Boulder

/**
 * VirtualLightRaysNode renders virtual light rays.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Martin Veillette
 */

import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import { type TColor, Node } from '@/utils/scenery/imports';
import LightRays from '@/utils/geometric-optics/common/model/LightRays';
import ModelViewTransform2 from '@/utils/phetcommon/view/ModelViewTransform2';
import LightRaysNode, { type LightRaysNodeOptions } from '@/utils/geometric-optics/common/view/LightRaysNode';
import GOQueryParameters from '@/utils/geometric-optics/common/GOQueryParameters';

type SelfOptions = {
  stroke: TColor;
};

type VirtualRealLightRaysNodeOptions = SelfOptions & LightRaysNodeOptions;

export default class VirtualLightRaysNode extends LightRaysNode {

  public constructor(lightRays: LightRays,
    modelViewTransform: ModelViewTransform2,
    providedOptions: VirtualRealLightRaysNodeOptions) {

    const update = (thisNode: Node) => {
      thisNode.children = LightRaysNode.segmentsToLines(lightRays.virtualSegments, modelViewTransform, {
        stroke: providedOptions.stroke,
        lineWidth: GOQueryParameters.virtualRaysLineWidth,
        lineDash: [3, 3],
        opacity: 0.5
      });
    };

    super(lightRays, update, providedOptions);
  }
}

geometricOptics.register('VirtualLightRaysNode', VirtualLightRaysNode);