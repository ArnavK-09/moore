// import
import type { CommandConfig } from "@roboplay/robo.js";
import { BOT_NAME } from "@/constants.js";
import { Colors, CommandInteraction, EmbedBuilder } from "discord.js";
import { getPlayer } from "@/lib.js";

// task command config
export const config: CommandConfig = {
  description: `Complete your daily ${BOT_NAME}'s task to earn score and coins...`,
};

// command to check bot's latency
export default async (interaction: CommandInteraction) => {
  // get player data
  const PLAYER = await getPlayer(interaction.user.id);

  // loading
  await interaction.deferReply();

  // check if player choosen language
  if (!PLAYER!.language) {
    await interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setColor(Colors.DarkRed)
          .setTitle("You haven't chose any language yet")
          .setThumbnail("https://emojifavicon.dev/favicons/274c.png"),
      ],
    });
    return;
  }
};
