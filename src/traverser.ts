import * as fs from "fs";
import minimatch from "minimatch";

export class Traverser {
  ignoreList: string[];
  constructor() {
    this.ignoreList = [".*", "package-lock.json"];
  }

  async traverse(
    path: string,
    filepathCallback: any,
    fileContentCallback: any
  ) {
    const files = fs.readdirSync(path);
    if (files.includes(".gitignore")) {
      this.handleGitIgnore(`${path}/.gitignore`);
    }
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = `${path}/${file}`;
      const stat = fs.statSync(filePath);

      if (stat.isFile()) {
        if (!this.ignoreList.some((pattern) => minimatch(file, pattern))) {
          const data = fs.readFileSync(filePath);
          await filepathCallback(filePath);
          await fileContentCallback(data.toString());
        }
      } else if (stat.isDirectory()) {
        if (
          !this.ignoreList.some((pattern) => minimatch(`${file}/`, pattern))
        ) {
          await this.traverse(filePath, filepathCallback, fileContentCallback);
        }
      }
    }
  }

  handleGitIgnore(path: string) {
    const data = fs.readFileSync(path);
    this.ignoreList = [...this.ignoreList, ...data.toString().split("\n")];
  }
}
