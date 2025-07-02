import {statusValues} from "../static/static.js";
import {api} from "../api/api.js";

export default class CardItem extends HTMLElement {
    constructor() {
        super();
        this.element = this.attachShadow({mode: 'open'});
        this.render();
    }

    static get observedAttributes() {
        return ['status'];
    }

    set status(_value){
        this.setAttribute('status',_value);
    }

    get status(){
        return this.getAttribute('status');
    }

    connectedCallback() {
        this.render();
    }

    disconnectedCallback() {
        console.log(`${this.element} was removed from page`);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    // changeColorByStatus(_status) {
    //     if (_status === 'URGENT') {
    //         this.element.getElementById(this.getAttribute('cardId')).style.backgroundColor = '#e00e0e';
    //     } else if (_status === 'ATTENTION') {
    //         this.element.getElementById(this.getAttribute('cardId')).style.backgroundColor = '#ebf30b';
    //     } else {
    //         this.element.getElementById(this.getAttribute('cardId')).style.backgroundColor = '#ffffff';
    //     }
    // }

    resolveTask(_event) {
        this.data.status = 'success';
        this.data.resolved = true;
        this.status = this.data.status;
        api.saveCard(this.data);
    }

    setupEvents() {
        // this.element.addEventListener('change', this.changeData.bind(this));
        this.element.getElementById('buttonResolve').addEventListener('click', this.resolveTask.bind(this));
    }

    removeEvents() {
        this.element.getElementById('buttonResolve').remove('click', this.resolveTask)
    }

    render() {
        if (!this.data) {
            return;
        }

        this.element.innerHTML = `<div class="col mb-4">
                <div class="card">
                    <div class="card text-bg-${this.data.status}" style="max-width: 40rem;">
                      <div class="card-header" id="${this.data.cardId}">Header</div>
                      <div class="card-body">
                        <h5 class="card-title">${this.data.title}</h5>
                        <p class="card-text">${this.data.content}</p>
                      <button type="button" class="btn btn-outline-light btn-sm" style="${this.data.resolved ? "display:none":""}" id="buttonResolve">Resolve</button>
                      </div>
                    </div>
                </div>
            </div>
            <link rel="stylesheet" href="../css/bootstrap.min.css">
            `;
        this.setupEvents();
    }

}

customElements.define('card-item', CardItem)