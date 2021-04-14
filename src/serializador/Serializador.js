const ValorNaoSuportado = require('../erros/ValorNaoSuportador')
const jsontoxml = require('jsontoxml')

class Serializador {
    json(dados) {
        return JSON.stringify(dados)
    }


    xml(dados) {
        let tag = this.tagSingular

        if(Array.isArray(dados)){
            tag = this.tagPlural
            dados = dados.map(item => {
                return {
                    [this.tagSingular]:item
                }
            })

        }
        return jsontoxml({[tag]:dados })
    }

    serializar(dados) {
        dados = this.filtrar(dados)
        if (this.contentType === 'application/json') {
            return this.json(dados)

        }

        if (this.contentType === 'application/xml') {
            return this.xml(dados)
        }
        throw new ValorNaoSuportado(this.contentType)
    }

    filtrarObjeto(dados) {
        const dadosListaGeral = {}
        this.camposPublicos.forEach(element => {
            if (dados.hasOwnProperty(element)) {
                dadosListaGeral[element] = dados[element]

            }
        })
        return dadosListaGeral
    }

    filtrar(dados) {
        if (Array.isArray(dados)) {
            dados = dados.map(item => {
                return this.filtrarObjeto(item)
            })
        }
        else {
            dados = this.filtrarObjeto(dados)
        }

        return dados
    }
}

class SerializadorUsuario extends Serializador {
    constructor(contentType, detalheUsuario) {
        super()
        this.contentType = contentType
        this.camposPublicos = [
            'id',
            'nm_login',
        ].concat(detalheUsuario || [])
        this.tagSingular = 'usuario'
        this.tagPlural = 'usuarios'
    }
}

class SerializadorErro extends Serializador {
    constructor(contentType, camposExtras) {
        super()
        this.contentType = contentType
        this.camposPublicos = [
            'id',
            'mensagem'
        ].concat(camposExtras || [])
        this.tagSingular = 'erros'
        this.tagPlural = 'erros'
    }
}


module.exports = {
    Serializador: Serializador,
    SerializadorUsuario: SerializadorUsuario,
    SerializadorErro: SerializadorErro,
    formatosAceitos: [
        'application/json',
        'application/xml'
    ]

}