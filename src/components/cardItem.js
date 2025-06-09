export default class CardItem extends HTMLElement {
    constructor() {
        super();
        this.element = this.attachShadow({mode: 'open'});
        this.render();
    }

    static get observedAttributes() {
        return ['title', 'content', 'cardId', 'status']
    }

    get title() {
        return this.getAttribute('title');
    }

    set title(_value) {
        this.setAttribute('title', _value);
    }

    get content() {
        return this.getAttribute('content');
    }

    set content(_value) {
        this.setAttribute('content', _value);
    }

    get status() {
        this.getAttribute('status')
    }

    set status(_value) {
        this.setAttribute('status', _value);
    }

    get cardId() {
        return this.getAttribute('cardId');
    }

    set cardId(_value) {
        this.setAttribute('cardId', _value);
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

    changeColorByStatus(_status) {
        if (_status === 'URGENT') {
            this.element.getElementById(this.getAttribute('cardId')).style.backgroundColor = '#e00e0e';
        } else if (_status === 'ATTENTION') {
            this.element.getElementById(this.getAttribute('cardId')).style.backgroundColor = '#ebf30b';
        } else {
            this.element.getElementById(this.getAttribute('cardId')).style.backgroundColor = '#ffffff';
        }
    }

    changeData(_event) {
        const status = this.getAttribute('status');
        if (status) {
            this.changeColorByStatus(status);
        }
    }

    setupEvent() {
        this.element.addEventListener('change', this.changeData.bind(this));
    }

    render() {
        this.element.innerHTML = `
            <div class="card text-bg-primary mb-3" style="max-width: 18rem;">
              <div class="card-header" id="${this.getAttribute('cardId')}">Header</div>
              <div class="card-body">
                <h5 class="card-title">${this.getAttribute('title')}</h5>
                <p class="card-text">${this.getAttribute('content')}</p>
              </div>
            </div>
            <link rel="stylesheet" href="../css/bootstrap.min.css">
            `;
        this.setupEvent();
    }

}

customElements.define('card-item', CardItem)