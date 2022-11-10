import { App } from './app';
import * as https from 'node:https';
import * as fs from 'node:fs';

if (process.env.NODE !== 'production') {
    App.listen(3000);
} else {
    const options = {
        key: fs.readFileSync('/core/cert/hoa.entmor.de/privkey1.pem'),
        cert: fs.readFileSync('/core/cert/hoa.entmor.de/fullchain1.pem'),
    };

    https.createServer(options, App).listen(3000);
}
