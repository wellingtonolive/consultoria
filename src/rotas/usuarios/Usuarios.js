const TabelaUsuarios = require('./TabelaUsuarios')
const CampoInvalido = require('../../erros/CampoInvalido')
const CampoNaoNullo = require('../../erros/CampoNaoNullo')
const CampoNaoBranco = require('../../erros/CampoNaoBranco')


class Usuarios {
    constructor({ id, nm_login, nm_email, nm_senha, createdAt, dataAtualizacao, versao }) {
        this.id = id
        this.nm_login = nm_login
        this.nm_email = nm_email
        this.nm_senha = nm_senha
        this.createdAt = createdAt
        this.dataAtualizacao = dataAtualizacao
        this.versao = versao
    }


    async criar() {
        this.validar()
        const resultado = await TabelaUsuarios.inserir({
            nm_login: this.nm_login,
            nm_email: this.nm_email,
            nm_senha: this.nm_senha
        })

        this.id = resultado.id
        this.createdAt = resultado.createdAt
        this.dataAtualizacao = resultado.dataAtualizacao
        this.versao = resultado.versao
    }

    async detalharUsuario() {
        const usuario = await TabelaUsuarios.buscaPorId(this.id)
        this.nm_login = usuario.nm_login
        this.nm_email = usuario.nm_email
        this.nm_senha = usuario.nm_senha
        this.createdAt = usuario.createdAt
        this.dataAtualizacao = usuario.dataAtualizacao
        this.versao = usuario.versao
    }


    async atualizar() {
        await TabelaUsuarios.buscaPorId(this.id)
        const campos = ['nm_email']
        const dadosAtualizar = {}

        campos.forEach((campo) => {
            const valor = this[campo]
            if (typeof valor === 'string' && valor.length > 0) {
                dadosAtualizar[campo] = valor
            }
        })

        if (Object.keys(dadosAtualizar).length === 0) {
            throw new DadosNaoFornecidos()
        }

        await TabelaUsuarios.atualizar(this.id, dadosAtualizar)
    }

    remover() {
        TabelaUsuarios.remover(this.id)
    }

    validar() {
        const campos = ['nm_login', 'nm_email','nm_senha']
        campos.forEach(campo => {
            const valor = this[campo]
            console.log(valor)
            if (valor === null || valor === undefined) {
                throw new CampoNaoNullo(campo)
            }

            if(valor === ""){
                throw new CampoNaoBranco(campo)
            }

            if (typeof valor !== 'string') {
                throw new CampoInvalido(campo)
            }


        })
    }
}

module.exports = Usuarios