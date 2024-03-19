// Copyright 2021-2023, University of Colorado Boulder

/**
 * MirrorScreen is the 'Mirror' screen.
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen, { type ScreenOptions } from '@/utils/joist/Screen';
import ScreenIcon from '@/utils/joist/ScreenIcon';
import GOColors from '@/utils/geometric-optics/common/GOColors';
import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import GeometricOpticsStrings from '@/utils/geometric-optics/GeometricOpticsStrings';
import MirrorModel from '@/utils/geometric-optics/mirror/model/MirrorModel';
import MirrorNode from '@/utils/geometric-optics/mirror/view/MirrorNode';
import MirrorScreenView from '@/utils/geometric-optics/mirror/view/MirrorScreenView';
import { type OpticSurfaceType } from '@/utils/geometric-optics/common/model/OpticSurfaceType';
import optionize from '@/utils/phet-core/optionize';
import type PickRequired from '@/utils/phet-core/types/PickRequired';
import { type GOSimOptions } from '@/utils/geometric-optics/GOSim';

type SelfOptions = PickRequired<GOSimOptions, 'isBasicsVersion'>;

type MirrorScreenOptions = SelfOptions & PickRequired<ScreenOptions, 'tandem' | 'createKeyboardHelpNode'>;

export default class MirrorScreen extends Screen<MirrorModel, MirrorScreenView> {

  public constructor(providedOptions: MirrorScreenOptions) {

    const options = optionize<MirrorScreenOptions, SelfOptions, ScreenOptions>()({

      // Screen options
      name: GeometricOpticsStrings.screen.mirrorStringProperty,
      homeScreenIcon: createScreenIcon(providedOptions.isBasicsVersion ? 'flat' : 'concave'),
      backgroundColorProperty: GOColors.screenBackgroundColorProperty,
      isDisposable: false
    }, providedOptions);

    super(
      () => new MirrorModel({
        isBasicsVersion: providedOptions.isBasicsVersion,
        tandem: options.tandem.createTandem('model')
      }),
      model => new MirrorScreenView(model, {
        isBasicsVersion: providedOptions.isBasicsVersion,
        tandem: options.tandem.createTandem('view')
      }),
      options
    );
  }
}

function createScreenIcon(opticSurfaceType: OpticSurfaceType): ScreenIcon {
  return new ScreenIcon(MirrorNode.createIconNode(opticSurfaceType), {
    fill: GOColors.screenBackgroundColorProperty
  });
}

geometricOptics.register('MirrorScreen', MirrorScreen);