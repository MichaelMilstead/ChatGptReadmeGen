import { ChatGPTAPIBrowser } from "chatgpt";

export class ChatGptService {
  api: ChatGPTAPIBrowser;
  conversation: null | { conversationId: string; parentMessageId: string };
  logReponses: boolean;

  constructor(logResponses = true) {
    this.api = new ChatGPTAPIBrowser({
      email: process.env.OPENAI_EMAIL!,
      password: process.env.OPENAI_PASSWORD!,
    });
    this.conversation = null;
    this.logReponses = logResponses;
  }

  async startGptChat() {
    await this.api.initSession();
  }

  async sendGptMessage(message: string): Promise<string> {
    console.log("sending message: " + message);
    const result = this.conversation
      ? await this.api.sendMessage(message, this.conversation)
      : await this.api.sendMessage(message);
    this.conversation = {
      conversationId: result.conversationId,
      parentMessageId: result.messageId,
    };
    if (this.logReponses) {
      console.log(`response from chatgpt: ${result.response}`);
    }
    return result.response;
  }
}
