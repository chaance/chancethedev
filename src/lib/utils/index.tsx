export * from './invariant';
export * from './inViewport';
export * from './isValidUrl';
export * from './resolvePromise';
export * from './json2mq';
export * from './wrapEvent';
export { default as keyCodeMap } from './keyCodeMap';

export function formatReadingTime(minutes: number | string) {
  return `${minutes} minute read`;
}

export function formatListenTime(minutes: number | string) {
  return `${minutes} minute listen`;
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
