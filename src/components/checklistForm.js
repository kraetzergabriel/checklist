import {groupsEnum} from '../static/static.js';
import CookieManager, {additionalItems} from "../js/cookieManager.js";

export default class ChecklistForm extends HTMLElement {
    constructor() {
        super();
        this.element = this.attachShadow({mode: 'open'});
        this.styleCheckbox = "form-check-input";
        this.cookieManager = new CookieManager(this.element);
    }

    createLabel(item, reference) {
        const label = this.createElementItem("label", this.cookieManager.getAttribute("for", reference), "form-check-label");
        label.textContent = item.text;
        return label;
    }

    elementAddClasses(element, classes) {
        if (classes.styles) {
            classes.styles.forEach(i => element.classList.add(i));
        } else {
            element.classList.add();
        }

        return element;
    }

    createCheckBox(item, father, id) {
        father.appendChild(document.createElement("br"));
        const element = this.createElementItem("input", this.cookieManager.getAttribute(), this.styleCheckbox);
        if (item.value) {
            element.setAttribute("value", item.value);
            element.setAttribute("checked", item.value);
        }
        element.setAttribute("name", item.text);
        element.setAttribute("id", id);
        element.addEventListener("click", () => this.actionClick(item, id));
        element.textContent = item.text;
        father.appendChild(element);
        father.appendChild(this.createLabel(item, id))
    }

    createDiv(_id, _styleClasses) {
        let divElement = document.createElement("div");
        divElement = this.elementAddClasses(divElement, _styleClasses);
        if (_id) {
            divElement.id = _id;
        }
        return divElement
    }

    createButton(_id, _text, _styleClasses) {
        let button = document.createElement("button");
        if (_styleClasses) {
            button = this.elementAddClasses(button, _styleClasses);
        } else {
            button = this.elementAddClasses(button, {styles: ["btn", "btn-lg", "btn-primary", "disabled"]});
        }
        button.id = _id;

        return button;
    }

    prepareAdditionalItem(father, fatherList) {
        fatherList.removeChild(this.element.getElementById("divListItems"));
        fatherList.appendChild(this.createDiv("divListItems", "list-group"))
        if (additionalItems.children.length > 0) {
            additionalItems.children.forEach((item, index) => {
                const p = document.createElement("p");
                p.textContent = item;
                this.element.getElementById("divListItems").appendChild(p);
            });
        }
        if (!this.element.getElementById("task")) {
            father.appendChild(this.createInputFields("task", "text", "Put your task to do", null, null));
            father.appendChild(this.createInputFields("daysTask", "number", "days to do", null, null));
        }
    }

    doFile(text, filename) {
        const tempElement = document.createElement('a');
        tempElement.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        tempElement.setAttribute('download', filename);

        tempElement.style.display = 'none';
        document.body.appendChild(tempElement);

        tempElement.click();
        document.body.removeChild(tempElement);
    }

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

    formatItem(op) {
        let result = "[ ]";
        if (op && op.value) {
            result = "[X]";
        }

        return result + " " + op.text;
    }


    itemToString = (list) => {
        let result = "";
        list.forEach(op => {
            result += "\n" + this.formatItem(op);
        });

        return result
    }

    downloadTemplate() {
        let textForDownload = "Checklist US " + this.element.getElementById("usCode").value;
        groupsEnum.forEach(group => {
            textForDownload += "\n" + group.text;
            textForDownload += "  -  " + this.itemToString(group.children);
        })

        this.doFile(textForDownload, "US_Checklist" + this.element.getElementById("usCode").value);
    }

    save() {
        this.downloadTemplate();
        groupsEnum.forEach(children => {
            this.cookieManager.saveCookie(children, -1);
        });
        this.iterateCookie(this.cookieManager.deleteCookie.bind);
    }

    createElementItem(element = "INPUT", type, styleClass) {
        const item = document.createElement(element);
        if (type) {
            item.setAttribute(type.prop, type.attribute);
        }
        if (styleClass) {
            item.classList.add(styleClass);
        }

        return item;
    }

    createInputFields(id, type, placeholder, value, onBlurAction) {
        const element = this.createElementItem("input", this.cookieManager.getAttribute("type", type), "form-control");
        element.setAttribute("placeholder", placeholder);
        element.setAttribute("id", id);
        if (value) {
            element.setAttribute("value", value);
        }

        if (onBlurAction) {
            element.addEventListener("blur", () => onBlurAction(id));
        }
        return element;
    }

    configureFieldGroupChecklist() {
        const fieldGroupChecklist = this.element.getElementById("fieldGroup");
        fieldGroupChecklist.appendChild(this.createInputFields("usCode", "text", "US", "", this.blurAction));
        fieldGroupChecklist.appendChild(this.createInputFields("daysActivity", "number", "Days to do this US", "1", this.blurAction));

        return fieldGroupChecklist;
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
        this.render();

        this.configureFieldGroupChecklist();
        this.cookieManager.iterateCookie(this.cookieManager.readCookie.bind);
        groupsEnum.forEach((group) => this.prepareItems(group, this.element.getElementById("principal")));
        this.prepareAdditionalItem(this.element.getElementById("divAddItems"), this.element.getElementById("formListItems"));
    }

    disconnectedCallback() {
        console.log(`${this.element} was removed from page`);
    }

    render() {
        this.element.innerHTML = `<div class="card" ${this.visible ? '' : 'style="display:none"'}>
            <h5 class="card-title text-center">
                Checklist
            </h5>
            <div class="card-body">
                <form>
                    <div id="fieldGroup" class="input-group"></div>
                    <div class="form-check container" id="principal"></div>
                </form>
            </div>
            <div class="card-footer text-center">
                <button class="btn btn-lg btn-primary disabled" type="button" id="saveButton" onclick="save()"> Save
                </button>
            </div>
        </div>
        <link rel="stylesheet" href="../css/bootstrap.min.css">`;
    }
}

customElements.define('checklist-form', ChecklistForm);