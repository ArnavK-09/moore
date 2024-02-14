// import
import type { CommandConfig } from "@roboplay/robo.js";
import { AVATAR, BOT_NAME } from "@/constants.js";
import { Colors, CommandInteraction, EmbedBuilder } from "discord.js";
import { listTop10Players } from "@/lib.js";

// leaderboard command config
export const config: CommandConfig = {
  description: `List Top 10 ${BOT_NAME}'s Players...`,
};

// command to check bot's latency
export default async (interaction: CommandInteraction) => {
  // get data
  const ALL_PLAYERS = await listTop10Players();

  // loading
  await interaction.deferReply();

  // create embed
  const LEADERBOARD_EMBED = new EmbedBuilder()
    .setColor(Colors.DarkGrey)
    .setAuthor({ iconURL: AVATAR, name: `Top 10 Players Of ${BOT_NAME}` })
    .setTimestamp()
    .setTitle("Leaderboard!");

  // adding data to leaderboard
  ALL_PLAYERS.forEach((player, sno) => {
    LEADERBOARD_EMBED.addFields({
      name: `#${sno + 1} @${player.username}`,
      value: `> **Language Learning:-** ${
        player.language ?? "Not Selected"
      }\n> **Player Score:-** ${player.player_score}\n> **Longest Streak:-** ${
        player.longest_streak
      } days`,
      inline: true,
    });
  });

  // reply with leader board
  await interaction.editReply({
    embeds: [LEADERBOARD_EMBED],
  });
};
