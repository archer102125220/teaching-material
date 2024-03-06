// Copyright 2021-2022, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import simLauncher from '../joist/simLauncher';
import GeometricOpticsStrings from './GeometricOpticsStrings';
import GOSim from './GOSim';


export function GeometricOpticsInit(container: Element) {

  simLauncher.launch(() => {
    const sim = new GOSim(GeometricOpticsStrings['geometric-optics'].titleStringProperty, {
      isBasicsVersion: false,
      phetioDesigned: true
    }, { container });
    sim.start();
  });
}

export default GeometricOpticsInit;