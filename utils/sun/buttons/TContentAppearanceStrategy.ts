// Copyright 2022, University of Colorado Boulder

/**
 * Type to annotate the constructor signature of ContentAppearanceStratgey
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty.js';
import { Node } from '@/utils/scenery/imports.js';
import RadioButtonInteractionState from '@/utils/sun/buttons/RadioButtonInteractionState.js';

export type TContentAppearanceStrategyOptions = {
  deselectedContentOpacity?: number;
  overContentOpacity?: number;
  selectedContentOpacity?: number;
};

type TContentAppearanceStrategy = {
  new(content: Node,
    interactionStateProperty: TReadOnlyProperty<RadioButtonInteractionState>,
    options?: TContentAppearanceStrategyOptions): {
      dispose?: () => void;
    };
};

export default TContentAppearanceStrategy;