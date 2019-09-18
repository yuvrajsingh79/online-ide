const languageModuleTable: Array<[string, string]> = [
    ['nodejs', 'ace/mode/javascript'],
    ['java', 'ace/mode/java'],
    ['python3', 'ace/mode/python'],
    ['csharp', 'ace/mode/csharp'],
    ['php', 'ace/mode/php'],
    ['ruby', 'ace/mode/ruby'],
];

export const languageModuleMap: Map<string, string> = new Map(languageModuleTable);