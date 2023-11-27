"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOrCreateFile = exports.writeDebugConfig = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const constants_1 = require("./constants");
function writeDebugConfig() {
    try {
        const directory = path_1.default.join(".", ".vscode"); // Ruta correcta a .vscode
        if (!fs_1.default.existsSync(directory)) {
            fs_1.default.mkdirSync(directory, { recursive: true });
            console.log(`Creando directorio ${directory}`);
        }
        console.log("Writing VSCode debugger config");
        fs_1.default.writeFileSync(path_1.default.join(directory, "launch.json"), // Usar path.join para la ruta del archivo
        JSON.stringify(constants_1.vscodeDebugConfig, null, 4));
        console.log("✅ VSCode debugger config written!");
    }
    catch (e) {
        console.error(`⚠ Error occurred! Please open an issue at: https://github.com/hbourgeot/svex`);
        console.error("Error details: ", e);
    }
}
exports.writeDebugConfig = writeDebugConfig;
function checkOrCreateFile(filePath, contentToAdd, searchPattern, position = "below") {
    try {
        let fileContent;
        // Crear las carpetas si no existen
        const directory = path_1.default.dirname(filePath);
        if (!fs_1.default.existsSync(directory)) {
            fs_1.default.mkdirSync(directory, { recursive: true });
            console.log(`Creando directorio ${directory}`);
        }
        // Resto de la lógica para manejar el archivo
        if (!fs_1.default.existsSync(filePath)) {
            fileContent =
                typeof contentToAdd === "string" ? [contentToAdd] : contentToAdd;
            fs_1.default.writeFileSync(filePath, fileContent.join("\n"));
            console.log(`Creando ${filePath}`);
            return;
        }
        fileContent = fs_1.default.readFileSync(filePath, "utf8").split("\n");
        if (searchPattern === "none") {
            const contentArray = typeof contentToAdd === "string" ? [contentToAdd] : contentToAdd;
            fileContent.push(...contentArray);
            fs_1.default.writeFileSync(filePath, fileContent.join("\n"));
            console.log(`✅ ${filePath} modificado al final del archivo.`);
            return;
        }
        const searchIndex = fileContent.findIndex((line) => line.includes(searchPattern));
        if (searchIndex === -1) {
            console.log(`Patrón '${searchPattern}' no encontrado en ${filePath}`);
            return;
        }
        const contentArray = typeof contentToAdd === "string" ? [contentToAdd] : contentToAdd;
        const insertIndex = position === "above" ? searchIndex : searchIndex + 1;
        console.log(`Modificando ${filePath}`);
        fileContent.splice(insertIndex, 0, ...contentArray);
        fs_1.default.writeFileSync(filePath, fileContent.join("\n"));
        console.log(`✅ ${filePath} modificado!`);
    }
    catch (e) {
        console.error(`⚠ Error ocurrido! Por favor abre un issue en: https://github.com/hbourgeot/svex`);
        console.error("Detalles del error: ", e);
    }
}
exports.checkOrCreateFile = checkOrCreateFile;
