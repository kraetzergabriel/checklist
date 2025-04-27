import CookieManager from "../js/cookieManager.js";

export default class CardForm extends HTMLElement {
    constructor() {
        super();
        this.element = this.attachShadow({mode: 'open'});
        this.render();
    }

    setupEvents() {
        this.element.getElementById('buttonAddTask').addEventListener('click',CookieManager.setCookiesAdditionalInformation);
    }

    connectedCallback() {
        this.render();
    }

    disconnectedCallback() {
        console.log(`${this.element} was removed from page`);
    }

    render() {
        this.element.innerHTML = `<div id="cardAddItems" class="card-body">
                <h5 class="card-title text-center"> Add Items </h5>
                <form>
                    <div id="divAddItems" class="list-group"></div>
                    <button class="btn btn-lg btn-primary" type="button" id="buttonAddTask"> Add task
                    </button>
                </form>
            </div> 
            <link rel="stylesheet" href="../css/bootstrap.min.css">`;
        this.setupEvents();
    }
}

customElements.define('card-form', CardForm);