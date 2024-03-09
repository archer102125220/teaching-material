// Copyright 2017-2022, University of Colorado Boulder

/**
 * AlignBox tests
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Circle from '../../nodes/Circle.js';
import Rectangle from '../../nodes/Rectangle.js';
import AlignGroup from '../constraints/AlignGroup.js';

QUnit.module( 'AlignBox' );

QUnit.test( 'Single Box Group', assert => {
  const circle = new Circle( 20 );

  const group = new AlignGroup();
  const box = group.createBox( circle, {
    xMargin: 10,
    yMargin: 20
  } );

  window.assert.ok( box.xMargin === 10, 'xMargin' );
  window.assert.ok( box.yMargin === 20, 'yMargin' );
  window.assert.ok( box.xAlign === 'center', 'xAlign' );
  window.assert.ok( box.yAlign === 'center', 'yAlign' );

  window.assert.ok( box.bounds.equals( new Bounds2( 0, 0, 60, 80 ) ), 'Margins' );
  window.assert.ok( circle.bounds.equals( new Bounds2( 10, 20, 50, 60 ) ), 'Circle: Margins' );

  circle.radius = 10;
  circle.getBounds(); // trigger bounds check
  window.assert.ok( box.bounds.equals( new Bounds2( 0, 0, 40, 60 ) ), 'Change to the content size' );
  window.assert.ok( circle.bounds.equals( new Bounds2( 10, 20, 30, 40 ) ), 'Circle: Change to the content size' );

  circle.x = 100;
  circle.getBounds(); // trigger bounds check
  window.assert.ok( box.bounds.equals( new Bounds2( 0, 0, 40, 60 ) ), 'Reposition on content location change' );
  window.assert.ok( circle.bounds.equals( new Bounds2( 10, 20, 30, 40 ) ), 'Circle: Reposition on content location change' );

  circle.scale( 2 );
  circle.getBounds(); // trigger bounds check
  window.assert.ok( box.bounds.equals( new Bounds2( 0, 0, 60, 80 ) ), 'Handle scaling' );
  window.assert.ok( circle.bounds.equals( new Bounds2( 10, 20, 50, 60 ) ), 'Circle: Handle scaling' );

  box.xMargin = 0;
  circle.getBounds(); // trigger bounds check
  window.assert.ok( box.bounds.equals( new Bounds2( 0, 0, 40, 80 ) ), 'xMargin change' );
  window.assert.ok( circle.bounds.equals( new Bounds2( 0, 20, 40, 60 ) ), 'Circle: xMargin change' );

  group.dispose();
} );

QUnit.test( 'Multiple Boxes in a Group', assert => {
  const circle = new Circle( 10 );
  const rectangle = new Rectangle( 0, 0, 60, 60 );

  const group = new AlignGroup();

  const circleBox = group.createBox( circle, {
    xMargin: 10,
    yMargin: 20,
    xAlign: 'left',
    yAlign: 'bottom'
  } );

  let rectangleBox = group.createBox( rectangle );

  window.assert.ok( circleBox.xMargin === 10, 'circle: xMargin' );
  window.assert.ok( circleBox.yMargin === 20, 'circle: yMargin' );
  window.assert.ok( circleBox.xAlign === 'left', 'circle: xAlign' );
  window.assert.ok( circleBox.yAlign === 'bottom', 'circle: yAlign' );

  window.assert.ok( rectangleBox.xMargin === 0, 'rectangle: xMargin' );
  window.assert.ok( rectangleBox.yMargin === 0, 'rectangle: yMargin' );
  window.assert.ok( rectangleBox.xAlign === 'center', 'rectangle: xAlign' );
  window.assert.ok( rectangleBox.yAlign === 'center', 'rectangle: yAlign' );

  // circle: 20x20, with margin: 40x60
  // rectangle: 60x60 (max in both)
  window.assert.ok( circleBox.bounds.equals( new Bounds2( 0, 0, 60, 60 ) ), 'Circle Container: Initial multiple' );
  window.assert.ok( rectangleBox.bounds.equals( new Bounds2( 0, 0, 60, 60 ) ), 'Rectangle Container: Initial multiple' );
  window.assert.ok( circle.bounds.equals( new Bounds2( 10, 20, 30, 40 ) ), 'Circle: Initial multiple' );
  window.assert.ok( rectangle.bounds.equals( new Bounds2( 0, 0, 60, 60 ) ), 'Rectangle: Initial multiple' );

  rectangleBox.yMargin = 20;
  circleBox.getBounds();
  rectangleBox.getBounds(); // trigger check
  // circle: 20x20, with margin: 40x60
  // rectangle: 60x60, with margin: 60x100
  window.assert.ok( circleBox.bounds.equals( new Bounds2( 0, 0, 60, 100 ) ), 'Circle Container: Align Change Rect' );
  window.assert.ok( rectangleBox.bounds.equals( new Bounds2( 0, 0, 60, 100 ) ), 'RectangleContainer: Align Change Rect' );
  window.assert.ok( circle.bounds.equals( new Bounds2( 10, 60, 30, 80 ) ), 'Circle: Align Change Rect' );
  window.assert.ok( rectangle.bounds.equals( new Bounds2( 0, 20, 60, 80 ) ), 'Rectangle: Align Change Rect' );

  circleBox.yAlign = 'top';
  circleBox.getBounds();
  rectangleBox.getBounds(); // trigger check
  // circle: 20x20, with margin: 40x60
  // rectangle: 60x60, with margin: 60x100
  window.assert.ok( circleBox.bounds.equals( new Bounds2( 0, 0, 60, 100 ) ), 'Circle Container: Align Change Circle' );
  window.assert.ok( rectangleBox.bounds.equals( new Bounds2( 0, 0, 60, 100 ) ), 'RectangleContainer: Align Change Circle' );
  window.assert.ok( circle.bounds.equals( new Bounds2( 10, 20, 30, 40 ) ), 'Circle: Align Change Circle' );
  window.assert.ok( rectangle.bounds.equals( new Bounds2( 0, 20, 60, 80 ) ), 'Rectangle: Align Change Circle' );

  rectangleBox.dispose();
  circleBox.getBounds(); // trigger check
  // circle: 20x20, with margin: 40x60
  window.assert.ok( circleBox.bounds.equals( new Bounds2( 0, 0, 40, 60 ) ), 'Circle Container: Removed Rect Container' );
  window.assert.ok( circle.bounds.equals( new Bounds2( 10, 20, 30, 40 ) ), 'Circle: Removed Rect Container' );

  rectangleBox = group.createBox( rectangle, { yMargin: 20 } );
  circleBox.getBounds();
  rectangleBox.getBounds(); // trigger check
  // circle: 20x20, with margin: 40x60
  // rectangle: 60x60, with margin: 60x100
  window.assert.ok( circleBox.bounds.equals( new Bounds2( 0, 0, 60, 100 ) ), 'Circle Container: Added back box' );
  window.assert.ok( rectangleBox.bounds.equals( new Bounds2( 0, 0, 60, 100 ) ), 'RectangleContainer: Added back box' );
  window.assert.ok( circle.bounds.equals( new Bounds2( 10, 20, 30, 40 ) ), 'Circle: Added back box' );
  window.assert.ok( rectangle.bounds.equals( new Bounds2( 0, 20, 60, 80 ) ), 'Rectangle: Added back box' );

  circleBox.xAlign = 'right';
  circleBox.getBounds();
  rectangleBox.getBounds(); // trigger check
  // circle: 20x20, with margin: 40x60
  // rectangle: 60x60, with margin: 60x100
  window.assert.ok( circleBox.bounds.equals( new Bounds2( 0, 0, 60, 100 ) ), 'Circle Container: More circle xAlign:right' );
  window.assert.ok( rectangleBox.bounds.equals( new Bounds2( 0, 0, 60, 100 ) ), 'RectangleContainer: More circle xAlign:right' );
  window.assert.ok( circle.bounds.equals( new Bounds2( 30, 20, 50, 40 ) ), 'Circle: More circle xAlign:right' );
  window.assert.ok( rectangle.bounds.equals( new Bounds2( 0, 20, 60, 80 ) ), 'Rectangle: More circle xAlign:right' );


  group.dispose();
} );