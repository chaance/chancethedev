import { rem } from 'polished';
import { json2mq } from '$lib/utils';

export const breakpoints = {
  small: 0,
  medium: 640,
  large: 924,
  xlarge: 1200,
  xxlarge: 1440,
  xxxlarge: 1600,
};

const defaultBreakpointKeys = Object.keys(breakpoints);
const defaultZeroBreakpoint = defaultBreakpointKeys[0];

/**
 * Get a media query object from a query string or number.
 * The object can be used with json2mq to output a media query string.
 * @example getBreakpointQuery('large up') === { minWidth: '74rem' }
 * @example getBreakpointQuery('medium only') === { minWidth: '64rem', maxWidth: '73.9875rem' }
 * @example getBreakpointQuery('350px', false) === { minWidth: 350 }
 * @param bpQuery - Breakpoint name, or px, rem, or em value to process.
 * @param toRem - Whether or not to convert the query to rem units.
 */
export const getBreakpointQueryObject = (
  bpQuery: string | number = defaultZeroBreakpoint,
  toRem = false
) => {
  const breakpointKeys = defaultBreakpointKeys;
  const zeroBreakpoint = defaultZeroBreakpoint;
  // Validate that zeroBreakpoint is equal to zero
  if (parseInt(breakpoints[zeroBreakpoint]) !== 0) {
    throw new Error(
      'The first key in the breakpoints object must have a value of `0`'
    );
  }
  breakpoints[zeroBreakpoint] = 0;

  // Tests for 1) Positive/negative operator (optional), 2) Numeric absolute value, and 3) unit
  const unitRegex = /^([+-]?(?:\d+|\d*\.\d+))(cm|in|em|mm|rem|px|pc|pt|ch|vh|vw|vmin|vmax|ex|%)$/;

  // If the bpQuery value is just a number, default to { minWidth: value }
  if (!isNaN(bpQuery as any)) {
    return {
      minWidth: toRem ? rem(Number(bpQuery)) : Number(bpQuery),
    };
  } else if (typeof bpQuery === 'string') {
    // Break the string into parts
    // First part is the value, second part is the modifier (if it exists)
    const bpQueryParts = bpQuery.split(' ').filter(Boolean);

    // Assign the value to a variable and, if it is numeric, convert it to a proper number
    let bp: string | number = isNaN(bpQueryParts[0] as any)
      ? bpQueryParts[0]
      : Number(bpQueryParts[0]);

    // Value for max-width media queries
    let bpMax: string | number = 0;

    // Direction of media query (up, down, or only)
    const directions = ['up', 'down', 'only'];
    const direction =
      bpQueryParts.length > 1
        ? directions.includes(bpQueryParts[1])
          ? bpQueryParts[1]
          : 'up'
        : 'up';

    // Eventual output
    let queryObject = {};

    // Is it a named media query?
    let named = false;

    // Orientation media queries have a unique syntax
    if (bp === 'landscape' || bp === 'portrait') {
      return { orientation: bp };
    } else if (bp === 'retina') {
      return [{ WebkitMinDevicePixelRatio: 2 }, { minResolution: '192dpi' }];
    }

    // Try to pull a named breakpoint out of the $breakpoints map
    if (typeof bp === 'string') {
      if (breakpointKeys.includes(bp)) {
        named = true;
        if (direction === 'only' || direction === 'down') {
          const bpMaxKey = breakpointKeys[breakpointKeys.indexOf(bp) + 1];
          bpMax = bpMaxKey ? breakpoints[bpMaxKey] : 0;
        }
        bp = breakpoints[bp];
        if (typeof bp === 'string') {
          if (bp.match(unitRegex)) {
            // Check If value is already a valid CSS unit
            bp = bp.indexOf('px') > -1 ? parseFloat(bp) : bp;
            if (isNaN(bp as any)) {
              console.warn(
                'All values in your `breakpoints` variable must be in pixels.'
              );
              bp = 0;
              named = false;
            }
          } else if (isNaN(bp as any)) {
            console.warn(
              'All values in your `breakpoints` variable must be in pixels.'
            );
            bp = 0;
            named = false;
          } else {
            bp = parseFloat(bp);
          }
        }
      } else if (bp.match(unitRegex)) {
        if (bp.indexOf('px') !== -1) {
          bp = toRem ? parseFloat(rem(bp)) : parseFloat(bp);
        }
        return direction === 'down' ? { maxWidth: bp } : { minWidth: bp };
      } else {
        bp = 0;
        console.warn(
          '`bpQuery` is not defined in your `breakpoints` variable.'
        );
      }
    }

    // Max value is 0.2px under the next breakpoint.
    // Use a precision under 1px to support browser zoom, but not too low to avoid rounding.
    if (bpMax && typeof bpMax === 'number') bpMax = bpMax - 0.2;

    if (toRem) {
      bp = bp > 0 ? parseFloat(rem(bp as number)) : 0;
      bpMax = bpMax > 0 ? parseFloat(rem(bpMax as number)) : 0;
    }

    // Conditions to skip media query creation
    // - It's a named breakpoint that resolved to "0 down" or "0 up"
    // - It's a numeric breakpoint that resolved to "0 " + anything
    if (bp > 0 || direction === 'only' || direction === 'down') {
      const actualBp = toRem ? `${bp}rem` : bp;
      const actualBpMax = toRem ? `${bpMax}rem` : bpMax;
      // `only` ranges use the format `(min-width: n) and (max-width: n)`
      if (direction === 'only') {
        // Only named media queries can have an "only" range
        if (named) {
          // Only use "min-width" if the floor is greater than 0
          if (bp > 0) {
            queryObject = { ...queryObject, minWidth: actualBp };
          }
          // Only use "max-width" if there's a ceiling
          if (bpMax) {
            queryObject = { ...queryObject, maxWidth: actualBpMax };
          }
        } else {
          console.warn('Only named media queries can have an `only` range');
        }
      } else if (direction === 'down') {
        // `down` ranges use the format `(max-width: n)`
        const max = named ? bpMax : bp;
        const actualMax = toRem ? `${max}rem` : max;

        // Skip media query creation if input value is exactly "0 down",
        // unless the function was called as "small down", in which case it's just "small only"
        if ((named || bp > 0) && max) {
          queryObject = { ...queryObject, maxWidth: actualMax };
        }
      } else if (bp > 0) {
        // `up` ranges use the format `(min-width: n)`
        queryObject = { ...queryObject, minWidth: actualBp };
      }
    }
    return queryObject;
  }
  return {};
};

