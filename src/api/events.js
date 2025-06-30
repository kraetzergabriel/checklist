import fs from "fs";

export const knowingHosts = {
    '/data': './data.json',
    '/backend': 'backend',
    '/saveCard': 'saveCard',
    '/saveChecklist': 'saveChecklist'
}

class Events {

    constructor() {
        this.loadData();
        console.log(this.data);
    }

    loadData() {
        this.data = JSON.parse(fs.readFileSync('./data.json'));
    }

    getNextCardId() {
        if (this.data.card.length === 0) {
            return 1;
        }
        return this.data.card
            .reduce((result, item) => item.cardId >= result ? result.cardId + 1: result).cardId;
    }

    saveCard(req,res,jsonData) {
        try {
            if (jsonData.cardId || this.data.card.filter(i => i.cardId === jsonData.cardId).length === 0) {
                jsonData.cardId = this.getNextCardId();
                this.data.card.push(jsonData);
            }

            // this.data.card.forEach((item, index) => {
            //     if (item.cardId === jsonData.cardId) {
            //         this[index] = jsonData;
            //     }
            // });
            return Promise.resolve();
        } catch (err) {
            console.log(err);
            return Promise.resolve(err)
        }
    }

    saveChecklist(req,res,jsonData) {
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
            try {
                const jsonData = JSON.parse(body);
                if (!!this[knowingHosts[req.url]]) {
                    // TODO remover o fs.promises para ações dentro da class Event
                    this[knowingHosts[req.url]](req, res, jsonData)
                        .then((err) => this.saveFile(req,res,this.data));
                }
            } catch (err) {console.log(err)}
        })
    }
}

export const events = new Events();