/**
 * Imports required
 */
import { Player } from "@prisma/client";
import { BOT_NAME } from "@/constants.js";

/**
 * Prompt for /lesson cmd
 */
export const lessonPrompt = (player: Player, username: string, day = 1) => {
  return `You are langauge teacher named "${BOT_NAME}" for langauge ${player.language} and you are teaching student named "${username}"! And your statuden is on day #${day} learning the language! Give me a small lesson in single paragraph for about 5 lines for language ${player.language}, make the lesson attractive and balance the level of lesson according to student's level who started learning ${player.language} ${day} days ago.`;
};

/**
 * Prompt for /task cmd
 */
export const taskPrompt = () => {
  return ``;
};
