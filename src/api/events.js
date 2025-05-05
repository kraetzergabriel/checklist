import fs from "fs";

export const knowingHosts = {
    '/data': './data.json',
    '/backend': './not-implemented-yet'
}
class Events {

    // TODO remove async method
    get(req, res) {
        fs.readFile(knowingHosts[req.url], 'utf8', (err, data) => {
            if (data) {
                res.writeHead(200, {'content-type': 'application/json'});
                res.end(data);
            }
        })
    }

    post(req, res) {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const jsonData = JSON.parse(body);

            fs.writeFile(jsonFileData, JSON.stringify(jsonData, null, 2), (error) => {
                if (error) {
                    res.writeHead(500, {'content-type': 'application/json'});
                    res.end(JSON.stringify({message: 'manda esse json certo seu arrombado'}));
                }
            })
        })
    }
}

export const events = new Events();