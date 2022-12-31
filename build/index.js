import * as dotenv from "dotenv";
dotenv.config();
import { ChatGPTAPIBrowser } from "chatgpt";
import promptsync from "prompt-sync";
async function example() {
    // use puppeteer to bypass cloudflare (headful because of captchas)
    const api = new ChatGPTAPIBrowser({
        email: process.env.OPENAI_EMAIL,
        password: process.env.OPENAI_PASSWORD,
    });
    await api.initSession();
    const prompt = promptsync();
    while (true) {
        const gptPrompt = prompt("message to chatgpt: ");
        const result = await api.sendMessage(gptPrompt);
        console.log(result.response);
    }
}
console.log("starting");
console.log(process.env);
await example();
