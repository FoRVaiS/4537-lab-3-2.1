// @ts-check
// DISCLAIMER: Project may contain code and/or comments provided or autocompleted by GitHub CoPilot.

const http = require('http');

const utils = require('./modules/utils.js');
const controllers = require('./controllers.js');

const routes = {
  '/comp4537/labs/3/api/v1/greet': controllers.GreetController.greet,
  '/comp4537/labs/3/api/v1/file/write/:file': controllers.FileController.write,
  '/comp4537/labs/3/api/v1/file/read/:file': controllers.FileController.read,
};

const server = http.createServer((req, res) => {
  if (req.method !== 'GET') return res.end(405, () => 'Method Not Allowed');

  const _routes = Object.keys(routes);
  const url = req.url;

  if (!url) return res.end(500, () => 'Unexpected Server Error');

  const route = utils.findMatchingRoute(url, _routes);

  if (!route) return res.end(404, () => 'Page Not Found');

  const params = utils.extractParams(url, route);
  const queryStrings = utils.getQueryStrings(url);

  req['params'] = params;
  req['query'] = queryStrings;

  const controller = routes[route];
  controller(req, res);
});

module.exports = server;
