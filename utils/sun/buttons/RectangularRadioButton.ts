// Copyright 2014-2023, University of Colorado Boulder

/**
 * RectangularRadioButton is a single rectangular radio button. It typically appears as part of a
 * RectangularRadioButtonGroup, but can be used in other context.
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */

import Emitter from '@/utils/axon/Emitter';
import type TEmitter from '@/utils/axon/TEmitter';
import type TProperty from '@/utils/axon/TProperty';
import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';
import optionize from '@/utils/phet-core/optionize';
import { Color, Node, type PaintableNode, PaintColorProperty } from '@/utils/scenery/imports';
import type TSoundPlayer from '@/utils/tambo/TSoundPlayer';
import pushButtonSoundPlayer from '@/utils/tambo/shared-sound-players/pushButtonSoundPlayer';
import EventType from '@/utils/tandem/EventType';
import PhetioObject from '@/utils/tandem/PhetioObject';
import Tandem from '@/utils/tandem/Tandem';
import ColorConstants from '@/utils/sun/ColorConstants';
import sun from '@/utils/sun/sun';
import ButtonModel from '@/utils/sun/buttons/ButtonModel';
import RadioButtonInteractionState from '@/utils/sun/buttons/RadioButtonInteractionState';
import RadioButtonInteractionStateProperty from '@/utils/sun/buttons/RadioButtonInteractionStateProperty';
import RectangularButton, { type RectangularButtonOptions } from '@/utils/sun/buttons/RectangularButton';
import type TButtonAppearanceStrategy from '@/utils/sun/buttons/TButtonAppearanceStrategy';
import type { TButtonAppearanceStrategyOptions } from '@/utils/sun/buttons/TButtonAppearanceStrategy';
import type TContentAppearanceStrategy from '@/utils/sun/buttons/TContentAppearanceStrategy';
import type { TContentAppearanceStrategyOptions } from '@/utils/sun/buttons/TContentAppearanceStrategy';
import type StrictOmit from '@/utils/phet-core/types/StrictOmit';

type SelfOptions = {

  // Sound generation - If set to null a default will be used that is based on this button's position within the radio
  // button group.  Can be set to nullSoundPlayer to turn off all sound generation.
  soundPlayer?: TSoundPlayer | null;
};

export type RectangularRadioButtonOptions = SelfOptions &
  // These options are not appropriate for radio buttons, see https://github.com/phetsims/sun/issues/847
  StrictOmit<RectangularButtonOptions, 'enabledProperty' | 'enabled'>;

export default class RectangularRadioButton<T> extends RectangularButton {

  // the Property this button changes
  public readonly property: TProperty<T>;

  // the value that is set to the Property when this button is pressed
  public readonly value: T;

  public readonly interactionStateProperty: RadioButtonInteractionStateProperty<T>;

  private readonly firedEmitter: TEmitter;

  private readonly disposeRectangularRadioButton: () => void;

  public static readonly TANDEM_NAME_SUFFIX = 'RadioButton';

