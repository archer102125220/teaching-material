// Copyright 2013-2024, University of Colorado Boulder

/**
 * Button for expanding/collapsing something.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import type StrictOmit from '@/utils/phet-core/types/StrictOmit';
import { Shape } from '@/utils/kite/imports';
import InstanceRegistry from '@/utils/phet-core/documentation/InstanceRegistry';
import optionize from '@/utils/phet-core/optionize';
import { Path } from '@/utils/scenery/imports';
import Tandem from '@/utils/tandem/Tandem';
import BooleanRectangularToggleButton, { type BooleanRectangularToggleButtonOptions } from '@/utils/sun/buttons/BooleanRectangularToggleButton';
import ButtonNode from '@/utils/sun/buttons/ButtonNode';
import sun from '@/utils/sun/sun';
import Property from '@/utils/axon/Property';

// constants
const SYMBOL_RELATIVE_WIDTH = 0.6; // width of +/- symbols relative to button sideLength (see options)
const RELATIVE_X_MARGIN = (1 - SYMBOL_RELATIVE_WIDTH) / 2; // margin to produce a button of specified sideLength

type SelfOptions = {
  sideLength?: number; // length of one side of the square button
};

export type ExpandCollapseButtonOptions = SelfOptions &
  StrictOmit<BooleanRectangularToggleButtonOptions, 'cornerRadius' | 'xMargin' | 'yMargin' | 'buttonAppearanceStrategy'>;

export default class ExpandCollapseButton extends BooleanRectangularToggleButton {

  private readonly disposeExpandCollapseButton: () => void;

  public constructor(expandedProperty: Property<boolean>, providedOptions?: ExpandCollapseButtonOptions) {

    const options = optionize<ExpandCollapseButtonOptions, SelfOptions, BooleanRectangularToggleButtonOptions>()({

      // SelfOptions
      sideLength: 25,

      // BooleanRectangularToggleButtonOptions
      stroke: 'black',
      touchAreaXDilation: 5,
      touchAreaYDilation: 5,

      // phet-io
      tandem: Tandem.REQUIRED,
      tandemNameSuffix: 'Button'
    }, providedOptions);

    // BooleanRectangularToggleButtonOptions that are controlled by ExpandCollapseButton
    options.cornerRadius = 0.1 * options.sideLength;
    options.xMargin = RELATIVE_X_MARGIN * options.sideLength;
    options.yMargin = options.xMargin;
    options.buttonAppearanceStrategy = ButtonNode.FlatAppearanceStrategy;

    // configure the +/- symbol on the button
    const symbolLength = SYMBOL_RELATIVE_WIDTH * options.sideLength;
    const symbolLineWidth = 0.15 * options.sideLength;
    const symbolOptions = {
      lineWidth: symbolLineWidth,
      stroke: 'white',
      centerX: options.sideLength / 2,
      centerY: options.sideLength / 2,
      pickable: false
    };

    // Expand '+' content
    const plusSymbolShape = new Shape()
      .moveTo(symbolLength / 2, 0)
      .lineTo(symbolLength / 2, symbolLength)
      .moveTo(0, symbolLength / 2)
      .lineTo(symbolLength, symbolLength / 2);
    const expandNode = new Path(plusSymbolShape, symbolOptions);

    // Collapse '-' content
    const minusSymbolShape = new Shape()
      .moveTo(-symbolLength / 2, 0)
      .lineTo(symbolLength / 2, 0);
    const collapseNode = new Path(minusSymbolShape, symbolOptions);

    super(expandedProperty, collapseNode, expandNode, options);

    // listeners must be removed in dispose
    const expandedPropertyObserver = (expanded: boolean) => {

      // TODO use PhetColorScheme.RED_COLORBLIND, see https://github.com/phetsims/sun/issues/485
      this.baseColor = expanded ? 'rgb( 255, 85, 0 )' : 'rgb( 0, 179, 0 )';

      this.setPDOMAttribute('aria-expanded', expanded);
    };
    expandedProperty.link(expandedPropertyObserver);

    // support for binder documentation, stripped out in builds and only runs when ?binder is specified
    assert && phet?.chipper?.queryParameters?.binder && InstanceRegistry.registerDataURL('sun', 'ExpandCollapseButton', this);

    this.disposeExpandCollapseButton = () => {
      expandedProperty.unlink(expandedPropertyObserver);
    };
  }

  public override dispose(): void {
    this.disposeExpandCollapseButton();
    super.dispose();
  }
}

sun.register('ExpandCollapseButton', ExpandCollapseButton);