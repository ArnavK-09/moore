// import
import type { CommandConfig } from "@roboplay/robo.js";
import { AVATAR, BOT_NAME, THEME_COLOR } from "@/constants.js";
import { Colors, CommandInteraction, EmbedBuilder } from "discord.js";
import { getPlayer, increasePlayerBalance, randomNumber } from "@/lib.js";
import AI from "@/ai.js";

// lesson command config
export const config: CommandConfig = {
  description: `Get your today's language lesson...`,
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

  /**
   * Getting todays lesson
   */
  const DAY = Math.floor(
    (new Date().getTime() - PLAYER!.registered_on.getTime()) /
      (1000 * 60 * 60 * 24)
  );
  const LESSON = await AI.generateContent(
    `You are langauge teacher named "${BOT_NAME}" for langauge ${PLAYER?.language} and you are teaching student named "${interaction.user.username}"! And your statuden is on day #${DAY} learning the language! Give me a small lesson in single paragraph for about 5 lines for language ${PLAYER?.language}, make the lesson attractive and balance the level of lesson according to student's level who started learning ${PLAYER?.language} ${DAY} ago.`
  );
  const LESSON_TXT = LESSON.response.text();

  // increase player's balance
  await increasePlayerBalance(PLAYER!, randomNumber(50, 125));

  // responding
  await interaction.editReply({
    embeds: [
      new EmbedBuilder()
        .setColor(THEME_COLOR)
        .setAuthor({
          name: `${BOT_NAME}'s Daily Lesson For You!`,
          iconURL: AVATAR,
        })
        .setTitle(`Your Daily Language Lesson For Day #${DAY}`)
        .setDescription(`>>> ${LESSON_TXT}`),
    ],
  });
};
