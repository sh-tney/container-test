import * as http from 'node:http';
import { ConsoleLogger } from './logger';

const logger = new ConsoleLogger();

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
    if (req.url === '/' && req.method === 'GET') {
        logger.info('here');

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Hello World ${req.socket.remoteAddress}`);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
}); 