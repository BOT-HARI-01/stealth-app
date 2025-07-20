import path from "path";
import dotenv from "dotenv";
import { app } from "electron";
import { env } from "process";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = !app.isPackaged;
const envPath = isDev
  ? path.join(__dirname, "../../.env")
  : path.join(app.getPath("userData"), ".env");
console.log(envPath);
dotenv.config({ path: envPath });
const models = [
  {
    name: "GOOGLE GEMINI",
    key: process.env.GEMINI_API_KEY,
    model: "gemini-2.5-flash",
  },
  {
    name: "COHERE",
    key: process.env.COHERE_API_KEY,
    model: "command-a-03-2025",
  },
];

let activeIndex = 0;

export function getActiveModel() {
  return models[activeIndex];
}

export function switchModel() {
  activeIndex = (activeIndex + 1) % models.length;
  console.log(`Switched to model: ${models[activeIndex].name}`);
  console.log(models[activeIndex].key);
}
