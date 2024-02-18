// import
import type { CommandConfig } from "@roboplay/robo.js";
import { AVATAR, BOT_NAME, THEME_COLOR } from "@/constants.js";
import { Colors, CommandInteraction, EmbedBuilder } from "discord.js";
import { getPlayer } from "@/lib.js";

// balance command config
export const config: CommandConfig = {
  description: `Get your ${BOT_NAME}'s player wallet balance...`,
  options: [
    {
      name: "player",
      description: "Specific player's profile",
      type: "user",
      required: false,
    },
  ],
};

// command to check bot's latency
export default async (interaction: CommandInteraction) => {
  // get player
  const player = interaction.options.getUser("player") ?? interaction.user;

  // loading
  await interaction.deferReply();

  // get player data from db
  const player_data = await getPlayer(player.id);

  // check user
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
    // reply user with balance
    await interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setColor(THEME_COLOR)
          .setAuthor({ name: `${BOT_NAME}'s Balance...`, iconURL: AVATAR })
          .setTimestamp()
          .setThumbnail(player.displayAvatarURL())
          .setDescription(`## Player's Wallet\n> ### 🏮${player_data.balance}`),
      ],
    });
  }
};
