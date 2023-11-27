import fs from "fs"
import path from "path";
import { vscodeDebugConfig } from "./constants"

export function writeDebugConfig() {
  try {
    // Crear las carpetas si no existen
    const directory = path.dirname('.vscode');
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
      console.log(`Creando directorio ${directory}`);
    }

    console.log("Writing VSCode debugger config");
    fs.writeFileSync(
      ".vscode/launch.json",
      JSON.stringify(vscodeDebugConfig, null, 4)
    );
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

    // Crear las carpetas si no existen
    const directory = path.dirname(filePath);
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
      console.log(`Creando directorio ${directory}`);
    }

    // Resto de la lógica para manejar el archivo
    if (!fs.existsSync(filePath)) {
      fileContent =
        typeof contentToAdd === "string" ? [contentToAdd] : contentToAdd;
      fs.writeFileSync(filePath, fileContent.join("\n"));
      console.log(`Creando ${filePath}`);
      return;
    }

    fileContent = fs.readFileSync(filePath, "utf8").split("\n");

     if (searchPattern === "none") {
       const contentArray =
         typeof contentToAdd === "string" ? [contentToAdd] : contentToAdd;
       fileContent.push(...contentArray);
       fs.writeFileSync(filePath, fileContent.join("\n"));
       console.log(`✅ ${filePath} modificado al final del archivo.`);
       return;
    }
    
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

    console.log(`Modificando ${filePath}`);
    fileContent.splice(insertIndex, 0, ...contentArray);
    fs.writeFileSync(filePath, fileContent.join("\n"));
    console.log(`✅ ${filePath} modificado!`);
  } catch (e) {
    console.error(
      `⚠ Error ocurrido! Por favor abre un issue en: https://github.com/hbourgeot/svex`
    );
    console.error("Detalles del error: ", e);
  }
}
