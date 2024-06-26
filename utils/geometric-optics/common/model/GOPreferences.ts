// Copyright 2021-2023, University of Colorado Boulder

/**
 * GOPreferences is the model for sim-specific preferences, accessed via the Preferences dialog.
 * These preferences are global, and affect all screens.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Tandem from '@/utils/tandem/Tandem';
import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import GOQueryParameters from '@/utils/geometric-optics/common/GOQueryParameters';
import { type FocalLengthModelType, FocalLengthModelTypeValues } from '@/utils/geometric-optics/common/model/FocalLengthModelType';
import BooleanProperty from '@/utils/axon/BooleanProperty';
import StringUnionProperty from '@/utils/axon/StringUnionProperty';

const GOPreferences = {

  add2FPointsCheckboxProperty: new BooleanProperty(GOQueryParameters.add2FPointsCheckbox, {
    tandem: Tandem.PREFERENCES.createTandem('add2FPointsCheckboxProperty'),
    phetioFeatured: true,
    phetioDocumentation: 'adds a "2F Points" checkbox to the control panels'
  }),

  cueingArrowsEnabledProperty: new BooleanProperty(GOQueryParameters.cueingArrowsEnabled, {
    tandem: Tandem.PREFERENCES.createTandem('cueingArrowsEnabledProperty'),
    phetioFeatured: true,
    phetioDocumentation: 'shows cueing arrows on draggable elements'
  }),

  focalLengthModelTypeProperty:
    new StringUnionProperty<FocalLengthModelType>(GOQueryParameters.focalLengthControl as FocalLengthModelType, {
      validValues: FocalLengthModelTypeValues,
      tandem: Tandem.PREFERENCES.createTandem('focalLengthModelTypeProperty'),
      phetioFeatured: true,
      phetioDocumentation: 'Determines how focal length is modeled and controlled in the Lens and Mirror screens.<br>' +
        'This can also be set via the focalLengthControl query parameter.<br>' +
        'The values are:' +
        '<ul/>' +
        '<li>direct: provides a control labeled "Focal Length"</li>' +
        '<li>indirect: provides controls for other optic parameters, from which focal length is derived</li>' +
        '</ul>'

    })
};

geometricOptics.register('GOPreferences', GOPreferences);
export default GOPreferences;