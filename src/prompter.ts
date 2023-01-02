import { ChatGptService } from "./chatgptService";

export class Prompter {
  gpt: ChatGptService;
  constructor(gpt: ChatGptService) {
    this.gpt = gpt;
  }

  async startConvo() {
    await this.gpt.startGptChat();
    const response = await this.gpt.sendGptMessage(
      "I will provide you with the content of files in a software project repository, and I want you to generate a README.md file describing the project to repository visitors. In separate messages I will send you the file contents, and I want you to generate the description after I send a message that says 'generate README'."
    );
  }

  async beginFile(filepath: string) {
    const response = await this.gpt.sendGptMessage(
      `Ok, I'm going to start sending you content for another file in the project. For your information the path of this file within the project is at: ${filepath}`
    );
  }

  async continueFile(content: string) {
    const response = await this.gpt.sendGptMessage(
      `Continuing content for the same file as last message: ${content}`
    );
  }

  async generateReadme() {
    const response = await this.gpt.sendGptMessage(`generate README`);
  }
}
