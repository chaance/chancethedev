export { getBreakpointQueryObject } from './getBreakpointQueryObject';
export { invariant } from './invariant';
export { inViewport } from './inViewport';
export { isValidUrl } from './isValidUrl';
export { resolvePromise } from './resolvePromise';
export { default as keyCodeMap } from './keyCodeMap';
export { obj2mq, json2mq } from './json2mq';

export function formatReadingTime(minutes: number | string) {
  return `${minutes} minute read`;
}

export function unSlashIt(str: string) {
  return str.replace(/^(\/*)|(\/*)$/g, '');
}

export function leadingSlashIt(str: string) {
  return '/' + unSlashIt(str);
}

export function trailingSlashIt(str: string) {
  return unSlashIt(str) + '/';
}

export function doubleSlashIt(str: string) {
  return '/' + unSlashIt(str) + '/';
}
