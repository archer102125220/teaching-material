// Copyright 2021-2023, University of Colorado Boulder

/**
 * LightRaysNode is the base class for Nodes that render light rays.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Martin Veillette
 */

import ModelViewTransform2 from '@/utils/phetcommon/view/ModelViewTransform2';
import { Line, type LineOptions, Node, type NodeOptions } from '@/utils/scenery/imports';
import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import { type LightRaySegment } from '@/utils/geometric-optics/common/model/LightRay';
import LightRays from '@/utils/geometric-optics/common/model/LightRays';
import type PickOptional from '@/utils/phet-core/types/PickOptional';
import optionize, { type EmptySelfOptions } from '@/utils/phet-core/optionize';

type SelfOptions = EmptySelfOptions;

export type LightRaysNodeOptions = SelfOptions & PickOptional<NodeOptions, 'visibleProperty'>;

export default class LightRaysNode extends Node {

  /**
   * @param lightRays - model element
   * @param update - called when LightRays.raysProcessedEmitter fires
   * @param providedOptions
   */
  protected constructor(lightRays: LightRays, update: (thisNode: Node) => void, providedOptions: LightRaysNodeOptions) {

    const options = optionize<LightRaysNodeOptions, SelfOptions, NodeOptions>()({

      // NodeOptions
      isDisposable: false
    }, providedOptions);

    super(options);

    // Update this Node when the model tells us that it's time to update.
    lightRays.raysProcessedEmitter.addListener(() => update(this));

    update(this);
  }

  /**
   * Converts LightRaySegment[] (model) to scenery Line[] (view).
   * @param segments
   * @param modelViewTransform
   * @param lineOptions - options to Line
   */
  public static segmentsToLines(segments: LightRaySegment[], modelViewTransform: ModelViewTransform2, lineOptions: LineOptions): Line[] {

    // When attempting to render the rays as a single window.phet.scenery.Path, we were seeing incorrect closed-path triangles
    // being rendered. We had to resort to a window.phet.scenery.Line per segment to make the problem go away.
    // See https://github.com/phetsims/geometric-optics/issues/209
    return segments.map(segment => {
      const viewStartPoint = modelViewTransform.modelToViewPosition(segment.startPoint);
      const viewEndPoint = modelViewTransform.modelToViewPosition(segment.endPoint);
      return new Line(viewStartPoint, viewEndPoint, lineOptions);
    });
  }
}

geometricOptics.register('LightRaysNode', LightRaysNode);