function callCommands(){
    client.application.commands.set([
        {
            name: "8ball",
            description: "El señor mapache responde tus preguntas OwO",
            options: []
        }
    ])
}