// Copyright 2021-2023, University of Colorado Boulder

/**
 * ProjectionScreen is the model of the projection screen.
 * It has a position and a Shape, and methods for computing Shapes needed by the view.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Martin Veillette
 */

import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';
import Property from '@/utils/axon/Property';
import Matrix3 from '@/utils/dot/Matrix3';
import Vector2 from '@/utils/dot/Vector2';
import Vector2Property from '@/utils/dot/Vector2Property';
import { Shape } from '@/utils/kite/imports';
import PhetioObject, { type PhetioObjectOptions } from '@/utils/tandem/PhetioObject';
import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import GOConstants from '@/utils/geometric-optics/common/GOConstants';
import type PickRequired from '@/utils/phet-core/types/PickRequired';
import optionize, { type EmptySelfOptions } from '@/utils/phet-core/optionize';

// Dimensions of the screen, in cm. "Near" and "far" refer to pseudo-3D perspective.
const SCREEN_WIDTH = 42;
const SCREEN_NEAR_HEIGHT = 134;
const SCREEN_FAR_HEIGHT = 112;
window.assert && window.assert(SCREEN_NEAR_HEIGHT > SCREEN_FAR_HEIGHT);

type SelfOptions = EmptySelfOptions;

type ProjectionScreenOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class ProjectionScreen extends PhetioObject {

  // position of the center of the screen, in cm
  public readonly positionProperty: Property<Vector2>;

  // Shape of the screen, relative to positionProperty
  public readonly screenShape: Shape;

  // Height of the screen at its centerX
  public readonly height: number;

  // line that vertically bisects the screen, at its centerX
  private readonly bisectorLine: Shape;

  // Resets things that are specific to this class.
  private readonly resetProjectionScreen: () => void;

  public constructor(opticPositionProperty: TReadOnlyProperty<Vector2>, providedOptions: ProjectionScreenOptions) {

    const options = optionize<ProjectionScreenOptions, SelfOptions, PhetioObjectOptions>()({

      // PhetioObjectOptions
      isDisposable: false,
      phetioState: false
    }, providedOptions);

    super(options);

    this.positionProperty = new Vector2Property(new Vector2(200, 0), {
      units: 'cm',
      isValidValue: (position: Vector2) =>
        (position.x >= opticPositionProperty.value.x + GOConstants.MIN_DISTANCE_FROM_OPTIC_TO_PROJECTION_SCREEN),

      // Reentrant because dragBounds depends on positionProperty, and its listener modifies positionProperty to
      // keep objects inside dragBounds. See https://github.com/phetsims/geometric-optics/issues/487
      reentrant: true,
      tandem: options.tandem.createTandem('positionProperty'),
      phetioFeatured: true
    });

    // Described clockwise, starting at left top, in model coordinates.
    this.screenShape = new Shape(undefined, undefined, 'screenShape')
      .moveTo(-SCREEN_WIDTH / 2, SCREEN_FAR_HEIGHT / 2)
      .lineTo(SCREEN_WIDTH / 2, SCREEN_NEAR_HEIGHT / 2)
      .lineTo(SCREEN_WIDTH / 2, -SCREEN_NEAR_HEIGHT / 2)
      .lineTo(-SCREEN_WIDTH / 2, -SCREEN_FAR_HEIGHT / 2)
      .close();

    // Height at the centerX of the screen, the average of its near and far perspective heights
    this.height = (SCREEN_NEAR_HEIGHT + SCREEN_FAR_HEIGHT) / 2;

    // Described from top to bottom, in model coordinates.
    this.bisectorLine = Shape.lineSegment(0, this.height / 2, 0, -this.height / 2);

    this.resetProjectionScreen = () => {
      this.positionProperty.reset();
    };
  }

  public reset(): void {
    this.resetProjectionScreen();
  }

  /**
   * Gets the vertical line that bisects the screen, in the model's global coordinate frame.
   */
  public getBisectorLineTranslated(): Shape {
    return this.translatedShape(this.bisectorLine);
  }

  /**
   * Gets the shape of the projection screen, in the model's global coordinate frame.
   */
  public getScreenShapeTranslated(): Shape {
    return this.translatedShape(this.screenShape);
  }

  /**
   * Returns a shape that is translated by the model position of the projection screen.
   * The provided Shape should be in the projection screen's local coordinate frame.
   * The resulting Shape will be in the model's global coordinate frame.
   * @param shape - in the projection screen's local coordinate frame
   */
  private translatedShape(shape: Shape): Shape {
    return shape.transformed(Matrix3.translationFromVector(this.positionProperty.value));
  }
}

geometricOptics.register('ProjectionScreen', ProjectionScreen);