const gitActions = [
    {
        text: "git fetch",
        value: false,
        action: () => {}
    },
    {
        text: "git checkout art_clinical_pharmacy",
        value: false,
        action: () =>{}
    },
    {
        text: "git pull origin art_clinical_pharmacy(se houver dúvidas sobre a atualização da branch)",
        value: false,
        action: () =>{}
    },
    {
        text: "git checkout -b SO_MINHA_OS",
        value: false,
        action: () =>{}
    }
]

const principalActions = [
    {
        text: "Atualizar status da US e feature (mover o card)",
        value: false,
        action: () =>{}
    },
    {
        text: "Ler a proposta da US/OS",
        value: false,
        action: () =>{}
    },
    {
        text: "Se for US, verificar a existência de uma OS(verificar o campo External ID e/ou status da OS), se não existir, cria-se uma",
        value: false,
        action: () =>{}
    },
    {
        text: "Vincular número da OS no card",
        value: false,
        action: () =>{}
    },
    {
        text: "Pedir CCB para analistas",
        value: false,
        action: () =>{}
    },
    {
        text: "Iniciar atividade na OS",
        value: false,
        action: () =>{}
    }
]

const codingActions = [
    {
        text: "criar pacote(se necessário) no schematics (usar base osbatutinhas)",
        value: false,
        action: () =>{}
    },
    {
        text: "Criar os objetos/classes/arquivos seguindo o padrão de nomenclatura criado no schematics",
        value: false,
        action: () =>{}
    },
    {
        text: "Estou codificando",
        value: false,
        action: () =>{}
    },
    {
        text: "Tirar dúvidas",
        value: false,
        action: () =>{}
    },
    {
        text: "Testar",
        value: false,
        action: () =>{}
    },
    {
        text: "Testar com algum analista",
        value: false,
        action: () =>{}
    },
    {
        text: "Abrir PR(corrigir checks, se necessário)",
        value: false,
        action: () =>{}
    },
    {
        text: "Testar novamente caso tenha sido ajustado algum check no pr/code review",
        value: false,
        action: () =>{}
    }
]

const documentationActions = [
    {
        text: "Gravar vídeo e anexar no card e na OS",
        value: false,
        action: () =>{}
    },
    {
        text: "Adicionar link do pr no card( Add Link -> Existing Item -> GitHub Pull Request)",
        value: false,
        action: () =>{}
    },
    {
        text: "Adicionar um texto explicando a alteração e o novo comportamento",
        value: false,
        action: () =>{}
    },
    {
        text: "Verificar PRS",
        value: false,
        action: () =>{}
    },
    {
        text: "Liberar release notes.",
        value: false,
        action: () =>{}
    },
    {
        text: "Mover o card para test",
        value: false,
        action: () =>{}
    },
    {
        text: "Conferir itens pendentes na OS, utilizar a opção \'Visualizar inconsistências da OS\'(ctrl+alt+i)",
        value: false,
        action: ()=>{}
    }
]

const groupsEnum = [
    {
        text: "Principal",
        children: principalActions
    },
    {
        text: "Acessar os repositórios do tasy, tasy-backend e tasy-plsql e executar os comandos em sequência:",
        children: gitActions
    },
    {
        text: "Codificação",
        children: codingActions
    },
    {
        text: "Documentação",
        children: documentationActions
    }
]

const getValue = (prop) => {
    return document.getElementById(prop).value;
}

const checkButtonState = (list) => {
    let state = true;
    list.forEach(group => {
        group.children.forEach(op => {
            if (state) {
                state = op.value;
            }
        })
    });

    if (state &&
        getValue("usCode") !== "" &&
        Number(getValue("daysActivity")) > 0) {

        document.getElementById("saveButton").classList.remove("disabled");
    } else {
        document.getElementById("saveButton").classList.add("disabled");
    }
}

const checkItem = (_list, _text, _value) => {
    _list.forEach(group => {
        group.children.forEach(op => {
            if (op.text === _text.trim()) {
                op.value = _value;
            }
        })
    });
}

const setValueOnField = (_id, _value) => {
    document.getElementById(_id).value = _value;
}

const setCookie = (_text, _value, _day) => {
    const d = new Date();
    d.setTime(d.getTime() + (_day*24*60*60*1000));
    document.cookie = _text +"="+_value+";" + "expires="+ d.toUTCString();
}

