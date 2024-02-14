/**
 * Imports required
 */
import { Colors, EmbedBuilder } from "discord.js";
import type { EventConfig } from "@roboplay/robo.js";
import type { ButtonInteraction } from "discord.js";
import { getPlayer, registerNewPlayer } from "@/lib.js";
import { AVATAR, BANNER, BOT_NAME, WEBSITE } from "@/constants.js";
import { newPlayerForm } from "@/middleware/checkIfPlayer.js";

// config for event
export const config: EventConfig = {
  description: `Allows player to choose language`,
};

// registeration for handler
export default async (interaction: ButtonInteraction) => {
  // Only handle interaction meant for this file
  if (
    !interaction.isButton() ||
    !interaction.customId.startsWith("i_choose_language")
  ) {
    return;
  }

  // meta data
  const NEW_LANGUAGE = interaction.customId.split("@")[1];
  const CURRENT_PLAYER = interaction.customId.split("@")[2];

  // loading
  await interaction.deferUpdate();

  // check that no other player is using this command
  if (CURRENT_PLAYER !== interaction.user.id) {
    await interaction.followUp({
      embeds: [
        new EmbedBuilder()
          .setColor(Colors.DarkRed)
          .setTitle("Not your button")
          .setThumbnail("https://emojifavicon.dev/favicons/274c.png"),
      ],
      ephemeral: true,
    });
  }

  // get player data
  const PLAYER = await getPlayer(interaction.user.id);

  // if player not registered
  if (!PLAYER) {
    const REPLY_MSG = newPlayerForm(interaction.user.id);
    REPLY_MSG.ephemeral = true;
    await interaction.followUp(REPLY_MSG);
    return;
  }

  // update settings
  const UPDATED_PLAYER = await registerNewPlayer(interaction.user);

  // notify player about successfull action
  await interaction.followUp({
    ephemeral: true,
    content: "Done",
  });

  // update settings embed
  return interaction.editReply({
    embeds: [
      new EmbedBuilder()
        .setColor(Colors.Green)
        .setTitle("Registration Successfully Executed!!!...")
        .setURL(WEBSITE ?? null)
        .setAuthor({
          name: `Congrats! You are now ${BOT_NAME}'s Player..`,
          iconURL: AVATAR,
        })
        .setDescription(JSON.stringify(REGISTERED_USER))
        .setFooter({ text: `Checkout your profile using /profile` })
        .setImage(BANNER),
    ],
  });
};
