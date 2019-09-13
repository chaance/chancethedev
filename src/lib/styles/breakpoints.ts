import { json2mq } from '$lib/utils';

const BREAKPOINTS = {
  small: 0,
  medium: 640,
  large: 924,
  xlarge: 1200,
  xxlarge: 1440,
  xxxlarge: 1600,
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
  breakpoints = BREAKPOINTS
) => {
  let bpNum: number;
  const breakpointKeys = Object.keys(breakpoints);

  if (breakpoints[breakpointKeys[0]] !== 0) {
    throw Error(
      'The first key in the breakpoints object must have a value of `0`.'
    );
  }

  const valParts = typeof val === 'string' ? val.split(' ') : [];
  const bp = breakpointKeys.includes(val as string)
    ? breakpoints[val]
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
          bpMax = breakpoints[breakpointKeys[nextIndex]];
        }
      }
      bpNum = breakpoints[bp];
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

export const breakpoints = BREAKPOINTS;

export default breakpoints;
