// Copyright 2014-2022, University of Colorado Boulder

/**
 * Button for toggling sound on and off.
 *
 * @author John Blanco
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Property from '@/utils/axon/Property';
import { Shape } from '@/utils/kite/imports';
import InstanceRegistry from '@/utils/phet-core/documentation/InstanceRegistry';
import optionize, { type EmptySelfOptions } from '@/utils/phet-core/optionize';
import { Node, Path } from '@/utils/scenery/imports';
import volumeOffSolidShape from '@/utils/sherpa/fontawesome-5/volumeOffSolidShape';
import volumeUpSolidShape from '@/utils/sherpa/fontawesome-5/volumeUpSolidShape';
import BooleanRectangularToggleButton, { type BooleanRectangularToggleButtonOptions } from '@/utils/sun/buttons/BooleanRectangularToggleButton';
import PhetColorScheme from '@/utils/scenery-phet/PhetColorScheme';
import sceneryPhet from '@/utils/scenery-phet/sceneryPhet';
import SceneryPhetStrings from '@/utils/scenery-phet/SceneryPhetStrings';

// constants
const WIDTH = 45;
const HEIGHT = 45;
const MARGIN = 4;
const X_WIDTH = WIDTH * 0.25; // Empirically determined.

type SelfOptions = EmptySelfOptions;

export type SoundToggleButtonOptions = SelfOptions & BooleanRectangularToggleButtonOptions;

export default class SoundToggleButton extends BooleanRectangularToggleButton {

  private readonly disposeSoundToggleButton: () => void;

  public constructor(property: Property<boolean>, provideOptions?: SoundToggleButtonOptions) {

    const options = optionize<SoundToggleButtonOptions, SelfOptions, BooleanRectangularToggleButtonOptions>()({

      // BooleanRectangularToggleButtonOptions
      baseColor: PhetColorScheme.BUTTON_YELLOW,
      minWidth: WIDTH,
      minHeight: HEIGHT,
      xMargin: MARGIN,
      yMargin: MARGIN,
      tagName: 'button',
      innerContent: SceneryPhetStrings.a11y.soundToggle.labelStringProperty
    }, provideOptions);

    // 'on' icon is a font-awesome icon
    const soundOnNode = new Path(volumeUpSolidShape, {
      fill: 'black'
    });
    const contentScale = (WIDTH - (2 * MARGIN)) / soundOnNode.width;
    soundOnNode.scale(contentScale);

    // 'off' icon is a font-awesome icon, with an 'x' added to the right.
    const soundOffNode = new Node();
    soundOffNode.addChild(new Path(volumeOffSolidShape, {
      scale: contentScale,
      fill: 'black'
    }));
    const soundOffX = new Path(new Shape().moveTo(0, 0).lineTo(X_WIDTH, X_WIDTH).moveTo(0, X_WIDTH).lineTo(X_WIDTH, 0), {
      stroke: 'black',
      lineWidth: 3,
      right: soundOnNode.width, // position the 'x' so that both icons have the same width, see scenery/-phet#329
      centerY: soundOffNode.centerY
    });
    soundOffNode.addChild(soundOffX);

    super(property, soundOnNode, soundOffNode, options);

    // pdom attribute lets user know when the toggle is pressed
    const pressedListener = (value: boolean) => {
      this.setPDOMAttribute('aria-pressed', !value);
    };
    property.lazyLink(pressedListener);
    this.setPDOMAttribute('aria-pressed', !property.get());

    this.disposeSoundToggleButton = () => {
      property.unlink(pressedListener);
    };

    // support for binder documentation, stripped out in builds and only runs when ?binder is specified
    assert && phet.chipper.queryParameters.binder && InstanceRegistry.registerDataURL('scenery/-phet', 'SoundToggleButton', this);
  }

  public override dispose(): void {
    this.disposeSoundToggleButton();
    super.dispose();
  }
}

sceneryPhet.register('SoundToggleButton', SoundToggleButton);