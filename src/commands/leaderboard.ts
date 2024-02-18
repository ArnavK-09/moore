// import
import type { CommandConfig } from "@roboplay/robo.js";
import { AVATAR, BOT_NAME, THEME_COLOR, WEBSITE } from "@/constants.js";
import { CommandInteraction, EmbedBuilder, time } from "discord.js";
import { listTop10Players } from "@/lib.js";

// leaderboard command config
export const config: CommandConfig = {
  description: `List Top 10 ${BOT_NAME}'s Players...`,
};

// command to check bot's latency
export default async (interaction: CommandInteraction) => {
  // get data
  const ALL_PLAYERS = await listTop10Players();

  // create embed
  const LEADERBOARD_EMBED = new EmbedBuilder()
    .setColor(THEME_COLOR)
    .setAuthor({ iconURL: AVATAR, name: `Top 10 Players Of ${BOT_NAME}` })
    .setTimestamp()
    .setURL(WEBSITE)
    .setTitle("__Leaderboard__");

  // adding data to leaderboard
  ALL_PLAYERS.forEach((player, sno) => {
    LEADERBOARD_EMBED.addFields({
      name: `#${sno + 1} @${player.username}`,
      value: `> **Language Learning:-** ${
        player.language ?? "Not Selected"
      }\n> **Player's Score:-** ${
        player.player_score
      }\n> **Wallet Balance:-** 🏮 __${
        player.balance
      }__ coins\n> **Registered On:-** ${time(player.registered_on, "D")}`,
      inline: true,
    });
  });

  // reply with leader board
  await interaction.reply({
    embeds: [LEADERBOARD_EMBED],
  });
};
