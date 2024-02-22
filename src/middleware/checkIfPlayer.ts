// imports
import { AVATAR, BOT_NAME, THEME_COLOR, WEBSITE } from "@/constants.js";
import {
  getPlayer,
  increasePlayerScore,
  randomNumber,
  updatePlayerLastRanOn,
} from "@/lib.js";
import { type MiddlewareData, type MiddlewareResult } from "@roboplay/robo.js";
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  EmbedBuilder,
  InteractionReplyOptions,
  Snowflake,
} from "discord.js";

/**
 * Form for regsitering new user
 * @param {Snowflake} userID
 */
export const newPlayerForm = (userID: Snowflake): InteractionReplyOptions => {
  // Button to register
  const registerBTN = new ButtonBuilder()
    .setCustomId("register_me_as_player")
    .setLabel("Register Now!")
    .setStyle(ButtonStyle.Success);

  // returning form to register player
  return {
    content: `<@${userID}>`,
    components: [
      new ActionRowBuilder<ButtonBuilder>().addComponents(registerBTN),
    ],
    embeds: [
      new EmbedBuilder()
        .setColor(THEME_COLOR)
        .setTitle(`Register To Play with ${BOT_NAME}!`)
        .setURL(WEBSITE)
        .setAuthor({
          name: `${BOT_NAME}'s Registration Form...`,
          iconURL: AVATAR,
        })
        .setDescription("> Currently Not Alpha...")
        .setTimestamp()
        .setFooter({ text: "By registering you continue with our terms!" }),
    ],
  };
};

/**
 * Middleware to check if commands are ran by registered user
 */
export default async (
  data: MiddlewareData
): Promise<MiddlewareResult | void> => {
  // Meta vars
  const { key, type } = data.record;
  const interaction = data.payload[0] as ChatInputCommandInteraction;

  // Middleware only for slash commands
  if (type !== "command") {
    return;
  }

  // Don't stop down "/ping" command
  if (key === "ping") {
    return;
  }

  // get player from db
  const PLAYER = await getPlayer(interaction.user.id);

  // Alright, check if registered player
  if (!PLAYER && interaction.reply) {
    await interaction.reply(newPlayerForm(interaction.user.id));
    return { abort: true };
  }

  // if player, increase score for playing more && update history
  if (PLAYER) {
    await increasePlayerScore(PLAYER, randomNumber(0, 25));
    await updatePlayerLastRanOn(PLAYER);
  }
};
