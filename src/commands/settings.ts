// import
import type { CommandConfig } from "@roboplay/robo.js";
import { BOT_NAME, LANGUAGES, THEME_COLOR, WEBSITE } from "@/constants.js";
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  CommandInteraction,
  EmbedBuilder,
  Snowflake,
  User,
} from "discord.js";
import { getPlayer } from "@/lib.js";
import { Player } from "@prisma/client";

// settings command config
export const config: CommandConfig = {
  description: `Configure your ${BOT_NAME}'s player settings for better enjoyment...`,
  dmPermission: true,
};

/**
 * Create embed for settings page
 * @param {Player} player
 * @param {User} discord_player
 */
export const settingsPageEmbed = (
  player: Player,
  discord_player: User
): EmbedBuilder => {
  const EMBED = new EmbedBuilder()
    .setColor(THEME_COLOR)
    .setTitle(`${BOT_NAME}'s Player Settings!`)
    .setURL(WEBSITE)
    .setDescription(
      `## Language Choosen :- \n# \` ${
        player.language ?? "None"
      } \`\n\u200B\n> Choose your language by clicking on buttons below!`
    )
    .setURL(WEBSITE)
    .setThumbnail(discord_player.displayAvatarURL())
    .setFooter({ text: `For:- @${player.username}'s` });
  return EMBED;
};

/**
 * Actions for settings page
 * @param {Snowflake} userID
 */
export const settingsPageActions = (
  userID: Snowflake
): ActionRowBuilder<ButtonBuilder> => {
  // all LANGUAGES buttons
  const LANGUAGES_BTNS: ButtonBuilder[] = [];

  // appending language buttons
  LANGUAGES.forEach((Language) => {
    LANGUAGES_BTNS.push(
      new ButtonBuilder()
        .setCustomId(`i_choose_language@${Language.toUpperCase()}@${userID}`)
        .setLabel(Language.toString())
        .setStyle(ButtonStyle.Secondary)
    );
  });

  // return actions
  const ROW = new ActionRowBuilder<ButtonBuilder>().addComponents(
    ...LANGUAGES_BTNS
  );
  return ROW;
};

// command to check bot's latency
export default async (interaction: CommandInteraction) => {
  // get discord player
  const player = interaction.user;

  // loading
  await interaction.deferReply();

  // get player data from db
  const player_data = await getPlayer(player.id);

  // reply user with settings info and actions
  await interaction.editReply({
    embeds: [settingsPageEmbed(player_data!, interaction.user)],
    components: [settingsPageActions(interaction.user.id)],
  });
};
