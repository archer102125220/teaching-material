// Copyright 2013-2022, University of Colorado Boulder

/**
 * Module that includes all axon dependencies, so that requiring this module will return an object
 * that consists of the entire exported 'axon' namespace API.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import '@/utils/axon/animationFrameTimer';
import axon from '@/utils/axon/axon';
import '@/utils/axon/BooleanProperty';
import '@/utils/axon/CallbackTimer';
import '@/utils/axon/createObservableArray';
import '@/utils/axon/DerivedProperty';
import '@/utils/axon/DynamicProperty';
import '@/utils/axon/Emitter';
import '@/utils/axon/EnumerationDeprecatedProperty';
import '@/utils/axon/MappedProperty';
import '@/utils/axon/Multilink';
import '@/utils/axon/NumberProperty';
import '@/utils/axon/PatternStringProperty';
import '@/utils/axon/Property';
import '@/utils/axon/PropertyStateHandler';
import '@/utils/axon/propertyStateHandlerSingleton';
import '@/utils/axon/PropertyStatePhase';
import '@/utils/axon/stepTimer';
import '@/utils/axon/StringProperty';
import '@/utils/axon/Timer';
import '@/utils/axon/TinyEmitter';
import '@/utils/axon/TinyForwardingProperty';
import '@/utils/axon/TinyOverrideProperty';
import '@/utils/axon/TinyProperty';
import '@/utils/axon/TinyStaticProperty';
import '@/utils/axon/UnitConversionProperty';
import '@/utils/axon/units';
import '@/utils/axon/validate';
import '@/utils/axon/Validation';

export default axon;