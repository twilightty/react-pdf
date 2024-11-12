/**
 * PDF.js worker entry file.
 *
 * This file is identical to Mozilla's pdf.worker.entry.js, with one exception being placed inside
 * this bundle, not theirs.
 */

// @ts-expect-error This does not exist outside of polyfill which this is doing
if (typeof Promise.withResolvers === 'undefined') {
  if (window)
      // @ts-expect-error This does not exist outside of polyfill which this is doing
      window.Promise.withResolvers = function () {
          let resolve, reject;
          const promise = new Promise((res, rej) => {
              resolve = res;
              reject = rej;
          });
          return { promise, resolve, reject };
      };
}

(
  (typeof window !== 'undefined' ? window : {}) as Window &
    typeof globalThis & { pdfjsWorker: unknown }
).pdfjsWorker =
  // @ts-expect-error - pdfjs-dist does not ship with types
  await import('pdfjs-dist/build/pdf.worker.mjs');

export {};
