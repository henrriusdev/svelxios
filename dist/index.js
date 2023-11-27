"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const svex_1 = require("./commands/svex");
commander_1.program.command('svex.ts').description('Create your custom api requests handler like axios, but for sveltekit').action(svex_1.runCommand);
commander_1.program.parse(process.argv);
