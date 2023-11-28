import { exec } from "child_process";
import { detectPackageManager } from ".";

function installAxios(packageManager: string) {
  let command: string;

  switch (packageManager) {
    case "yarn":
      command = "yarn add axios";
      break;
    case "npm":
      command = "npm install axios";
      break;
    case "pnpm":
      command = "pnpm install axios";
      break;
    default:
      return;
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }
    console.log(`Stdout: ${stdout}`);
  });
}

export function runInstall() {
  const packageManager = detectPackageManager();
  if (packageManager) {
    console.log('Installing axios with', packageManager);
    installAxios(packageManager);
  }
}