class MainForm extends HTMLElement {
    constructor() {
        super();
        this.element = this.attachShadow({mode: 'open'});
    }

    toggleMenu(event) {
        const {id} = event.target();
        if (event.target().classList.contains("show")) {
            document.getElementById(id).classList.remove("show");
        } else {
            document.getElementById(id).classList.add("show");
        }
    }

    connectedCallback() {
        this.render();
    }

    disconnectedCallback() {
        console.log(`${this.element} was removed from page`);
    }

    render() {
        this.element.innerHTML = `
            <div class="row">
                <checklist-form contentData=""></checklist-form>
        
                <div class="card w-50 text-center">
                    <div class="card-header">
                        <ul class="nav nav-tabs card-header-tabs">
                            <li class="nav-item">
                                <button class="nav-link active" id="cardAddItemsButton" onclick="toggleDivItems(false)"> Add
                                    Item
                                </button>
                            </li>
                            <li class="nav-item">
                                <button class="nav-link" id="cardListItemsButton" onclick="toggleDivItems(true)"> To Do</button>
                            </li>
                        </ul>
                    </div>
        
        
                    <card-form data=""> </card-form>
                    <card-group></card-group>
                </div>
            </div>
            <link rel="stylesheet" href="../css/bootstrap.min.css">`;
    }
}

customElements.define('main-form', MainForm);