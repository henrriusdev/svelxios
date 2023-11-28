import { appLocalsCode, checkOrCreateFile, clientCode, debuggerCode, hooksCode, isSvelteKit, writeDebugConfig } from "../utils";
import { runInstall } from "../utils/installers";

export const runCommand = () => {
  // Aquí va la lógica de tu comando
  // Por ejemplo, llamar a checkOrCreateFile con los parámetros necesarios
  try {
    if (!isSvelteKit()) {
      console.error('⚠ This doesn\'t appears to be a SvelteKit Project, aborting.');
      return;
    }

    runInstall();
    writeDebugConfig();
    checkOrCreateFile('./src/app.d.ts', appLocalsCode.inLocals, 'interface Locals');
    checkOrCreateFile('./src/app.d.ts', appLocalsCode.imports, 'declare global', 'above');
    checkOrCreateFile('./src/lib/server/client.ts', clientCode.url, 'export', 'above');
    checkOrCreateFile('./src/lib/server/client.ts', clientCode.client, 'debugger');
    checkOrCreateFile('./src/lib/utils/debugger.ts', debuggerCode, 'none');
    checkOrCreateFile('./src/hooks.server.ts', hooksCode.import, 'import');
    checkOrCreateFile('./src/hooks.server.ts', hooksCode.handlers, 'none');

    console.log("✅ You're ready to go!");
  } catch (e) {
    return;
  }
};
