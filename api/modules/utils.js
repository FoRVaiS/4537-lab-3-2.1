// @ts-check
// DISCLAIMER: Project may contain code and/or comments provided or autocompleted by GitHub CoPilot.

class Utils {
  static getDate() {
    return new Date();
  }

  /**
    * @param {string} url - A url possibly containing params
    * @param {string[]} routes - An array of routes to match against
    */
  static findMatchingRoute(url, routes) {
    const [path] = url.split('?');
    const pathSegments = path.split('/');

    for (const route of routes) {
      const routeSegments = route.split('/');

      // Skip routes that don't have the same number of segments
      if (routeSegments.length !== pathSegments.length) continue;

      for (const routeSegment of routeSegments) {
        const index = routeSegments.indexOf(routeSegment);

        // We should ignore comparisons with params
        const isParam = routeSegment.startsWith(':');
        if (isParam) continue;

        // If this segment doesn't match, the entire route does not match
        const isMatchingSegment = routeSegment === pathSegments[index];
        if (!isMatchingSegment) break;

        const isLastSegment = index === routeSegments.length - 1;
        if (isLastSegment) {
          return route;
        }
      }
    }
  }

  /**
    * @param {string} url - A url possibly containing params
    * @param {string} route - A route that defines url params from
    */
  static extractParams(url, route) {
    const [path] = url.split('?');

    const pathSegments = path.split('/');
    const routeSegments = route.split('/');

    const params = {};

    for (const routeSegment of routeSegments) {
      const index = routeSegments.indexOf(routeSegment);
      const isParam = routeSegment.startsWith(':');

      if (isParam) {
        const paramName = routeSegment.slice(1);
        params[paramName] = pathSegments[index];
      }
    }

    return params;
  }

  /**
    * @param {string} url - A url possibly containing queru strings
    */
  static getQueryStrings(url) {
    const [_, query] = url.split('?');

    const queryStrings = query
      .split('&')
      .map(queryString => queryString.split('='));

    return Object.fromEntries(queryStrings);
  }
}

module.exports = Utils;
