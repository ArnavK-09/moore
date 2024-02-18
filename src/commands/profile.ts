/**
 * Imports required
 */
import type { CommandConfig } from "@roboplay/robo.js";
import {
  AVATAR,
  BANNER,
  BOT_NAME,
  FACTS,
  THEME_COLOR,
  WEBSITE,
  randomElementFromArray,
} from "@/constants.js";
import {
  Colors,
  CommandInteraction,
  EmbedBuilder,
  User,
  time,
} from "discord.js";
import { getPlayer } from "@/lib.js";
import { Player } from "@prisma/client";

/**
 * Creates embed to showcase player data
 * @param {Player} player
 * @param {User} discord_user
 */
const createPlayerProfileEmbed = (
  player: Player,
  discord_user: User
): EmbedBuilder =>
  new EmbedBuilder()
    .setColor(THEME_COLOR)
    .setTitle(`${discord_user.username}'s ${BOT_NAME}'s Player Profile!`)
    .setURL(WEBSITE)
    .setAuthor({
      name: `${BOT_NAME}'s Player Profile Here...`,
      iconURL: AVATAR,
    })
    .setDescription(`> **Funfact:-** ${randomElementFromArray(FACTS)}`)
    .addFields(
      { name: "Player Username", value: discord_user.username, inline: true },
      { name: "Player ID", value: player.discord_id, inline: true },
      {
        name: "Registered On",
        value: `${time(player.registered_on)}`,
        inline: true,
      },
      {
        name: "Last Command Ran On",
        value: `${time(player.last_command_ran_on)}`,
        inline: true,
      },
      { name: "\u200B", value: "\u200B" },
      {
        name: "**Language Learning**",
        value: `\` ${player.language ?? "Not selected"} \``,
      },
      {
        name: "**Player's Score**",
        value: `\` ${player.player_score.toString()} \``,
      },
      { name: "\u200B", value: "\u200B" }
    )
    .setImage(BANNER)
    .setFooter({ text: `Dev ID:- ${player.id}` });

// profile command config
export const config: CommandConfig = {
  description: `Checkout your ${BOT_NAME}'s player profile..`,
  options: [
    {
      name: "player",
      description: "Specific player's profile",
      type: "user",
      required: false,
    },
  ],
};

// command to check player's profile
export default async (interaction: CommandInteraction) => {
  // get player
  const player = interaction.options.getUser("player") ?? interaction.user;

  // loading
  await interaction.deferReply();

  // get player data
  const player_data = await getPlayer(player.id);

  // if no player exist
  if (!player_data) {
    return await interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setColor(Colors.DarkRed)
          .setTitle("This Player Hasn't Registered Yet!")
          .setThumbnail("https://emojifavicon.dev/favicons/274c.png"),
      ],
    });
  } else {
    // replying user data
    return await interaction.editReply({
      embeds: [createPlayerProfileEmbed(player_data!, interaction.user)],
    });
  }
};
