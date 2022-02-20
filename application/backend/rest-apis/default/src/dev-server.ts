const path = require('path');
import express from 'express';
const lambdaLocal = require('lambda-local');

const app = express();

app.use(express.json());

app.use('/', async (req: express.Request, res: express.Response) => {

    console.dir(req.body)

    try {
        const result = await lambdaLocal.execute({
            lambdaPath: path.join(__dirname, 'index'),
            lambdaHandler: 'handler',
            event: {
                headers: req.headers,
                body: JSON.stringify(req.body),
                httpMethod: req.method,
                pathParameters: {
                    proxy: req.path
                }
            }
        });

        res.status(result.statusCode)
            .set(result.headers)
            .end(result.body);
    } catch (e) {
        if (e instanceof Error) {
            res.status(500).end(e.message);
        } else {
            res.status(500).end('');
        }
    }
});

const port = 3001;
app.listen(port, () => console.log(`listening on port: ${port}`));

export {};
