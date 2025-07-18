import fs from "fs";
import path from "path";
import { app } from "electron";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isDev = !app.isPackaged;
export function createEnvFile() {
  const filePath = isDev
    ? path.join(__dirname, "../../.env")
    : path.join(app.getPath("userData"), ".env");

const defaultEnvContent = [
  'GITHUB_PAT=""',
  'GEMINI_KEY=""',
  'COHERE_KEY=""',
  'OPENAI_API_KEY=""',
].join('\n');


  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, defaultEnvContent, "utf-8");
    console.log(".env file created at", filePath);
  } else {
    console.log(".env file already exists");
  }
}
