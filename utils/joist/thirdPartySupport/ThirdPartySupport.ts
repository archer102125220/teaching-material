// Copyright 2017-2022, University of Colorado Boulder

/**
 * Enumeration of third parties that PhET supports.  Each third party has its own type that sets up listeners for
 * communication between third party frames and the simulation.
 *
 * @author Jesse Greenberg
 */

import joist from '@/utils/joist/joist';
import LegendsOfLearningSupport from '@/utils/joist/thirdPartySupport/LegendsOfLearningSupport';

const ThirdPartySupport = {
  legendsOfLearning: LegendsOfLearningSupport
};

// verify that enum is immutable, without the runtime penalty in production code
if (window.assert) { Object.freeze(ThirdPartySupport); }

joist.register('ThirdPartySupport', ThirdPartySupport);

export default ThirdPartySupport;