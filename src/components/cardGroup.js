import {api} from "../api/api.js";

export class CardGroup extends HTMLElement {
    constructor() {
        super();
        this.element = this.attachShadow({mode: 'open'});
        document.addEventListener('dataLoaded', this.render.bind(this));
    }

    getCardData() {
        api
            .get({})
            .then(response => {
                api.isValidResponse(response)
                    .then(data => this.load(data))
            });
    }

    load(_data) {
        if (_data && _data.card) {
            const dataLoaded = new CustomEvent('dataLoaded', {
                bubbles: true,
                detail: {card: _data.card}
            })

            document.dispatchEvent(dataLoaded);
        }
    }

    connectedCallback() {
        this.body();
        this.setupEvent();
        this.getCardData();
    }

    disconnectedCallback() {
        console.log(`${this.element} was removed from page`);
        this.removeEvents();
    }

    removeEvents() {
        this.element.removeEventListener('change', this.changeData);
        document.removeEventListener('dataLoaded', this.render);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    changeData(event) {
        // this.render();
    // TODO update card datax
    }

    setupEvent() {
        this.element.addEventListener('change', this.changeData.bind(this));
    }

    createCard(_data) {
        const card = document.createElement('card-item');
        card.data = _data;
        return card;
    }

    createCardList(_list) {
        if (_list && _list.length > 0)
        _list.sort().forEach((item) => {
            this.element.getElementById('divListItems').appendChild(this.createCard(item));
        })
    }

    render(_event) {
        if (_event.detail && _event.detail.card) {
            this.createCardList(_event.detail.card);
        }
    }

    body() {
        this.element.innerHTML = `<div id="cardListItems" class="card-body">
                <h5 class="card-title text-center"> List Items </h5>
                <form id="formListItems">
                    <div id="divListItems" class="row row-cols-1 row-cols-md-4">
 
                    </div>
                </form>
            </div>
            <link rel="stylesheet" href="../css/bootstrap.min.css">`;
    }
}

customElements.define('card-group', CardGroup);