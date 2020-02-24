export * from './canUseDOM';
export * from './invariant';
export * from './inViewport';
export * from './isValidUrl';
export * from './json2mq';
export * from './resolvePromise';
export * from './wrapEvent';
export * from './whatInput';

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

export function assignRef(ref: any, value: any) {
  if (ref == null) return;
  if (typeof ref === 'function') {
    ref(value);
  } else {
    try {
      ref.current = value;
    } catch (error) {
      throw new Error(`Cannot assign value "${value}" to ref "${ref}"`);
    }
  }
}

export function mergeRefs(refs: any[], value: any) {
  refs.forEach(ref => assignRef(ref, value));
}
