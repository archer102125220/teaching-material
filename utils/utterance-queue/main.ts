// Copyright 2019-2022, University of Colorado Boulder

/**
 * Module that includes all Utterance Queue dependencies, so that requiring this module will return an object
 * that consists of the entire exported 'utteranceQueue' namespace API.
 *
 *@author Michael Kauzmann (PhET Interactive Simulations)
 *@author Taylor Want (PhET Interactive Simulations)
 */

import '@/utils/utterance-queue/ActivationUtterance';
import '@/utils/utterance-queue/Announcer';
import '@/utils/utterance-queue/AriaLiveAnnouncer';
import '@/utils/utterance-queue/responseCollector';
import '@/utils/utterance-queue/ResponsePacket';
import '@/utils/utterance-queue/ResponsePatternCollection';
import '@/utils/utterance-queue/SpeechSynthesisAnnouncer';
import '@/utils/utterance-queue/SpeechSynthesisParentPolyfill';
import '@/utils/utterance-queue/Utterance';
import '@/utils/utterance-queue/UtteranceQueue';
import '@/utils/utterance-queue/utteranceQueueNamespace';
import '@/utils/utterance-queue/UtteranceWrapper';
import '@/utils/utterance-queue/ValueChangeUtterance';
import utteranceQueueNamespace from '@/utils/utterance-queue/utteranceQueueNamespace';

// note: we don't need any of the other parts, we just need to specify them as dependencies so they fill in the scenery namespace
export default utteranceQueueNamespace;