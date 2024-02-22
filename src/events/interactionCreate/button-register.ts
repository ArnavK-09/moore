/**
 * Imports required
 */
import { Colors, EmbedBuilder } from "discord.js";
import type { EventConfig } from "@roboplay/robo.js";
import type { ButtonInteraction } from "discord.js";
import { getPlayer, registerNewPlayer } from "@/lib.js";
import { AVATAR, BANNER, BOT_NAME, WEBSITE } from "@/constants.js";

// config for event
export const config: EventConfig = {
  description: `Allows user to complete registeration`,
};

// registeration for handler
export default async (interaction: ButtonInteraction) => {
  // Only handle interaction meant for this file
  if (
    !interaction.isButton() ||
    !interaction.customId.startsWith("register_me_as_player")
  ) {
    return;
  }

  // loading
  await interaction.deferUpdate();

  // check if player already exist
  const PLAYER = await getPlayer(interaction.user.id);

  // if player already registered
  if (PLAYER) {
    await interaction.followUp({
      ephemeral: true,
      embeds: [
        new EmbedBuilder()
          .setColor(Colors.DarkRed)
          .setTitle("You already registered")
          .setThumbnail("https://emojifavicon.dev/favicons/274c.png"),
      ],
    });
    return;
  }

  // creating new user
  await registerNewPlayer(interaction.user).then(() => {
    // notify user about successfull registartion
    return interaction.followUp({
      content: `<@${interaction.user.id}>`,
      embeds: [
        new EmbedBuilder()
          .setColor(Colors.Green)
          .setTitle("Registration Successfully Executed!!!...")
          .setURL(WEBSITE ?? null)
          .setAuthor({
            name: `Congrats! You are now ${BOT_NAME}'s Player..`,
            iconURL: AVATAR,
          })
          .setFooter({ text: `Checkout your profile using /profile` })
          .setImage(BANNER),
      ],
    });
  });
};
