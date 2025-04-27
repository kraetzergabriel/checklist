
export class HomeScreen extends HTMLElement {
    constructor() {
        super();
        this.element = this.attachShadow({mode: 'open'});
    }

    static get observedAttributes() {
        return ['screen'];
    }

    get screen() {
        return this.getAttribute('screen')
    }

    set screen(value) {
        this.setAttribute('screen', value);
    }

    openScreen(event) {
        this.element.appendChild(event.detail);
    }

    setupEvents() {
        this.element.addEventListener('open-screen',(event) => {
            this.element.appendChild(event.detail);
        });
    }

    connectedCallback() {
        this.render();
        this.setupEvents();
    }

    disconnectedCallback() {
        console.log(`${this.element} was removed from page`);
    }

    render() {
        this.element.innerHTML = `
        <div>
            <card-group></card-group> 
        </div>`;
    }
}

customElements.define('home-screen', HomeScreen);
