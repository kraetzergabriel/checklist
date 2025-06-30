const header = [
    {
        id: "usCode",
        type: "text",
        placeHolder: "US",
        value: ""
    },
    {
        id: "daysActivity",
        type: "number",
        placeHolder: "Days to do this US",
        value: 1
    }
];

const gitActions = [
    {
        text: "git fetch",
        value: false,
        action: () => {
        }
    },
    {
        text: "git checkout art_clinical_pharmacy",
        value: false,
        action: () => {
        }
    },
    {
        text: "git pull origin art_clinical_pharmacy(se houver dúvidas sobre a atualização da branch)",
        value: false,
        action: () => {
        }
    },
    {
        text: "git checkout -b MINHA_OS",
        value: false,
        action: () => {
            alert('chama')
        }
    }
]

const principalActions = [
    {
        text: "Atualizar status da US e feature (mover o card)",
        value: false,
        action: () => {
        }
    },
    {
        text: "Ler a proposta da US/OS",
        value: false,
        action: () => {
        }
    },
    {
        text: "Se for US, verificar a existência de uma OS(verificar o campo External ID e/ou status da OS), se não existir, cria-se uma",
        value: false,
        action: () => {
        }
    },
    {
        text: "Vincular número da OS no card",
        value: false,
        action: () => {
        }
    },
    {
        text: "Pedir CCB para analistas",
        value: false,
        action: () => {
        }
    },
    {
        text: "Iniciar atividade na OS",
        value: false,
        action: () => {
        }
    }
]

const codingActions = [
    {
        text: "criar pacote(se necessário) no schematics (usar base osbatutinhas)",
        value: false,
        action: () => {
        }
    },
    {
        text: "Criar os objetos/classes/arquivos seguindo o padrão de nomenclatura criado no schematics",
        value: false,
        action: () => {
        }
    },
    {
        text: "Estou codificando",
        value: false,
        action: () => {
        }
    },
    {
        text: "Tirar dúvidas",
        value: false,
        action: () => {
        }
    },
    {
        text: "Testar",
        value: false,
        action: () => {
        }
    },
    {
        text: "Testar com algum analista",
        value: false,
        action: () => {
        }
    },
    {
        text: "Abrir PR(corrigir checks, se necessário)",
        value: false,
        action: () => {
        }
    },
    {
        text: "Testar novamente caso tenha sido ajustado algum check no pr/code review",
        value: false,
        action: () => {
        }
    },
    {
        text: "Verificar pacote utilizando o select na tabela log_data, checar caso tenha alterações de pacote sem OS informada no log",
        value: false,
        action: () => {
        }
    }
]

const documentationActions = [
    {
        text: "Gravar vídeo e anexar no card e na OS",
        value: false,
        action: () => {
        }
    },
    {
        text: "Adicionar link do pr no card( Add Link -> Existing Item -> GitHub Pull Request)",
        value: false,
        action: () => {
        }
    },
    {
        text: "Adicionar um texto explicando a alteração e o novo comportamento",
        value: false,
        action: () => {
        }
    },
    {
        text: "Verificar PRS",
        value: false,
        action: () => {
        }
    },
    {
        text: "Liberar release notes.",
        value: false,
        action: () => {
        }
    },
    {
        text: "Mover o card para test",
        value: false,
        action: () => {
        }
    },
    {
        text: "Conferir itens pendentes na OS, utilizar a opção \'Visualizar inconsistências da OS\'(ctrl+alt+i)",
        value: false,
        action: () => {
        }
    },
    {
        text: "Conferir se os pacotes do schematics foram enviados",
        value: false,
        action: () => {
        }
    },
    {
        text: "Conferir itens do PR para pre_main",
        value: false,
        action: () => {
        }
    }
]

export const groupsEnum = [
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


export const statusValues = [
    'primary',
    'secondary',
    'danger',
    'white',
    'success',
]
