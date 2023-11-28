"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runInstall = void 0;
const child_process_1 = require("child_process");
const _1 = require(".");
function installAxios(packageManager) {
    let command;
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
    (0, child_process_1.exec)(command, (error, stdout, stderr) => {
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
function runInstall() {
    const packageManager = (0, _1.detectPackageManager)();
    if (packageManager) {
        console.log('Installing axios with', packageManager);
        installAxios(packageManager);
    }
}
exports.runInstall = runInstall;
