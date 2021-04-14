class DadosNaoFornecidos extends Error{
    constructor(){
        super('Dados não fornecidos')
        this.name = 'Dados não fornecidos'
        this.idErro = 2

    }
}

module.exports = DadosNaoFornecidos