export default class CardItem extends HTMLElement {
    constructor() {
        super();
        this.element = this.attachShadow({mode: 'open'});
        this.render();
    }

    static get observedAttributes() {
        return ['title', 'content']
    }

    get title() {
        return this.getAttribute('title');
    }

    set title(value) {
        this.setAttribute('title', value);
    }

    get content() {
        return this.getAttribute('content');
    }

    set content(value) {
        this.setAttribute('content', value);
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

    changeData(event) {
        this.setAttribute()
    }

    setupEvent() {
        this.element.addEventListener('change', this.changeData.bind(this));
    }

    render() {
        this.element.innerHTML = `
            <div class="card text-bg-primary mb-3" style="max-width: 18rem;">
              <div class="card-header">Header</div>
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