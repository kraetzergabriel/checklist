export class CardGroup extends HTMLElement {
    constructor() {
        super();
        this.element = this.attachShadow({mode: 'open'});
        this.render();
    }

    static get observedAttributes() {
        return ['list'];
    }

    connectedCallback() {
        this.render();
    }

    disconnectedCallback() {
        console.log(`${this.element} was removed from page`);
        this.element.removeEventListener('change', this.changeData);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    changeData(event) {
        this.setAttribute('list', event.target.value);
    }

    setupEvent() {
        this.element.addEventListener('change', this.changeData.bind(this));
    }

    get list() {
        return this.getAttribute('list')
    }

    set list(_value) {
        this.setAttribute('list', _value)
    }

    createItems(_list) {
        _list.forEach((index,item) => {
            const card = document.createElement('card-item');
            card.setAttribute('title', `card ${index}`);
            card.setAttribute(`content`, item.value);
            this.element.querySelector('#divListItems').appendChild(card);
        })
    }

    render() {
        this.element.innerHTML = `<div id="cardListItems" class="card-body" style="display: none">
                <h5 class="card-title text-center"> List Items </h5>
                <form id="formListItems">
                    <div id="divListItems" class="list-group">
 
                    </div>
                </form>
            </div>
            <link rel="stylesheet" href="../css/bootstrap.min.css">`;
        this.setupEvent();
        if (this.getAttribute('home')) {
            this.createItems([{value: 'valor1'}, {value: 'valor2'}])
        }
    }
}

customElements.define('card-group', CardGroup);