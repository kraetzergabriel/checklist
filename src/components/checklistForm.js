import {groupsEnum} from '../static/static.js';
import {api} from "../api/api.js";
import {createInputFields, createDiv, createCheckBox} from "../utils/utils.js";

export default class ChecklistForm extends HTMLElement {
    constructor() {
        super();
        this.element = this.attachShadow({mode: 'open'});

        document.addEventListener('dataLoaded', this.render.bind(this))
    }

    getChecklistData() {
        this.checklistData = [];
        api.get({})
            .then(response => {
                api.isValidResponse(response)
                    .then(data => this.load(data))
            });
    }

    load(data) {
        if (data && data.checklist && data.checklist.length > 0) {
            this.checklistData = data.checklist;

            const dataLoaded = new CustomEvent('dataLoaded', {
                bubbles: true,
                detail: {loaded: true}
            })

            document.dispatchEvent(dataLoaded);
        }
    }

    save(us, op) {
        this.checklistData.forEach((item, index) => {
            if (us && us === item.header.filter(i => i.id === 'usCode')[0].value || !item.finished) {
                // TODO find item to update or figure out a new way to save this value
            }
        })
    }

    setupEvents() {
        // TODO used to setup events into elements
        this.element.addEventListener('change', this.changeData.bind(this));
        this.element.getElementById('saveButton').addEventListener('click', this.finish.bind(this));
    }

    removeEvents() {
        this.element.removeEventListener('change', this.changeData);
        this.element.getElementById('saveButton').remove('click', this.finish)
    }

    changeData(event) {
        this.checkButtonState();
        // TODO adjust this call
        this.save();
        this.render()
    }

    get visible() {
        return true;//this.getAttribute('visible');
    }

    set visible(_value) {
        this.setAttribute('visible', _value);
    }

    getValue(prop) {
        return this.element.getElementById(prop).value;
    }

    checkButtonState(list) {
        let state = true;
        list.forEach(group => {
            group.children.forEach(op => {
                if (state) {
                    state = op.value;
                }
            })
        });

        if (state &&
            this.getValue("usCode") !== "" &&
            Number(this.getValue("daysActivity")) > 0) {

            this.element.getElementById("saveButton").classList.remove("disabled");
        } else {
            this.element.getElementById("saveButton").classList.add("disabled");
        }
    }

    blurAction(id) {
        if (this.element.getElementById(id) && this.element.getElementById(id).value) {
            this.setCookie(id, this.element.getElementById(id).value, this.element.getElementById("daysActivity").value)
        }
        this.checkButtonState(groupsEnum);
    }

    configureHeader(_header) {
        const fieldGroupChecklist = this.element.getElementById("headerFields");
        if (_header && _header.length > 0) {
            _header.forEach(item => {
                fieldGroupChecklist.appendChild(
                    createInputFields(
                        item.id,
                        item.type,
                        item.placeHolder,
                        item.value,
                        this.blurAction))
            })
        }
    }

    configureBody(_groups) {
        _groups.forEach(group => this.prepareItems(group, this.element.getElementById("principal")));
    }

    prepareItems(group, father) {
        if (group && group.children) {
            group.children.forEach((op, index) => {
                const divSwitches = createDiv(null, { styles: ["form-check", "form-switch"] });
                createCheckBox(op, divSwitches, group.text + "_" + index);
                father.appendChild(divSwitches);
            })
        }
    }

    connectedCallback() {
        this.body();
        this.setupEvents();
        this.getChecklistData();

        // this.cookieManager.iterateCookie(this.cookieManager.readCookie.bind);
        // groupsEnum.forEach((group) => this.prepareItems(group, this.element.getElementById("principal")));
        // this.prepareAdditionalItem(this.element.getElementById("divAddItems"), this.element.getElementById("formListItems"));
    }

    disconnectedCallback() {
        console.log(`${this.element} was removed from page`);
        this.removeEvents();
    }

    finish() {
        // TODO save the date of finishing task
    }

    body() {
        this.element.innerHTML = `<div class="card" ${this.visible ? '' : 'style="display:none"'}>
            <h5 class="card-title text-center">
                Checklist
            </h5>
            <div class="card-body">
                <form>
                    <div id="headerFields" class="input-group"></div>
                    <div class="form-check container" id="principal"></div>
                </form>
            </div>
            <div class="card-footer text-center">
                <button class="btn btn-lg btn-primary disabled" type="button" id="saveButton"> Finish checklist
                </button>
            </div>
        </div>
        <link rel="stylesheet" href="../css/bootstrap.min.css">`;
    }

    render(event) {
        if (event.detail.loaded && this.checklistData.length > 0) {
            const checklistItem = this.checklistData.filter(i => !i.finished)[0];
            this.configureHeader(checklistItem.header);
            this.configureBody(checklistItem.groupsEnum);
        }
    }
}

customElements.define('checklist-form', ChecklistForm);