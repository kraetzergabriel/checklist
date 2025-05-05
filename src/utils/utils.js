export function createElementItem(element = "INPUT", type, styleClass) {
    const item = document.createElement(element);
    if (type) {
        item.setAttribute(type.prop, type.attribute);
    }
    if (styleClass) {
        item.classList.add(styleClass);
    }

    return item;
}

export function createInputFields(id, type, placeholder, value, onBlurAction) {
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

export function createLabel(item, reference) {
    const label = createElementItem("label", this.cookieManager.getAttribute("for", reference), "form-check-label");
    label.textContent = item.text;
    return label;
}

export function elementAddClasses(element, classes) {
    if (classes.styles) {
        classes.styles.forEach(i => element.classList.add(i));
    } else {
        element.classList.add();
    }

    return element;
}

export function createCheckBox(item, father, id) {
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

export function createDiv(_id, _styleClasses) {
    let divElement = document.createElement("div");
    divElement = this.elementAddClasses(divElement, _styleClasses);
    if (_id) {
        divElement.id = _id;
    }
    return divElement
}

export function createButton(_id, _text, _styleClasses) {
    let button = document.createElement("button");
    if (_styleClasses) {
        button = this.elementAddClasses(button, _styleClasses);
    } else {
        button = this.elementAddClasses(button, {styles: ["btn", "btn-lg", "btn-primary", "disabled"]});
    }
    button.id = _id;

    return button;
}