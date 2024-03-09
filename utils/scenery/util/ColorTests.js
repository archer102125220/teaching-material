// Copyright 2017-2021, University of Colorado Boulder

/**
 * Color tests
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { Color } from '../imports.js';

QUnit.module( 'Color' );

QUnit.test( 'RGB Hex', assert => {
  const ff00cc = new Color( '#ff00cc' );
  window.assert.equal( ff00cc.r, 0xff, 'ff00cc red' );
  window.assert.equal( ff00cc.g, 0, 'ff00cc green' );
  window.assert.equal( ff00cc.b, 0xcc, 'ff00cc blue' );
  window.assert.equal( ff00cc.a, 1, 'ff00cc alpha' );
  window.assert.equal( ff00cc.toCSS(), 'rgb(255,0,204)', 'ff00cc css' );

  const f0c = new Color( '#f0c' );
  window.assert.equal( f0c.r, 0xff, 'f0c red' );
  window.assert.equal( f0c.g, 0, 'f0c green' );
  window.assert.equal( f0c.b, 0xcc, 'f0c blue' );
  window.assert.equal( f0c.a, 1, 'f0c alpha' );
  window.assert.equal( f0c.toCSS(), 'rgb(255,0,204)', 'f0c css' );
} );

QUnit.test( 'RGB Hex direct', assert => {
  const ff00cc = new Color( 0xff00cc );
  window.assert.equal( ff00cc.r, 0xff, 'ff00cc red' );
  window.assert.equal( ff00cc.g, 0, 'ff00cc green' );
  window.assert.equal( ff00cc.b, 0xcc, 'ff00cc blue' );
  window.assert.equal( ff00cc.a, 1, 'ff00cc alpha' );
  window.assert.equal( ff00cc.toCSS(), 'rgb(255,0,204)', 'ff00cc css' );

  const ff00ccHalf = new Color( 0xff00cc, 0.5 );
  window.assert.equal( ff00ccHalf.r, 0xff, 'ff00ccHalf red' );
  window.assert.equal( ff00ccHalf.g, 0, 'ff00ccHalf green' );
  window.assert.equal( ff00ccHalf.b, 0xcc, 'ff00ccHalf blue' );
  window.assert.equal( ff00ccHalf.a, 0.5, 'ff00ccHalf alpha' );
  window.assert.equal( ff00ccHalf.toCSS(), 'rgba(255,0,204,0.5)', 'ff00ccHalf css' );
} );

QUnit.test( 'RGB/A direct', assert => {
  const ff00cc = new Color( 0xff, 0x00, 0xcc );
  window.assert.equal( ff00cc.r, 0xff, 'ff00cc red' );
  window.assert.equal( ff00cc.g, 0, 'ff00cc green' );
  window.assert.equal( ff00cc.b, 0xcc, 'ff00cc blue' );
  window.assert.equal( ff00cc.a, 1, 'ff00cc alpha' );
  window.assert.equal( ff00cc.toCSS(), 'rgb(255,0,204)', 'ff00cc css' );

  const ff00ccHalf = new Color( 0xff, 0x00, 0xcc, 0.5 );
  window.assert.equal( ff00ccHalf.r, 0xff, 'ff00ccHalf red' );
  window.assert.equal( ff00ccHalf.g, 0, 'ff00ccHalf green' );
  window.assert.equal( ff00ccHalf.b, 0xcc, 'ff00ccHalf blue' );
  window.assert.equal( ff00ccHalf.a, 0.5, 'ff00ccHalf alpha' );
  window.assert.equal( ff00ccHalf.toCSS(), 'rgba(255,0,204,0.5)', 'ff00ccHalf css' );
} );

QUnit.test( 'Copy Constructor', assert => {
  const ff00cc = new Color( 0xff, 0x00, 0xcc );
  const copy = new Color( ff00cc );

  window.assert.equal( ff00cc.r, copy.r );
  window.assert.equal( ff00cc.g, copy.g );
  window.assert.equal( ff00cc.b, copy.b );
  window.assert.equal( ff00cc.a, copy.a );
} );

QUnit.test( 'Keywords', assert => {
  const yellow = new Color( 'yellow' );
  window.assert.equal( yellow.r, 0xff, 'yellow red' );
  window.assert.equal( yellow.g, 0xff, 'yellow green' );
  window.assert.equal( yellow.b, 0x00, 'yellow blue' );
  window.assert.equal( yellow.a, 1, 'yellow alpha' );

  const transparent = new Color( 'transparent' );
  window.assert.equal( transparent.r + transparent.g + transparent.b + transparent.a, 0, 'transparent sum' );
} );

QUnit.test( 'rgb', assert => {
  const rgb = new Color( 'rgb(100,250,10)' );
  window.assert.equal( rgb.r, 100, 'rgb red' );
  window.assert.equal( rgb.g, 250, 'rgb green' );
  window.assert.equal( rgb.b, 10, 'rgb blue' );
  window.assert.equal( rgb.a, 1, 'rgb alpha' );
  window.assert.equal( rgb.toCSS(), 'rgb(100,250,10)', 'rgb css' );

  const clamped = new Color( 'rgb(-50,120%,999)' );
  window.assert.equal( clamped.r, 0, 'clamped rgb red' );
  window.assert.equal( clamped.g, 255, 'clamped rgb green' );
  window.assert.equal( clamped.b, 255, 'clamped rgb blue' );
} );

QUnit.test( 'rgba', assert => {
  const rgba = new Color( 'rgba(100,100%,0%,0)' );
  window.assert.equal( rgba.r, 100, 'rgba red' );
  window.assert.equal( rgba.g, 255, 'rgba green' );
  window.assert.equal( rgba.b, 0, 'rgba blue' );
  window.assert.equal( rgba.a, 0, 'rgba alpha' );
  window.assert.equal( rgba.toCSS(), 'rgba(100,255,0,0)', 'rgba css' );

  const clamped = new Color( 'rgba(-50,120%,999,255)' );
  window.assert.equal( clamped.r, 0, 'clamped rgba red' );
  window.assert.equal( clamped.g, 255, 'clamped rgba green' );
  window.assert.equal( clamped.b, 255, 'clamped rgba blue' );
  window.assert.equal( clamped.a, 1, 'clamped rgba alpha' );
} );

QUnit.test( 'hsl', assert => {
  let hsl = new Color( 'hsl(0,100%,50%)' );
  window.assert.equal( hsl.r, 255, 'hsl 1 red' );
  window.assert.equal( hsl.g, 0, 'hsl 1 green' );
  window.assert.equal( hsl.b, 0, 'hsl 1 blue' );

  hsl = new Color( 'hsl(0,0%,50%)' );
  window.assert.equal( hsl.r, 128, 'hsl 2 red' );
  window.assert.equal( hsl.g, 128, 'hsl 2 green' );
  window.assert.equal( hsl.b, 128, 'hsl 2 blue' );

  hsl = new Color( 'hsl(180,100%,50%)' );
  window.assert.equal( hsl.r, 0, 'hsl 3 red' );
  window.assert.equal( hsl.g, 255, 'hsl 3 green' );
  window.assert.equal( hsl.b, 255, 'hsl 3 blue' );

  hsl = new Color( 'hsl(90,25%,75%)' );
  window.assert.equal( hsl.r, 191, 'hsl 4 red' );
  window.assert.equal( hsl.g, 207, 'hsl 4 green' );
  window.assert.equal( hsl.b, 175, 'hsl 4 blue' );
} );

QUnit.test( 'hsla', assert => {
  let hsl = new Color( 'hsla(90,25%,75%,0.25)' );
  window.assert.equal( hsl.r, 191, 'hsla red' );
  window.assert.equal( hsl.g, 207, 'hsla green' );
  window.assert.equal( hsl.b, 175, 'hsla blue' );
  window.assert.equal( hsl.a, 0.25, 'hsla alpha 0.25' );

  hsl = new Color( 'hsla(90,25%,75%,.25)' ); // without leading 0
  window.assert.equal( hsl.a, 0.25, 'hsla alpha .25' );
} );