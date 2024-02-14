/**
 * Imports required
 */
import type { Snowflake, User } from "discord.js";
import { DB } from "./constants.js";
import { Player } from "@prisma/client";

/**
 * Get player from db by player's discord id
 * @param {Snowflake} userID
 */
export const getPlayer = async (userID: Snowflake): Promise<Player | null> => {
  const PLAYER = await DB.player.findUnique({
    where: {
      discord_id: userID,
    },
  });
  return PLAYER;
};

/**
 * Register new user to Database
 * @param {Snowflake} discord_user
 */
export const registerNewPlayer = async (
  discord_user: User
): Promise<Player | null> => {
  const NEW_PLAYER = await DB.player.create({
    data: {
      discord_id: discord_user.id,
      username: discord_user.username,
    },
  });
  return NEW_PLAYER;
};

/**
 * List Top 10 Bot players according to their player_score
 */
export const listTop10Players = async (): Promise<Player[]> => {
  const TOP_10_PLAYER = await DB.player.findMany({
    take: 10,
    orderBy: [
      {
        player_score: "desc",
      },
    ],
  });
  return TOP_10_PLAYER;
};

// export const updatePlayer = async (discord_id: Snowflake): Promise<Player> => {
//     const UPDATED_PLAYER = await DB.player.update({
//         where: {
//             discord_id: discord_id
//         }
//     });
//     return UPDATED_PLAYER;
// }