  /**
   * @param property - axon Property that can take on a set of values, one for each radio button in the group
   * @param value - value when this radio button is selected
   * @param providedOptions
   */
  public constructor(property: TProperty<T>, value: T, providedOptions?: RectangularRadioButtonOptions) {

    const options = optionize<RectangularRadioButtonOptions, SelfOptions, RectangularButtonOptions>()({

      // SelfOptions
      soundPlayer: null,

      // RectangularButtonOptions
      baseColor: ColorConstants.LIGHT_BLUE,
      buttonAppearanceStrategy: RectangularRadioButton.FlatAppearanceStrategy,
      buttonAppearanceStrategyOptions: {
        overButtonOpacity: 0.8,
        overStroke: null,
        selectedStroke: Color.BLACK,
        selectedLineWidth: 1.5,
        selectedButtonOpacity: 1,
        deselectedStroke: new Color(50, 50, 50),
        deselectedLineWidth: 1,
        deselectedButtonOpacity: 0.6
      },
      contentAppearanceStrategy: RectangularRadioButton.ContentAppearanceStrategy,
      contentAppearanceStrategyOptions: {
        overContentOpacity: 0.8,
        selectedContentOpacity: 1,
        deselectedContentOpacity: 0.6
      },

      // pdom
      tagName: 'input',
      inputType: 'radio',
      labelTagName: 'label',
      containerTagName: 'li',
      appendDescription: true,
      appendLabel: true,

      // phet-io
      tandem: Tandem.REQUIRED,
      tandemNameSuffix: 'Button',
      phetioReadOnly: PhetioObject.DEFAULT_OPTIONS.phetioReadOnly // to support properly passing this to children, see https://github.com/phetsims/tandem/issues/60
    }, providedOptions);

    window.assert && window.assert(!options.tandem.supplied || options.tandem.name.endsWith(RectangularRadioButton.TANDEM_NAME_SUFFIX),
      `RectangularRadioButton tandem.name must end with ${RectangularRadioButton.TANDEM_NAME_SUFFIX}: ${options.tandem.phetioID}`);

    // ButtonModel is responsible for enabledProperty, so propagate enabledPropertyOptions.
    // tandem is also propagated because we want enabledProperty to appear as a child of this button.
    // Since enabledProperty is unrelated to the look of the button when selected/deselected, we've also included
    // phetioEnabledPropertyInstrumented so that one can opt out of this potentially confusing instrumentation.
    // See https://github.com/phetsims/sun/issues/847.
    const buttonModel = new ButtonModel({
      enabledPropertyOptions: options.enabledPropertyOptions,
      tandem: options.tandem,
      phetioEnabledPropertyInstrumented: options.phetioEnabledPropertyInstrumented
    });

    const interactionStateProperty = new RadioButtonInteractionStateProperty(buttonModel, property, value);

    super(buttonModel, interactionStateProperty, options);

    // for use in RectangularRadioButtonGroup for managing the labels
    this.interactionStateProperty = interactionStateProperty;

    // pdom - Specify the default value for assistive technology, this attribute is needed in addition to
    // the 'checked' Property to mark this element as the default selection since 'checked' may be set before
    // we are finished adding RectangularRadioButtons to the RectangularRadioButtonGroup.
    if (property.value === value) {
      this.setPDOMAttribute('checked', 'checked');
    }

    // pdom - when the Property changes, make sure the correct radio button is marked as 'checked' so that this button
    // receives focus on 'tab'
    const pdomCheckedListener = (newValue: T) => {
      this.pdomChecked = (newValue === value);
    };
    property.link(pdomCheckedListener);

    this.property = property;
    this.value = value;
    this.firedEmitter = new Emitter({
      tandem: options.tandem.createTandem('firedEmitter'),
      phetioDocumentation: 'Emits when the radio button is pressed',
      phetioReadOnly: options.phetioReadOnly,
      phetioEventType: EventType.USER
    });

    this.firedEmitter.addListener(() => property.set(value));

    // When the button model triggers an event, fire from the radio button
    buttonModel.downProperty.link(down => {
      if (!down && (buttonModel.overProperty.get() || buttonModel.focusedProperty.get()) && !buttonModel.interrupted) {
        this.fire();
        this.voicingSpeakFullResponse({
          hintResponse: null
        });
      }
    });

    // sound generation
    const soundPlayer = options.soundPlayer || pushButtonSoundPlayer;
    const playSound = () => { soundPlayer.play(); };
    buttonModel.produceSoundEmitter.addListener(playSound);

    this.disposeRectangularRadioButton = () => {
      property.unlink(pdomCheckedListener);
      this.firedEmitter.dispose();
      buttonModel.produceSoundEmitter.removeListener(playSound);
      buttonModel.dispose();
      this.interactionStateProperty.dispose();
    };
  }

  public override dispose(): void {
    this.disposeRectangularRadioButton();
    super.dispose();
  }

  /**
   * fire on up if the button is enabled, public for use in the accessibility tree
   */
  public fire(): void {
    if (this.buttonModel.enabledProperty.get()) {
      this.firedEmitter.emit();
      this.buttonModel.produceSoundEmitter.emit();
    }
  }

