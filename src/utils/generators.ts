import fs from "fs"
import { vscodeDebugConfig } from "./constants"

export function writeDebugConfig() {
  console.log("Writing VSCode debugger config")
  fs.writeFileSync('.vscode/launch.json', JSON.stringify(vscodeDebugConfig, null, 4));
  console.log("✅ VSCode debugger config writed!");
}