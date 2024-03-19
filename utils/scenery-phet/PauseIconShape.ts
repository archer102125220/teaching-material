// Copyright 2018-2022, University of Colorado Boulder

/**
 * Shape for the 'pause' icon that appears on buttons and other UI components.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Shape } from '@/utils/kite/imports';
import sceneryPhet from '@/utils/scenery-phet/buttons/sceneryPhet';

export default class PauseIconShape extends Shape {

  public constructor(width: number, height: number) {
    super();

    // 2 vertical bars
    const barWidth = width / 3;
    this.rect(0, 0, barWidth, height);
    this.rect(2 * barWidth, 0, barWidth, height);
  }
}

sceneryPhet.register('PauseIconShape', PauseIconShape);