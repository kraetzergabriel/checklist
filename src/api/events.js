import fs from "fs";

export const knowingHosts = {
    '/data': './data.json',
    '/backend': 'backend',
    '/saveCard': 'saveCard',
    '/saveChecklist': 'saveChecklist'
}

class Events {

    constructor() {
        this.data = {};
    }

    saveCard(jsonData) {
        if (!jsonData.cardId || this.data.card.filter(i => i.cardId === jsonData.cardId).length === 0) {
            this.data.card.push(jsonData);

            return;
        }

        this.data.card.forEach((item, index) => {
            if (item.cardId === jsonData.cardId) {
                this[index] = jsonData;
            }
        });
    }

    saveChecklist(jsonData) {
        this.data.checklist.forEach((item, index) => {
            if (item.header.filter(i => i.id === 'usCode' && i.value === jsonData.usCode)) {
                this[index] = jsonData;
            }
        });
    }

    backend() {
        throw new Error('Not implemented yet')
    }

    saveFile(req, res, jsonData) {
        fs.writeFile(knowingHosts['/data'], JSON.stringify(jsonData, null, 2),
            (error) => this.responseError(res, error));
    }

    responseError(res, error) {
        if (error) {
            res.writeHead(500, {'content-type': 'application/json'});
            res.end(JSON.stringify({message: 'manda esse json certo seu arrombado'}));
        }
    }

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
            const method = this[knowingHosts[req.url]];
            if (method) {
                fs.promises(method(jsonData))
                    .then(() => this.saveFile(req, res, this.data));
            }
        })
    }
}

export const events = new Events();