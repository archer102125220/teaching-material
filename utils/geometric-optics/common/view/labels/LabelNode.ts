// Copyright 2021-2023, University of Colorado Boulder

/**
 * LabelNode renders a label below something of interest in the user interface. It is responsible for adjusting its
 * position when that something's position changes.
 *
 * @author Sarah Chang (Swarthmore College)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';
import BackgroundNode, { type BackgroundNodeOptions } from '@/utils/scenery-phet/BackgroundNode';
import Vector2 from '@/utils/dot/Vector2';
import ModelViewTransform2 from '@/utils/phetcommon/view/ModelViewTransform2';
import { RichText } from '@/utils/scenery/imports';
import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import GOColors from '@/utils/geometric-optics/common/GOColors';
import GOConstants from '@/utils/geometric-optics/common/GOConstants';
import optionize from '@/utils/phet-core/optionize';
import type PickRequired from '@/utils/phet-core/types/PickRequired';
import Multilink from '@/utils/axon/Multilink';


type XAlign = 'left' | 'center' | 'right';
type YAlign = 'top' | 'center' | 'bottom';

type SelfOptions = {
  xAlign?: XAlign;
  yAlign?: YAlign;
  xOffset?: number; // from center, in view coordinates
  yOffset?: number; // in view coordinates
};

export type LabelNodeOptions = SelfOptions & PickRequired<BackgroundNodeOptions, 'visibleProperty' | 'tandem'>;

export default class LabelNode extends BackgroundNode {

  /**
   * @param labelStringProperty - the label's string
   * @param positionProperty - position of the thing that we're labeling, in model coordinates
   * @param zoomTransformProperty - model-view transform that the user controls by zooming in/out
   * @param providedOptions
   */
  public constructor(labelStringProperty: TReadOnlyProperty<string>,
    positionProperty: TReadOnlyProperty<Vector2>,
    zoomTransformProperty: TReadOnlyProperty<ModelViewTransform2>,
    providedOptions: LabelNodeOptions) {

    const options = optionize<LabelNodeOptions, SelfOptions, BackgroundNodeOptions>()({

      // SelfOptions
      xAlign: 'center',
      yAlign: 'top',
      xOffset: 0,
      yOffset: 2,

      // BackgroundNodeOptions
      xMargin: 5,
      yMargin: 5,
      rectangleOptions: {
        fill: GOColors.screenBackgroundColorProperty,
        cornerRadius: 4,
        opacity: 0.5
      },
      isDisposable: false,
      phetioVisiblePropertyInstrumented: false
    }, providedOptions);

    const labelText = new RichText(labelStringProperty, {
      align: 'center',
      fill: GOColors.labelFillProperty,
      font: GOConstants.LABEL_FONT,
      maxWidth: 85,
      tandem: providedOptions.tandem.createTandem('labelText')
    });

    super(labelText, options);

    // Keep the label properly aligned with the thing it's labeling.
    Multilink.multilink(
      [zoomTransformProperty, positionProperty, labelText.boundsProperty],
      (zoomTransform, position, textBounds) => {
        const viewPosition = zoomTransform.modelToViewPosition(position).plusXY(options.xOffset, options.yOffset);

        // x
        if (options.xAlign === 'center') {
          this.centerX = viewPosition.x;
        }
        else if (options.xAlign === 'left') {
          this.left = viewPosition.x;
        }
        else {
          this.right = viewPosition.x;
        }

        // y
        if (options.yAlign === 'center') {
          this.centerY = viewPosition.y;
        }
        else if (options.yAlign === 'top') {
          this.top = viewPosition.y;
        }
        else {
          this.bottom = viewPosition.y;
        }
      });
  }
}

geometricOptics.register('LabelNode', LabelNode);