/**
 * Imports required
 */
import { Language, PrismaClient } from "@prisma/client";
import { Colors } from "discord.js";

/**
 * New prisma client for querying db
 */
export const DB = new PrismaClient();

/**
 * Discord Bot name
 */
export const BOT_NAME = "Moore";

/**
 * Supported languages to learn
 */
export const LANGUAGES: Language[] = [
  "HINDI",
  "SPANISH",
  "FRENCH",
  "JAPANESE",
  "KOREAN",
];

/**
 * Bot's theme color
 */
export const THEME_COLOR = Colors.Gold;

/**
 * Bot's Website
 */
export const WEBSITE = "https://docs.roboplay.dev/TODO";

/**
 * Bot's Avatar Image URL
 */
export const AVATAR = "https://docs.roboplay.dev/img/logo.png?TODO";

/**
 * Bot's Banner Image URL
 */
export const BANNER = "https://docs.roboplay.dev/img/logo.png?TODO";

/**
 * Bot's Funfacts
 */
export const FACTS = [
  "This bot is built for NTTS Hackathon",
  "My Developer doesnt't like making discord bots",
  "I love you",
  "you are optimally human being",
];

/**
 * Get random element from array
 */
export const randomElementFromArray = (arr: unknown[]) =>
  arr[Math.floor(Math.random() * arr.length)];
