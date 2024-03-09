// Copyright 2018-2020, University of Colorado Boulder

/**
 * Font tests
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Font from './Font.js';

QUnit.module( 'Font' );

QUnit.test( 'Font.fromCSS', assert => {
  const font1 = Font.fromCSS( 'italic 1.2em "Fira Sans", sans-serif' );
  window.assert.equal( font1.style, 'italic' );
  window.assert.equal( font1.size, '1.2em' );
  window.assert.equal( font1.family, '"Fira Sans", sans-serif' );

  const font2 = Font.fromCSS( 'italic small-caps bold 16px/2 cursive' );
  window.assert.equal( font2.style, 'italic' );
  window.assert.equal( font2.variant, 'small-caps' );
  window.assert.equal( font2.weight, 'bold' );
  window.assert.equal( font2.size, '16px' );
  window.assert.equal( font2.lineHeight, '2' );
  window.assert.equal( font2.family, 'cursive' );
} );