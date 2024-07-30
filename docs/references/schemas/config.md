---
title: config
layout: default
nav_order: 1
parent: Reference
---


# config




Configuration options for Doc Detective operations.

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
defaultCommand | string |  Optional. Default command to run when no command is specified.<br/><br/>Accepted values: `runTests`, `runCoverage` | 
input | One of<br/>-&nbsp;string<br/>-&nbsp;array of strings |  Optional. Path(s) to test specifications and documentation source files. May be paths to specific files or to directories to scan for files. | `.`
output | string |  Optional. Path of the of the file or directory in which to store the output of Doc Detective commands. If a file path is specified, the output is written to that file. If a file of that name already exists, Doc Detective creates appends an integer to the result file name. If a directory path is specified, the output file name is dependent on the command being run. | `.`
recursive | boolean |  Optional. If `true` searches `input`, `setup`, and `cleanup` paths recursively for test specificaions and source files. | `true`
envVariables | string |  Optional. Path to a `.env` file to load before performing a Doc Detective operation. | 
runTests | object |  Optional. Options for running tests. When running tests, values set here override general configuration options. | 
runTests.input | One of<br/>-&nbsp;string<br/>-&nbsp;array of strings |  Optional. Path(s) to test specifications and documentation source files. May be paths to specific files or to directories to scan for files. | 
runTests.output | string |  Optional. Path of the of the file or directory in which to store the output of Doc Detective commands. If a file path is specified, the output is written to that file. If a file of that name already exists, Doc Detective creates appends an integer to the result file name. If a directory path is specified, the output file name is dependent on the command being run. | `.`
runTests.setup | One of<br/>-&nbsp;string<br/>-&nbsp;array of strings |  Optional. Path(s) to test specifications to perform before those specified by `input`. Useful for setting up testing environments. | 
runTests.cleanup | One of<br/>-&nbsp;string<br/>-&nbsp;array of strings |  Optional. Path(s) to test specifications to perform after those specified by `input`. Useful for cleaning up testing environments. | 
runTests.recursive | boolean |  Optional. If `true` searches `input`, `setup`, and `cleanup` paths recursively for test specificaions and source files. | 
runTests.detectSteps | boolean |  Optional. Whether or not to detect steps in input files based on markup regex. | `false`
runTests.mediaDirectory | string |  Optional. Path of the directory in which to store output media files. | `.`
runTests.downloadDirectory | string |  Optional. Path of the directory in which to store downloaded files. | `.`
runTests.contexts | array of object([context](/docs/references/schemas/context)) |  Optional. Application/platform sets to run tests in. If no contexts are specified but a context is required by one or more tests, Doc Detective attempts to identify a supported context in the current environment and run tests against it. See [context](/docs/references/schemas/context). | `[{"app":{"name":"firefox","options":{"width":1200,"height":800,"headless":true}},"platforms":["linux","mac","windows"]}]`
runCoverage | object |  Optional. Options for performing test coverage analysis on documentation source files.  When performing coveration analysis, values set here override general configuration options. | 
runCoverage.input | One of<br/>-&nbsp;string<br/>-&nbsp;array of strings |  Optional. Path(s) to test specifications and documentation source files. May be paths to specific files or to directories to scan for files. | 
runCoverage.output | string |  Optional. Path of the of the file or directory in which to store the output of Doc Detective commands. If a file path is specified, the output is written to that file. If a file of that name already exists, Doc Detective creates appends an integer to the result file name. If a directory path is specified, the output file name is dependent on the command being run. | `.`
runCoverage.recursive | boolean |  Optional. If `true` searches `input`, `setup`, and `cleanup` paths recursively for test specificaions and source files. | 
runCoverage.markup | array of strings |  Optional. Markup types to include when performing this operation. If no markup types are specified, the operation includes all markup types as defined in `fileTypes`. | `["onscreenText","emphasis","image","hyperlink","codeInline","codeBlock","interaction"]`
suggestTests | object |  Optional. Options for suggesting tests based on documentation source files.  When suggesting tests, values set here override general condiguration options. | 
suggestTests.input | One of<br/>-&nbsp;string<br/>-&nbsp;array of strings |  Optional. Path(s) to test specifications and documentation source files. May be paths to specific files or to directories to scan for files. | 
suggestTests.output | string |  Optional. Path of the of the file or directory in which to store the output of Doc Detective commands. If a file path is specified, the output is written to that file. If a file of that name already exists, Doc Detective creates appends an integer to the result file name. If a directory path is specified, the output file name is dependent on the command being run. | `.`
suggestTests.recursive | boolean |  Optional. If `true` searches `input`, `setup`, and `cleanup` paths recursively for test specificaions and source files. | 
suggestTests.markup | array of strings |  Optional. Markup types to include when performing this operation. If no markup types are specified, the operation includes all markup types as defined in `fileTypes`. | `["onscreenText","emphasis","image","hyperlink","codeInline","codeBlock","interaction"]`
fileTypes | array of objects |  Optional. Information on supported file types and how to parse the markup within them. |
fileTypes.name | string |  Optional. Name of the file type. | 
fileTypes.extensions | array of strings |  Required. File extensions to support with this configuration. | 
fileTypes.testStartStatementOpen | string |  Required. Opening of an in-document test start statement. | 
fileTypes.testStartStatementClose | string |  Required. Close of an in-document test start statement. | 
fileTypes.testIgnoreStatement | string |  Required. Text for an in-document test ignore statement. | 
fileTypes.testEndStatement | string |  Required. Text for an in-document test end statement. | 
fileTypes.stepStatementOpen | string |  Required. Opening of an in-document step statement. | 
fileTypes.stepStatementClose | string |  Required. Close of an in-document step statement. | 
fileTypes.markup | array of objects |  Required. Markup types and associated regex patterns to find in documentation source files. | 
fileTypes.markup.name | string |  Required. Name of the markup type. | 
fileTypes.markup.regex | array of strings |  Required. Regex patterns to find the markup type in documentation source files. | 
fileTypes.markup.actions | array of <br/>- strings<br/>- objects<br/>-&nbsp;object([checkLink](/docs/references/schemas/checkLink))<br/>-&nbsp;object([find](/docs/references/schemas/find))<br/>-&nbsp;object([goTo](/docs/references/schemas/goTo))<br/>-&nbsp;object([httpRequest](/docs/references/schemas/httpRequest))<br/>-&nbsp;object([runShell](/docs/references/schemas/runShell))<br/>-&nbsp;object([saveScreenshot](/docs/references/schemas/saveScreenshot))<br/>-&nbsp;object([setVariables](/docs/references/schemas/setVariables))<br/>-&nbsp;object([startRecording](/docs/references/schemas/startRecording))<br/>-&nbsp;object([stopRecording](/docs/references/schemas/stopRecording))<br/>-&nbsp;object([typeKeys](/docs/references/schemas/typeKeys))<br/>-&nbsp;object([wait](/docs/references/schemas/wait)) |  Optional. Actions that apply to the markup type. | 
fileTypes.markup.actions.name | string |  Required. Name of the action.<br/><br/>Accepted values: `checkLink`, `find`, `goTo`, `httpRequest`, `runShell`, `saveScreenshot`, `setVariables`, `startRecording`, `stopRecording`, `typeKeys`, `wait` | 
fileTypes.markup.actions.params | object |  Optional. Parameters for the action. | 
integrations | object |  Optional. Options for connecting to external services. | 
telemetry | object |  Optional. Options around sending telemetry for Doc Detective usage. | `{"send":true}`
telemetry.send | boolean |  Required. If `true`, sends Doc Detective telemetry. | `true`
telemetry.userId | string |  Optional. Identifier for the organization, group, or individual running Doc Detective. | 
logLevel | string |  Optional. Amount of detail to output when performing an operation.<br/><br/>Accepted values: `silent`, `error`, `warning`, `info`, `debug` | `info`