const loadCookie = (_op) => {
    if (_op[0] === "usCode") {
        setValueOnField("usCode", _op[1]);
    } else if (_op[0] === "daysActivity") {
        setValueOnField("daysActivity", _op[1]);
    }
    checkItem(groupsEnum, _op[0], _op[1] === 'true');
}

const excludeDate = (cookie) => {
    const excludeString = cookie.indexOf("expires");
    if (excludeString === -1) {
        return cookie;
    }
    return cookie.substring(0, excludeString - 1);
}

const readCookie = (cookie) => {
    loadCookie(cookie);
}

const deleteCookie = (cookie) => {
    setCookie(cookie[0], cookie[1], 0);
}

const iterateCookie = (action) => {
    let decodedCookie = decodeURIComponent(document.cookie);
    let arrayCookie = decodedCookie.split(";");
    arrayCookie.forEach(cookie => {
        if (cookie.indexOf("NGSESSION") === -1) {
            action(excludeDate(cookie.trim()).split("="));
        }
    });
}

const saveCookie = (children, day) => {
    children.forEach(op => {
        setCookie(op.text, op.value, day)
    });
}

const actionClick = (item, id) => {
    checkItem(groupsEnum, item.text, document.getElementById(id).checked);
    setCookie(item.text, Boolean(document.getElementById(id).checked), Number(document.getElementById("daysActivity").value));
    checkButtonState(groupsEnum);
}

const blurAction = (id) => {
    if (document.getElementById(id) && document.getElementById(id).value) {
        setCookie(id, document.getElementById(id).value,document.getElementById("daysActivity").value)
    }
    checkButtonState(groupsEnum);
}

const createElementItem = (element = "INPUT", type, styleClass) => {
    const item = document.createElement(element);
    if (type) {
        item.setAttribute(type.prop, type.attribute);
    }
    if (styleClass) {
        item.classList.add(styleClass);
    }

    return item;
}

const getAttribute = (type = "type", value = "checkbox") => {
    return {
        prop: type,
        attribute: value
    }
}

const createLabel = (item, reference) => {
    const label = createElementItem("label", getAttribute("for", reference), "form-check-label");
    label.textContent = item.text;
    return label;
}

const createCheckBox = (item, father, id) => {
    father.appendChild(document.createElement("br"));
    const element= createElementItem("input", getAttribute(), "form-check-input");
    if (item.value) {
        element.setAttribute("value", item.value);
        element.setAttribute("checked", item.value);
    }
    element.setAttribute("name", item.text);
    element.setAttribute("id", id);
    element.addEventListener("click", () => actionClick(item,  id));
    element.textContent = item.text;
    father.appendChild(element);
    father.appendChild(createLabel(item,id))
}

const createInputFields= (id, type, placeholder, value, onBlurAction) => {
    const element = createElementItem("input", getAttribute("type",type), "form-control");
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

const prepareItems = (group, father) => {
    if (group && group.children) {
        group.children.forEach((op, index) => {
            createCheckBox(op, father, group.text+"_"+index);
        })
    }
}

const formatItem = (op) => {
    let result = "[ ]";
    if (op && op.value) {
        result = "[X]";
    }

    return result + " " + op.text;
}

const toString = (list) => {
    let result = "";
    list.forEach(op =>{
        result += "\n" + formatItem(op);
    });

    return result
}

const doFile = (text, filename) => {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();
    document.body.removeChild(element);
}

const downloadTemplate = () => {
    let textForDownload = "Checklist US " + document.getElementById("usCode").value;
    groupsEnum.forEach(group => {
        textForDownload += "\n" + group.text;
        textForDownload += "  -  " + toString(group.children);
    })

    doFile(textForDownload, "US_Checklist"+document.getElementById("usCode").value);
}

const save = () => {
    downloadTemplate();
    groupsEnum.forEach(children => {
        saveCookie(children,-1);
    });
    iterateCookie(deleteCookie);
}

const init = () => {
    const root = document.getElementById("fieldGroup");
    root.appendChild(createInputFields("usCode","text","US","", blurAction));
    root.appendChild(createInputFields("daysActivity","number","Days to do this US","1", blurAction));
    iterateCookie(readCookie);
    groupsEnum.forEach((group) => prepareItems(group,  document.getElementById("principal")));
}
