#!/usr/bin/env node

import { Command } from 'commander';
import { version } from '../package.json';
import { start } from './commands/start';
import { stop } from './commands/stop';
import { restart } from './commands/restart';

const program = new Command();

console.log(process.platform);

program
  .version(version)
  .description(
    'Utility to help setup a docker development environment with domain name based routing',
  );

program
  .command('start')
  .description('Pull and run the containers with DNS Configuration')
  .action(start);

program.command('stop').description('Stop the proxy docker containers').action(stop);

program.command('restart').description('Stop the proxy docker containers').action(restart);

program.parse(process.argv);
if (!program.args.length) program.help();
