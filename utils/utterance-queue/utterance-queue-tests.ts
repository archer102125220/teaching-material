// Copyright 2019-2023, University of Colorado Boulder

/**
 * Unit tests for utterance-queue.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import qunitStart from '@/utils/chipper/sim-tests/qunitStart';
import '@/utils/utterance-queue/ResponsePacketTests';
import '@/utils/utterance-queue/UtteranceTests';
import '@/utils/utterance-queue/UtteranceQueueTests';

// Since our tests are loaded asynchronously, we must direct QUnit to begin the tests
qunitStart();