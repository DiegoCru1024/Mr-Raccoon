const fs = require('fs')
const path = require('path')
const ascii = require('ascii-table')
const table = new ascii().setHeading("Evento", "Estado")

function loadEvents(botClient) {
    const eventDir = path.join(__dirname, '..', 'events')

    const eventFiles = fs.readdirSync(eventDir).filter(file => file.endsWith('.js'))

    for (const file of eventFiles) {
        try {
            const event = require(path.join(eventDir, file))

            if (event.name && event.execute) {
                if (event.once) {
                    botClient.once(event.name, (...args) => event.execute(...args));
                } else {
                    botClient.on(event.name, (...args) => event.execute(...args));
                }

                table.addRow(file, "Éxito")
            } else {
                table.addRow(file, "Error: Estructura de evento inválida")
            }
        } catch (error) {
            table.addRow(file, `Error al cargar evento: ${error.message}`)
        }
    }
    console.log(table.toString())
}

module.exports = {loadEvents}
