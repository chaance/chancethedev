export function resolvePromise(promise: any) {
  if (typeof promise === 'function') {
    return promise();
  }
  return promise;
}
