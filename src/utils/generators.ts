import fs from "fs"
import { vscodeDebugConfig } from "./constants"

export function writeDebugConfig() {
  try {
    console.log("Writing VSCode debugger config")
    fs.writeFileSync('.vscode/launch.json', JSON.stringify(vscodeDebugConfig, null, 4));
    console.log("✅ VSCode debugger config writed!");
  } catch (e) {
    console.error(`⚠ Error ocurred! Please open a issue at: https://github.com/hbourgeot/svex`);
    console.error('Error details: ', e)
  }
}

export type InsertPosition = "above" | "below";

export function checkOrCreateFile(
  filePath: string,
  contentToAdd: string | string[],
  searchPattern: string,
  position: InsertPosition = "below"
  ) {
    try {
      let fileContent: string[];
      
      if (!fs.existsSync(filePath)) {
        fileContent =
        typeof contentToAdd === "string" ? [contentToAdd] : contentToAdd;
        fs.writeFileSync(filePath, fileContent.join("\n"));
        console.log(`Creando ${filePath}`);
      return;
    }
    
    fileContent = fs.readFileSync(filePath, "utf8").split("\n");
    const searchIndex = fileContent.findIndex((line) =>
    line.includes(searchPattern)
    );
    
    if (searchIndex === -1) {
      console.log(`Patrón '${searchPattern}' no encontrado en ${filePath}`);
      return;
    }
    
    const contentArray =
    typeof contentToAdd === "string" ? [contentToAdd] : contentToAdd;
    
    const insertIndex = position === "above" ? searchIndex : searchIndex + 1;
    
    console.log(`Modifying ${filePath}`);
    
    fileContent.splice(insertIndex, 0, ...contentArray);
    fs.writeFileSync(filePath, fileContent.join("\n"));
    console.log(`✅ ${filePath} modified!`);
  } catch (e) {
    console.error(`⚠ Error ocurred! Please open a issue at: https://github.com/hbourgeot/svex`);
    console.error('Error details: ', e)
  }
}