// Copyright 2017-2023, University of Colorado Boulder

/**
 * Semi-transparent black barrier used to block input events when a dialog (or other popup) is present, and fade out
 * the background.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import { FireListener, Plane, type PlaneOptions } from '../scenery/imports';
import EventType from '../tandem/EventType';
import dotRandom from '../dot/dotRandom';
import sceneryPhet from './sceneryPhet';
import { type ObservableArray } from '../axon/createObservableArray';
import { type PopupableNode } from '../sun/Popupable';
import optionize, { type EmptySelfOptions } from '../phet-core/optionize';
import Tandem from '../tandem/Tandem';

type SelfOptions = EmptySelfOptions;

export type BarrierRectangleOptions = SelfOptions & PlaneOptions;

export default class BarrierRectangle extends Plane {

  private readonly disposeBarrierRectangle: () => void;

  public constructor(modalNodeStack: ObservableArray<PopupableNode>, providedOptions?: BarrierRectangleOptions) {

    const options = optionize<BarrierRectangleOptions, SelfOptions, PlaneOptions>()({
      fill: 'rgba( 0, 0, 0, 0.3 )',
      pickable: true,
      phetioReadOnly: true, // Disable controls in the PhET-iO Studio wrapper
      phetioEventType: EventType.USER,
      visiblePropertyOptions: {
        phetioState: false
      }
    }, providedOptions);

    super(options);

    const lengthListener = (numberOfBarriers: number) => {
      this.visible = (numberOfBarriers > 0);
    };
    modalNodeStack.lengthProperty.link(lengthListener);

    this.addInputListener(new FireListener({
      tandem: Tandem.OPT_OUT,
      phetioReadOnly: options.phetioReadOnly,
      fire() {
        assert && assert(modalNodeStack.length > 0, 'There must be a Node in the stack to hide.');

        // If fuzzing is enabled, close popups with a reduced probability, to improve testing coverage.
        // As of this writing, this addresses Dialogs and the PhET menu.
        // See https://github.com/phetsims/aqua/issues/136
        if (!phet.chipper.isFuzzEnabled() || dotRandom.nextDouble() < 0.005) {
          modalNodeStack.get(modalNodeStack.length - 1).hide();
        }
      }
    }));

    this.disposeBarrierRectangle = () => {
      if (modalNodeStack.lengthProperty.hasListener(lengthListener)) {
        modalNodeStack.lengthProperty.unlink(lengthListener);
      }
    };
  }

  public override dispose(): void {
    this.disposeBarrierRectangle();
    super.dispose();
  }
}

sceneryPhet.register('BarrierRectangle', BarrierRectangle);