// Copyright 2021-2022, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Initializer from '@/utils/Initializer';

import simLauncher from '@/utils/joist/simLauncher';
import GeometricOpticsStrings from '@/utils/geometric-optics/GeometricOpticsStrings';
import GOSim from '@/utils/geometric-optics/GOSim';


export async function GeometricOpticsInit(container: Element): Promise<{ simLauncher: typeof simLauncher, sim: GOSim }> {
  await Initializer.initGeometricOptics();

  return new Promise((resolve, reject) => {
    try {
      simLauncher.launch(() => {
        try {
          const sim = simLauncherLaunch(container);
          resolve({ simLauncher, sim });
        } catch (_error) {
          reject(_error);
          // try {
          //   const sim = simLauncherLaunch(container);
          //   resolve({ simLauncher, sim });
          // } catch (error) {
          //   reject(error);
          // }
        }
      });

      // resolve({ simLauncher, sim: GOSim });
    } catch (error) {
      reject(error);
    }
  });
}

function simLauncherLaunch(container: Element) {
  const sim = new GOSim(GeometricOpticsStrings['geometric-optics'].titleStringProperty, {
    isBasicsVersion: false,
    phetioDesigned: true
  }, { container });
  console.log({ sim });
  // sim.start();
  return sim;
}

export default GeometricOpticsInit;