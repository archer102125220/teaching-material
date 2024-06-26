// Copyright 2020-2023, University of Colorado Boulder

/**
 * Output deprecation warnings to console.warn when ?deprecationWarnings is specified
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import phetCore from '@/utils/phet-core/phetCore';

console.log('phet-core/deprecationWarning.ts');

// contains all messages printed for deprecation warnings so that we do not print the same message multiple times
const deprecatedMessages: Record<string, true> = {};

const deprecationWarning = (message: string,
  showDeprecationWarnings: boolean = window.phet && window.phet.chipper &&
    window.phet.chipper.queryParameters &&
    window.phet.chipper.queryParameters.deprecationWarnings): void => {
  if (showDeprecationWarnings && !deprecatedMessages.hasOwnProperty(message)) {
    deprecatedMessages[message] = true;
    console.warn(`Deprecation warning: ${message}`);
  }
};

phetCore.register('deprecationWarning', deprecationWarning);

export default deprecationWarning;