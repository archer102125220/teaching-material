// Copyright 2021-2023, University of Colorado Boulder

/**
 * Logs a global variable by converting it to JSON, then writing to window.phet.log. If the global is undefined,
 * the log will show 'undefined'.  This is currently used to log a collection of query parameters (which exist
 * as globals), but could be applied to other globals.  If window.phet.log is undefined, this is a no-op.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import getGlobal from '@/utils/phet-core/getGlobal';
import phetCore from '@/utils/phet-core/phetCore';

/**
 * @param globalString - the name of the global
 */
function logGlobal(globalString: string): void {
  window.phet.log && window.phet.log(`${globalString}: ${JSON.stringify(getGlobal(globalString), null, 2)}`);
}

phetCore.register('logGlobal', logGlobal);

export default logGlobal;