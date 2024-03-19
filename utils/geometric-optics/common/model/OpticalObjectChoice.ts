// Copyright 2022, University of Colorado Boulder

/**
 * OpticalObjectChoice is a rich enumeration of choices for the optical object.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Enumeration from '@/utils/phet-core/Enumeration';
import EnumerationValue from '@/utils/phet-core/EnumerationValue';
import GeometricOpticsStrings from '@/utils/geometric-optics/GeometricOpticsStrings';
import pencilIcon_png from '@/assets/images/geometric-optics/pencilIcon_png';
import penguinIcon_png from '@/assets/images/geometric-optics/penguinIcon_png';
import lightIcon_png from '@/assets/images/geometric-optics/lightIcon_png';
import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import pencilRightFacingUpright_png from '@/assets/images/geometric-optics/pencilRightFacingUpright_png';
import pencilRightFacingInverted_png from '@/assets/images/geometric-optics/pencilRightFacingInverted_png';
import pencilLeftFacingUpright_png from '@/assets/images/geometric-optics/pencilLeftFacingUpright_png';
import pencilLeftFacingInverted_png from '@/assets/images/geometric-optics/pencilLeftFacingInverted_png';
import penguinRightFacingUpright_png from '@/assets/images/geometric-optics/penguinRightFacingUpright_png';
import penguinRightFacingInverted_png from '@/assets/images/geometric-optics/penguinRightFacingInverted_png';
import penguinLeftFacingUpright_png from '@/assets/images/geometric-optics/penguinLeftFacingUpright_png';
import penguinLeftFacingInverted_png from '@/assets/images/geometric-optics/penguinLeftFacingInverted_png';
import GOConstants from '@/utils/geometric-optics/common/GOConstants';
import ArrowNode, { type ArrowNodeOptions } from '@/utils/scenery-phet/ArrowNode';
import { Node } from '@/utils/scenery/imports';
import GOColors from '@/utils/geometric-optics/common/GOColors';
import { combineOptions } from '@/utils/phet-core/optionize';
import starRightFacingUpright_png from '@/assets/images/geometric-optics/starRightFacingUpright_png';
import starRightFacingInverted_png from '@/assets/images/geometric-optics/starRightFacingInverted_png';
import starLeftFacingUpright_png from '@/assets/images/geometric-optics/starLeftFacingUpright_png';
import starLeftFacingInverted_png from '@/assets/images/geometric-optics/starLeftFacingInverted_png';
import starIcon_png from '@/assets/images/geometric-optics/starIcon_png';
import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';

// Identifies the general type of optical object for a choice in the combo box. I'd prefer not to have this addition
// type baggage, but it's symptomatic of the fact that we have 3 scenes and 5 choices (3 of which map to the same scene).
// So this was a small compromise to having to make even larger changes.
type OpticalObjectType = 'framed' | 'arrow' | 'light';

// Set of HTMLImageElements (PNG files) that depict a framed object and its associated optical image.
// These PNG files have 3D perspective, and the field names used here refer to the orientation of the image.
export type ObjectHTMLImageElements = {
  rightFacingUpright: HTMLImageElement;
  rightFacingInverted: HTMLImageElement;
  leftFacingUpright: HTMLImageElement;
  leftFacingInverted: HTMLImageElement;
};

type OpticalObjectChoiceOptions = {

  // type of optical object
  type: OpticalObjectType;

  // label that appears in combo box
  labelStringProperty: TReadOnlyProperty<string>;

  // icon that appears in combo box
  icon: HTMLImageElement | Node;

  // prefix used for tandem name
  tandemPrefix: string;

  // HTMLImageElements (PNG files) for optical objects that require them
  objectHTMLImageElements?: ObjectHTMLImageElements;
};

// icon used for 'Arrow' in the combo box
const ARROW_ICON = new ArrowNode(0, 0, 0, -50, combineOptions<ArrowNodeOptions>(
  {}, GOConstants.ARROW_NODE_OPTIONS, {
  fill: GOColors.arrow1FillProperty,
  stroke: null,
  scale: 0.5
}));

export default class OpticalObjectChoice extends EnumerationValue {

  public static readonly PENCIL = new OpticalObjectChoice({
    type: 'framed',
    labelStringProperty: GeometricOpticsStrings.pencilStringProperty,
    icon: pencilIcon_png,
    tandemPrefix: 'pencil',
    objectHTMLImageElements: {
      rightFacingUpright: pencilRightFacingUpright_png,
      rightFacingInverted: pencilRightFacingInverted_png,
      leftFacingUpright: pencilLeftFacingUpright_png,
      leftFacingInverted: pencilLeftFacingInverted_png
    }
  });

  public static readonly PENGUIN = new OpticalObjectChoice({
    type: 'framed',
    labelStringProperty: GeometricOpticsStrings.penguinStringProperty,
    icon: penguinIcon_png,
    tandemPrefix: 'penguin',
    objectHTMLImageElements: {
      rightFacingUpright: penguinRightFacingUpright_png,
      rightFacingInverted: penguinRightFacingInverted_png,
      leftFacingUpright: penguinLeftFacingUpright_png,
      leftFacingInverted: penguinLeftFacingInverted_png
    }
  });

  public static readonly STAR = new OpticalObjectChoice({
    type: 'framed',
    labelStringProperty: GeometricOpticsStrings.starStringProperty,
    icon: starIcon_png,
    tandemPrefix: 'star',
    objectHTMLImageElements: {
      rightFacingUpright: starRightFacingUpright_png,
      rightFacingInverted: starRightFacingInverted_png,
      leftFacingUpright: starLeftFacingUpright_png,
      leftFacingInverted: starLeftFacingInverted_png
    }
  });

  public static readonly ARROW = new OpticalObjectChoice({
    type: 'arrow',
    labelStringProperty: GeometricOpticsStrings.arrowStringProperty,
    icon: ARROW_ICON,
    tandemPrefix: 'arrow'
  });

  public static readonly LIGHT = new OpticalObjectChoice({
    type: 'light',
    labelStringProperty: GeometricOpticsStrings.lightStringProperty,
    icon: lightIcon_png,
    tandemPrefix: 'light'
  });

  // Gets a list of keys, values and mapping between them. For use by EnumerationProperty and PhET-iO.
  public static readonly enumeration = new Enumeration(OpticalObjectChoice, {
    phetioDocumentation: 'describes an optical object choice'
  });

  // see OpticalObjectChoiceOptions
  public readonly type: OpticalObjectType;
  public readonly labelStringProperty: TReadOnlyProperty<string>;
  public readonly icon: HTMLImageElement | Node;
  public readonly tandemPrefix: string;
  public readonly objectHTMLImageElements?: ObjectHTMLImageElements;

  public constructor(options: OpticalObjectChoiceOptions) {
    super();
    this.type = options.type;
    this.labelStringProperty = options.labelStringProperty;
    this.icon = options.icon;
    this.tandemPrefix = options.tandemPrefix;
    this.objectHTMLImageElements = options.objectHTMLImageElements;
  }
}

geometricOptics.register('OpticalObjectChoice', OpticalObjectChoice);
