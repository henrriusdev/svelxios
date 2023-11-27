"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOrCreateFile = exports.writeDebugConfig = void 0;
const fs_1 = __importDefault(require("fs"));
const constants_1 = require("./constants");
function writeDebugConfig() {
    try {
        console.log("Writing VSCode debugger config");
        fs_1.default.writeFileSync('.vscode/launch.json', JSON.stringify(constants_1.vscodeDebugConfig, null, 4));
        console.log("✅ VSCode debugger config writed!");
    }
    catch (e) {
        console.error(`⚠ Error ocurred! Please open a issue at: https://github.com/hbourgeot/svex`);
        console.error('Error details: ', e);
    }
}
exports.writeDebugConfig = writeDebugConfig;
function checkOrCreateFile(filePath, contentToAdd, searchPattern, position = "below") {
    try {
        let fileContent;
        if (!fs_1.default.existsSync(filePath)) {
            fileContent =
                typeof contentToAdd === "string" ? [contentToAdd] : contentToAdd;
            fs_1.default.writeFileSync(filePath, fileContent.join("\n"));
            console.log(`Creando ${filePath}`);
            return;
        }
        fileContent = fs_1.default.readFileSync(filePath, "utf8").split("\n");
        const searchIndex = fileContent.findIndex((line) => line.includes(searchPattern));
        if (searchIndex === -1) {
            console.log(`Patrón '${searchPattern}' no encontrado en ${filePath}`);
            return;
        }
        const contentArray = typeof contentToAdd === "string" ? [contentToAdd] : contentToAdd;
        const insertIndex = position === "above" ? searchIndex : searchIndex + 1;
        console.log(`Modifying ${filePath}`);
        fileContent.splice(insertIndex, 0, ...contentArray);
        fs_1.default.writeFileSync(filePath, fileContent.join("\n"));
        console.log(`✅ ${filePath} modified!`);
    }
    catch (e) {
        console.error(`⚠ Error ocurred! Please open a issue at: https://github.com/hbourgeot/svex`);
        console.error('Error details: ', e);
    }
}
exports.checkOrCreateFile = checkOrCreateFile;
