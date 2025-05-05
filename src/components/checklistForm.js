import {groupsEnum} from '../static/static.js';
import CookieManager, {additionalItems} from "../js/cookieManager.js";
import {api} from "../api/api.js";
import {createInputFields, createDiv} from "../utils/utils.js";

export default class ChecklistForm extends HTMLElement {
    constructor() {
        super();
        this.element = this.attachShadow({mode: 'open'});
        this.styleCheckbox = "form-check-input";
        this.cookieManager = new CookieManager(this.element);
        this.getChecklistData();

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
        if (data && data.checklist && data.checklist.lenght > 0) {
            this.checklistData = data.checklist;

            const dataLoaded = new CustomEvent('dataLoaded', {
                bubbles: true,
                detail: {loaded: true}
            })
        }
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

    changeData() {
        this.checkButtonState()
        this.render()
    }

    get visible() {
        return true;//this.getAttribute('visible');
    }

    set visible(_value) {
        this.setAttribute('visible', _value);
    }


    prepareAdditionalItem(father, fatherList) {
        fatherList.removeChild(this.element.getElementById("divListItems"));
        fatherList.appendChild(createDiv("divListItems", "list-group"))
        if (additionalItems.children.length > 0) {
            additionalItems.children.forEach((item, index) => {
                const p = document.createElement("p");
                p.textContent = item;
                this.element.getElementById("divListItems").appendChild(p);
            });
        }
        if (!this.element.getElementById("task")) {
            father.appendChild(createInputFields("task", "text", "Put your task to do", null, null));
            father.appendChild(createInputFields("daysTask", "number", "days to do", null, null));
        }
    }

    // doFile(text, filename) {
    //     const tempElement = document.createElement('a');
    //     tempElement.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    //     tempElement.setAttribute('download', filename);
    //
    //     tempElement.style.display = 'none';
    //     document.body.appendChild(tempElement);
    //
    //     tempElement.click();
    //     document.body.removeChild(tempElement);
    // }

    actionClick(item, id) {
        this.checkItem(groupsEnum, item.text, this.element.getElementById(id).checked);
        this.setCookie(item.text, Boolean(this.element.getElementById(id).checked), Number(this.element.getElementById("daysActivity").value));
        this.checkButtonState(groupsEnum);
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
                fieldGroupChecklist.appendChild(this.createInputFields(...item, this.blurAction))
            })
        }
    }

    configureBody(_groups) {
        _groups.forEach(group => this.prepareItems(group, this.element.getElementById("principal")));
    }

    prepareItems(group, father) {
        if (group && group.children) {
            group.children.forEach((op, index) => {
                const divSwitches = this.createDiv(null, {styles: ["form-check", "form-switch"]});
                this.createCheckBox(op, divSwitches, group.text + "_" + index);
                father.appendChild(divSwitches);
            })
        }
    }

    connectedCallback() {
        this.body();
        this.setupEvents();

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
        if (event.default.loaded && this.checklistData.length > 0) {
            const checklistItem = this.checklistData.filter(i => !i.finished);
            this.configureHeader(checklistItem.header);
            this.configureBody(checklistItem.groupsEnum);
        }


    }
}

customElements.define('checklist-form', ChecklistForm);