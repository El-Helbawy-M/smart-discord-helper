import statsCommand from './stats.js';
import remindCommand from './remind.js';
import configCommand from './config.js';

// Export all commands as an array
export const commands = [
  statsCommand,
  remindCommand,
  configCommand,
];

// Export commands as a Map for easy lookup
export function getCommandsMap() {
  const map = new Map();
  commands.forEach(cmd => map.set(cmd.data.name, cmd));
  return map;
}
