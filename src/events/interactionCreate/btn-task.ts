/**
 * Imports required
 */
import { Colors, EmbedBuilder } from "discord.js";
import type { EventConfig } from "@roboplay/robo.js";
import type { ButtonInteraction } from "discord.js";
import {
  getPlayer,
  increasePlayerBalance,
  increasePlayerScore,
  randomNumber,
} from "@/lib.js";
import { newPlayerForm } from "@/middleware/checkIfPlayer.js";
import { AVATAR } from "@/constants.js";

// config for event
export const config: EventConfig = {
  description: `Sub logic for /task command`,
};

// task answers handler
export default async (interaction: ButtonInteraction) => {
  // Only handle interaction meant for this file
  if (!interaction.isButton() || !interaction.customId.startsWith("task_ans")) {
    return;
  }

  // meta data
  const ANSWER_CHOOSEN = interaction.customId.split("@")[1];
  const IS_CORRECT_ANSWER =
    interaction.customId.split("@")[2].toLowerCase() == "true";
  const CURRENT_PLAYER = interaction.customId.split("@")[3];

  // loading
  await interaction.deferUpdate();

  // check that no other player is using this command
  if (CURRENT_PLAYER !== interaction.user.id) {
    return await interaction.followUp({
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
    interaction.followUp(REPLY_MSG);
    return;
  }

  /**
   * Logic here
   */

  if (!IS_CORRECT_ANSWER) {
    // if not correct answer
    await interaction.followUp({
      content: `<@${interaction.user.id}>`,
      ephemeral: true,
      embeds: [
        new EmbedBuilder()
          .setColor(Colors.DarkRed)
          .setTitle(`"${ANSWER_CHOOSEN}" is an incorrect Answer :(`)
          .setThumbnail("https://emojifavicon.dev/favicons/274c.png"),
      ],
    });
    return;
  } else {
    // correct answer
    const REWARD = randomNumber(100, 555);
    await interaction.message.edit({
      content: `<@${interaction.user.id}>`,
      embeds: [
        new EmbedBuilder()
          .setColor(Colors.Green)
          .setTitle(`"${ANSWER_CHOOSEN}" is Correct Answer :)`)
          .setDescription(`> ### **Rewarded: 🏮 __${REWARD}__ coins**`)
          .setThumbnail(AVATAR),
      ],
      components: [],
    });
    await increasePlayerBalance(PLAYER, REWARD);
    await increasePlayerScore(PLAYER, REWARD);
  }
};
