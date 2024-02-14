// import
import type { CommandConfig } from "@roboplay/robo.js";
import { BOT_NAME } from "@/constants.js";
import { CommandInteraction } from "discord.js";

// ping command config
export const config: CommandConfig = {
  description: `Check ${BOT_NAME}'s Latency....If ${BOT_NAME} is feeling deezyy....`,
  dmPermission: true,
};

// command to check bot's latency
export default async (interaction: CommandInteraction) => {
  await interaction.reply({
    content: `- **__Bot Latency__:-** \` ${
      Date.now() - interaction.createdTimestamp
    }ms \`\n- **__API Latency__:-** \` ${interaction.client.ws.ping}ms \``,
  });
};
