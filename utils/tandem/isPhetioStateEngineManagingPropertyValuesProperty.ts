// Copyright 2023, University of Colorado Boulder

/**
 * Property that is set to true when the PhET-iO State Engine is managing Property values, see ReadOnlyProperty.set()
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import tandemNamespace from '@/utils/tandem/tandemNamespace';
import TinyProperty from '@/utils/axon/TinyProperty';

const isPhetioStateEngineManagingPropertyValuesProperty = new TinyProperty(false);

tandemNamespace.register('isPhetioStateEngineManagingPropertyValuesProperty', isPhetioStateEngineManagingPropertyValuesProperty);

export default isPhetioStateEngineManagingPropertyValuesProperty;