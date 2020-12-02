const Discord = require('discord.js');
const client = new Discord.Client({partials: ["MESSAGE", "USER", "REACTION"]});
const enmap = require('enmap');
const prefix = require("./config.json");

const ajustes = new enmap({
    name: "Ajustes",
    autoFetch: true,
    clonelevel: "deep",
    fetchAll: true
});

client.on('ready', () => {
    console.log("El bot se ha iniciado")
})

client.on("message", async message => {
    if(message.author.bot){
        return;
    }
    if(message.content.indexOf(prefix) !== 0){
        return;
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const comando = args.shift().toLowerCase();

    switch(comando){
        case "setup": 
            let canal = message.mentions.channels.first();

            if(!canal){
                return message.reply("Uso apropiado: $setup #canal(aqui ira el canal de destino)");
            }
            channel.send(new Discord.MessageEmbed()
                .setTitle("Canal de Ticket")
                .setDescription("Reacciona a  para abrir un canal y poder ser ayudado.")
                .setFooter("Creado por Galactus y Mone")
                .setColor("#FF2D00")

            )
            sent.react(':envelope_with_arrow:')
            ajustes.set(`${message.guild.id}-ticket`, sent.id);

            message.channel.send("Has terminado con los ajustes")
            break;
        case "close":
            if(!message.channel.name.includes("ticket")){
                return message.channel.send("No puedes hacer esto aquí");
               
            }
            message.channel.delete();
            break;
    }
});

client.on('messageReactionAdd', async(reaction, user) => {
    if(user.partial){
        await 
        user.fetch();
    }
    if(reaction.partial){
        await
        reaction.fetch();
    }
    if(reaction.message.partial){
        await
        reaction.message.fetch();
    }
    if(user.bot){
        return;
    }

    let ticketId = ajustes.get(`${message.guild.id}-ticket`, sent.id);

    if(!ticketId){
        return;
    }

    if(reaction.message.id == ticketId && reaction.emoji.name == ':envelope_with_arrow:'){

        reaction.message.guild.channels.create(`ticket-${user.username}`, {
            permissionOverwrites: [
                {
                    id: user.id,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                },
                {
                    id: reaction.message.guild.roles.everyone,
                    deny: ["VIEW_CHANNEL"]
                }
            ],
            type: `text`
        }).then(async channel => {
            channel.send(`<@${user.id}>`, new Discord.MessageEmbed().setTitle("Bienvenido al Soporte.").setDescription("Será atendido en unos instantes.").setColor("#FF2D00"))
        })
    }
})

bot.login(procces.env.token);