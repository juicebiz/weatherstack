const http = require('http')
require('dotenv').config()

const readline = require('readline')
const interface = readline.createInterface(process.stdin)

console.log('Введите город: ')

interface.on('line', (data) => {
    const city = data
    const apiKey = process.env.apiKey
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`

    http.get(url, (res) => {
        const statusCode = res.statusCode
        if (statusCode !== 200) {
            console.error(`Status Code: ${statusCode}`)
            return
        }
        res.setEncoding('utf8')
        let rawData = ''
        res.on('data', (chunk) => rawData += chunk)
        res.on('end', () => {
            let parsedData = JSON.parse(rawData)
            console.log(parsedData)
        });
    }).on('error', (e) => {
        console.error(`Got error: ${e.message}`)
    });
});

