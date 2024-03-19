// Copyright 2015-2022, University of Colorado Boulder

/**
 * Fuzz tests
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
import QUnit from 'qunit';

import Matrix3 from '@/utils/dot/Matrix3';
import { Shape } from '@/utils/kite/imports';
import {
  Color,
  Display,
  LinearGradient,
  Node,
  Path,
  RadialGradient,
  Text
} from '@/utils/scenery/imports';

QUnit.module('Fuzz');

QUnit.test('Instance.addRemoveCounter === -2 failure (#392)', (assert) => {
  const scene = new Node();
  const display = new Display(scene);
  display.updateDisplay();
  const node0 = new Node();
  const node1 = new Node();
  const node2 = new Node();
  const node3 = new Node();
  const node4 = new Node();
  const node5 = new Node();
  const node6 = new Node();
  const path0 = new Path(null);
  const path1 = new Path(null);
  const path2 = new Path(null);
  const path3 = new Path(null);
  // var text0 = new Text( '0!' );
  // var text1 = new Text( '1!' );
  // var text2 = new Text( '2!' );
  node2.insertChild(0, node0);
  display.updateDisplay();
  path3.insertChild(0, node3);
  path3.removeChild(node3);
  display.updateDisplay();
  node4.insertChild(0, node1);
  path3.insertChild(0, node4);
  node2.insertChild(1, path3);
  scene.insertChild(0, path1);
  node2.insertChild(1, path1);
  node4.removeChild(node1);
  node6.insertChild(0, scene);
  scene.removeChild(path1);
  path0.insertChild(0, node2);
  path0.insertChild(0, node6);
  display.updateDisplay();
  path0.insertChild(1, path3);
  node6.removeChild(scene);
  display.updateDisplay();
  display.updateDisplay();
  display.updateDisplay();
  path1.insertChild(0, node0);
  display.updateDisplay();
  node4.insertChild(0, path2);
  path3.removeChild(node4);
  display.updateDisplay();
  display.updateDisplay();
  node5.insertChild(0, node0);
  node4.insertChild(0, node5);
  display.updateDisplay();
  node4.removeChild(path2);
  display.updateDisplay();
  node4.removeChild(node5);
  scene.insertChild(0, node4);
  scene.removeChild(node4);
  node3.insertChild(0, node2);
  node3.insertChild(0, path0);
  path1.removeChild(node0);
  display.updateDisplay();
  path3.insertChild(0, node5);
  display.updateDisplay();
  node2.removeChild(node0);
  display.updateDisplay();
  display.updateDisplay();
  display.updateDisplay();
  path3.removeChild(node5);
  display.updateDisplay();
  display.updateDisplay();
  path2.insertChild(0, path3);
  node1.insertChild(0, node2);
  path3.insertChild(0, node6);
  display.updateDisplay();
  path2.insertChild(0, path1);
  path2.removeChild(path1);
  path3.removeChild(node6);
  scene.insertChild(0, node4);
  display.updateDisplay();
  node6.insertChild(0, node5);
  scene.removeChild(node4);
  node4.insertChild(0, path2);
  display.updateDisplay();
  node6.removeChild(node5);
  display.updateDisplay();
  node5.removeChild(node0);
  path0.removeChild(path3);
  display.updateDisplay();
  path2.insertChild(1, path0);
  display.updateDisplay();
  display.updateDisplay();
  path0.removeChild(node6);
  path0.removeChild(node2);
  node1.insertChild(1, path3);
  node3.insertChild(1, node1);
  display.updateDisplay();
  node4.removeChild(path2);
  display.updateDisplay();
  path0.insertChild(0, scene);
  display.updateDisplay();
  node6.insertChild(0, node2);
  node5.insertChild(0, path0);
  node4.insertChild(0, node6);
  node0.insertChild(0, node4);
  node0.removeChild(node4);
  display.updateDisplay();
  node6.removeChild(node2);
  path2.removeChild(path3);
  path2.insertChild(0, path3);
  node2.insertChild(1, node6);
  display.updateDisplay();
  path0.removeChild(scene);
  node2.removeChild(node6);
  node6.insertChild(0, path0);
  display.updateDisplay();
  path2.insertChild(0, node3);
  path1.insertChild(0, node6);
  node1.removeChild(path3);
  display.updateDisplay();
  path1.insertChild(0, node4);
  path2.insertChild(1, node1);
  node5.removeChild(path0);
  display.updateDisplay();
  display.updateDisplay();
  node2.removeChild(path3);
  display.updateDisplay();
  display.updateDisplay();
  display.updateDisplay();
  path0.insertChild(0, node0);
  node4.removeChild(node6);
  display.updateDisplay();
  display.updateDisplay();
  node2.insertChild(0, node5);
  path2.insertChild(3, scene);
  display.updateDisplay();
  path3.insertChild(0, scene);
  display.updateDisplay();
  path1.insertChild(2, scene);
  path1.removeChild(node6);
  node1.insertChild(0, path1);
  node2.removeChild(node5);
  path3.insertChild(1, node5);
  node0.insertChild(0, node4);
  path0.removeChild(node0);
  node3.removeChild(path0);
  node0.insertChild(1, node3);
  node1.insertChild(0, path3);
  path1.removeChild(node4);
  node3.insertChild(2, node5);
  path2.removeChild(node3);
  node4.insertChild(0, path1);
  node5.insertChild(0, node4);
  node3.removeChild(node2);
  path3.removeChild(scene);
  node3.insertChild(0, node6);
  node2.insertChild(1, node5);
  path0.insertChild(0, path1);
  path2.insertChild(3, node3);
  node2.removeChild(path1);
  display.updateDisplay();
  path0.removeChild(path1);
  node5.removeChild(node4);
  node4.insertChild(0, path0);
  node4.removeChild(path0);
  node6.removeChild(path0);
  node1.removeChild(path3);
  display.updateDisplay();
  node3.removeChild(node6);
  display.updateDisplay();
  node4.removeChild(path1);
  node5.insertChild(0, path0);
  path3.insertChild(1, node4);
  node0.insertChild(0, path2);
  path2.removeChild(path3);
  node5.removeChild(path0);
  node0.insertChild(2, path0);
  node3.removeChild(node1);
  node2.insertChild(0, node4);
  path3.removeChild(node5);
  path1.removeChild(scene);
  display.updateDisplay();
  display.updateDisplay();
  display.updateDisplay();
  node1.removeChild(path1);
  node5.insertChild(0, node6);
  scene.insertChild(0, path0);
  node1.removeChild(node2);
  path3.removeChild(node4);
  display.updateDisplay();
  node2.removeChild(node4);
  node0.removeChild(path2);
  display.updateDisplay();
  display.updateDisplay();
  path2.insertChild(1, path3);
  node3.insertChild(0, node2);
  node2.insertChild(0, path3);
  node2.removeChild(path3);
  node3.removeChild(node2);
  node2.insertChild(0, node1);
  path2.removeChild(scene);
  node2.removeChild(node5);
  scene.removeChild(path0);
  path1.insertChild(0, node4);
  node0.removeChild(path0);
  node3.insertChild(0, path1);
  node5.insertChild(0, scene);
  node5.removeChild(scene);
  display.updateDisplay();
  node2.insertChild(1, node0);
  path3.insertChild(0, node0);
  display.updateDisplay();
  node0.insertChild(2, node1);
  path2.removeChild(path3);
  path1.removeChild(node4);
  node3.removeChild(node5);
  node6.insertChild(0, node1);
  node2.insertChild(1, path2);
  path3.removeChild(node0);
  node2.insertChild(2, node5);
  node5.insertChild(0, path0);
  display.updateDisplay();
  node2.insertChild(1, node3);
  display.updateDisplay();
  node3.insertChild(0, path0);
  node3.insertChild(0, node1);
  display.updateDisplay();
  path3.insertChild(0, node5);
  node5.insertChild(2, node3);
  node3.insertChild(3, node6);
  node2.removeChild(node5);
  path1.insertChild(0, node4);
  path0.insertChild(0, node6);
  node0.removeChild(node1);
  path1.removeChild(node4);
  path0.insertChild(1, node1);
  node3.removeChild(node6);
  path2.insertChild(1, path3);
  path2.removeChild(node3);
  path2.removeChild(path0);
  path2.removeChild(path3);
  display.updateDisplay();
  path2.removeChild(node1);
  node3.removeChild(path1);
  node2.removeChild(node1);
  node3.removeChild(path0);
  path1.insertChild(0, scene);
  node4.insertChild(0, node6);
  node5.removeChild(node6);
  node6.removeChild(node1);
  node2.insertChild(3, path0);
  path1.removeChild(scene);
  node4.removeChild(node6);
  node6.insertChild(0, path1);
  node5.removeChild(path0);
  node0.insertChild(1, node6);
  node5.removeChild(node3);
  node4.insertChild(0, node6);
  path3.removeChild(node5);
  path0.removeChild(node1);
  display.updateDisplay();
  path2.insertChild(0, node6);
  display.updateDisplay();
  scene.insertChild(0, path1);
  scene.insertChild(1, node1);
  node6.removeChild(path1);
  path0.insertChild(0, node3);
  node4.removeChild(node6);
  path1.insertChild(0, node3);
  path0.insertChild(2, path1);
  path2.insertChild(1, scene);
  display.updateDisplay();
  path1.removeChild(node3);
  node3.removeChild(node1);
  display.updateDisplay();
  display.updateDisplay();
  path3.insertChild(0, node5);
  path3.removeChild(node5);
  path0.removeChild(node3);
  node5.insertChild(0, path0);
  path0.insertChild(1, path2);
  node0.insertChild(2, path2);
  display.updateDisplay();
  node1.insertChild(0, node3);
  path3.insertChild(0, node5);
  node2.removeChild(node0);
  display.updateDisplay();
  node4.insertChild(0, scene);
  node2.removeChild(path0);
  node0.removeChild(path2);
  scene.insertChild(0, node6);
  display.updateDisplay();
  node2.insertChild(0, node0);
  display.updateDisplay();
  node2.insertChild(2, scene);
  node2.insertChild(2, node1);
  path3.insertChild(0, path1);
  path2.removeChild(scene);
  path2.removeChild(node6);
  node4.removeChild(scene);
  display.updateDisplay();
  path3.removeChild(node5);
  node4.insertChild(0, path1);
  display.updateDisplay();
  path3.insertChild(1, node5);
  node4.removeChild(path1);
  scene.insertChild(2, path0);
  node0.insertChild(2, path2);
  path0.removeChild(path2);
  scene.insertChild(2, node5);
  node5.removeChild(path0);
  path3.insertChild(2, node0);
  node0.removeChild(node6);
  display.updateDisplay();
  node0.removeChild(node3);
  display.updateDisplay();
  display.updateDisplay();
  scene.insertChild(5, path2);
  display.updateDisplay();
  display.updateDisplay();
  node6.insertChild(0, path1);
  node6.removeChild(path1);
  node5.insertChild(0, node3);
  display.updateDisplay();
  node6.insertChild(0, node4);
  node6.removeChild(node4);
  path3.removeChild(path1);
  node5.removeChild(node3);
  path3.insertChild(0, path2);
  path1.insertChild(0, node1);
  node0.removeChild(node4);
  node0.insertChild(0, node4);
  node1.removeChild(node3);
  path1.removeChild(node1);
  node0.insertChild(1, path0);
  node4.insertChild(0, path2);
  node3.insertChild(0, path1);
  display.updateDisplay();
  node0.removeChild(node4);
  display.updateDisplay();
  path1.insertChild(0, node1);
  display.updateDisplay();
  node3.removeChild(path1);
  node3.insertChild(0, path0);
  display.updateDisplay();
  node5.insertChild(0, node0);
  display.updateDisplay();
  display.updateDisplay();
  display.updateDisplay();
  node4.insertChild(1, node0);
  path1.removeChild(node1);
  path0.removeChild(path1);
  node2.insertChild(3, path3);
  path3.insertChild(0, node6);
  path3.insertChild(3, node4);
  display.updateDisplay();
  node5.removeChild(node0);
  display.updateDisplay();
  node3.insertChild(1, path1);
  path0.insertChild(1, path1);
  display.updateDisplay();
  node0.insertChild(2, node1);
  node3.insertChild(0, node6);
  scene.removeChild(path2);
  scene.removeChild(node6);
  node4.removeChild(node0);
  node3.removeChild(node6);
  node5.insertChild(0, node1);
  node1.insertChild(0, path2);
  display.updateDisplay();
  display.updateDisplay();
  display.updateDisplay();
  path3.insertChild(2, node1);
  display.updateDisplay();
  display.updateDisplay();
  display.updateDisplay();
  scene.removeChild(path0);
  display.updateDisplay();
  display.updateDisplay();
  path3.removeChild(node0);
  node6.insertChild(0, path2);
  node6.insertChild(1, node4);
  node2.removeChild(scene);
  node4.removeChild(path2);
  scene.removeChild(node5);
  display.updateDisplay();
  path3.insertChild(3, path1);
  display.updateDisplay();
  node2.insertChild(0, node6);
  node2.removeChild(node0);
  node1.removeChild(path2);
  node2.removeChild(path2);
  node2.removeChild(node3);
  display.updateDisplay();
  display.updateDisplay();
  scene.insertChild(2, node2);
  path1.insertChild(0, node5);
  display.updateDisplay();
  node2.removeChild(node6);
  display.updateDisplay();
  scene.removeChild(path1);
  node3.removeChild(path0);
  node0.removeChild(path2);
  scene.insertChild(0, path0);
  path2.insertChild(0, node4);
  scene.insertChild(3, node0);
  node2.removeChild(path3);
  scene.removeChild(path0);
  path2.removeChild(node4);
  path1.removeChild(node5);
  display.updateDisplay();
  scene.insertChild(2, node3);
  path1.insertChild(0, node6);
  node6.removeChild(node4);
  node4.insertChild(0, node0);
  node3.removeChild(path1);
  display.updateDisplay();
  display.updateDisplay();
  display.updateDisplay();
  node2.insertChild(1, path0);
  display.updateDisplay();
  display.updateDisplay();
  node2.removeChild(node1);
  node4.insertChild(0, scene);
  node4.insertChild(2, path2);
  display.updateDisplay();
  display.updateDisplay();
  node2.insertChild(0, node1);
  display.updateDisplay();
  display.updateDisplay();
  path3.insertChild(0, scene);
  display.updateDisplay();
  node0.removeChild(node1);
  node0.removeChild(path0);
  display.updateDisplay();
  node6.removeChild(path2);
  path2.insertChild(0, path0);
  node2.insertChild(0, node0);
  node1.insertChild(0, path0);
  node1.removeChild(path0);
  scene.removeChild(node2);
  node1.insertChild(0, path0);
  node5.removeChild(node1);
  path1.removeChild(node6);
  path0.removeChild(path1);
  path3.removeChild(path2);
  node3.insertChild(0, node2);
  display.updateDisplay();
  node3.insertChild(0, node6);
  display.updateDisplay();
  path3.removeChild(path1);
  display.updateDisplay();
  node4.removeChild(scene);
  display.updateDisplay();
  path3.removeChild(scene);
  node0.insertChild(0, node6);
  scene.removeChild(node3);
  path3.insertChild(1, node3);
  path2.removeChild(path0);
  path2.insertChild(0, path0);
  path3.removeChild(node1);
  path1.insertChild(0, node2);
  display.updateDisplay();
  node0.insertChild(1, node5);
  display.updateDisplay();
  scene.insertChild(2, node3);
  display.updateDisplay();
  node4.removeChild(node0);
  node2.insertChild(2, node4);
  node1.removeChild(path0);
  node1.insertChild(0, node6);
  scene.insertChild(1, path0);
  path0.removeChild(node6);
  display.updateDisplay();
  node1.removeChild(node6);
  display.updateDisplay();
  node1.insertChild(0, path0);
  display.updateDisplay();
  display.updateDisplay();
  path2.removeChild(path0);
  node3.insertChild(0, node0);
  node2.removeChild(node4);
  node3.insertChild(3, path0);
  node1.removeChild(path0);
  path1.insertChild(0, node5);
  node2.removeChild(node0);
  path2.insertChild(0, node1);
  display.updateDisplay();
  scene.removeChild(node1);
  node0.removeChild(node5);
  node4.removeChild(path2);
  node0.removeChild(node6);

  assert.ok(true, 'so we have at least 1 test in this set');
  display.dispose();
});

QUnit.test('RelativeTransform matrix mismatch #393', (assert) => {
  const scene = new Node();
  const display = new Display(scene, {
    width: 640,
    height: 480,
    backgroundColor: '#eee'
  });
  display.updateDisplay();
  const node0 = new Node();
  const node4 = new Node();
  const path1 = new Path(null);
  const path3 = new Path(null);

  path1.insertChild(0, node4);
  node4.insertChild(0, path3);
  scene.insertChild(0, node0);
  node0.insertChild(0, path1);
  scene.transform.append(Matrix3.scaling(1.5586118499044517));
  node0.renderer = 'canvas';
  display.updateDisplay();

  assert.ok(true, 'so we have at least 1 test in this set');
  display.dispose();
});

QUnit.test('computeShapeBounds in requiresSVGBoundsWorkaround', (assert) => {
  const scene = new Node();
  const display = new Display(scene, {
    width: 640,
    height: 480,
    backgroundColor: '#eee'
  });
  display.updateDisplay();
  const node0 = new Node();
  const node1 = new Node();
  const node2 = new Node();
  const node3 = new Node();
  const node4 = new Node();
  const node5 = new Node();
  const node6 = new Node();
  const path0 = new Path(null);
  const path1 = new Path(null);
  const path2 = new Path(null);
  const path3 = new Path(null);
  const text0 = new Text('0!');
  const text1 = new Text('1!');
  const text2 = new Text('2!');
  const shape0 = null;
  const shape1 = Shape.regularPolygon(6, 50);
  const shape2 = Shape.circle(40);
  const shape3 = Shape.lineSegment(0, 0, 50, 100);
  const paint0 = null;
  const paint1 = 'red';
  const paint2 = '#00ff00';
  const paint3 = new Color(0, 0, 255, 0.8);
  const paint4 = new LinearGradient(-50, 0, 50, 0)
    .addColorStop(0, 'white')
    .addColorStop(1, 'black');
  const paint5 = new RadialGradient(0, 0, 0, 0, 0, 50)
    .addColorStop(0, 'red')
    .addColorStop(1, 'black');
  node5.insertChild(0, node6);
  node5.removeChild(node6);
  text0.renderer = 'dom';
  display.updateDisplay();
  path1.insertChild(0, path2);
  text0.transform.append(
    Matrix3.translation(23.65897111594677, 82.57610886357725)
  );
  node0.transform.prepend(
    Matrix3.translation(-8.093876158818603, -51.45275075919926)
  );
  text2.fill = paint5;
  path1.transform.append(
    Matrix3.translation(25.28924555517733, 74.84042081050575)
  );
  path3.stroke = paint1;
  node2.transform.append(Matrix3.scaling(1.5677800512634406));
  scene.transform.setMatrix(Matrix3.scaling(0.6745253108669262));
  text1.insertChild(0, text0);
  node3.insertChild(0, path0);
  text0.transform.append(
    Matrix3.translation(-33.25916863977909, 39.74149413406849)
  );
  node0.insertChild(0, path3);
  node1.transform.prepend(Matrix3.rotation2(0.19764518009793736));
  text1.insertChild(0, node6);
  node5.transform.prepend(Matrix3.scaling(1.4546443958528528));
  path1.removeChild(path2);
  node2.transform.setMatrix(Matrix3.rotation2(1.6781812739575503));
  text0.transform.prepend(
    Matrix3.translation(81.62147919647396, -86.02062398567796)
  );
  path1.shape = shape0;
  node4.insertChild(0, node5);
  node6.transform.append(Matrix3.rotation2(5.521820087799294));
  scene.transform.append(
    Matrix3.translation(-76.50924790650606, 65.40518635883927)
  );
  node3.removeChild(path0);
  text0.insertChild(0, node5);
  node1.transform.prepend(Matrix3.rotation2(0.2175503720176498));
  path3.shape = shape2;
  node1.transform.append(Matrix3.rotation2(5.221358463520904));
  path0.shape = shape1;
  display.updateDisplay();
  node0.insertChild(1, node2);
  text1.transform.append(Matrix3.rotation2(4.952918373662239));
  node5.transform.prepend(
    Matrix3.translation(-90.42610130272806, -73.30460799857974)
  );
  path3.insertChild(0, node6);
  path3.removeChild(node6);
  node3.transform.prepend(Matrix3.scaling(1.0399274659570494));
  path3.transform.setMatrix(
    Matrix3.translation(47.80029118992388, -59.36479954980314)
  );
  node5.transform.prepend(Matrix3.scaling(0.9175601472374242));
  node0.insertChild(0, text1);
  node0.removeChild(node2);
  node0.insertChild(2, node5);
  text0.removeChild(node5);
  display.updateDisplay();
  path3.fill = paint2;
  path1.stroke = paint3;
  path3.shape = shape3;
  path0.transform.prepend(
    Matrix3.translation(-45.64221557229757, -57.033079443499446)
  );
  display.updateDisplay();
  text1.fill = paint4;
  text1.insertChild(2, node2);
  display.updateDisplay();
  path1.transform.setMatrix(Matrix3.scaling(1.4735522429686227));
  text0.insertChild(0, node4);
  display.updateDisplay();
  path0.insertChild(0, path1);
  node3.transform.prepend(
    Matrix3.translation(79.5630092266947, 28.07220183312893)
  );
  path0.fill = paint1;
  display.updateDisplay();
  display.updateDisplay();
  display.updateDisplay();
  text1.removeChild(text0);
  display.updateDisplay();
  node2.transform.setMatrix(
    Matrix3.translation(-8.951065177097917, 74.39073957502842)
  );
  node3.insertChild(0, path1);
  display.updateDisplay();
  text1.removeChild(node6);
  scene.insertChild(0, node6);
  node4.removeChild(node5);
  text1.insertChild(1, path3);
  text0.renderer = 'svg';
  scene.insertChild(1, path2);
  text1.transform.prepend(Matrix3.scaling(1.6156445062946716));
  display.updateDisplay();
  path0.fill = paint2;
  node5.transform.prepend(Matrix3.rotation2(6.1607974870413384));
  text2.fill = paint0;
  path0.insertChild(0, text2);
  text0.insertChild(0, node0);
  text0.fill = paint2;
  text2.transform.append(Matrix3.rotation2(5.287893633789239));
  display.updateDisplay();
  text1.removeChild(path3);
  path0.transform.append(
    Matrix3.translation(-83.13991227187216, -98.52546616457403)
  );
  display.updateDisplay();
  path3.transform.append(
    Matrix3.translation(95.52967073395848, -63.1988724693656)
  );
  node0.insertChild(1, text2);
  node3.insertChild(1, node5);
  path3.fill = paint0;
  text1.removeChild(node2);
  scene.transform.setMatrix(Matrix3.rotation2(5.932826642752049));
  path1.shape = shape3;
  display.updateDisplay();
  text0.insertChild(1, node2);
  node6.insertChild(0, path0);
  text1.insertChild(0, path2);
  text0.fill = paint4;
  path1.fill = paint1;
  node6.insertChild(0, node4);
  path2.transform.append(Matrix3.rotation2(6.175608833319076));
  node6.transform.setMatrix(
    Matrix3.translation(-20.43589591048658, 18.251941679045558)
  );
  text2.fill = paint5;
  node6.transform.setMatrix(Matrix3.scaling(1.5447108320653626));
  path2.stroke = paint2;
  path1.transform.prepend(Matrix3.rotation2(2.141530786164575));
  path1.transform.append(Matrix3.scaling(1.1406134773273209));
  scene.removeChild(path2);
  node6.removeChild(node4);
  path3.shape = shape1;
  node3.removeChild(path1);
  node2.transform.setMatrix(Matrix3.rotation2(5.516405418370864));
  path0.insertChild(0, node1);
  path2.insertChild(0, node5);
  display.updateDisplay();
  node5.insertChild(0, path1);
  node3.insertChild(0, path1);
  path1.fill = paint5;
  text1.fill = paint0;
  node2.transform.append(Matrix3.scaling(1.176399541203324));
  scene.transform.prepend(Matrix3.scaling(0.8068995553761911));
  text2.fill = paint1;
  path2.insertChild(0, node1);
  node0.transform.prepend(Matrix3.scaling(1.116970949456487));
  node3.removeChild(path1);
  path0.insertChild(1, path3);
  path2.stroke = paint0;
  text0.transform.setMatrix(Matrix3.rotation2(0.7311607901360053));
  path2.fill = paint2;
  path0.renderer = 'canvas';
  display.updateDisplay();
  node4.insertChild(0, text1);
  text1.fill = paint4;
  node4.insertChild(1, node2);
  scene.removeChild(node6);
  node0.transform.setMatrix(Matrix3.scaling(1.215771926450003));
  node1.transform.setMatrix(Matrix3.scaling(0.9612389007810693));
  display.updateDisplay();
  path2.removeChild(node5);
  node2.transform.setMatrix(
    Matrix3.translation(46.93744354881346, -27.986287605017424)
  );
  path2.insertChild(0, node6);
  text1.transform.append(Matrix3.rotation2(5.616967681341335));
  path1.transform.setMatrix(
    Matrix3.translation(-72.17136668041348, 6.126852100715041)
  );
  path1.insertChild(0, text2);
  display.updateDisplay();
  path0.fill = paint0;
  path1.removeChild(text2);
  text0.removeChild(node4);
  text1.removeChild(path2);
  path2.shape = shape3;
  path0.removeChild(text2);
  display.updateDisplay();
  node0.transform.setMatrix(
    Matrix3.translation(-6.999507173895836, 87.37162877805531)
  );
  node3.transform.setMatrix(Matrix3.scaling(1.561891864402611));
  path3.fill = paint4;
  path2.fill = paint1;
  node3.transform.prepend(Matrix3.rotation2(3.6535111776911147));
  display.updateDisplay();
  node3.removeChild(node5);
  path2.removeChild(node1);
  node5.removeChild(path1);
  node0.transform.append(
    Matrix3.translation(-23.8929261919111, -83.22895020246506)
  );
  path0.transform.setMatrix(Matrix3.rotation2(2.9077771604531333));
  node6.insertChild(1, node4);
  path1.insertChild(0, text2);
  node1.transform.append(Matrix3.rotation2(3.7211737706468453));
  node0.removeChild(node5);
  node0.insertChild(2, scene);
  path3.insertChild(0, node2);
  text0.renderer = null;
  node1.transform.setMatrix(
    Matrix3.translation(89.88619525916874, -92.88952946662903)
  );
  path0.fill = paint3;
  path0.fill = paint0;
  path1.insertChild(0, node3);
  path1.insertChild(0, path3);
  path2.insertChild(1, node1);
  path0.renderer = null;
  node2.transform.setMatrix(
    Matrix3.translation(6.8230589386075735, 93.58290364034474)
  );
  text0.transform.append(
    Matrix3.translation(-70.73598629795015, -35.05054833367467)
  );
  node1.insertChild(0, text1);
  display.updateDisplay();
  node0.transform.prepend(
    Matrix3.translation(42.59985005483031, -4.169275658205152)
  );
  text1.fill = paint0;
  display.updateDisplay();
  text0.stroke = paint3;
  node4.insertChild(2, node5);
  text0.renderer = 'canvas';
  path2.transform.prepend(Matrix3.scaling(1.1811730723124185));
  path1.shape = shape1;
  display.updateDisplay();
  path3.removeChild(node2);
  path0.fill = paint2;
  display.updateDisplay();
  path2.removeChild(node6);
  node6.transform.prepend(Matrix3.rotation2(3.265904462624187));
  text0.insertChild(0, node4);
  node2.transform.setMatrix(Matrix3.scaling(1.4989715692348966));
  text0.renderer = 'svg';
  scene.transform.append(
    Matrix3.translation(44.83502432703972, 94.38534369692206)
  );
  display.updateDisplay();
  display.updateDisplay();
  node6.insertChild(2, node3);
  node6.insertChild(2, node5);
  path3.shape = shape2;
  scene.transform.setMatrix(Matrix3.rotation2(4.2462163069245245));
  text2.transform.prepend(Matrix3.scaling(0.8035193477984708));
  node6.removeChild(path0);
  node2.transform.prepend(Matrix3.scaling(1.187786252120901));
  node1.removeChild(text1);
  path0.removeChild(path3);
  node4.transform.prepend(Matrix3.scaling(0.8151351887494516));
  text0.transform.prepend(
    Matrix3.translation(57.47851114720106, 36.18123224005103)
  );
  scene.insertChild(0, node3);
  display.updateDisplay();
  node4.transform.append(
    Matrix3.translation(-11.248627118766308, -62.87616486661136)
  );
  path1.shape = shape3;
  node4.transform.append(Matrix3.scaling(1.171111338189263));
  node6.insertChild(3, path3);
  node6.insertChild(0, path0);
  path1.insertChild(3, node0);
  path2.insertChild(0, path3);
  node5.transform.append(
    Matrix3.translation(41.748585272580385, 59.56932995468378)
  );
  path0.removeChild(path1);
  node1.insertChild(0, path3);
  node4.transform.prepend(Matrix3.scaling(0.6510128908552419));
  display.updateDisplay();
  scene.insertChild(1, node6);
  text1.transform.prepend(
    Matrix3.translation(-18.70846562087536, -16.39730636961758)
  );
  display.updateDisplay();
  node3.transform.append(Matrix3.scaling(0.748753536375631));
  text0.transform.setMatrix(
    Matrix3.translation(92.97510990872979, 40.07288310676813)
  );
  display.updateDisplay();
  display.updateDisplay();
  node4.transform.prepend(
    Matrix3.translation(77.15684166178107, 18.647625809535384)
  );
  path3.transform.append(Matrix3.scaling(1.0226189988892713));
  path2.removeChild(node1);
  scene.transform.prepend(Matrix3.scaling(1.0265723367914745));
  path0.transform.setMatrix(Matrix3.rotation2(4.020394309354754));
  node6.transform.setMatrix(Matrix3.rotation2(1.3480025213729132));
  text1.stroke = paint2;
  node4.removeChild(text1);
  text1.insertChild(0, path0);
  node1.renderer = 'dom';
  node1.renderer = 'canvas';
  node2.insertChild(0, node5);
  node3.transform.prepend(Matrix3.rotation2(3.527586292277044));
  node2.transform.append(Matrix3.rotation2(4.657131034509444));
  text1.removeChild(path0);
  scene.insertChild(0, text1);
  node2.removeChild(node5);
  text0.insertChild(0, path0);
  path0.transform.prepend(Matrix3.scaling(1.5312132750399599));
  node4.removeChild(node5);
  node6.transform.setMatrix(Matrix3.scaling(1.2589032364770958));
  display.updateDisplay();
  path1.removeChild(node0);
  display.updateDisplay();
  text2.stroke = paint1;
  node3.transform.prepend(
    Matrix3.translation(63.56673683039844, 13.142612343654037)
  );
  text2.transform.append(Matrix3.rotation2(1.4278196360646898));
  text1.insertChild(0, node6);
  node5.transform.prepend(
    Matrix3.translation(-98.16267783753574, 45.93306481838226)
  );
  path2.removeChild(path3);
  display.updateDisplay();
  node5.transform.append(Matrix3.rotation2(3.193159115871359));
  display.updateDisplay();
  text0.removeChild(node4);
  path3.stroke = paint0;
  path2.renderer = 'svg';
  node1.removeChild(path3);
  path1.insertChild(1, text0);
  node1.renderer = null;
  path0.transform.prepend(
    Matrix3.translation(11.588385235518217, 56.96204639971256)
  );
  text0.transform.append(Matrix3.rotation2(5.68120271282823));
  node6.removeChild(node4);
  path3.fill = paint3;
  text1.stroke = paint0;
  path1.removeChild(text0);
  node0.transform.append(Matrix3.scaling(1.5976065738354066));
  path1.insertChild(1, node5);
  text1.fill = paint5;
  path2.insertChild(0, path0);
  path1.shape = shape1;
  path0.removeChild(node1);
  node0.renderer = 'svg';
  node0.renderer = null;
  text2.insertChild(0, path2);
  node2.insertChild(0, node0);
  path1.renderer = 'canvas';
  display.updateDisplay();
  node2.removeChild(node0);
  node0.insertChild(2, path2);
  display.updateDisplay();
  text0.renderer = null;
  text0.removeChild(node2);
  text1.removeChild(node6);
  display.updateDisplay();
  path2.fill = paint2;
  path0.transform.prepend(
    Matrix3.translation(0.34216628409922123, 92.05387863330543)
  );
  path3.insertChild(0, node5);
  node6.insertChild(2, node4);
  path2.fill = paint4;
  node4.removeChild(node2);
  path3.fill = paint4;
  path1.transform.prepend(Matrix3.scaling(0.8745874637965303));
  node5.insertChild(0, path2);
  node2.insertChild(0, node1);
  path2.fill = paint2;
  text2.stroke = paint0;
  node6.removeChild(node5);
  path0.fill = paint5;
  text0.transform.append(Matrix3.scaling(0.9438613048982065));
  path0.transform.setMatrix(Matrix3.scaling(1.3656963593088278));
  path2.removeChild(path0);
  path2.insertChild(0, text1);
  path1.removeChild(text2);
  path3.fill = paint3;
  path2.removeChild(text1);
  text2.fill = paint3;
  text1.fill = paint2;
  text2.insertChild(1, node4);
  text1.fill = paint3;
  text0.insertChild(0, node2);
  text1.stroke = paint3;
  display.updateDisplay();
  path3.transform.prepend(
    Matrix3.translation(73.50353361107409, -34.58644752390683)
  );
  node0.transform.setMatrix(
    Matrix3.translation(1.3199703302234411, 74.09408940002322)
  );
  text1.insertChild(0, node6);
  node6.transform.prepend(Matrix3.scaling(1.3595488889835963));
  text2.transform.prepend(Matrix3.rotation2(5.473872026112923));
  path0.shape = shape0;
  text1.removeChild(node6);
  node5.insertChild(1, node2);
  node2.removeChild(node1);
  text2.removeChild(node4);
  text1.transform.append(Matrix3.scaling(0.7709866490908157));
  node6.insertChild(0, node2);
  path3.removeChild(node5);
  node5.transform.prepend(Matrix3.scaling(1.1847915848478863));
  path3.fill = paint1;
  path1.removeChild(path3);
  node0.transform.setMatrix(Matrix3.scaling(0.6245428699761819));
  text1.fill = paint4;
  path1.stroke = paint0;
  path1.transform.prepend(
    Matrix3.translation(-82.16741997748613, 28.347921930253506)
  );
  scene.insertChild(3, path3);
  path3.insertChild(0, node1);
  path1.removeChild(node3);
  path1.insertChild(1, path0);
  path1.removeChild(path0);
  path1.removeChild(node5);
  path3.renderer = 'svg';
  path0.transform.append(
    Matrix3.translation(-76.12051209434867, 43.94800164736807)
  );
  path2.renderer = null;
  scene.removeChild(text1);
  path3.fill = paint0;
  path1.shape = shape3;
  path1.transform.append(Matrix3.rotation2(0.23282799856354697));
  display.updateDisplay();
  path3.removeChild(node1);
  node5.insertChild(0, path3);
  node3.insertChild(0, path3);
  node2.transform.prepend(
    Matrix3.translation(-80.56120555847883, -25.92358822003007)
  );
  display.updateDisplay();
  node0.removeChild(path3);
  text2.stroke = paint3;
  path0.fill = paint1;
  display.updateDisplay();
  path2.fill = paint3;
  display.updateDisplay();
  text1.fill = paint2;
  path0.shape = shape3;
  path3.insertChild(0, path1);
  node0.transform.append(
    Matrix3.translation(12.59584897197783, 20.064754923805594)
  );
  text2.transform.setMatrix(Matrix3.scaling(1.0618438214291075));
  path2.transform.append(Matrix3.rotation2(4.132909838958189));
  scene.transform.prepend(
    Matrix3.translation(57.32823261059821, -66.15866278298199)
  );
  display.updateDisplay();
  display.updateDisplay();
  node0.transform.prepend(Matrix3.rotation2(0.10859754825521373));
  path2.fill = paint0;
  display.updateDisplay();
  node5.transform.append(Matrix3.scaling(0.8364831950742941));
  node1.insertChild(0, node4);
  path3.shape = shape3;
  display.updateDisplay();
  node2.insertChild(0, node1);
  node6.insertChild(4, path2);
  node6.removeChild(path2);
  node3.insertChild(0, path0);
  node5.insertChild(0, path1);
  scene.insertChild(0, node4);
  path2.shape = shape1;
  path0.fill = paint3;
  node5.transform.prepend(
    Matrix3.translation(44.68629630282521, -21.516692312434316)
  );
  node3.transform.prepend(Matrix3.scaling(1.5199747808505037));
  text2.removeChild(path2);
  node0.insertChild(3, node4);
  display.updateDisplay();
  path1.fill = paint2;
  node1.transform.setMatrix(Matrix3.scaling(0.8095308953192275));
  path0.fill = paint1;
  node3.transform.setMatrix(Matrix3.scaling(1.1476977710839549));
  display.updateDisplay();
  scene.removeChild(node6);
  display.updateDisplay();
  node0.transform.setMatrix(
    Matrix3.translation(33.04428271949291, 39.9213848169893)
  );
  display.updateDisplay();
  node6.removeChild(node3);
  node6.removeChild(node4);
  node6.transform.prepend(
    Matrix3.translation(10.748354811221361, -73.36423271335661)
  );
  node0.removeChild(text1);
  node6.removeChild(path0);
  path1.transform.setMatrix(Matrix3.scaling(1.0104035512771645));
  text2.fill = paint2;
  display.updateDisplay();
  path2.shape = shape2;
  node5.renderer = 'canvas';
  path1.transform.prepend(
    Matrix3.translation(-69.14590587839484, 19.880587048828602)
  );
  node3.insertChild(2, node2);
  path2.insertChild(0, text1);
  display.updateDisplay();
  text0.removeChild(node0);
  path3.transform.setMatrix(Matrix3.rotation2(3.4165883704823514));
  node0.renderer = 'svg';
  text0.fill = paint5;
  text2.insertChild(0, node1);
  display.updateDisplay();
  path3.fill = paint5;
  path0.insertChild(0, path1);
  node2.removeChild(node1);
  display.updateDisplay();
  display.updateDisplay();
  display.updateDisplay();
  display.updateDisplay();
  node4.insertChild(0, path0);
  node3.transform.append(
    Matrix3.translation(-95.82784906961024, -34.498040145263076)
  );
  path2.insertChild(1, node6);
  path3.shape = shape0;
  text0.removeChild(node2);
  node1.insertChild(1, node3);
  path0.fill = paint2;
  node5.transform.prepend(Matrix3.scaling(1.5423861948069373));
  text0.removeChild(path0);
  node5.transform.setMatrix(Matrix3.scaling(0.7694384168129604));
  path1.transform.setMatrix(Matrix3.scaling(0.8319447227981132));
  path1.transform.append(
    Matrix3.translation(42.7957646548748, -58.12502424232662)
  );
  display.updateDisplay();
  display.updateDisplay();
  node1.insertChild(0, node5);
  display.updateDisplay();
  node1.transform.append(Matrix3.scaling(0.9261672311689895));
  text2.transform.setMatrix(
    Matrix3.translation(93.89225733466446, -50.05272859707475)
  );
  node5.transform.setMatrix(Matrix3.scaling(1.1756866810605118));
  node4.transform.prepend(
    Matrix3.translation(17.80007784254849, 25.68463124334812)
  );
  text1.insertChild(0, node4);
  node0.removeChild(path2);
  path0.shape = shape2;
  node2.insertChild(0, path1);
  node3.removeChild(node2);
  display.updateDisplay();
  path3.renderer = null;
  node2.renderer = 'svg';
  path0.shape = shape1;
  path2.insertChild(2, path1);
  scene.removeChild(path3);
  scene.insertChild(0, text1);
  node6.transform.setMatrix(Matrix3.rotation2(0.8807963123818441));
  text2.transform.setMatrix(Matrix3.scaling(1.4406909212697485));
  node6.transform.setMatrix(
    Matrix3.translation(8.969703316688538, 25.850486429408193)
  );
  display.updateDisplay();
  text2.removeChild(node1);
  scene.removeChild(text1);
  node0.renderer = null;
  text0.fill = paint0;
  node2.removeChild(path1);
  path0.insertChild(1, node6);
  display.updateDisplay();
  path1.stroke = paint1;
  node3.removeChild(path3);
  node1.transform.prepend(Matrix3.rotation2(0.3136961511381274));
  node0.insertChild(1, node6);
  path3.transform.append(Matrix3.rotation2(2.967609471223324));
  display.updateDisplay();
  path0.removeChild(path1);
  node1.removeChild(node4);
  path0.removeChild(node6);
  path1.renderer = 'svg';
  node3.removeChild(path0);
  node5.removeChild(path3);
  node5.insertChild(0, text1);
  node4.insertChild(0, node6);
  path3.removeChild(path1);
  path1.transform.prepend(Matrix3.scaling(0.6747856395080876));
  node1.transform.setMatrix(Matrix3.scaling(0.7458631742041748));
  display.updateDisplay();
  display.updateDisplay();
  display.updateDisplay();
  path3.transform.prepend(Matrix3.scaling(1.446340951951612));
  node3.insertChild(0, node4);
  path1.fill = paint1;
  path3.fill = paint1;
  node6.removeChild(node2);
  node2.renderer = null;
  path2.transform.append(Matrix3.scaling(0.6796344484895658));
  display.updateDisplay();
  path3.shape = shape3;
  scene.insertChild(1, path2);
  scene.removeChild(node4);
  display.updateDisplay();
  path3.insertChild(0, path0);
  path0.renderer = 'canvas';
  path0.renderer = null;
  path1.transform.append(
    Matrix3.translation(-35.264304326847196, 96.3960608933121)
  );
  path0.transform.prepend(Matrix3.scaling(0.9710232618957948));
  node1.removeChild(node5);
  path3.shape = shape0;
  node3.renderer = 'svg';
  path2.stroke = paint2;
  display.updateDisplay();
  path0.shape = shape2;
  node2.transform.setMatrix(Matrix3.rotation2(4.1226984674192915));
  node2.transform.setMatrix(Matrix3.rotation2(4.852877952588577));
  path3.fill = paint4;
  node5.transform.setMatrix(
    Matrix3.translation(68.04132326506078, 50.3698687069118)
  );
  scene.removeChild(path2);
  display.updateDisplay();
  display.updateDisplay();
  node6.transform.setMatrix(Matrix3.scaling(0.9294793844450455));
  path2.removeChild(text1);
  text0.fill = paint2;
  node3.insertChild(1, path1);
  path3.shape = shape2;
  node1.insertChild(0, path2);
  path1.transform.append(
    Matrix3.translation(17.683354765176773, -44.996290653944016)
  );
  node4.insertChild(1, path1);
  node0.insertChild(2, path3);
  text1.stroke = paint4;
  text1.fill = paint0;
  scene.transform.append(Matrix3.scaling(1.598179875756074));
  path2.removeChild(node6);
  node1.insertChild(0, node6);
  display.updateDisplay();
  display.updateDisplay();
  path0.transform.prepend(Matrix3.scaling(1.4355965870194325));
  scene.transform.append(Matrix3.rotation2(3.338968324678741));
  path2.fill = paint3;
  node5.insertChild(0, text0);
  node4.transform.setMatrix(
    Matrix3.translation(39.015086973086, -82.52983423881233)
  );
  display.updateDisplay();
  display.updateDisplay();
  text0.insertChild(0, path1);
  text1.stroke = paint0;
  path2.removeChild(path1);
  path3.removeChild(path0);
  node1.removeChild(node6);
  node4.removeChild(path0);
  text2.transform.append(
    Matrix3.translation(90.54536130279303, 32.8832883387804)
  );
  node3.removeChild(path1);
  scene.transform.setMatrix(
    Matrix3.translation(-63.68664521723986, 29.024989902973175)
  );
  text1.transform.append(
    Matrix3.translation(35.083020152524114, 99.85289294272661)
  );
  node1.transform.append(
    Matrix3.translation(-78.29272500239313, -68.44352912157774)
  );
  node3.removeChild(node4);
  node0.removeChild(text2);
  scene.insertChild(0, node5);
  display.updateDisplay();
  display.updateDisplay();
  node1.insertChild(2, scene);
  path0.insertChild(0, node6);
  node5.removeChild(path1);
  node0.removeChild(node6);
  display.updateDisplay();
  path2.transform.prepend(Matrix3.scaling(0.8058666483260881));
  path3.transform.prepend(Matrix3.scaling(1.348115322761629));
  text1.stroke = paint2;
  display.updateDisplay();
  display.updateDisplay();
  scene.removeChild(node5);
  path3.fill = paint0;
  text0.removeChild(path1);
  path1.stroke = paint0;
  path0.shape = shape3;
  node6.insertChild(0, node3);
  display.updateDisplay();
  node2.insertChild(0, path1);
  node0.insertChild(3, node6);
  node2.insertChild(1, text2);
  path1.shape = shape2;
  display.updateDisplay();
  node1.transform.append(
    Matrix3.translation(48.2739788480103, -88.90814171172678)
  );
  display.updateDisplay();
  display.updateDisplay();
  text2.stroke = paint0;
  scene.removeChild(node3);
  text2.stroke = paint3;
  path0.insertChild(1, node4);
  node4.removeChild(path1);
  text1.removeChild(node4);
  node0.removeChild(node4);
  node6.transform.append(Matrix3.scaling(1.2273195531446675));
  node6.transform.setMatrix(Matrix3.scaling(0.974072394309957));
  path0.insertChild(0, text1);
  node4.removeChild(node6);
  path2.transform.append(
    Matrix3.translation(-31.928275851532817, 31.42418572679162)
  );
  display.updateDisplay();
  node2.insertChild(0, text1);
  path3.insertChild(0, node5);
  path1.renderer = null;
  text1.stroke = paint3;
  node2.transform.append(
    Matrix3.translation(-87.78515825979412, -57.75049920193851)
  );
  path3.shape = shape1;
  path0.insertChild(3, node0);
  display.updateDisplay();
  node5.insertChild(2, path1);
  display.updateDisplay();
  path3.removeChild(node5);
  display.updateDisplay();
  path2.transform.setMatrix(Matrix3.rotation2(2.595849141844823));
  path0.stroke = paint2;
  display.updateDisplay();
  node1.transform.setMatrix(Matrix3.rotation2(5.289866277877784));
  node5.renderer = null;
  node3.transform.append(Matrix3.scaling(0.8371958680212688));
  node6.removeChild(path3);
  text0.fill = paint3;
  path3.shape = shape2;
  node2.transform.append(
    Matrix3.translation(1.6835276503115892, 58.78804912790656)
  );
  path1.insertChild(0, node1);
  node5.removeChild(path2);
  display.updateDisplay();
  node1.insertChild(3, text1);
  node4.insertChild(0, node5);
  path0.removeChild(node4);
  path2.insertChild(0, node6);
  path2.shape = shape0;
  path0.removeChild(text1);
  node2.removeChild(text2);
  path2.removeChild(node6);
  node5.removeChild(path1);
  display.updateDisplay();
  path0.removeChild(node0);
  path0.removeChild(node6);
  node5.transform.setMatrix(
    Matrix3.translation(53.765451023355126, 46.17750230245292)
  );
  display.updateDisplay();
  path1.fill = paint4;
  node4.transform.append(
    Matrix3.translation(-15.302766533568501, -1.2454335577785969)
  );
  node6.removeChild(node3);
  display.updateDisplay();
  text0.insertChild(0, node3);
  display.updateDisplay();
  node2.transform.append(
    Matrix3.translation(84.65924230404198, -60.87620249018073)
  );
  node2.removeChild(path1);
  text2.insertChild(0, node1);
  node5.removeChild(node2);
  node3.renderer = null;
  path3.fill = paint3;
  text1.transform.setMatrix(Matrix3.scaling(1.3864617453649828));
  path0.transform.setMatrix(Matrix3.scaling(1.4961199873354474));
  display.updateDisplay();
  path1.insertChild(1, scene);
  display.updateDisplay();
  node3.renderer = 'canvas';
  node5.removeChild(text1);
  display.updateDisplay();
  display.updateDisplay();
  display.updateDisplay();
  node5.transform.append(Matrix3.scaling(1.4155547857511976));
  text0.transform.prepend(Matrix3.scaling(1.2851721943583527));
  node5.removeChild(text0);
  node1.transform.prepend(Matrix3.scaling(1.575174070079271));
  node0.removeChild(node6);
  path3.insertChild(0, node2);
  text0.insertChild(0, text1);
  path3.removeChild(node2);
  node4.transform.prepend(
    Matrix3.translation(92.18073445372283, -88.26223919168115)
  );
  node2.removeChild(text1);
  path3.stroke = paint4;
  display.updateDisplay();
  display.updateDisplay();
  display.updateDisplay();
  node4.removeChild(node5);
  text0.transform.prepend(Matrix3.scaling(1.0657979293022493));
  node2.transform.prepend(Matrix3.rotation2(1.2734425447020365));
  node0.removeChild(path3);
  text1.transform.setMatrix(
    Matrix3.translation(16.231784503906965, -70.51777318120003)
  );
  node0.transform.prepend(Matrix3.scaling(1.3482453456375936));
  text0.removeChild(text1);
  text1.transform.prepend(
    Matrix3.translation(16.831281781196594, -17.87359449081123)
  );
  display.updateDisplay();
  text1.fill = paint2;
  text2.renderer = 'svg';
  display.updateDisplay();
  scene.transform.append(Matrix3.scaling(1.1725298586528936));
  path2.stroke = paint4;
  display.updateDisplay();
  path3.fill = paint5;
  display.updateDisplay();
  display.updateDisplay();
  path3.insertChild(0, node3);
  node6.insertChild(0, scene);
  path1.shape = shape1;
  text1.transform.prepend(
    Matrix3.translation(-81.9732257630676, -46.807631151750684)
  );
  scene.transform.prepend(
    Matrix3.translation(17.378842597827315, 21.12641679123044)
  );
  path3.shape = shape3;
  path3.stroke = paint5;
  path0.insertChild(0, node6);
  path0.removeChild(node6);
  display.updateDisplay();
  display.updateDisplay();
  path0.stroke = paint1;
  node0.transform.setMatrix(Matrix3.rotation2(4.652179560054944));
  scene.insertChild(0, node4);
  path3.transform.prepend(Matrix3.scaling(1.3556024435669372));
  text0.removeChild(node3);
  text1.fill = paint5;
  node2.renderer = 'canvas';
  display.updateDisplay();
  node6.removeChild(scene);
  display.updateDisplay();
  node4.transform.setMatrix(Matrix3.scaling(1.2692908524763027));
  display.updateDisplay();
  text1.transform.setMatrix(
    Matrix3.translation(64.43961863406003, -66.9884747825563)
  );
  node0.transform.append(
    Matrix3.translation(-86.33558927103877, 80.5636577308178)
  );
  path2.transform.prepend(Matrix3.scaling(1.2371882979054192));
  path2.fill = paint2;
  path1.transform.prepend(
    Matrix3.translation(-38.82167376577854, -71.56986258924007)
  );
  text1.transform.setMatrix(
    Matrix3.translation(-84.45890285074711, 91.41587358899415)
  );
  path0.transform.append(Matrix3.scaling(0.8451847842656266));
  text2.transform.setMatrix(Matrix3.scaling(0.6785959604889344));
  text0.transform.setMatrix(
    Matrix3.translation(37.68878132104874, -12.956778379157186)
  );
  node2.insertChild(0, text0);
  node3.insertChild(0, path2);
  node4.transform.append(Matrix3.scaling(0.7687972824782323));
  node5.transform.setMatrix(Matrix3.scaling(0.6260077016189884));
  text1.transform.prepend(Matrix3.scaling(0.8837381858606081));
  node3.renderer = null;
  node0.removeChild(scene);
  path0.insertChild(0, node0);
  path0.shape = shape0;
  path1.transform.append(Matrix3.scaling(0.8582783922314834));
  path1.stroke = paint2;
  node6.insertChild(0, path3);
  path3.transform.append(
    Matrix3.translation(83.328738482669, -46.94196437485516)
  );
  path1.removeChild(node1);
  path3.stroke = paint4;
  path0.removeChild(node0);
  text0.transform.prepend(Matrix3.scaling(0.821637343731169));
  node1.renderer = 'canvas';
  display.updateDisplay();
  path1.shape = shape2;
  text0.insertChild(0, node0);
  path2.fill = paint5;
  scene.transform.append(Matrix3.rotation2(4.64650113527433));
  path1.shape = shape0;
  scene.insertChild(1, node3);
  path3.transform.prepend(Matrix3.scaling(0.6607098999660652));
  display.updateDisplay();

  assert.ok(true, 'so we have at least 1 test in this set');
  display.dispose();
});
