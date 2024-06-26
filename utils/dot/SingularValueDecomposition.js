// Copyright 2013-2022, University of Colorado Boulder

/**
 * SVD decomposition, based on Jama (http://math.nist.gov/javanumerics/jama/)
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import dot from '@/utils/dot/dot';
import Matrix from '@/utils/dot/Matrix';

const ArrayType = window.Float64Array || Array;

class SingularValueDecomposition {
  /**
   * @param {Matrix} matrix
   */
  constructor(matrix) {
    this.matrix = matrix;

    const Arg = matrix;

    // Derived from LINPACK code.
    // Initialize.
    const A = Arg.getArrayCopy();
    this.m = Arg.getRowDimension();
    this.n = Arg.getColumnDimension();
    const m = this.m;
    const n = this.n;

    const min = Math.min;
    const max = Math.max;
    const pow = Math.pow;
    const abs = Math.abs;

    /* Apparently the failing cases are only a proper subset of (m<n),
     so let's not throw error.  Correct fix to come later?
     if (m<n) {
     throw new IllegalArgumentException("Jama SVD only works for m >= n"); }
     */
    const nu = min(m, n);
    this.s = new ArrayType(min(m + 1, n));
    const s = this.s;
    this.U = new ArrayType(m * nu);
    const U = this.U;
    this.V = new ArrayType(n * n);
    const V = this.V;
    const e = new ArrayType(n);
    const work = new ArrayType(m);
    const wantu = true;
    const wantv = true;

    let i;
    let j;
    let k;
    let t;
    let f;

    let cs;
    let sn;

    const hypot = Matrix.hypot;

    // Reduce A to bidiagonal form, storing the diagonal elements
    // in s and the super-diagonal elements in e.

    const nct = min(m - 1, n);
    const nrt = max(0, min(n - 2, m));
    for (k = 0; k < max(nct, nrt); k++) {
      if (k < nct) {
        // Compute the transformation for the k-th column and
        // place the k-th diagonal in s[k].
        // Compute 2-norm of k-th column without under/overflow.
        s[k] = 0;
        for (i = k; i < m; i++) {
          s[k] = hypot(s[k], A[i * n + k]);
        }
        if (s[k] !== 0.0) {
          if (A[k * n + k] < 0.0) {
            s[k] = -s[k];
          }
          for (i = k; i < m; i++) {
            A[i * n + k] /= s[k];
          }
          A[k * n + k] += 1.0;
        }
        s[k] = -s[k];
      }
      for (j = k + 1; j < n; j++) {
        if (k < nct && s[k] !== 0.0) {
          // Apply the transformation.

          t = 0;
          for (i = k; i < m; i++) {
            t += A[i * n + k] * A[i * n + j];
          }
          t = -t / A[k * n + k];
          for (i = k; i < m; i++) {
            A[i * n + j] += t * A[i * n + k];
          }
        }

        // Place the k-th row of A into e for the
        // subsequent calculation of the row transformation.

        e[j] = A[k * n + j];
      }
      if (wantu && k < nct) {
        // Place the transformation in U for subsequent back
        // multiplication.

        for (i = k; i < m; i++) {
          U[i * nu + k] = A[i * n + k];
        }
      }
      if (k < nrt) {
        // Compute the k-th row transformation and place the
        // k-th super-diagonal in e[k].
        // Compute 2-norm without under/overflow.
        e[k] = 0;
        for (i = k + 1; i < n; i++) {
          e[k] = hypot(e[k], e[i]);
        }
        if (e[k] !== 0.0) {
          if (e[k + 1] < 0.0) {
            e[k] = -e[k];
          }
          for (i = k + 1; i < n; i++) {
            e[i] /= e[k];
          }
          e[k + 1] += 1.0;
        }
        e[k] = -e[k];
        if (k + 1 < m && e[k] !== 0.0) {
          // Apply the transformation.

          for (i = k + 1; i < m; i++) {
            work[i] = 0.0;
          }
          for (j = k + 1; j < n; j++) {
            for (i = k + 1; i < m; i++) {
              work[i] += e[j] * A[i * n + j];
            }
          }
          for (j = k + 1; j < n; j++) {
            t = -e[j] / e[k + 1];
            for (i = k + 1; i < m; i++) {
              A[i * n + j] += t * work[i];
            }
          }
        }
        if (wantv) {
          // Place the transformation in V for subsequent
          // back multiplication.

          for (i = k + 1; i < n; i++) {
            V[i * n + k] = e[i];
          }
        }
      }
    }

    // Set up the final bidiagonal matrix or order p.

    let p = min(n, m + 1);
    if (nct < n) {
      s[nct] = A[nct * n + nct];
    }
    if (m < p) {
      s[p - 1] = 0.0;
    }
    if (nrt + 1 < p) {
      e[nrt] = A[nrt * n + p - 1];
    }
    e[p - 1] = 0.0;

    // If required, generate U.

    if (wantu) {
      for (j = nct; j < nu; j++) {
        for (i = 0; i < m; i++) {
          U[i * nu + j] = 0.0;
        }
        U[j * nu + j] = 1.0;
      }
      for (k = nct - 1; k >= 0; k--) {
        if (s[k] !== 0.0) {
          for (j = k + 1; j < nu; j++) {
            t = 0;
            for (i = k; i < m; i++) {
              t += U[i * nu + k] * U[i * nu + j];
            }
            t = -t / U[k * nu + k];
            for (i = k; i < m; i++) {
              U[i * nu + j] += t * U[i * nu + k];
            }
          }
          for (i = k; i < m; i++) {
            U[i * nu + k] = -U[i * nu + k];
          }
          U[k * nu + k] = 1.0 + U[k * nu + k];
          for (i = 0; i < k - 1; i++) {
            U[i * nu + k] = 0.0;
          }
        } else {
          for (i = 0; i < m; i++) {
            U[i * nu + k] = 0.0;
          }
          U[k * nu + k] = 1.0;
        }
      }
    }

    // If required, generate V.

    if (wantv) {
      for (k = n - 1; k >= 0; k--) {
        if (k < nrt && e[k] !== 0.0) {
          for (j = k + 1; j < nu; j++) {
            t = 0;
            for (i = k + 1; i < n; i++) {
              t += V[i * n + k] * V[i * n + j];
            }
            t = -t / V[(k + 1) * n + k];
            for (i = k + 1; i < n; i++) {
              V[i * n + j] += t * V[i * n + k];
            }
          }
        }
        for (i = 0; i < n; i++) {
          V[i * n + k] = 0.0;
        }
        V[k * n + k] = 1.0;
      }
    }

    // Main iteration loop for the singular values.

    const pp = p - 1;
    let iter = 0;
    const eps = pow(2.0, -52.0);
    const tiny = pow(2.0, -966.0);
    while (p > 0) {
      let kase;

      // Here is where a test for too many iterations would go.
      if (iter > 500) {
        break;
      }

      // This section of the program inspects for
      // negligible elements in the s and e arrays.  On
      // completion the variables kase and k are set as follows.

      // kase = 1   if s(p) and e[k-1] are negligible and k<p
      // kase = 2   if s(k) is negligible and k<p
      // kase = 3   if e[k-1] is negligible, k<p, and
      //        s(k), ..., s(p) are not negligible (qr step).
      // kase = 4   if e(p-1) is negligible (convergence).

      for (k = p - 2; k >= -1; k--) {
        if (k === -1) {
          break;
        }
        if (abs(e[k]) <= tiny + eps * (abs(s[k]) + abs(s[k + 1]))) {
          e[k] = 0.0;
          break;
        }
      }
      if (k === p - 2) {
        kase = 4;
      } else {
        let ks;
        for (ks = p - 1; ks >= k; ks--) {
          if (ks === k) {
            break;
          }
          t = (ks !== p ? abs(e[ks]) : 0) + (ks !== k + 1 ? abs(e[ks - 1]) : 0);
          if (abs(s[ks]) <= tiny + eps * t) {
            s[ks] = 0.0;
            break;
          }
        }
        if (ks === k) {
          kase = 3;
        } else if (ks === p - 1) {
          kase = 1;
        } else {
          kase = 2;
          k = ks;
        }
      }
      k++;

      // Perform the task indicated by kase.

      switch (kase) {
        // Deflate negligible s(p).

        case 1:
          f = e[p - 2];
          e[p - 2] = 0.0;
          for (j = p - 2; j >= k; j--) {
            t = hypot(s[j], f);
            cs = s[j] / t;
            sn = f / t;
            s[j] = t;
            if (j !== k) {
              f = -sn * e[j - 1];
              e[j - 1] = cs * e[j - 1];
            }
            if (wantv) {
              for (i = 0; i < n; i++) {
                t = cs * V[i * n + j] + sn * V[i * n + p - 1];
                V[i * n + p - 1] = -sn * V[i * n + j] + cs * V[i * n + p - 1];
                V[i * n + j] = t;
              }
            }
          }
          break;

        // Split at negligible s(k).

        case 2:
          f = e[k - 1];
          e[k - 1] = 0.0;
          for (j = k; j < p; j++) {
            t = hypot(s[j], f);
            cs = s[j] / t;
            sn = f / t;
            s[j] = t;
            f = -sn * e[j];
            e[j] = cs * e[j];
            if (wantu) {
              for (i = 0; i < m; i++) {
                t = cs * U[i * nu + j] + sn * U[i * nu + k - 1];
                U[i * nu + k - 1] =
                  -sn * U[i * nu + j] + cs * U[i * nu + k - 1];
                U[i * nu + j] = t;
              }
            }
          }
          break;

        // Perform one qr step.

        case 3:
          {
            // Calculate the shift.

            const scale = max(
              max(
                max(max(abs(s[p - 1]), abs(s[p - 2])), abs(e[p - 2])),
                abs(s[k])
              ),
              abs(e[k])
            );
            const sp = s[p - 1] / scale;
            const spm1 = s[p - 2] / scale;
            const epm1 = e[p - 2] / scale;
            const sk = s[k] / scale;
            const ek = e[k] / scale;
            const b = ((spm1 + sp) * (spm1 - sp) + epm1 * epm1) / 2.0;
            const c = sp * epm1 * (sp * epm1);
            let shift = 0.0;
            if (b !== 0.0 || c !== 0.0) {
              shift = Math.sqrt(b * b + c);
              if (b < 0.0) {
                shift = -shift;
              }
              shift = c / (b + shift);
            }
            f = (sk + sp) * (sk - sp) + shift;
            let g = sk * ek;

            // Chase zeros.

            for (j = k; j < p - 1; j++) {
              t = hypot(f, g);
              cs = f / t;
              sn = g / t;
              if (j !== k) {
                e[j - 1] = t;
              }
              f = cs * s[j] + sn * e[j];
              e[j] = cs * e[j] - sn * s[j];
              g = sn * s[j + 1];
              s[j + 1] = cs * s[j + 1];
              if (wantv) {
                for (i = 0; i < n; i++) {
                  t = cs * V[i * n + j] + sn * V[i * n + j + 1];
                  V[i * n + j + 1] = -sn * V[i * n + j] + cs * V[i * n + j + 1];
                  V[i * n + j] = t;
                }
              }
              t = hypot(f, g);
              cs = f / t;
              sn = g / t;
              s[j] = t;
              f = cs * e[j] + sn * s[j + 1];
              s[j + 1] = -sn * e[j] + cs * s[j + 1];
              g = sn * e[j + 1];
              e[j + 1] = cs * e[j + 1];
              if (wantu && j < m - 1) {
                for (i = 0; i < m; i++) {
                  t = cs * U[i * nu + j] + sn * U[i * nu + j + 1];
                  U[i * nu + j + 1] =
                    -sn * U[i * nu + j] + cs * U[i * nu + j + 1];
                  U[i * nu + j] = t;
                }
              }
            }
            e[p - 2] = f;
            iter = iter + 1;
          }
          break;

        // Convergence.

        case 4:
          // Make the singular values positive.

          if (s[k] <= 0.0) {
            s[k] = s[k] < 0.0 ? -s[k] : 0.0;
            if (wantv) {
              for (i = 0; i <= pp; i++) {
                V[i * n + k] = -V[i * n + k];
              }
            }
          }

          // Order the singular values.

          while (k < pp) {
            if (s[k] >= s[k + 1]) {
              break;
            }
            t = s[k];
            s[k] = s[k + 1];
            s[k + 1] = t;
            if (wantv && k < n - 1) {
              for (i = 0; i < n; i++) {
                t = V[i * n + k + 1];
                V[i * n + k + 1] = V[i * n + k];
                V[i * n + k] = t;
              }
            }
            if (wantu && k < m - 1) {
              for (i = 0; i < m; i++) {
                t = U[i * nu + k + 1];
                U[i * nu + k + 1] = U[i * nu + k];
                U[i * nu + k] = t;
              }
            }
            k++;
          }
          iter = 0;
          p--;
          break;

        default:
          throw new Error(`invalid kase: ${kase}`);
      }
    }
  }

  /**
   * @public
   *
   * @returns {Matrix}
   */
  getU() {
    return new Matrix(this.m, Math.min(this.m + 1, this.n), this.U, true); // the "fast" flag added, since U is ArrayType
  }

  /**
   * @public
   *
   * @returns {Matrix}
   */
  getV() {
    return new Matrix(this.n, this.n, this.V, true);
  }

  /**
   * @public
   *
   * @returns {Array.<number>}
   */
  getSingularValues() {
    return this.s;
  }

  /**
   * @public
   *
   * @returns {Matrix}
   */
  getS() {
    const result = new Matrix(this.n, this.n);
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.n; j++) {
        result.entries[result.index(i, j)] = 0.0;
      }
      result.entries[result.index(i, i)] = this.s[i];
    }
    return result;
  }

  /**
   * @public
   *
   * @returns {number}
   */
  norm2() {
    return this.s[0];
  }

  /**
   * @public
   *
   * @returns {number}
   */
  cond() {
    return this.s[0] / this.s[Math.min(this.m, this.n) - 1];
  }

  /**
   * @public
   *
   * @returns {number}
   */
  rank() {
    // changed to 23 from 52 (bits of mantissa), since we are using floats here!
    const eps = Math.pow(2.0, -23.0);
    const tol = Math.max(this.m, this.n) * this.s[0] * eps;
    let r = 0;
    for (let i = 0; i < this.s.length; i++) {
      if (this.s[i] > tol) {
        r++;
      }
    }
    return r;
  }

  /**
   * Constructs the Moore-Penrose pseudoinverse of the specified matrix, using the SVD construction.
   * @public
   *
   * See https://en.wikipedia.org/wiki/Moore%E2%80%93Penrose_pseudoinverse for details. Helpful for
   * linear least-squares regression.
   *
   * @param {Matrix} matrix, m x n
   * @returns {Matrix} - n x m
   */
  static pseudoinverse(matrix) {
    const svd = new SingularValueDecomposition(matrix);
    const sigmaPseudoinverse = Matrix.diagonalMatrix(
      svd.getSingularValues().map((value) => {
        if (Math.abs(value) < 1e-300) {
          return 0;
        } else {
          return 1 / value;
        }
      })
    );
    return svd.getV().times(sigmaPseudoinverse).times(svd.getU().transpose());
  }
}

dot.register('SingularValueDecomposition', SingularValueDecomposition);

export default SingularValueDecomposition;
