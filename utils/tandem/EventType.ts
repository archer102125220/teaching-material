// Copyright 2019-2022, University of Colorado Boulder

/**
 * This characterizes events that may be emitted from PhetioObjects to the PhET-iO data stream.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import Enumeration from '@/utils/phet-core/Enumeration';
import EnumerationValue from '@/utils/phet-core/EnumerationValue';
import TandemConstants from '@/utils/tandem/TandemConstants';
import tandemNamespace from '@/utils/tandem/tandemNamespace';
import EnumerationIO from '@/utils/tandem/types/EnumerationIO';

class EventType extends EnumerationValue {

  // The user has taken an action, such as pressing a button or moving a mouse
  public static readonly USER = new EventType();

  // An event was produced by the simulation model. This could be in response to a user event, or something that happens
  // during the simulation step. Note the separation is not model vs view, but user-driven vs automatic.
  public static readonly [TandemConstants.EVENT_TYPE_MODEL] = new EventType();

  // An event was triggered by the PhET-iO wrapper, via PhetioEngineIO.triggerEvent
  public static readonly WRAPPER = new EventType();

  // These messages are suppressed, use this to opt a PhetioObject out of the data stream feature.
  public static readonly OPT_OUT = new EventType();

  public static readonly enumeration = new Enumeration(EventType);
  public static readonly phetioType = EnumerationIO(EventType);
}

tandemNamespace.register('EventType', EventType);
export default EventType;