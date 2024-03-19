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

export { default as kite } from '@/utils/kite/kite';

export { default as LineStyles, LINE_STYLE_DEFAULT_OPTIONS } from '@/utils/kite/util/LineStyles';
export type { LineStylesOptions, LineCap, LineJoin } from '@/utils/kite/util/LineStyles';
export { default as Overlap } from '@/utils/kite/util/Overlap';
export { default as RayIntersection } from '@/utils/kite/util/RayIntersection';
export { default as SegmentIntersection } from '@/utils/kite/util/SegmentIntersection';
export { default as svgNumber } from '@/utils/kite/util/svgNumber';
export { default as intersectConicMatrices } from '@/utils/kite/util/intersectConicMatrices';
export { default as svgPath } from '@/utils/kite/parser/svgPath';

export { default as Segment } from '@/utils/kite/segments/Segment';
export type { ClosestToPointResult, PiecewiseLinearOptions, DashValues, SerializedSegment } from '@/utils/kite/segments/Segment';
export { default as Line } from '@/utils/kite/segments/Line';
export type { SerializedLine } from '@/utils/kite/segments/Line';
export { default as Quadratic } from '@/utils/kite/segments/Quadratic';
export type { SerializedQuadratic } from '@/utils/kite/segments/Quadratic';
export { default as Cubic } from '@/utils/kite/segments/Cubic';
export type { SerializedCubic } from '@/utils/kite/segments/Cubic';
export { default as Arc } from '@/utils/kite/segments/Arc';
export type { SerializedArc } from '@/utils/kite/segments/Arc';
export { default as EllipticalArc } from '@/utils/kite/segments/EllipticalArc';
export type { SerializedEllipticalArc } from '@/utils/kite/segments/EllipticalArc';

export { default as Subpath } from '@/utils/kite/util/Subpath';
export { default as Shape } from '@/utils/kite/Shape';
export type { CornerRadiiOptions, SerializedShape, NonlinearTransformedOptions } from '@/utils/kite/Shape';

export { default as HalfEdge } from '@/utils/kite/ops/HalfEdge';
export { default as Vertex } from '@/utils/kite/ops/Vertex';
export { default as Edge } from '@/utils/kite/ops/Edge';
export { default as Face } from '@/utils/kite/ops/Face';
export { default as Loop } from '@/utils/kite/ops/Loop';
export { default as Boundary } from '@/utils/kite/ops/Boundary';
export { default as BoundsIntersection } from '@/utils/kite/ops/BoundsIntersection';
export { default as SegmentTree } from '@/utils/kite/ops/SegmentTree';
export { default as EdgeSegmentTree } from '@/utils/kite/ops/EdgeSegmentTree';
export { default as VertexSegmentTree } from '@/utils/kite/ops/VertexSegmentTree';
export { default as Graph } from '@/utils/kite/ops/Graph';
