import * as express from 'express';
import { Express, Request, Response } from 'express';

export const app: Express = express();

app.get('/', (_req: Request, res: Response) => {
    console.log(`INC: ${_req.ip}`)
    res.send('Hello World');
});

if (require.main === module) {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}

