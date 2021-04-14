class CampoNaoNullo extends Error {
    constructor(campo){
        const mensagem = `O campo '${campo}' não pode ser null`
        super(mensagem)
        this.name = 'CampoNaoNullo'
        this.idErro = 3
    }
}

module.exports = CampoNaoNullo