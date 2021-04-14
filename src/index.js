const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const roteador = require('./rotas/usuarios')
const NaoEncontrado = require('./erros/NaoEncontrado')
const CampoInvalido = require('./erros/CampoInvalido')
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')
const CampoNaoNullo = require('./erros/CampoNaoNullo')
const CampoNaoBranco = require('./erros/CampoNaoBranco')
const ValorNaoSuportado = require('./erros/ValorNaoSuportador')
const formatadosAceitos = require('./serializador/Serializador').formatosAceitos
const SerializadorErro = require('./serializador/Serializador').SerializadorErro

app.use(bodyParser.json())

app.use((req, res, validaContentType) => {
    let formatoReq = req.header('Accept')
    if (formatoReq === '*/*') {
        formatoReq = 'application/json'
    }
    if (formatadosAceitos.indexOf(formatoReq) === -1) {
        res.status(406).end()
        return
    }

    res.setHeader('Content-Type', formatoReq)
    validaContentType()
})

app.use((req,res,proximo) => {
    res.set('Access-Control-Allow-Origin', '*') 
    proximo()
})

app.use('/api/usuarios', roteador)

app.use((erro, req, res, tratamentoErro) => {
    let status = 500
    if (erro instanceof NaoEncontrado) {
        status = 404
    }

    if (erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos || erro instanceof CampoNaoNullo || erro instanceof CampoNaoBranco) {
        status = 400
    }

    if (erro instanceof ValorNaoSuportado) {
        status = 406
    }

    const serializdor = new SerializadorErro(res.getHeader('Content-Type'))
    res.status(status).send(
        serializdor.serializar(
            {
                mensagem: erro.message,
                id: erro.idErro
            })

    )
})

app.listen(config.get('api.porta'), () => console.log('A API está funcionando!')

)