import * as dotenv from "dotenv";
import promptsync from "prompt-sync";
import { ChatGptService } from "./chatgptService";
import { Prompter } from "./prompter";
dotenv.config();

async function run() {
  const gpt = new ChatGptService();
  const prompter = new Prompter(gpt);
  await prompter.startConvo();
  await prompter.beginFile("./package.json");
  await prompter.generateReadme();
  const prompt = promptsync();
  while (true) {
    const p = prompt("enter message for chatgpt:");
    const resp = await gpt.sendGptMessage(p);
  }
}

run();
