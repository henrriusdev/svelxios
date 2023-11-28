"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCommand = void 0;
const utils_1 = require("../utils");
const installers_1 = require("../utils/installers");
const runCommand = () => {
    // Aquí va la lógica de tu comando
    // Por ejemplo, llamar a checkOrCreateFile con los parámetros necesarios
    try {
        if (!(0, utils_1.isSvelteKit)()) {
            console.error('⚠ This doesn\'t appears to be a SvelteKit Project, aborting.');
            return;
        }
        (0, installers_1.runInstall)();
        (0, utils_1.writeDebugConfig)();
        (0, utils_1.checkOrCreateFile)('./src/app.d.ts', utils_1.appLocalsCode.inLocals, 'interface Locals');
        (0, utils_1.checkOrCreateFile)('./src/app.d.ts', utils_1.appLocalsCode.imports, 'declare global', 'above');
        (0, utils_1.checkOrCreateFile)('./src/lib/server/client.ts', utils_1.clientCode.url, 'export', 'above');
        (0, utils_1.checkOrCreateFile)('./src/lib/server/client.ts', utils_1.clientCode.client, 'debugger');
        (0, utils_1.checkOrCreateFile)('./src/lib/utils/debugger.ts', utils_1.debuggerCode, 'none');
        (0, utils_1.checkOrCreateFile)('./src/hooks.server.ts', utils_1.hooksCode.import, 'import');
        (0, utils_1.checkOrCreateFile)('./src/hooks.server.ts', utils_1.hooksCode.handlers, 'none');
        console.log("✅ You're ready to go!");
    }
    catch (e) {
        return;
    }
};
exports.runCommand = runCommand;
