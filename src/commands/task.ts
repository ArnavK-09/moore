// import
import type { CommandConfig } from "@roboplay/robo.js";
import { AVATAR, BOT_NAME, THEME_COLOR } from "@/constants.js";
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Colors,
  CommandInteraction,
  EmbedBuilder,
  User,
} from "discord.js";
import { getPlayer } from "@/lib.js";
import AI from "@/ai.js";
import { taskPrompt } from "@/prompts.js";

// type check
type answer = {
  is_answer: boolean;
  label: string;
};
interface Task {
  body: string;
  answers: Array<answer>;
}

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
    interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setColor(Colors.DarkRed)
          .setTitle("You haven't chose any language yet")
          .setThumbnail("https://emojifavicon.dev/favicons/274c.png"),
      ],
    });
    return;
  } else {
    // if player is worthy
    const TASK_RAW = await AI.generateContent(taskPrompt());
    const TASK = JSON.parse(TASK_RAW.response.text()) as Task;

    // return responses
    await interaction.editReply({
      content: `<@${interaction.user.id}>`,
      components: [taskActions(TASK, interaction.user)],
      embeds: [
        new EmbedBuilder()
          .setAuthor({ name: `${BOT_NAME}'s Task`, iconURL: AVATAR })
          .setColor(THEME_COLOR)
          .setThumbnail(interaction.user.displayAvatarURL())
          .setDescription(`> **${TASK.body}**`)
          .setTitle("Your Task!")
          .setTimestamp(),
      ],
    });
  }
};

/**
 * Create actions for task's mcq
 * @param data
 * @param player
 */
const taskActions = (data: Task, player: User) => {
  // all responsed btns
  const RESP_BTNS: ButtonBuilder[] = [];

  // appending mcq buttons
  data.answers.forEach((a) => {
    RESP_BTNS.push(
      new ButtonBuilder()
        .setCustomId(`task_ans@${a.label}@${a.is_answer}@${player.id}`)
        .setLabel(a.label.toString())
        .setStyle(ButtonStyle.Secondary)
    );
  });

  // creating actions
  const ROW = new ActionRowBuilder<ButtonBuilder>().addComponents(...RESP_BTNS);

  // returning
  return ROW;
};
