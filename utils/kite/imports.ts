// Copyright 2022-2023, University of Colorado Boulder

/**
 * Ordered imports that should be loaded IN THIS ORDER, so we can get around circular dependencies for type checking.
 * Recommended as an approach in
 * https://medium.com/visual-development/how-to-fix-nasty-circular-dependency-issues-once-and-for-all-in-javascript-typescript-a04c987cf0de
 *
 * Internally in Scenery, we'll import from this file instead of directly importing, so we'll be able to control the
 * module load order to prevent errors.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

export { default as kite } from './kite';

export { default as LineStyles, LINE_STYLE_DEFAULT_OPTIONS } from './util/LineStyles';
export type { LineStylesOptions, LineCap, LineJoin } from './util/LineStyles';
export { default as Overlap } from './util/Overlap';
export { default as RayIntersection } from './util/RayIntersection';
export { default as SegmentIntersection } from './util/SegmentIntersection';
export { default as svgNumber } from './util/svgNumber';
export { default as intersectConicMatrices } from './util/intersectConicMatrices';
export { default as svgPath } from './parser/svgPath';

export { default as Segment } from './segments/Segment';
export type { ClosestToPointResult, PiecewiseLinearOptions, DashValues, SerializedSegment } from './segments/Segment';
export { default as Line } from './segments/Line';
export type { SerializedLine } from './segments/Line';
export { default as Quadratic } from './segments/Quadratic';
export type { SerializedQuadratic } from './segments/Quadratic';
export { default as Cubic } from './segments/Cubic';
export type { SerializedCubic } from './segments/Cubic';
export { default as Arc } from './segments/Arc';
export type { SerializedArc } from './segments/Arc';
export { default as EllipticalArc } from './segments/EllipticalArc';
export type { SerializedEllipticalArc } from './segments/EllipticalArc';

export { default as Subpath } from './util/Subpath';
export { default as Shape } from './Shape';
export type { CornerRadiiOptions, SerializedShape, NonlinearTransformedOptions } from './Shape';

export { default as HalfEdge } from './ops/HalfEdge';
export { default as Vertex } from './ops/Vertex';
export { default as Edge } from './ops/Edge';
export { default as Face } from './ops/Face';
export { default as Loop } from './ops/Loop';
export { default as Boundary } from './ops/Boundary';
export { default as BoundsIntersection } from './ops/BoundsIntersection';
export { default as SegmentTree } from './ops/SegmentTree';
export { default as EdgeSegmentTree } from './ops/EdgeSegmentTree';
export { default as VertexSegmentTree } from './ops/VertexSegmentTree';
export { default as Graph } from './ops/Graph';
