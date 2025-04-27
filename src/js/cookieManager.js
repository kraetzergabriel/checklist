import {groupsEnum} from "../static/static.js";

export const additionalItems = {
    text: "TO DO",
    children: []
}

export default class CookieManager extends Object{

    constructor(element) {
        super();
        this.element = element;
    }

    getAttribute(type = "type", value = "checkbox") {
        return {
            prop: type,
            attribute: value
        }
    }

    setCookie(_text, _value, _day, _isAdditional) {
        const d = new Date();
        d.setTime(d.getTime() + (_day * 24 * 60 * 60 * 1000));
        if (_isAdditional) {
            this.element.cookie = _text + ";" + "expires=" + d.toUTCString();
        } else {
            this.element.cookie = _text + "=" + _value + ";" + "expires=" + d.toUTCString();
        }
    }

    setCookiesAdditionalInformation() {
        const task = this.element.getElementById("task").value;
        this.element.getElementById("task").value = "";
        const daysTask = this.element.getElementById("daysTask").value;
        this.element.getElementById("daysTask").value;
        this.setCookie(task, null, daysTask);
        this.setAdditionalItem(task);
    }

    iterateCookie(action){
        let decodedCookie = decodeURIComponent(this.element.cookie);
        let arrayCookie = decodedCookie.split(";");
        arrayCookie.forEach(cookie => {
            if (cookie.indexOf("NGSESSION") === -1) {
                action.apply(this, this.excludeDate(cookie.trim()).split("="));
            }
        });
    }

    setAdditionalItem(_text) {
        additionalItems.children.push(_text);
    }

    setValueOnField(_id, _value) {
        this.element.getElementById(_id).value = _value;
    }

    loadCookieInfo(_op) {
        if (_op[0] === "usCode") {
            this.setValueOnField("usCode", _op[1]);
        } else if (_op[0] === "daysActivity") {
            this.setValueOnField("daysActivity", _op[1]);
        } else {
            this.checkItem(groupsEnum, _op[0], _op[1] === 'true');
        }
    }

    checkItem(_list, _text, _value) {
        let find = false;
        _list.forEach(group => {
            group.children.forEach(op => {
                if (op.text === _text.trim()) {
                    op.value = _value;
                    find = true;
                }
            })
        });
        if (!find) {
            this.setAdditionalItem(_text);
        }
    }

    readCookie(cookie) {
        this.loadCookieInfo(cookie);
    }

    deleteCookie(cookie) {
        this.setCookie(cookie[0], cookie[1], -1);
    }

    excludeDate(cookie){
        const excludeString = cookie.indexOf("expires");
        if (excludeString === -1) {
            return cookie;
        }
        return cookie.substring(0, excludeString - 1);
    }

    saveCookie(children, day) {
        children.forEach(op => {
            this.setCookie(op.text, op.value, day)
        });
    }

}