import { kebabCase } from 'lodash';

/**
 * Converts a single object into a media query string.
 * https://github.com/akiran/json2mq
 * @param obj
 */
export function obj2mq(obj: { [key: string]: any }): string {
  const isDimension = function(feature: string) {
    const re = /[height|width]$/;
    return re.test(feature);
  };
  let mq = '';
  const features = Object.keys(obj);
  features.forEach((feature, index) => {
    let value = obj[feature];

    const vendorPrefixes = ['webkit', 'ms', 'moz', 'o'];
    const hasVendorPrefix =
      feature[0] === feature[0].toUpperCase() &&
      vendorPrefixes.some(
        prefix => feature.toLowerCase().indexOf(prefix) === 0
      );

    feature = hasVendorPrefix ? `-${kebabCase(feature)}` : kebabCase(feature);

    if (feature.split('-')[0])
      if (isDimension(feature) && typeof value === 'number') {
        // Add px to dimension features
        value = `${value}px`;
      }
    if (value === true) {
      mq += feature;
    } else if (value === false) {
      mq += `not ${feature}`;
    } else {
      mq += `(${feature}: ${value})`;
    }
    if (index < features.length - 1) {
      mq += ' and ';
    }
  });
  return mq;
}

/**
 * Converts an object or array of objects into a media query string.
 * https://github.com/akiran/json2mq
 * @param query
 */
export function json2mq(query: any): string {
  let mq = '';
  if (typeof query === 'string') {
    return query;
  }
  // Handling array of media queries
  if (Array.isArray(query)) {
    query.forEach((q, index) => {
      mq += obj2mq(q);
      if (index < query.length - 1) {
        mq += ', ';
      }
    });
    return mq;
  }
  // Handling single media query
  return obj2mq(query);
}
