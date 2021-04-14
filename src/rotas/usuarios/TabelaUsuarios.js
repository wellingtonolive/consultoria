const Modelo = require('./Model')
const NaoEncontrado = require('../../erros/NaoEncontrado')

module.exports = {
    listar() {
        return Modelo.findAll({raw: true})

    },

    inserir(usuario) {
        return Modelo.create(usuario)
    },

    async buscaPorId(id) {
        const usuario = await Modelo.findOne({
            where: {
                id: id
            }

        })

        if(!usuario){
            throw new NaoEncontrado()
        }

        return usuario

    },

    atualizar(id, dadosParaAtualizar){
        return Modelo.update(
            dadosParaAtualizar,
            {
                where: {
                    id: id
                }
            }
        )
    },

    remover(id){
        return Modelo.destroy({
            where:{
                id:id
            }
        })
    }
}