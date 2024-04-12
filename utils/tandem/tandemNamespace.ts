// Copyright 2015-2022, University of Colorado Boulder

/**
 * Creates the namespace for this repository.  By convention, this should have been declared in a file "tandem.js"
 * But that filename was already used for Tandem.js, so we use the alternate convention discussed in:
 * https://github.com/phetsims/tandem/issues/5#issuecomment-162597651
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Namespace from '@/utils/phet-core/Namespace';

console.log('tandem/tandemNamespace.ts');

// import Tandem from '@/utils/tandem/Tandem';
// import CouldNotYetDeserializeError from '@/utils/tandem/CouldNotYetDeserializeError';
// import DescriptionRegistry from '@/utils/tandem/DescriptionRegistry';
// import DynamicTandem from '@/utils/tandem/DynamicTandem';

// export class TandemNamespace extends Namespace {
//   public constructor() {
//     super('tandem');
//     this.register('Tandem', Tandem);
//     this.register('CouldNotYetDeserializeError', CouldNotYetDeserializeError);
//     this.register('DescriptionRegistry', DescriptionRegistry);
//     this.register('DynamicTandem', DynamicTandem);
//   }
// }

// export const tandemNamespace = new TandemNamespace();

// export default tandemNamespace;

export default new Namespace('tandem');