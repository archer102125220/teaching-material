// Copyright 2023, University of Colorado Boulder

/**
 * For completely blank lines in RichText
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
import Bounds2 from '../../../dot/Bounds2';
import Pool, { type TPoolable } from '../../../phet-core/Pool';
import { Node, RichTextCleanable, scenery } from '../../imports';

class RichTextVerticalSpacer extends RichTextCleanable(Node) implements TPoolable {
  public constructor(height: number) {
    super();

    this.initialize(height);
  }

  public initialize(height: number): this {

    this.localBounds = new Bounds2(0, 0, 0, height);

    return this;
  }

  public freeToPool(): void {
    RichTextVerticalSpacer.pool.freeToPool(this);
  }

  public static readonly pool = new Pool(RichTextVerticalSpacer);
}

scenery.register('RichTextVerticalSpacer', RichTextVerticalSpacer);

export default RichTextVerticalSpacer;
