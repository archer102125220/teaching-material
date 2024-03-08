// Copyright 2022, University of Colorado Boulder

/**
 * MapMarkerNode is the FontAwesome 'map marker' icon. It is re-purposed for position markers in this sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import type PickOptional from '../../../phet-core/types/PickOptional';
import type PickRequired from '../../../phet-core/types/PickRequired';
import { Node, type NodeOptions, Path, type PathOptions } from '../../../scenery/imports';
import mapMarkerAltSolidShape from '../../../sherpa/fontawesome-5/mapMarkerAltSolidShape';
import geometricOptics from '../../geometricOptics';

type MapMarkerNodeOptions = PickOptional<NodeOptions, 'scale' | 'tagName'> & PickRequired<PathOptions, 'fill' | 'stroke'>;

export default class MapMarkerNode extends Node {

  public constructor(providedOptions: MapMarkerNodeOptions) {

    super(providedOptions);

    const mapMarkerNode = new Path(mapMarkerAltSolidShape, {
      fill: providedOptions.fill,
      stroke: providedOptions.stroke,
      lineWidth: 12,
      rotation: Math.PI,
      opacity: 0.85
    });
    this.addChild(mapMarkerNode);

    // slight vertical elongation
    mapMarkerNode.setScaleMagnitude(0.06, 0.07);
  }
}

geometricOptics.register('MapMarkerNode', MapMarkerNode);