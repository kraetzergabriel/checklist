import {api} from '../api/api.js';

export default class CardForm extends HTMLElement {
    constructor() {
        super();
        this.element = this.attachShadow({mode: 'open'});
    }

    save(_event) {
        if (_event) {
            const card = {};
            card.title = 'teste';
            card.content = this.element.getElementById('content').value;
            api.saveCard(card);
        }
    }

    setupEvents() {
        this.element.getElementById('buttonAddTask').addEventListener('click', this.save.bind(this));
    }

    removeEvents() {
        this.element.getElementById('buttonAddTask').remove('click', this.save);
    }

    body() {
        this.element.innerHTML = `
            <div id="cardAddItems" class="card-body">
                <h5 class="card-title text-center"> Add Items </h5>
                <form class="row g-3">
                    <div class="coll-md-12 input-group">
                      <span class="input-group-text">Explain your task</span>
                      <textarea class="form-control" aria-label="With textarea" id="content"></textarea>
                    </div>
                    <div class="col-auto">
                        <button class="btn btn-lg btn-primary " type="button" id="buttonAddTask"> Add task </button>
                    <div>
                </form>
            </div> 
            <link rel="stylesheet" href="../css/bootstrap.min.css">`;
    }

    connectedCallback() {
        this.body();
        this.setupEvents();
    }

    disconnectedCallback() {
        this.removeEvents();
        console.log(`${this.element} was removed from page`);
    }

    createCard(item) {
        const card = document.createElement('card-item');
        card.setAttribute()
        this.element.getElementById('divListCards').appendChild()
    }

}

customElements.define('card-form', CardForm);