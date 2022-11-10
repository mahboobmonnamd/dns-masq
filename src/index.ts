#!/usr/bin/env node

import { Command } from 'commander';
import { version } from '../package.json';
import { start } from './commands/start';

const program = new Command();

console.log(process.platform);

program
  .version(version)
  .description(
    'A utility to help setup a docker development environment with domain name based routing',
  );

program
  .command('start')
  .description('Pull and run the containers with DNS configuration')
  .action(start);

program.parse(process.argv);
