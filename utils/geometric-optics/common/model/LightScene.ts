// Copyright 2022-2023, University of Colorado Boulder

/**
 * LightScene is a scene in rays from 2 lights interact with a lens, and project light spots on
 * a projection screen. Note that this scene supports only Lens, not Mirror.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import Vector2 from '@/utils/dot/Vector2';
import { type RaysType } from '@/utils/geometric-optics/common/model/RaysType';
import LightRays from '@/utils/geometric-optics/common/model/LightRays';
import ProjectionScreen from '@/utils/geometric-optics/common/model/ProjectionScreen';
import LightSpot from '@/utils/geometric-optics/common/model/LightSpot';
import LightObject from '@/utils/geometric-optics/common/model/LightObject';
import light1_png from '@/assets/images/geometric-optics/light1_png';
import light2_png from '@/assets/images/geometric-optics/light2_png';
import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';
import OpticalImage from '@/utils/geometric-optics/common/model/OpticalImage';
import GOScene, { type GOSceneOptions } from '@/utils/geometric-optics/common/model/GOScene';
import Lens from '@/utils/geometric-optics/lens/model/Lens';
import type PickRequired from '@/utils/phet-core/types/PickRequired';

type SelfOptions = {

  // initial positions of the lights
  lightObject1Position: Vector2;
  lightObject2Position: Vector2;
};

type LightObjectSceneOptions = SelfOptions & PickRequired<GOSceneOptions, 'tandem'>;

export default class LightScene extends GOScene {

  public readonly lens: Lens;

  // the elements that make up this scene
  public readonly lightObject1: LightObject;
  public readonly lightObject2: LightObject;
  public readonly opticalImage1: OpticalImage;
  public readonly opticalImage2: OpticalImage;
  public readonly lightRays1: LightRays;
  public readonly lightRays2: LightRays;
  public readonly projectionScreen: ProjectionScreen;
  public readonly lightSpot1: LightSpot;
  public readonly lightSpot2: LightSpot;

  // Resets things that are specific to this class.
  private readonly resetLightObjectScene: () => void;

  /**
   * @param lens - the lens, shared by all scenes
   * @param raysTypeProperty - the representation used for rays
   * @param providedOptions
   */
  public constructor(lens: Lens,
    raysTypeProperty: TReadOnlyProperty<RaysType>,
    providedOptions: LightObjectSceneOptions) {

    super(lens, providedOptions);

    this.lens = lens;

    let opticalObjectNumber = 1;

    this.lightObject1 = new LightObject(opticalObjectNumber++, lens.positionProperty, {
      htmlImageElement: light1_png,
      position: providedOptions.lightObject1Position,
      tandem: providedOptions.tandem.createTandem('lightObject1'),
      phetioDocumentation: 'the first light'
    });

    this.lightObject2 = new LightObject(opticalObjectNumber++, lens.positionProperty, {
      htmlImageElement: light2_png,
      position: providedOptions.lightObject2Position,
      tandem: providedOptions.tandem.createTandem('lightObject2'),
      phetioDocumentation: 'the second light'
    });

    this.opticalImage1 = new OpticalImage(this.lightObject1, lens, {
      tandem: providedOptions.tandem.createTandem('opticalImage1'),
      opticalImageTypePropertyFeatured: false, // because no image is formed for lights
      magnificationPropertyFeatured: false, // because no image is formed for lights
      phetioDocumentation: 'Point where light rays from the first light converge. No image is formed in this scene.'
    });

    this.opticalImage2 = new OpticalImage(this.lightObject2, lens, {
      tandem: providedOptions.tandem.createTandem('opticalImage2'),
      opticalImageTypePropertyFeatured: false, // because no image is formed for lights
      magnificationPropertyFeatured: false, // because no image is formed for lights
      phetioDocumentation: 'Point where light rays from the second light converge. No image is formed in this scene.'
    });

    this.projectionScreen = new ProjectionScreen(lens.positionProperty, {
      tandem: providedOptions.tandem.createTandem('projectionScreen')
    });

    this.lightRays1 = new LightRays(
      this.lightObject1.positionProperty,
      lens,
      this.opticalImage1,
      raysTypeProperty,
      this.raysAnimationTimeProperty,
      this.projectionScreen
    );

    this.lightRays2 = new LightRays(
      this.lightObject2.positionProperty,
      lens,
      this.opticalImage2,
      raysTypeProperty,
      this.raysAnimationTimeProperty,
      this.projectionScreen
    );

    // Light Spots
    this.lightSpot1 = new LightSpot(lens, this.projectionScreen, this.lightObject1.positionProperty,
      this.opticalImage1.positionProperty, {
      tandem: providedOptions.tandem.createTandem('lightSpot1'),
      phetioDocumentation: 'the light spot on the projection screen that is created by the first light'
    });
    this.lightSpot2 = new LightSpot(lens, this.projectionScreen, this.lightObject2.positionProperty,
      this.opticalImage2.positionProperty, {
      tandem: providedOptions.tandem.createTandem('lightSpot2'),
      phetioDocumentation: 'the light spot on the projection screen that is created by the second light'
    });

    // Guides
    this.initializeGuides(this.lightObject1.positionProperty, this.lightObject2.positionProperty);

    this.resetLightObjectScene = () => {
      this.lightObject1.reset();
      this.lightObject2.reset();
      this.opticalImage1.reset();
      this.opticalImage2.reset();
      this.projectionScreen.reset();
    };
  }

  public override reset(): void {
    super.reset();
    this.resetLightObjectScene();
  }
}

geometricOptics.register('LightScene', LightScene);
