/**
 * Imports required
 */
import { Player } from "@prisma/client";
import { BOT_NAME } from "@/constants.js";

/**
 * Prompt for /lesson cmd
 */
export const lessonPrompt = (player: Player, username: string, day = 1) => {
  return `You are langauge teacher named "${BOT_NAME}" for langauge ${player.language} and you are teaching student named "${username}"! And your student is on day #${day} learning the language ${player.language}! Give a small lesson in single paragraph for about 5 lines for language ${player.language}, make the lesson attractive and balance the level of lesson according to student's level who started learning ${player.language} ${day} days ago.`;
};

/**
 * Prompt for /task cmd
 */
export const taskPrompt = (player: Player, username: string, day = 1) => {
  return `
  You are langauge teacher named "${BOT_NAME}" for langauge ${player.language} and you are teaching student named "${username}"! And your student is on day #${day} learning the language ${player.language}! Give a tedious MCQ TASK for language ${player.language}, make the MCQ Answers attractive and balance the level of lesson according to student's level who started learning ${player.language} ${day} days ago.
  MAKE SURE TO GIVE DIFFICULTY OF QUESTION AS THE PLAYER EXPIERNCE RISES...
  t
  # Your response should be in valid JSON format and follow the scheme below:-

  {
    body: "MCQ Question in single line, form it in friendly way, include single emoji also, just single line. use \\n for new line. add \\ before symbols  ",
    answers: [
      {
        label: "Each MCQ Consists of 4 options from which one is answer, use single or max 2 words for this field",
        is_answer: true || false, // this attribute should be in boolean format, use true if this is correct option for mcq, use false if not
      }
    ]
  }

  # Typescript types 
  
  type answer = {
    is_answer: boolean;
    label: string;
  };
  interface Task {
    body: string;
    answers: Array<answer>;
  }

  # Examples 
  Language:- English
  Response JSON:-
  {
    body: "🍕 How does Exclamation mark looks like???",
    answers: [
      {
        label: "!",
        is_answer: true,
      },
      {
        label: "@",
        is_answer: false,
      },
      {
        label: "$",
        is_answer: false,
      },
      {
        label: "*",
        is_answer: false,
      },
    ]
  }

  JUST RESPOND WITH JSON DATA NO EXTRA MESSAGES, WITHOUT CODEBLOCK!
  # MAKE SURE TO ADD FIELD STRINGS IN DOUBLE QUOTES ""
  `;
};
