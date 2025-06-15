// TODO criar serializacao e deserializacao do arquivo data.json, este substituira o uso dos cookies

class ApiFetch {
    constructor() {
        // TODO nothing yet
    }

    get(headers = {}) {
        return fetch('./data', headers)
    }

    saveCard(json) {
        if (!json) {
            return;
        }
        fetch('http://localhost:8081/saveCard', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(json)
        })
            .then(response => this.isValidResponse(response))
            .catch(error => this.treatCatch(error));
    }

    isValidResponse(response) {
        if (!response.ok) {
            throw new Error('error')
        }

        if (response.json) {
            return response.json()
        }

        console.log(`save successful ${response}`);
        return Promise.resolve(null);
    }

    treatCatch(error) {
        console.log(`save error ${error}`)
    }

    saveChecklistData() {
        // TODO it'll be used to save the up-to-dated checklist`s record into a data.json
    }

    // TODO move to card routine
    getCardData() {
        const data = this.get({});
        if (data.card && data.card.lenght > 0) {
            return Promise.resolve(data.card);
        }

        return Promise.resolve(null);
    }

    saveCardData() {
        // TODO it'll be used to save the up-to-dated card`s record into a data.json
    }
}

export const api = new ApiFetch();