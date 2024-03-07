// Copyright 2019-2024, University of Colorado Boulder

/**
 * Represents an image with a specific center "offset". Considered immutable (with an immutable image, the Canvas if
 * provided should not change).
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Matrix3 from '../../dot/Matrix3';
import Vector2 from '../../dot/Vector2';
import { Shape } from '../../kite/imports';
import { Imageable, type ImageableImage, type ImageableOptions, scenery } from '../imports';
import mutate from '../../phet-core/mutate';
import optionize from '../../phet-core/optionize';

let globalIdCounter = 1;
const scratchVector = new Vector2(0, 0);

type SelfOptions = {
  hitTestPixels?: boolean;
  pickable?: boolean;
};

export type SpriteImageOptions = SelfOptions & ImageableOptions;

export default class SpriteImage extends Imageable(Object) {

  public readonly id: number;
  public readonly offset: Vector2;
  public readonly pickable: boolean;
  private shape: Shape | null; // lazily-constructed
  private imageData: ImageData | null;

  /**
   * @param image
   * @param offset - A 2d offset from the upper-left of the image which is considered the "center".
   * @param [providedOptions]
   */
  public constructor(image: ImageableImage, offset: Vector2, providedOptions?: SpriteImageOptions) {
    assert && assert(image instanceof HTMLImageElement || image instanceof HTMLCanvasElement);

    const options = optionize<SpriteImageOptions, SelfOptions, ImageableOptions>()({
      hitTestPixels: false,
      pickable: true,
      image: image
    }, providedOptions);

    super();

    this.id = globalIdCounter++;
    this.offset = offset;
    this.pickable = options.pickable;
    this.shape = null;
    this.imageData = null;

    // Initialize Imageable items (including the image itself)
    this.setImage(image);

    mutate(this, Object.keys(Imageable.DEFAULT_OPTIONS), options);
  }

  public get width(): number {
    return this.imageWidth;
  }

  public get height(): number {
    return this.imageHeight;
  }

  /**
   * Returns a Shape that represents the hit-testable area of this SpriteImage.
   */
  public getShape(): Shape {
    if (!this.pickable) {
      return new Shape();
    }

    if (!this.shape) {
      if (this.hitTestPixels) {
        this.ensureImageData();
        if (this.imageData) {
          this.shape = Imageable.hitTestDataToShape(this.imageData, this.width, this.height);
        }
        else {
          // Empty, if we haven't been able to load image data (even if we have a width/height)
          return new Shape();
        }
      }
      else if (this.width && this.height) {
        this.shape = Shape.rect(0, 0, this.width, this.height);
      }
      else {
        // If we have no width/height
        return new Shape();
      }

      // Apply our offset
      this.shape = this.shape.transformed(Matrix3.translation(-this.offset.x, -this.offset.y));
    }

    return this.shape;
  }

  /**
   * Ensures we have a computed imageData (computes it lazily if necessary).
   */
  private ensureImageData(): void {
    if (!this.imageData && this.width && this.height) {
      this.imageData = Imageable.getHitTestData(this.image, this.width, this.height);
    }
  }

  /**
   * Returns whether a given point is considered "inside" the SpriteImage.
   */
  public containsPoint(point: Vector2): boolean {

    if (!this.pickable) {
      return false;
    }

    const width = this.width;
    const height = this.height;

    // If our image isn't really loaded yet, bail out
    if (!width && !height) {
      return false;
    }

    const position = scratchVector.set(point).add(this.offset);

    // Initial position check (are we within the rectangle)
    if (position.x < 0 || position.y < 0 || position.x > width || position.y > height) {
      return false;
    }

    if (!this.hitTestPixels) {
      return true;
    }
    else {
      // Lazy-load image data
      this.ensureImageData();

      // And test if it's available
      if (this.imageData) {
        return Imageable.testHitTestData(this.imageData, width, height, position);
      }
      else {
        return false;
      }
    }
  }
}

scenery.register('SpriteImage', SpriteImage);
