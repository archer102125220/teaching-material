// Copyright 2022-2023, University of Colorado Boulder

/**
 * OpticalImageNode is the view base class for all optical images.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Node, type NodeOptions } from '../../../scenery/imports';
import geometricOptics from '../../geometricOptics';
import type PickRequired from '../../../phet-core/types/PickRequired';
import OpticalImage from '../model/OpticalImage';
import DerivedProperty from '../../../axon/DerivedProperty';
import optionize, { type EmptySelfOptions } from '../../../phet-core/optionize';
import BooleanIO from '../../../tandem/types/BooleanIO';
import type TReadOnlyProperty from '../../../axon/TReadOnlyProperty';

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