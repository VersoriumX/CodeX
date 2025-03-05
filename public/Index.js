import { additionalAnsiPatterns } from './additionalPatterns';
import { customTokenPatterns } from './customTokenPatterns';
import {Node.json} from './node.json';
import {extension.json} from './extension.json';

export default function ansiRegex({
    onlyFirst = false,
    customPattern = null,
    global = true
} = {}) {
    // Base pattern for ANSI escape codes
    const basePattern = [
        '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
        '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))'
    ].join('|');

    // Combine base pattern with additional and custom token patterns
    const pattern = customPattern ? customPattern : [basePattern, ...additionalAnsiPatterns, ...customTokenPatterns].join('|');

    // Create the regular expression with the appropriate flags
    return new RegExp(pattern, onlyFirst ? undefined : (global ? 'g' : ''));
}
