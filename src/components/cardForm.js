import CookieManager from "../js/cookieManager.js";

export default class CardForm extends HTMLElement {
    constructor() {
        super();
        this.element = this.attachShadow({mode: 'open'});
    }

    setupEvents() {
        this.element.getElementById('buttonAddTask').addEventListener('click', CookieManager.setCookiesAdditionalInformation);
    }

    removeEvents() {
        this.element.getElementById('buttonAddTask').remove('click', CookieManager.setCookiesAdditionalInformation);
    }

    body() {
        this.element.innerHTML = `<div id="cardAddItems" class="card-body">
                <h5 class="card-title text-center"> Add Items </h5>
                <form>
                    <div id="divListCards" class="list-group"></div>
                    <button class="btn btn-lg btn-primary" type="button" id="buttonAddTask"> Add task
                    </button>
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