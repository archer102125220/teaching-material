// Copyright 2018-2024, University of Colorado Boulder

/**
 * A trait for subtypes of Node, used to make the Node behave like a 'number' input with assistive technology.
 * An accessible number spinner behaves like:
 *
 * - Arrow keys increment/decrement the value by a specified step size.
 * - Page Up and Page Down increments/decrements value by an alternative step size, usually larger than default.
 * - Home key sets value to its minimum.
 * - End key sets value to its maximum.
 *
 * This number spinner is different than typical 'number' inputs because it does not support number key control. It
 * was determined that an input of type range is the best match for a PhET Number Spinner, with a custom role
 * description with aria-roledescription. See https://github.com/phetsims/sun/issues/497 for history on this
 * decision.
 *
 * This trait mixes in a "parent" mixin to handle general "value" formatting and aria-valuetext updating, see
 * AccessibleValueHandler.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Michael Barlow (PhET Interactive Simulations)
 */

import _ from 'lodash';

import CallbackTimer, { type CallbackTimerCallback } from '@/utils/axon/CallbackTimer';
import Emitter from '@/utils/axon/Emitter';
import validate from '@/utils/axon/validate';
import assertHasProperties from '@/utils/phet-core/assertHasProperties';
import type Constructor from '@/utils/phet-core/types/Constructor';
import type IntentionalAny from '@/utils/phet-core/types/IntentionalAny';
import { combineOptions } from '@/utils/phet-core/optionize';
import Orientation from '@/utils/phet-core/Orientation';
import { DelayedMutate, KeyboardUtils, Node, SceneryEvent, type TInputListener } from '@/utils/scenery/imports';
import sun from '@/utils/sun/sun';
import SunStrings from '@/utils/sun/SunStrings';
import AccessibleValueHandler, { type AccessibleValueHandlerOptions } from '@/utils/sun/accessibility/AccessibleValueHandler';
import type TEmitter from '@/utils/axon/TEmitter';

const ACCESSIBLE_NUMBER_SPINNER_OPTIONS = [
  'timerDelay',
  'timerInterval'
];

type SelfOptions = {
  // start to fire continuously after pressing for this long (milliseconds)
  timerDelay?: number;

  // fire continuously at this frequency (milliseconds),
  timerInterval?: number;
};

type AccessibleNumberSpinnerOptions = SelfOptions & AccessibleValueHandlerOptions;

/**
 * @param Type
 * @param optionsArgPosition - zero-indexed number that the options argument is provided at
 */
