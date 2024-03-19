// Copyright 2022, University of Colorado Boulder

/**
 * RealLightRaysNode renders real light rays.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Martin Veillette
 */

import ModelViewTransform2 from '@/utils/phetcommon/view/ModelViewTransform2';
import { type TColor, Node } from '@/utils/scenery/imports';
import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import LightRays from '@/utils/geometric-optics/common/model/LightRays';
import LightRaysNode, { type LightRaysNodeOptions } from '@/utils/geometric-optics/common/view/LightRaysNode';
import GOQueryParameters from '@/utils/geometric-optics/common/GOQueryParameters';

type SelfOptions = {
  stroke: TColor;
};

export type RealLightRaysNodeOptions = SelfOptions & LightRaysNodeOptions;

export default class RealLightRaysNode extends LightRaysNode {

  public constructor(lightRays: LightRays,
    modelViewTransform: ModelViewTransform2,
    providedOptions: RealLightRaysNodeOptions) {

    const update = (thisNode: Node) => {
      thisNode.children = LightRaysNode.segmentsToLines(lightRays.realSegments, modelViewTransform, {
        stroke: providedOptions.stroke,
        lineWidth: GOQueryParameters.realRaysLineWidth
      });
    };

    super(lightRays, update, providedOptions);
  }
}

geometricOptics.register('RealLightRaysNode', RealLightRaysNode);