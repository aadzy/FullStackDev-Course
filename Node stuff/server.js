const http = require('http');
const url = require('url');
const fs = require('fs');

// Load JSON files synchronously at server start
const players = JSON.parse(fs.readFileSync('./data/players.json'));
const teams = JSON.parse(fs.readFileSync('./data/teams.json'));

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Add CORS header here for all routes
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (pathname === '/api') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Welcome to the Valorant API' }));
  } 
  else if (pathname === '/api/teams') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(teams));
  } 
  else if (pathname === '/api/players') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(players));
  } 
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
