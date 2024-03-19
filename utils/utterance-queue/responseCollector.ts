// Copyright 2021-2023, University of Colorado Boulder

/**
 * Manages output of responses for the Voicing feature. First, see SCENERY/Voicing.ts for a description of what that includes.
 * This singleton is responsible for controlling when responses of each category are spoken when speech is
 * requested for a Node composed with Voicing.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import BooleanProperty from '@/utils/axon/BooleanProperty';
import StringUtils from '@/utils/phetcommon/util/StringUtils';
import utteranceQueueNamespace from '@/utils/utterance-queue/utteranceQueueNamespace';
import ResponsePacket, { type SpeakableNullableResolvedOptions } from '@/utils/utterance-queue/ResponsePacket';
import ResponsePatternCollection from '@/utils/utterance-queue/ResponsePatternCollection';
import Property from '@/utils/axon/Property';
import { optionize3 } from '@/utils/phet-core/optionize';
import PhetioObject, { type PhetioObjectOptions } from '@/utils/tandem/PhetioObject';
import type PickRequired from '@/utils/phet-core/types/PickRequired';

type ResponseCollectorOptions = PhetioObjectOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

class ResponseCollector extends PhetioObject {
  public nameResponsesEnabledProperty: Property<boolean>;
  public objectResponsesEnabledProperty: Property<boolean>;
  public contextResponsesEnabledProperty: Property<boolean>;
  public hintResponsesEnabledProperty: Property<boolean>;

  public constructor(options?: ResponseCollectorOptions) {
    super();

    // whether component names are read as input lands on various components
    this.nameResponsesEnabledProperty = new BooleanProperty(true);

    // whether "Object Responses" are read as interactive components change
    this.objectResponsesEnabledProperty = new BooleanProperty(false);

    // whether "Context Responses" are read as inputs receive interaction
    this.contextResponsesEnabledProperty = new BooleanProperty(false);

    // whether "Hints" are read to the user in response to certain input
    this.hintResponsesEnabledProperty = new BooleanProperty(false);
  }

  public reset(): void {
    this.nameResponsesEnabledProperty.reset();
    this.objectResponsesEnabledProperty.reset();
    this.contextResponsesEnabledProperty.reset();
    this.hintResponsesEnabledProperty.reset();
  }

  /**
   * Prepares final output with an object response, a context response, and a hint. Each response
   * will only be added to the final string if that response type is included by the user. Rather than using
   * unique utterances, we use string interpolation so that the highlight around the abject being spoken
   * about stays lit for the entire combination of responses.
   */
  public collectResponses(providedOptions?: SpeakableNullableResolvedOptions): string {

    // see ResponsePacket for supported options
    const options = optionize3<SpeakableNullableResolvedOptions>()({}, ResponsePacket.DEFAULT_OPTIONS, providedOptions);

    window.assert && window.assert(options.responsePatternCollection instanceof ResponsePatternCollection);

    const usesNames = !!(options.nameResponse && (this.nameResponsesEnabledProperty.get() || options.ignoreProperties));
    const usesObjectChanges = !!(options.objectResponse && (this.objectResponsesEnabledProperty.get() || options.ignoreProperties));
    const usesContextChanges = !!(options.contextResponse && (this.contextResponsesEnabledProperty.get() || options.ignoreProperties));
    const usesInteractionHints = !!(options.hintResponse && (this.hintResponsesEnabledProperty.get() || options.ignoreProperties));
    const responseKey = ResponsePatternCollection.createPatternKey(usesNames, usesObjectChanges, usesContextChanges, usesInteractionHints);

    let finalResponse = '';
    if (responseKey) {

      // graceful if the responseKey is empty, but if we formed some key, it should
      // be defined in responsePatternCollection
      const patternString = options.responsePatternCollection.getResponsePattern(responseKey);

      finalResponse = StringUtils.fillIn(patternString, {
        NAME: options.nameResponse,
        OBJECT: options.objectResponse,
        CONTEXT: options.contextResponse,
        HINT: options.hintResponse
      });
    }

    return finalResponse;
  }
}

const responseCollector = new ResponseCollector();

utteranceQueueNamespace.register('responseCollector', responseCollector);
export default responseCollector;
