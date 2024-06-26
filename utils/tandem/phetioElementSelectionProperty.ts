// Copyright 2023, University of Colorado Boulder

/**
 * Property that controls the selection view of PhET-iO Elements, predominately in Studio.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Property from '@/utils/axon/Property';
import Tandem from '@/utils/tandem/Tandem';
import tandemNamespace from '@/utils/tandem/tandemNamespace';
import StringIO from '@/utils/tandem/types/StringIO';

export const PhetioElementSelectionValues = [
  'view', // Select the view element under the mouse
  'linked', // Map to the linked element if possible
  'string', // Only string elements are selectable
  'none' // No selection
] as const;

export type PhetioElementSelection = (typeof PhetioElementSelectionValues)[number];

const phetioElementSelectionProperty = new Property<PhetioElementSelection>('none', {
  tandem: Tandem.GENERAL_VIEW.createTandem('phetioElementSelectionProperty'),
  phetioValueType: StringIO,
  validValues: PhetioElementSelectionValues,
  phetioState: false,
  phetioDocumentation: 'Specifies how PhET-iO Elements are being selected. "view": the target view element, ' +
    '"linked": the corresponding linked element of the view element (if there is one), "string": ' +
    'select only string elements in the sim, "none": no active selection.'
});

tandemNamespace.register('phetioElementSelectionProperty', phetioElementSelectionProperty);

export default phetioElementSelectionProperty;
