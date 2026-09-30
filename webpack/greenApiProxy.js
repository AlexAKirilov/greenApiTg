/** @typedef {import('http').IncomingMessage} IncomingMessage */

/**
 * Прокси для GREEN-API в dev/Storybook (обход CORS).
 * @returns {import('webpack-dev-server').Configuration['proxy'] extends (infer U)[] ? U : never}
 */
function createGreenApiProxyEntry() {
  return {
    context: ['/green-api-proxy'],
    // target обязателен для webpack-dev-server: без него прокси матчит все URL (в т.ч. /c, /login).
    target: 'https://api.green-api.com',
    changeOrigin: true,
    router: (/** @type {IncomingMessage} */ req) => {
      const url = new URL(req.url ?? '', 'http://localhost');
      return url.searchParams.get('base') ?? 'https://api.green-api.com';
    },
    pathRewrite: (path, /** @type {IncomingMessage} */ req) => {
      const url = new URL(req.url ?? '', 'http://localhost');
      url.searchParams.delete('base');
      const query = url.search ? url.search : '';
      return path.replace(/^\/green-api-proxy/, '') + query;
    },
    onProxyReq: (proxyReq) => {
      proxyReq.setTimeout(0);
    },
    onError: (err, _req, res) => {
      if (err.code === 'ECONNRESET' || err.code === 'ECONNABORTED') {
        if (res && !res.headersSent) {
          res.writeHead(502);
        }
        res?.end();
        return;
      }
      console.error('[green-api-proxy]', err.message);
    },
  };
}

module.exports = { createGreenApiProxyEntry };