  /**
   * FlatAppearanceStrategy is a value for RectangularRadioButton options.buttonAppearanceStrategy. It makes radio buttons
   * that look flat, i.e. no shading or highlighting, but that change color on mouseover, press, selected, etc.
   */
  public static override readonly FlatAppearanceStrategy: TButtonAppearanceStrategy = class FlatAppearanceStrategy {

    public readonly maxLineWidth: number;

    private readonly disposeFlatAppearanceStrategy: () => void;

    /**
     * buttonBackground is the Node for the button's background, sans content
     */
    public constructor(buttonBackground: PaintableNode,
      interactionStateProperty: TReadOnlyProperty<RadioButtonInteractionState>,
      baseColorProperty: TReadOnlyProperty<Color>,
      providedOptions?: TButtonAppearanceStrategyOptions) {

      const options = optionize<TButtonAppearanceStrategyOptions>()({
        stroke: baseColorProperty,
        lineWidth: 1,
        deselectedButtonOpacity: 1,
        deselectedLineWidth: 1,
        deselectedStroke: 'gray',
        overButtonOpacity: 0.8,
        overFill: null,
        overLineWidth: 0,
        overStroke: null,
        selectedButtonOpacity: 1,
        selectedLineWidth: 1,
        selectedStroke: 'black'
      }, providedOptions);

      // Dynamic fills and strokes
      const pressedFillProperty = new PaintColorProperty(baseColorProperty, {
        luminanceFactor: -0.4
      });
      const overFillProperty = new PaintColorProperty(options.overFill || baseColorProperty, {
        luminanceFactor: providedOptions && providedOptions.overFill ? 0 : 0.4
      });

      // Editorial Note: The code below, where the deselected stroke is used as the value for the over stroke if no over
      // stroke is provided, seems a bit odd.  However, I (jbphet) tried removing it when refactoring this to support
      // TypeScript, and a number of sims broke.  The code was reviewed and discussed with some other devs, and we
      // decided to leave it as is, despite it being a bit unintuitive.  See https://github.com/phetsims/sun/issues/772.
      const overStrokeProperty = new PaintColorProperty(options.overStroke || options.deselectedStroke, {
        luminanceFactor: providedOptions && providedOptions.overStroke ? 0 : -0.4
      });

      this.maxLineWidth = Math.max(options.selectedLineWidth, options.deselectedLineWidth, options.overLineWidth);

      // Cache colors
      buttonBackground.cachedPaints = [
        baseColorProperty, overFillProperty, pressedFillProperty, overStrokeProperty, options.selectedStroke, options.deselectedStroke
      ];

      // Change colors and opacity to match interactionState
      function interactionStateListener(interactionState: RadioButtonInteractionState): void {
        switch (interactionState) {

          case RadioButtonInteractionState.SELECTED:
            buttonBackground.fill = baseColorProperty;
            buttonBackground.stroke = options.selectedStroke;
            buttonBackground.lineWidth = options.selectedLineWidth;
            buttonBackground.opacity = options.selectedButtonOpacity;
            break;

          case RadioButtonInteractionState.DESELECTED:
            buttonBackground.fill = baseColorProperty;
            buttonBackground.stroke = options.deselectedStroke;
            buttonBackground.lineWidth = options.deselectedLineWidth;
            buttonBackground.opacity = options.deselectedButtonOpacity;
            break;

          case RadioButtonInteractionState.OVER:
            buttonBackground.fill = overFillProperty;
            buttonBackground.stroke = overStrokeProperty;
            buttonBackground.lineWidth = Math.max(options.overLineWidth, options.deselectedLineWidth);
            buttonBackground.opacity = options.overButtonOpacity;
            break;

          case RadioButtonInteractionState.PRESSED:
            buttonBackground.fill = pressedFillProperty;
            buttonBackground.stroke = options.deselectedStroke;
            buttonBackground.lineWidth = options.deselectedLineWidth;
            buttonBackground.opacity = options.selectedButtonOpacity;
            break;

          default:
            throw new Error(`unsupported interactionState: ${interactionState}`);
        }
      }

      interactionStateProperty.link(interactionStateListener);

      this.disposeFlatAppearanceStrategy = () => {
        if (interactionStateProperty.hasListener(interactionStateListener)) {
          interactionStateProperty.unlink(interactionStateListener);
        }
        overStrokeProperty.dispose();
        overFillProperty.dispose();
        pressedFillProperty.dispose();
      };
    }

    public dispose(): void {
      this.disposeFlatAppearanceStrategy();
    }
  };

  /**
   * ContentAppearanceStrategy is a value for RectangularRadioButton options.contentAppearanceStrategy. It changes
   * their look based on the value of interactionStateProperty.
   */
  public static readonly ContentAppearanceStrategy: TContentAppearanceStrategy = class ContentAppearanceStrategy {

    private readonly disposeContentAppearanceStrategy: () => void;

    public constructor(content: Node,
      interactionStateProperty: TReadOnlyProperty<RadioButtonInteractionState>,
      providedOptions?: TContentAppearanceStrategyOptions) {

      const options = optionize<TContentAppearanceStrategyOptions>()({
        deselectedContentOpacity: 1,
        overContentOpacity: 1,
        selectedContentOpacity: 1
      }, providedOptions);

      // The button is not the parent of the content, therefore it is necessary to set the opacity on the content separately
      function handleInteractionStateChanged(state: RadioButtonInteractionState): void {
        if (content !== null) {
          switch (state) {

            case RadioButtonInteractionState.DESELECTED:
              content.opacity = options.deselectedContentOpacity;
              break;

            // mouseover for deselected buttons
            case RadioButtonInteractionState.OVER:
              content.opacity = options.overContentOpacity;
              break;

            case RadioButtonInteractionState.SELECTED:
              content.opacity = options.selectedContentOpacity;
              break;

            case RadioButtonInteractionState.PRESSED:
              content.opacity = options.deselectedContentOpacity;
              break;

            default:
              throw new Error(`unsupported state: ${state}`);
          }
        }
      }

      interactionStateProperty.link(handleInteractionStateChanged);

      this.disposeContentAppearanceStrategy = () => {
        if (interactionStateProperty.hasListener(handleInteractionStateChanged)) {
          interactionStateProperty.unlink(handleInteractionStateChanged);
        }
      };
    }

    public dispose(): void {
      this.disposeContentAppearanceStrategy();
    }
  };
}

sun.register('RectangularRadioButton', RectangularRadioButton);
