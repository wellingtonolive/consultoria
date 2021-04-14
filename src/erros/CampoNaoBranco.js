class CampoNaoBranco extends Error {
    constructor(campo){
        const mensagem = `O campo '${campo}' não poder ser em branco`
        super(mensagem)
        this.name = 'CampoNaoBranco'
        this.idErro = 4
    }
}

module.exports = CampoNaoBranco