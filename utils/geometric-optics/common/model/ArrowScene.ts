// Copyright 2022-2023, University of Colorado Boulder

/**
 * ArrowScene is a scene in which rays from two arrows interact with an optic and produce an Image.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import Optic from '@/utils/geometric-optics/common/model/Optic';
import Vector2 from '@/utils/dot/Vector2';
import { type RaysType } from '@/utils/geometric-optics/common/model/RaysType';
import LightRays from '@/utils/geometric-optics/common/model/LightRays';
import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';
import Lens from '@/utils/geometric-optics/lens/model/Lens';
import ArrowObject from '@/utils/geometric-optics/common/model/ArrowObject';
import ArrowImage from '@/utils/geometric-optics/common/model/ArrowImage';
import GOColors from '@/utils/geometric-optics/common/GOColors';
import GOScene, { type GOSceneOptions } from '@/utils/geometric-optics/common/model/GOScene';
import type PickRequired from '@/utils/phet-core/types/PickRequired';

type SelfOptions = {

  // initial positions of the arrow objects
  arrowObject1Position: Vector2;
  arrowObject2Position: Vector2;
};

type ArrowObjectSceneOptions = SelfOptions & PickRequired<GOSceneOptions, 'tandem'>;

export default class ArrowScene extends GOScene {

  // the elements that make up this scene
  public readonly arrowObject1: ArrowObject;
  public readonly arrowObject2: ArrowObject;
  public readonly arrowImage1: ArrowImage;
  public readonly arrowImage2: ArrowImage;
  public readonly lightRays1: LightRays;
  public readonly lightRays2: LightRays;

  // Resets things that are specific to this class.
  private readonly resetArrowObjectScene: () => void;

  /**
   * @param optic - the optic, shared by all scenes
   * @param raysTypeProperty - the representation used for rays
   * @param providedOptions
   */
  public constructor(optic: Optic,
    raysTypeProperty: TReadOnlyProperty<RaysType>,
    providedOptions: ArrowObjectSceneOptions) {

    super(optic, providedOptions);

    let opticalObjectNumber = 1;

    this.arrowObject1 = new ArrowObject(opticalObjectNumber++, optic.positionProperty, {
      position: providedOptions.arrowObject1Position,
      fill: GOColors.arrow1FillProperty,
      tandem: providedOptions.tandem.createTandem('arrowObject1')
    });

    this.arrowObject2 = new ArrowObject(opticalObjectNumber++, optic.positionProperty, {
      position: providedOptions.arrowObject2Position,
      fill: GOColors.arrow2FillProperty,
      tandem: providedOptions.tandem.createTandem('arrowObject2')
    });

    this.arrowImage1 = new ArrowImage(this.arrowObject1, this.optic, {
      tandem: providedOptions.tandem.createTandem('arrowImage1'),
      phetioDocumentation: 'optical image associated with the first arrow object'
    });

    this.arrowImage2 = new ArrowImage(this.arrowObject2, this.optic, {
      tandem: providedOptions.tandem.createTandem('arrowImage2'),
      phetioDocumentation: 'optical image associated with the second arrow object'
    });

    this.lightRays1 = new LightRays(
      this.arrowObject1.positionProperty,
      this.optic,
      this.arrowImage1,
      raysTypeProperty,
      this.raysAnimationTimeProperty
    );

    this.lightRays2 = new LightRays(
      this.arrowObject2.positionProperty,
      this.optic,
      this.arrowImage2,
      raysTypeProperty,
      this.raysAnimationTimeProperty
    );

    // Guides, for the Lens screen only
    if (optic instanceof Lens) {
      this.initializeGuides(this.arrowObject1.positionProperty, this.arrowObject2.positionProperty);
    }

    this.resetArrowObjectScene = () => {
      this.arrowObject1.reset();
      this.arrowObject2.reset();
      this.arrowImage1.reset();
      this.arrowImage2.reset();
    };
  }

  public override reset(): void {
    super.reset();
    this.resetArrowObjectScene();
  }
}

geometricOptics.register('ArrowScene', ArrowScene);