// Get the computed font size from the doc root element
// Handy for calculating ems in the browser.
export const getBaseFontSize = (fallback: number = 16): number => {
  try {
    if (typeof window === 'object' && typeof document === 'object') {
      return parseInt(
        // @ts-ignore
        window.getComputedStyle(document.body.parentElement).fontSize
      );
    }
    return fallback;
  } catch (e) {
    console.error(e);
    return fallback;
  }
};

// Get a px or em unit from a string CSS value
export const getUnit = (value: string): string | null => {
  const re = new RegExp(`(px|rem)`, 'g');
  if (!re.test(value)) {
    return '';
  }
  const sample: string[] | null = value.match(re);
  return sample ? sample[0] || null : null;
};

/**
 * Generates a media query string matching the input value.
 * e.g.: ${breakpoint('medium up')} { ...styles }
 */
export const breakpoint = (
  val: string | number = 'small',
  bps = breakpoints
) => {
  let bpNum: number;
  const breakpointKeys = Object.keys(bps);

  if (bps[breakpointKeys[0]] !== 0) {
    throw Error(
      'The first key in the breakpoints object must have a value of `0`.'
    );
  }

  const valParts = typeof val === 'string' ? val.split(' ') : [];
  const bp = breakpointKeys.includes(val as string)
    ? bps[val]
    : valParts.length > 0 && breakpointKeys.includes(valParts[0])
    ? valParts[0]
    : val;
  let bpMax = 0; // Value for max-width media queries
  const dir = valParts.length > 1 ? valParts[1] : 'up'; // Direction of media query (up, down, or only)
  let str = ''; // Eventual output
  let named: boolean = false; // Is it a named media query?

  // Orientation media queries have a unique syntax
  if (bp === 'landscape' || bp === 'portrait') {
    return `(orientation: ${bp})`;
  } else if (bp === 'retina') {
    return `(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)`;
  }

  // Try to pull a named breakpoint out of the breakpoints object
  if (typeof bp === 'string') {
    if (breakpointKeys.includes(bp)) {
      if (dir === 'only' || dir === 'down') {
        const nextIndex = breakpointKeys.indexOf(bp) + 1;
        if (nextIndex) {
          bpMax = bps[breakpointKeys[nextIndex]];
        }
      }
      bpNum = bps[bp];
      named = true;
    } else {
      bpNum = 0;
      console.warn('`val` is not defined in the breakpoints object.');
    }
  } else {
    bpNum = bp;
  }

  const bpStr = `${bpNum}px`;

  // Max value is 0.2px under the next breakpoint (0.02 / 16 = 0.00125).
  const bpStrMax = bpMax ? `${bpMax}px` : null;

  // Conditions to skip media query creation
  // - It's a named breakpoint that resolved to "0 down" or "0 up"
  // - It's a numeric breakpoint that resolved to "0 " + anything
  if (bpNum > 0 || dir === 'only' || dir === 'down') {
    // `only` ranges use the format `(min-width: n) and (max-width: n)`
    if (dir === 'only') {
      // Only named media queries can have an "only" range
      if (named === true) {
        // Only use "min-width" if the floor is greater than 0
        if (bpNum > 0) {
          str = str + ` (min-width: ${bpStr})`;
          // Only add "and" to the media query if there's a ceiling
          if (bpMax) {
            str = str + ' and ';
          }
        }
        // Only use "max-width" if there's a ceiling
        if (bpMax && bpStrMax) {
          str = str + `(max-width: ${bpStrMax})`;
        }
      } else {
        console.warn(
          'breakpoint(): Only named media queries can have an `only` range.'
        );
      }
    } else if (dir === 'down' && bpStrMax) {
      // `down` ranges use the format `(max-width: n)`
      const max = named ? bpMax : bpNum;
      // Skip media query creation if input value is exactly "0 down",
      // unless the function was called as "small down", in which case it's just "small only"
      if ((named || bpNum > 0) && !!max) {
        str = str + `(max-width: ${bpStrMax})`;
      }
    } else if (bpNum > 0) {
      // `up` ranges use the format `(min-width: n)`
      str = str + `(min-width: ${bpStr})`;
    }
  }
  return str ? `@media ${str}` : '&';
};

export const getMQ = (mq: any) => `@media ${json2mq(mq)}`;
