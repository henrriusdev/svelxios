#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const svelxios_1 = require("./commands/svelxios");
commander_1.program
    .description("Create your custom api requests handler like axios, but for sveltekit")
    .action(svelxios_1.runCommand);
commander_1.program.parse(process.argv);
