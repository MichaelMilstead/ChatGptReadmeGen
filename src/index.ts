import * as dotenv from "dotenv";
import promptsync from "prompt-sync";
import { ChatGptService } from "./chatgptService";
import { Prompter } from "./prompter";
import { Traverser } from "./traverser";
dotenv.config();

async function run() {
  const gpt = new ChatGptService();
  const prompter = new Prompter(gpt);
  const traverser = new Traverser();
  await prompter.startConvo();
  await traverser.traverse(
    ".",
    async (filepath: string) => await prompter.beginFile(filepath),
    async (filecontent: string) => await prompter.continueFile(filecontent)
  );
  await prompter.generateReadme();
  const prompt = promptsync();
  while (true) {
    const p = prompt("enter message for chatgpt:");
    const resp = await gpt.sendGptMessage(p);
  }
}

run();