const AccessibleNumberSpinner = <SuperType extends Constructor<Node>>(Type: SuperType, optionsArgPosition: number) => { // eslint-disable-line @typescript-eslint/explicit-module-boundary-types

  const AccessibleNumberSpinnerClass = DelayedMutate('AccessibleNumberSpinner', ACCESSIBLE_NUMBER_SPINNER_OPTIONS, class AccessibleNumberSpinner extends AccessibleValueHandler(Type, optionsArgPosition) {

    // Manages timing must be disposed
    private readonly _callbackTimer: CallbackTimer;

    // emits events when increment and decrement actions occur, but only for changes
    // of keyboardStep and shiftKeyboardStep (not pageKeyboardStep)
    protected readonly incrementDownEmitter: TEmitter<[boolean]>;
    protected readonly decrementDownEmitter: TEmitter<[boolean]>;

    private _timerDelay = 400;
    private _timerInterval = 100;

    private readonly _disposeAccessibleNumberSpinner: () => void;

    public constructor(...args: IntentionalAny[]) {

      const providedOptions = args[optionsArgPosition] as AccessibleValueHandlerOptions;

      assert && providedOptions && assert(Object.getPrototypeOf(providedOptions) === Object.prototype,
        'Extra prototype on AccessibleSlider options object is a code smell (or probably a bug)');

      const options = combineOptions<AccessibleValueHandlerOptions>({
        ariaOrientation: Orientation.VERTICAL // by default, number spinners should be oriented vertically
      }, providedOptions);

      args[optionsArgPosition] = options;

      super(...args);

      // members of the Node API that are used by this trait
      assertHasProperties(this, ['addInputListener']);

      this._callbackTimer = new CallbackTimer({
        delay: this._timerDelay,
        interval: this._timerInterval
      });

      this.incrementDownEmitter = new Emitter({ parameters: [{ valueType: 'boolean' }] });
      this.decrementDownEmitter = new Emitter({ parameters: [{ valueType: 'boolean' }] });

      this.setPDOMAttribute('aria-roledescription', SunStrings.a11y.numberSpinnerRoleDescriptionStringProperty);

      // a callback that is added and removed from the timer depending on keystate
      let downCallback: CallbackTimerCallback | null = null;
      let runningTimerCallbackEvent: Event | null = null; // {Event|null}

      // handle all accessible event input
      const accessibleInputListener: TInputListener = {
        keydown: event => {
          if (this.enabledProperty.get()) {

            // check for relevant keys here
            if (KeyboardUtils.isRangeKey(event.domEvent)) {

              const domEvent = event.domEvent!;

              // If the meta key is down we will not even call the keydown listener of the supertype, so we need
              // to be sure that default behavior is prevented so we don't receive `input` and `change` events.
              // See AccessibleValueHandler.handleInput for information on these events and why we don't want
              // to change in response to them.
              domEvent.preventDefault();

              // When the meta key is down Mac will not send keyup events so do not change values or add timer
              // listeners because they will never be removed since we fail to get a keyup event. See
              if (!domEvent.metaKey) {
                if (!this._callbackTimer.isRunning()) {
                  this._accessibleNumberSpinnerHandleKeyDown(event);

                  downCallback = this._accessibleNumberSpinnerHandleKeyDown.bind(this, event);
                  runningTimerCallbackEvent = domEvent;
                  this._callbackTimer.addCallback(downCallback);
                  this._callbackTimer.start();
                }
              }
            }
          }
        },
        keyup: event => {

          const key = KeyboardUtils.getEventCode(event.domEvent);

          if (KeyboardUtils.isRangeKey(event.domEvent)) {
            if (runningTimerCallbackEvent && key === KeyboardUtils.getEventCode(runningTimerCallbackEvent)) {
              this._emitKeyState(event.domEvent!, false);
              this._callbackTimer.stop(false);
              window.assert && window.assert(downCallback);
              this._callbackTimer.removeCallback(downCallback!);
              downCallback = null;
              runningTimerCallbackEvent = null;
            }

            this.handleKeyUp(event);
          }
        },
        blur: event => {

          // if a key is currently down when focus leaves the spinner, stop callbacks and emit that the
          // key is up
          if (downCallback) {
            window.assert && window.assert(runningTimerCallbackEvent !== null, 'key should be down if running downCallback');

            this._emitKeyState(runningTimerCallbackEvent!, false);
            this._callbackTimer.stop(false);
            this._callbackTimer.removeCallback(downCallback);
          }

          this.handleBlur(event);
        },
        input: this.handleInput.bind(this),
        change: this.handleChange.bind(this)
      };
      this.addInputListener(accessibleInputListener);

      this._disposeAccessibleNumberSpinner = () => {
        this._callbackTimer.dispose();

        // emitters owned by this instance, can be disposed here
        this.incrementDownEmitter.dispose();
        this.decrementDownEmitter.dispose();

        this.removeInputListener(accessibleInputListener);
      };
    }

    public set timerDelay(value: number) {
      this._timerDelay = value;

      if (this._callbackTimer) {
        this._callbackTimer.delay = value;
      }
    }

    public get timerDelay(): number {
      return this._timerDelay;
    }

    public set timerInterval(value: number) {
      this._timerInterval = value;

      if (this._callbackTimer) {
        this._callbackTimer.interval = value;
      }
    }

    public get timerInterval(): number {
      return this._timerInterval;
    }

    /**
     * Handle the keydown event and emit events related to the user interaction. Ideally, this would
     * override AccessibleValueHandler.handleKeyDown, but overriding is not supported with PhET Trait pattern.
     */

    private _accessibleNumberSpinnerHandleKeyDown(event: SceneryEvent<KeyboardEvent>): void {
      window.assert && window.assert(event.domEvent, 'must have a domEvent');
      this.handleKeyDown(event);
      this._emitKeyState(event.domEvent!, true);
    }

    /**
     * Emit events related to the keystate of the spinner. Typically used to style the spinner during keyboard
     * interaction.
     *
     * @param domEvent - the code of the key changing state
     * @param isDown - whether or not event was triggered from down or up keys
     */

    private _emitKeyState(domEvent: Event, isDown: boolean): void {
      validate(domEvent, { valueType: Event });
      if (KeyboardUtils.isAnyKeyEvent(domEvent, [KeyboardUtils.KEY_UP_ARROW, KeyboardUtils.KEY_RIGHT_ARROW])) {
        this.incrementDownEmitter.emit(isDown);
      }
      else if (KeyboardUtils.isAnyKeyEvent(domEvent, [KeyboardUtils.KEY_DOWN_ARROW, KeyboardUtils.KEY_LEFT_ARROW])) {
        this.decrementDownEmitter.emit(isDown);
      }
    }

    public override dispose(): void {
      this._disposeAccessibleNumberSpinner();

      super.dispose();
    }
  });

  /**
   * {Array.<string>} - String keys for all the allowed options that will be set by Node.mutate( options ), in
   * the order they will be evaluated.
   *
   * NOTE: See Node's _mutatorKeys documentation for more information on how this operates, and potential special
   *       cases that may apply.
   */
  AccessibleNumberSpinnerClass.prototype._mutatorKeys = ACCESSIBLE_NUMBER_SPINNER_OPTIONS.concat(AccessibleNumberSpinnerClass.prototype._mutatorKeys);

  window.assert && window.assert(AccessibleNumberSpinnerClass.prototype._mutatorKeys.length === _.uniq(AccessibleNumberSpinnerClass.prototype._mutatorKeys).length, 'duplicate mutator keys in AccessibleNumberSpinner');

  return AccessibleNumberSpinnerClass;
};

sun.register('AccessibleNumberSpinner', AccessibleNumberSpinner);

export default AccessibleNumberSpinner;
export type { AccessibleNumberSpinnerOptions };