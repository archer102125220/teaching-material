// Copyright 2022-2023, University of Colorado Boulder

/**
 * OpticalImageNode is the view base class for all optical images.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Node, type NodeOptions } from '@/utils/scenery/imports';
import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import type PickRequired from '@/utils/phet-core/types/PickRequired';
import OpticalImage from '@/utils/geometric-optics/common/model/OpticalImage';
import DerivedProperty from '@/utils/axon/DerivedProperty';
import optionize, { type EmptySelfOptions } from '@/utils/phet-core/optionize';
import BooleanIO from '@/utils/tandem/types/BooleanIO';
import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';

type SelfOptions = EmptySelfOptions;

export type OpticalImageNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default class OpticalImageNode extends Node {

  /**
   * @param opticalImage - model element
   * @param virtualImageVisibleProperty - are virtual images visible?
   * @param lightPropagationEnabledProperty - is light propagation enabled?
   * @param objectVisibleProperty - is the optical object visible?
   * @param providedOptions
   */
  protected constructor(opticalImage: OpticalImage,
    virtualImageVisibleProperty: TReadOnlyProperty<boolean>,
    lightPropagationEnabledProperty: TReadOnlyProperty<boolean>,
    objectVisibleProperty: TReadOnlyProperty<boolean>,
    providedOptions: OpticalImageNodeOptions) {

    const options = optionize<OpticalImageNodeOptions, SelfOptions, NodeOptions>()({

      // NodeOptions
      isDisposable: false,
      visibleProperty: new DerivedProperty(
        [opticalImage.visibleProperty, opticalImage.opticalImageTypeProperty, virtualImageVisibleProperty,
          lightPropagationEnabledProperty, objectVisibleProperty],
        (imageVisible, opticalImageType, virtualImageVisible,
          lightPropagationEnabled, objectVisible) => {
          return (imageVisible && (opticalImageType === 'real' || virtualImageVisible) &&
            lightPropagationEnabled && objectVisible);
        }, {
        tandem: providedOptions.tandem.createTandem('visibleProperty'),
        phetioValueType: BooleanIO
      })
    }, providedOptions);

    super(options);

    this.addLinkedElement(opticalImage);
  }
}

geometricOptics.register('OpticalImageNode', OpticalImageNode);