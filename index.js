const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
} = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Quando il bot è pronto
client.once("ready", () => {
  console.log(`🤖 Bot online come ${client.user.tag}`);
});

// Gestione messaggi
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  // /bug
  if (message.content === "/bug") {
    return message.reply(
      "Salve, per segnalare un problema con il bot contatta **ria.assistenza@gmail.com**",
    );
  }

  // /analizza
  if (message.content.startsWith("/analizza")) {
    const user = message.mentions.users.first() || message.author;
    const member = message.guild.members.cache.get(user.id);

    const accountCreated = `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`;
    const joinedServer = member
      ? `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`
      : "Informazione non disponibile";

    const embed = new EmbedBuilder()
      .setTitle(`🔍 Analisi sicurezza per ${user.username}`)
      .setThumbnail(user.displayAvatarURL())
      .addFields(
        { name: "🕓 Account creato", value: accountCreated, inline: true },
        { name: "📌 Entrato nel server", value: joinedServer, inline: true },
        { name: "🤖 Bot", value: user.bot ? "✅ Sì" : "❌ No", inline: true },
      )
      .setColor(user.bot ? 0xffcc00 : 0x00cc99)
      .setFooter({ text: "Analisi basata su dati pubblici" });

    return message.reply({ embeds: [embed] });
  }

  // /segnalazione
  if (message.content.startsWith("/segnalazione")) {
    const descrizione = message.content.slice("/segnalazione".length).trim();
    if (!descrizione) {
      return message.reply(
        "❗ Scrivi una descrizione dopo il comando. Esempio: `/segnalazione C'è un problema`",
      );
    }

    const embed = new EmbedBuilder()
      .setTitle("🔔 Nuova segnalazione!")
      .setDescription(descrizione)
      .setColor(0xff0000);

    return message.channel.send({ embeds: [embed] });
  }
});

// Web server (facoltativo ma utile su Fly.io)
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Bot online!");
});

app.listen(PORT, () => {
  console.log(`🌐 Web server attivo sulla porta ${PORT}`);
});

// Login
client.login(process.env.TOKEN);
