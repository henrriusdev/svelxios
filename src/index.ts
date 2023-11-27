import { program } from "commander";
import { runCommand } from "./commands/svex";

program.command('svex.ts').description('Create your custom api requests handler like axios, but for sveltekit').action(runCommand);

program.parse(process.argv);