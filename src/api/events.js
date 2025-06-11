import fs from "fs";

export const knowingHosts = {
    '/data': './data.json',
    '/backend': 'backend',
    '/saveCard': 'saveCard',
    '/saveChecklist': 'saveChecklist'
}

Array.prototype.update = function (value, prop) {
    this.forEach((item, index) => {
        if (item[prop] === value[prop]) {
            this[index] = value;
        }
    });
}

class Events {

    constructor() {
        this.data = {};
    }

    saveCard(jsonData) {
        this.data.card.update(jsonData, 'cardId');
    }

    saveChecklist(jsonData) {
        this.data.card.update(jsonData, 'header[0].id');
    }

    backend() {
        throw new Error('Not implemented yet')
    }


    saveFile(req, res,jsonData) {
        fs.writeFile(knowingHosts[req.url], JSON.stringify(jsonData, null, 2),
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
                    .then(() => this.saveFile(req,res, jsonData));
            }
        })
    }
}

export const events = new Events();