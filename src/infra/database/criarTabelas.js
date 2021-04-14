const modelos  = [
    require('../../rotas/usuarios/Model')
]

async function criarTabelas (){
    for (let cont = 0; cont < modelos.length; cont++){
        const modelo = modelos[cont]
        await modelo.sync()
    }
}


criarTabelas()


