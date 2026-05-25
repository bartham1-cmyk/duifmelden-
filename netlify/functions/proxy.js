const https = require('https');

exports.handler = async function(event) {
  const params = event.queryStringParameters || {};
  let url = '[noord.duifmelden.nl](https://noord.duifmelden.nl/)';
  if (params.ow)    url += `ow=${params.ow}&`;
  if (params.rayon) url += `rayon=${params.rayon}&`;
  if (params.samen) url += `samen=${params.samen}&`;
  if (params.nic)   url += `nic=${params.nic}&`;
  if (params.ccg)   url += `ccg=${params.ccg}&`;
  if (params.ver)   url += `ver=${params.ver}&`;
  if (params.spec)  url += `filter=${params.spec}&`;
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: 200,
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Access-Control-Allow-Origin': '*'
          },
          body: data
        });
      });
    }).on('error', e => resolve({ statusCode: 500, body: e.message }));
  });
};
