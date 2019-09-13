// https://github.com/reach/router/blob/master/src/lib/utils.js#L147
export const resolve = (to: string, base: string) => {
  // /foo/bar, /baz/qux => /foo/bar
  if (to.startsWith('/')) {
    return to;
  }

  const [toPathname, toQuery] = to.split('?');
  const [basePathname] = base.split('?');

  const toSegments = segmentize(toPathname);
  const baseSegments = segmentize(basePathname);

  // ?a=b, /users?b=c => /users?a=b
  if (toSegments[0] === '') {
    return addQuery(basePathname, toQuery);
  }

  // profile, /users/789 => /users/789/profile
  if (!toSegments[0].startsWith('.')) {
    const pathname = baseSegments.concat(toSegments).join('/');
    return addQuery((basePathname === '/' ? '' : '/') + pathname, toQuery);
  }

  // ./         /users/123  =>  /users/123
  // ../        /users/123  =>  /users
  // ../..      /users/123  =>  /
  // ../../one  /a/b/c/d    =>  /a/b/one
  // .././one   /a/b/c/d    =>  /a/b/c/one
  const allSegments = baseSegments.concat(toSegments);
  const segments = [];
  for (let i = 0, l = allSegments.length; i < l; i++) {
    const segment = allSegments[i];
    if (segment === '..') segments.pop();
    else if (segment !== '.') segments.push(segment);
  }

  return addQuery('/' + segments.join('/'), toQuery);
};

function addQuery(pathname: string, query: string) {
  return pathname + (query ? `?${query}` : '');
}

function segmentize(uri: string) {
  return (
    uri
      // strip starting/ending slashes
      .replace(/(^\/+|\/+$)/g, '')
      .split('/')
  );
}
