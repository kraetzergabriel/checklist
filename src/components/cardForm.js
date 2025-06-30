import {api} from '../api/api.js';
import {statusValues} from '../static/static.js';

export default class CardForm extends HTMLElement {
    constructor() {
        super();
        this.element = this.attachShadow({mode: 'open'});
    }

    clearFields() {
        this.element.getElementById('title').value;
        this.element.getElementById('content').value;
        this.element.getElementById('status').value;
    }

    save(_event) {
        if (_event) {
            const card = {};
            card.title = this.element.getElementById('title').value;
            card.content = this.element.getElementById('content').value;
            card.status = this.element.getElementById('status').value;
            api.saveCard(card);
            this.clearFields();
        }
    }

    setupEvents() {
        this.element.getElementById('buttonAddTask').addEventListener('click', this.save.bind(this));
    }

    removeEvents() {
        this.element.getElementById('buttonAddTask').remove('click', this.save);
    }

    setStatus() {
        statusValues.forEach(item => {
            document.getElementById('status').appendChild(`<option value="${item}">${item}</option>`)
        })
    }

    body() {
        this.element.innerHTML = `
            <div id="cardAddItems" class="card-body">
                <h5 class="card-title text-center"> Add Items </h5>
                <form class="row g-3">
                    <div class="coll-md-12 input-group">
                      <span class="input-group-text">Title</span>
                      <input class="form-control" aria-label="With textarea" id="title"/>
                      
                      <select class="form-select" aria-label="Default select example" id="status">
                          <option selected>Status</option>
                          
                          <option value="primary">primary</option>
                          <option value="secondary">secondary</option>
                          <option value="danger">danger</option>
                          <option value="white">white</option>
                          <option value="success">success</option>
                        </select>
                    </div>
                    <div class="coll-md-12 input-group-text">
                        <span class="input-group-text">Explain your task</span>
                        <textarea class="form-control" aria-label="With textarea" id="content"></textarea>                 
                    </div>
                    <div class="col-auto">
                        <button class="btn btn-lg btn-primary " type="button" id="buttonAddTask"> Add task </button>
                    <div>
                </form>
            </div> 
            <link rel="stylesheet" href="../css/bootstrap.min.css">`;
        this.setStatus();
    }

    connectedCallback() {
        this.body();
        this.setupEvents();
    }

    disconnectedCallback() {
        this.removeEvents();
        console.log(`${this.element} was removed from page`);
    }
}

customElements.define('card-form', CardForm);