## Examples

```json
{}
```

```json
{
  "input": ".",
  "output": "."
}
```

```json
{
  "defaultCommand": "runTests",
  "envVariables": "",
  "input": ".",
  "output": ".",
  "recursive": true,
  "logLevel": "info",
  "runTests": {
    "input": ".",
    "output": ".",
    "setup": "",
    "cleanup": "",
    "recursive": true,
    "mediaDirectory": ".",
    "downloadDirectory": ".",
    "contexts": [
      {
        "app": {
          "name": "firefox",
          "path": ""
        },
        "platforms": [
          "linux",
          "mac",
          "windows"
        ]
      }
    ]
  }
}
```

```json
{
  "envVariables": "",
  "input": ".",
  "output": ".",
  "recursive": true,
  "logLevel": "info",
  "runTests": {
    "input": ".",
    "output": ".",
    "setup": "",
    "cleanup": "",
    "recursive": true,
    "mediaDirectory": ".",
    "downloadDirectory": ".",
    "contexts": [
      {
        "app": {
          "name": "firefox",
          "path": ""
        },
        "platforms": [
          "linux",
          "mac",
          "windows"
        ]
      }
    ]
  },
  "runCoverage": {
    "recursive": true,
    "input": ".",
    "output": ".",
    "markup": []
  },
  "fileTypes": [
    {
      "name": "Markdown",
      "extensions": [
        ".md",
        ".markdown",
        ".mdx"
      ],
      "testStartStatementOpen": "[comment]: # (test start",
      "testStartStatementClose": ")",
      "testIgnoreStatement": "[comment]: # (test ignore)",
      "testEndStatement": "[comment]: # (test end)",
      "stepStatementOpen": "[comment]: # (step",
      "stepStatementClose": ")",
      "markup": [
        {
          "name": "onscreenText",
          "regex": [
            "\\*\\*.+?\\*\\*"
          ],
          "actions": [
            "find"
          ]
        },
        {
          "name": "emphasis",
          "regex": [
            "(?<!\\*)\\*(?!\\*).+?(?<!\\*)\\*(?!\\*)"
          ]
        },
        {
          "name": "image",
          "regex": [
            "!\\[.+?\\]\\(.+?\\)"
          ],
          "actions": [
            "checkLink"
          ]
        },
        {
          "name": "hyperlink",
          "regex": [
            "(?<!!)\\[.+?\\]\\(.+?\\)"
          ],
          "actions": [
            "checkLink"
          ]
        },
        {
          "name": "navigationLink",
          "regex": [
            "(?:[Cc]hose|[Oo]pen|[Cc]lick|[Nn]avigate to|[Gg]o to)(?<!!)\\[.+?\\]\\(.+?\\)"
          ],
          "actions": [
            "goTo"
          ]
        },
        {
          "name": "orderedList",
          "regex": [
            "(?<=\n) *?[0-9][0-9]?[0-9]?.\\s*.*"
          ]
        },
        {
          "name": "unorderedList",
          "regex": [
            "(?<=\n) *?\\*.\\s*.*",
            "(?<=\n) *?-.\\s*.*"
          ]
        },
        {
          "name": "codeInline",
          "regex": [
            "(?<!`)`(?!`).+?(?<!`)`(?!`)"
          ]
        },
        {
          "name": "codeBlock",
          "regex": [
            "(?=(```))(\\w|\\W)*(?<=```)"
          ]
        },
        {
          "name": "interaction",
          "regex": [
            "[cC]lick",
            "[tT]ap",
            "[tT]ouch",
            "[sS]elect",
            "[cC]hoose",
            "[tT]oggle",
            "[eE]nable",
            "[dD]isable",
            "[tT]urn [oO][ff|n]",
            "[tT]ype",
            "[eE]nter",
            "[sS]end",
            "[aA]dd",
            "[rR]emove",
            "[dD]elete",
            "[uU]pload",
            "[dD]ownload",
            "[sS]croll",
            "[sS]earch",
            "[fF]ilter",
            "[sS]ort",
            "[cC]opy",
            "[pP]aste",
            "[cC]ut",
            "[rR]eplace",
            "[cC]lear",
            "[rR]efresh",
            "[rR]evert",
            "[rR]estore",
            "[rR]eset",
            "[lL]ogin",
            "[lL]ogout",
            "[sS]ign [iI]n",
            "[sS]ign [oO]ut",
            "[sS]ubmit",
            "[cC]ancel",
            "[cC]lose",
            "[aA]ccept",
            "[dD]ecline",
            "[dD]eny",
            "[rR]eject",
            "[rR]etry",
            "[rR]estart",
            "[rR]esume"
          ]
        }
      ]
    }
  ],
  "integrations": {},
  "telemetry": {
    "send": true,
    "userId": "Doc Detective"
  }
}
```

```json
{
  "envVariables": "",
  "input": [
    "."
  ],
  "output": ".",
  "recursive": true,
  "logLevel": "info",
  "runTests": {
    "input": [
      "."
    ],
    "output": ".",
    "setup": [
      "."
    ],
    "cleanup": [
      "."
    ],
    "recursive": true,
    "mediaDirectory": ".",
    "downloadDirectory": ".",
    "contexts": [
      {
        "app": {
          "name": "firefox",
          "options": {
            "width": 1200,
            "height": 800,
            "headless": true
          }
        },
        "platforms": [
          "linux",
          "mac",
          "windows"
        ]
      }
    ]
  },
  "runCoverage": {
    "recursive": true,
    "input": [
      "."
    ],
    "output": ".",
    "markup": []
  },
  "fileTypes": [
    {
      "name": "Markdown",
      "extensions": [
        ".md",
        ".markdown",
        ".mdx"
      ],
      "testStartStatementOpen": "[comment]: # (test start",
      "testStartStatementClose": ")",
      "testIgnoreStatement": "[comment]: # (test ignore)",
      "testEndStatement": "[comment]: # (test end)",
      "stepStatementOpen": "[comment]: # (step",
      "stepStatementClose": ")",
      "markup": [
        {
          "name": "onscreenText",
          "regex": [
            "\\*\\*.+?\\*\\*"
          ],
          "actions": [
            "find"
          ]
        },
        {
          "name": "emphasis",
          "regex": [
            "(?<!\\*)\\*(?!\\*).+?(?<!\\*)\\*(?!\\*)"
          ]
        },
        {
          "name": "image",
          "regex": [
            "!\\[.+?\\]\\(.+?\\)"
          ],
          "actions": [
            "checkLink"
          ]
        },
        {
          "name": "hyperlink",
          "regex": [
            "(?<!!)\\[.+?\\]\\(.+?\\)"
          ],
          "actions": [
            "checkLink"
          ]
        },
        {
          "name": "navigationLink",
          "regex": [
            "(?:[Cc]hose|[Oo]pen|[Cc]lick|[Nn]avigate to|[Gg]o to)(?<!!)\\[.+?\\]\\(.+?\\)"
          ],
          "actions": [
            "goTo"
          ]
        },
        {
          "name": "orderedList",
          "regex": [
            "(?<=\n) *?[0-9][0-9]?[0-9]?.\\s*.*"
          ]
        },
        {
          "name": "unorderedList",
          "regex": [
            "(?<=\n) *?\\*.\\s*.*",
            "(?<=\n) *?-.\\s*.*"
          ]
        },
        {
          "name": "codeInline",
          "regex": [
            "(?<!`)`(?!`).+?(?<!`)`(?!`)"
          ]
        },
        {
          "name": "codeBlock",
          "regex": [
            "(?=(```))(\\w|\\W)*(?<=```)"
          ]
        },
        {
          "name": "interaction",
          "regex": [
            "[cC]lick",
            "[tT]ap",
            "[tT]ouch",
            "[sS]elect",
            "[cC]hoose",
            "[tT]oggle",
            "[eE]nable",
            "[dD]isable",
            "[tT]urn [oO][ff|n]",
            "[tT]ype",
            "[eE]nter",
            "[sS]end",
            "[aA]dd",
            "[rR]emove",
            "[dD]elete",
            "[uU]pload",
            "[dD]ownload",
            "[sS]croll",
            "[sS]earch",
            "[fF]ilter",
            "[sS]ort",
            "[cC]opy",
            "[pP]aste",
            "[cC]ut",
            "[rR]eplace",
            "[cC]lear",
            "[rR]efresh",
            "[rR]evert",
            "[rR]estore",
            "[rR]eset",
            "[lL]ogin",
            "[lL]ogout",
            "[sS]ign [iI]n",
            "[sS]ign [oO]ut",
            "[sS]ubmit",
            "[cC]ancel",
            "[cC]lose",
            "[aA]ccept",
            "[dD]ecline",
            "[dD]eny",
            "[rR]eject",
            "[rR]etry",
            "[rR]estart",
            "[rR]esume"
          ]
        }
      ]
    },
    {
      "name": "AsciiDoc",
      "extensions": [
        ".adoc",
        ".asciidoc, .asc"
      ],
      "testStartStatementOpen": "// (test start",
      "testStartStatementClose": ")",
      "testIgnoreStatement": "// (test ignore)",
      "testEndStatement": "// (test end)",
      "stepStatementOpen": "// (step",
      "stepStatementClose": ")",
      "markup": []
    },
    {
      "name": "HTML/XML",
      "extensions": [
        ".html",
        ".htm",
        ".xml",
        ".xhtml"
      ],
      "testStartStatementOpen": "<!-- test start",
      "testStartStatementClose": "-->",
      "testIgnoreStatement": "<!-- test ignore -->",
      "testEndStatement": "<!-- test end -->",
      "stepStatementOpen": "<!-- step",
      "stepStatementClose": "-->",
      "markup": []
    }
  ],
  "integrations": {},
  "telemetry": {
    "send": true,
    "userId": "Doc Detective"
  }
}
```
