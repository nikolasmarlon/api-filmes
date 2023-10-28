const express = require('express')


const app = express() // Inicializando express

const PORTA = 3333

app.listen(PORTA, () => console.log(`Porta: ${PORTA}`))