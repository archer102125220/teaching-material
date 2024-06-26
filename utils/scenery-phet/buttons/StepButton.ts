// Copyright 2014-2022, University of Colorado Boulder

/**
 * Generalized button for stepping forward or back.  While this class is not private, clients will generally use the
 * convenience subclasses: StepForwardButton and StepBackwardButton
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Shape } from '@/utils/kite/imports';
import type StrictOmit from '@/utils/phet-core/types/StrictOmit';
import InstanceRegistry from '@/utils/phet-core/documentation/InstanceRegistry';
import optionize from '@/utils/phet-core/optionize';
import { HBox, type TPaint, Path, Rectangle } from '@/utils/scenery/imports';
import RoundPushButton, { type RoundPushButtonOptions } from '@/utils/sun/buttons/RoundPushButton';
import stepForwardSoundPlayer from '@/utils/tambo/shared-sound-players/stepForwardSoundPlayer';
import sceneryPhet from '@/utils/scenery-phet/sceneryPhet';
import SceneryPhetStrings from '@/utils/scenery-phet/SceneryPhetStrings';

const DEFAULT_RADIUS = 20;
const MARGIN_COEFFICIENT = 10.5 / DEFAULT_RADIUS;

type Direction = 'forward' | 'backward';

type SelfOptions = {
  radius?: number;
  direction?: Direction;
  iconFill?: TPaint;
};

export type StepButtonOptions = SelfOptions &
  StrictOmit<RoundPushButtonOptions, 'content' | 'xContentOffset' | 'xMargin' | 'yMargin'>;

export default class StepButton extends RoundPushButton {

  public constructor(providedOptions?: StepButtonOptions) {

    // these options are used in computation of other default options
    const options = optionize<StepButtonOptions, SelfOptions, RoundPushButtonOptions>()({

      // SelfOptions
      radius: DEFAULT_RADIUS,
      direction: 'forward',
      iconFill: 'black',

      // RoundPushButtonOptions
      fireOnHold: true,
      soundPlayer: stepForwardSoundPlayer,
      innerContent: SceneryPhetStrings.a11y.stepButton.stepForwardStringProperty,
      appendDescription: true
    }, providedOptions);

    window.assert && window.assert(options.direction === 'forward' || options.direction === 'backward',
      `unsupported direction: ${options.direction}`);

    // shift the content to center align, assumes 3D appearance and specific content
    options.xContentOffset = (options.direction === 'forward') ? (0.075 * options.radius) : (-0.15 * options.radius);

    window.assert && window.assert(options.xMargin === undefined && options.yMargin === undefined, 'StepButton sets margins');
    options.xMargin = options.yMargin = options.radius * MARGIN_COEFFICIENT;

    // step icon is sized relative to the radius
    const BAR_WIDTH = options.radius * 0.15;
    const BAR_HEIGHT = options.radius * 0.9;
    const TRIANGLE_WIDTH = options.radius * 0.65;
    const TRIANGLE_HEIGHT = BAR_HEIGHT;

    // icon, in 'forward' orientation
    const barPath = new Rectangle(0, 0, BAR_WIDTH, BAR_HEIGHT, { fill: options.iconFill });
    const trianglePath = new Path(new Shape()
      .moveTo(0, TRIANGLE_HEIGHT / 2)
      .lineTo(TRIANGLE_WIDTH, 0)
      .lineTo(0, -TRIANGLE_HEIGHT / 2)
      .close(), {
      fill: options.iconFill
    });
    options.content = new HBox({
      children: [barPath, trianglePath],
      spacing: BAR_WIDTH,
      rotation: (options.direction === 'forward') ? 0 : Math.PI
    });

    super(options);

    // support for binder documentation, stripped out in builds and only runs when ?binder is specified
    window.assert && window.phet.chipper.queryParameters.binder && InstanceRegistry.registerDataURL('scenery-phet', 'StepButton', this);
  }
}

sceneryPhet.register('StepButton', StepButton);