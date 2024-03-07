// Copyright 2023, University of Colorado Boulder

/**
 * Property that is set to true when the PhET-iO State Engine is clearing dynamic elements.
 *
 * Marking if we are clearing dynamic elements from instrumented containers. This information is useful because certain
 * logic depends on whether we are setting PhET-iO state but also needs to know about when clearing dynamic elements
 * to handle it separately.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import tandemNamespace from './tandemNamespace';
import TinyProperty from '../axon/TinyProperty';

const isClearingPhetioDynamicElementsProperty = new TinyProperty(false);

tandemNamespace.register('isClearingPhetioDynamicElementsProperty', isClearingPhetioDynamicElementsProperty);

export default isClearingPhetioDynamicElementsProperty;
