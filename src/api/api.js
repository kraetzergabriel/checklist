// TODO criar serializacao e deserializacao do arquivo data.json, este substituira o uso dos cookies

class ApiFetch {
    constructor() {
// TODO nothing yet
    }

    async save(json) {
        try {
            const response = await fetch('http://localhost:8081/', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(json)
            });
            if (!response.ok) {
                throw new Error('error')
            }

            console.log(`save successful ${response}`)
        } catch (error) {
            console.log(`save error ${error}`)
        }
    }

    async get(headers = {}) {
        try {
            const response = fetch('./data.json', headers);
            if (!response.ok) {
                throw new Error('error during fetching data.json');
            }
            return await response.json();
        } catch (error) {
            console.log(error);
        }

        return null;
    }

    async getChecklistData() {
        const data = this.get();
        if (data.checklist && data.checklist.lenght > 0) {
            return data.checklist;
        }
    }

    saveChecklistData() {
    }

    getCardData() {
        const data = this.get();
        if (data.card && data.card.lenght > 0) {
            return data.card;
        }
    }

    saveCardData() {
    }

}

export const api = new ApiFetch();