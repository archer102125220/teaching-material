// Copyright 2018-2022, University of Colorado Boulder

/**
 * Shape for the 'stop' icon that appears on buttons and other UI components.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Shape } from '@/utils/kite/imports';
import sceneryPhet from '@/utils/scenery-phet/sceneryPhet';

export default class StopIconShape extends Shape {

  public constructor(width: number) {
    super();

    // rectangle
    this.rect(0, 0, width, width);
  }
}

sceneryPhet.register('StopIconShape', StopIconShape);