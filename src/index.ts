#!/usr/bin/env node
import { program } from "commander";
import { runCommand } from "./commands/svex";

program
  .description(
    "Create your custom api requests handler like axios, but for sveltekit"
  )
  .action(runCommand);

program.parse(process.argv);
