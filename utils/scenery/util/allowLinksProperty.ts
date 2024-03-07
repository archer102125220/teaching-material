// Copyright 2022, University of Colorado Boulder

/**
 * Whether links should be openable
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
import BooleanProperty from '../../axon/BooleanProperty';
import Tandem from '../../tandem/Tandem';
import { scenery } from '../imports';

const allowLinksProperty = new BooleanProperty( !( window?.phet?.chipper?.queryParameters ) || ( window?.phet?.chipper?.queryParameters?.allowLinks ), {
  tandem: Tandem.GENERAL_MODEL.createTandem( 'allowLinksProperty' )
} );

scenery.register( 'allowLinksProperty', allowLinksProperty );

export default allowLinksProperty;
