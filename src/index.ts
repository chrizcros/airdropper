#!/usr/bin/env node
import { program } from 'commander'

program
  .version('0.0.1')
  .description('Airdropper is a CLI tool and library that tries to make airdrops on Cardano easier')
  .option('-p, --peppers', 'Add peppers')
  .option('-P, --pineapple', 'Add pineapple')
  .option('-b, --bbq', 'Add bbq sauce')
  .option('-c, --cheese <type>', 'Add the specified type of cheese [marble]')
  .option('-C, --no-cheese', 'You do not want any cheese')
  .parse(process.argv)
