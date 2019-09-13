const { NODE_ENV } = process.env;

/**
 * Use invariant() to assert state which your program assumes to be true.
 * https://github.com/zertosh/invariant
 * @param condition
 * @param format
 * @param args
 */
export function invariant(
  condition: any,
  format?: string,
  ...args: any[]
) {
  if (NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    let error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
          'for the full error message and additional helpful warnings.'
      );
    } else {
      let argIndex = 0;
      error = new Error(format.replace(/%s/g, () => args[argIndex++]));
      error.name = 'Invariant Violation';
    }
    // @ts-ignore
    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}
