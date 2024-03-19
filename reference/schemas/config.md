---
title: config
layout: default
nav_order: 1
parent: Reference
---

<details open markdown="block">
<summary>
Table of contents
</summary>
{: .text-delta }
- TOC
{:toc}
</details>

# config
{: .no_toc}

## Description

Configuration options for Doc Detective operations.

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
input | One of<br>-&nbsp;string<br>-&nbsp;array of strings |  Optional. Path(s) to test specifications and documentation source files. May be paths to specific files or to directories to scan for files. | `.`
output | string |  Optional. Path of the directory in which to store the output of Doc Detective commands. | `.`
recursive | boolean |  Optional. If `true` searches `input`, `setup`, and `cleanup` paths recursively for test specificaions and source files. | `true`
envVariables | string |  Optional. Path to a `.env` file to load before performing a Doc Detective operation. | 
runTests | object |  Optional. Options for running tests. When running tests, values set here override general configuration options. | 
runTests.input | One of<br>-&nbsp;string<br>-&nbsp;array of strings |  Optional. Path(s) to test specifications and documentation source files. May be paths to specific files or to directories to scan for files. | 
runTests.output | string |  Optional. Path of the directory in which to store the output of Doc Detective commands. | `.`
runTests.setup | One of<br>-&nbsp;string<br>-&nbsp;array of strings |  Optional. Path(s) to test specifications to perform before those specified by `input`. Useful for setting up testing environments. | 
runTests.cleanup | One of<br>-&nbsp;string<br>-&nbsp;array of strings |  Optional. Path(s) to test specifications to perform after those specified by `input`. Useful for cleaning up testing environments. | 
runTests.recursive | boolean |  Optional. If `true` searches `input`, `setup`, and `cleanup` paths recursively for test specificaions and source files. | 
runTests.detectSteps | boolean |  Optional. Whether or not to detect steps in input files based on markup regex. | `false`
runTests.mediaDirectory | string |  Optional. Path of the directory in which to store output media files. | `.`
runTests.downloadDirectory | string |  Optional. Path of the directory in which to store downloaded files. | `.`
runTests.contexts | array of object([context](/reference/schemas/context)) |  Optional. Application/platform sets to run tests in. If no contexts are specified but a context is required by one or more tests, Doc Detective attempts to identify a supported context in the current environment and run tests against it. See [context](/reference/schemas/context). | `[{"app":{"name":"firefox","options":{"width":1200,"height":800,"headless":true}},"platforms":["linux","mac","windows"]}]`
runCoverage | object |  Optional. Options for performing test coverage analysis on documentation source files.  When performing coveration analysis, values set here override general configuration options. | 
runCoverage.input | One of<br>-&nbsp;string<br>-&nbsp;array of strings |  Optional. Path(s) to test specifications and documentation source files. May be paths to specific files or to directories to scan for files. | 
runCoverage.output | string |  Optional. Path of the directory in which to store the output of Doc Detective commands. | `.`
runCoverage.recursive | boolean |  Optional. If `true` searches `input`, `setup`, and `cleanup` paths recursively for test specificaions and source files. | 
runCoverage.markup | array of strings |  Optional. Markup types to include when performing this operation. If no markup types are specified, the operation includes all markup types as defined in `fileTypes`. | `["onscreenText","emphasis","image","hyperlink","codeInline","codeBlock","interaction"]`
suggestTests | object |  Optional. Options for suggesting tests based on documentation source files.  When suggesting tests, values set here override general condiguration options. | 
suggestTests.input | One of<br>-&nbsp;string<br>-&nbsp;array of strings |  Optional. Path(s) to test specifications and documentation source files. May be paths to specific files or to directories to scan for files. | 
suggestTests.output | string |  Optional. Path of the directory in which to store the output of Doc Detective commands. | `.`
suggestTests.recursive | boolean |  Optional. If `true` searches `input`, `setup`, and `cleanup` paths recursively for test specificaions and source files. | 
suggestTests.markup | array of strings |  Optional. Markup types to include when performing this operation. If no markup types are specified, the operation includes all markup types as defined in `fileTypes`. | `["onscreenText","emphasis","image","hyperlink","codeInline","codeBlock","interaction"]`
fileTypes | array of objects |  Optional. Information on supported file types and how to parse the markup within them. | `[{"name":"Markdown","extensions":[".md",".markdown",".mdx"],"testStartStatementOpen":"[comment]: # (test start","testStartStatementClose":")","testIgnoreStatement":"[comment]: # (test ignore)","testEndStatement":"[comment]: # (test end)","stepStatementOpen":"[comment]: # (step","stepStatementClose":")","markup":[{"name":"onscreenText","regex":["\\*\\*.+?\\*\\*"],"actions":["find"]},{"name":"emphasis","regex":["(?<!\\*)\\*(?!\\*).+?(?<!\\*)\\*(?!\\*)"],"actions":["find"]},{"name":"image","regex":["!\\[.+?\\]\\(.+?\\)"],"actions":["checkLink"]},{"name":"hyperlink","regex":["(?<!!)\\[.+?\\]\\(.+?\\)"],"actions":["checkLink","goTo","httpRequest"]},{"name":"orderedList","regex":["(?<=\n) *?[0-9][0-9]?[0-9]?.\\s*.*"]},{"name":"unorderedList","regex":["(?<=\n) *?\\*.\\s*.*","(?<=\n) *?-.\\s*.*"]},{"name":"codeInline","regex":["(?<!`)`(?!`).+?(?<!`)`(?!`)"],"actions":["runShell","setVariables","httpRequest"]},{"name":"codeBlock","regex":["(?=(```))(\\w|\\W)*(?<=```)"],"actions":["runShell","setVariables","httpRequest"]},{"name":"interaction","regex":["[cC]lick","[tT]ap","[tT]ouch","[sS]elect","[cC]hoose","[tT]oggle","[eE]nable","[dD]isable","[tT]urn [oO][ff|n]","[tT]ype","[eE]nter","[sS]end","[aA]dd","[rR]emove","[dD]elete","[uU]pload","[dD]ownload","[sS]croll","[sS]earch","[fF]ilter","[sS]ort","[cC]opy","[pP]aste","[cC]ut","[rR]eplace","[cC]lear","[rR]efresh","[rR]evert","[rR]estore","[rR]eset","[lL]ogin","[lL]ogout","[sS]ign [iI]n","[sS]ign [oO]ut","[sS]ubmit","[cC]ancel","[cC]lose","[aA]ccept","[dD]ecline","[dD]eny","[rR]eject","[rR]etry","[rR]estart","[rR]esume"],"actions":["checkLink","find","goTo","httpRequest","runShell","saveScreenshot","setVariables","typeKeys","wait"]}]},{"name":"AsciiDoc","extensions":[".adoc",".asciidoc, .asc"],"testStartStatementOpen":"// (test start","testStartStatementClose":")","testIgnoreStatement":"// (test ignore)","testEndStatement":"// (test end)","stepStatementOpen":"// (step","stepStatementClose":")","markup":[]},{"name":"HTML/XML","extensions":[".html",".htm",".xml",".xhtml"],"testStartStatementOpen":"<!-- test start","testStartStatementClose":"-->","testIgnoreStatement":"<!-- test ignore -->","testEndStatement":"<!-- test end -->","stepStatementOpen":"<!-- step","stepStatementClose":"-->","markup":[]}]`
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
fileTypes.markup.actions | array of <br>- strings<br>- objects |  Optional. Actions that apply to the markup type. | 
fileTypes.markup.actions.name | string |  Required. Name of the action.<br><br>Accepted values: `checkLink`, `find`, `goTo`, `httpRequest`, `runShell`, `saveScreenshot`, `setVariables`, `typeKeys`, `wait` | 
fileTypes.markup.actions.params | object |  Optional. Parameters for the action. | 
integrations | object |  Optional. Options for connecting to external services. | 
telemetry | object |  Optional. Options around sending telemetry for Doc Detective usage. | 
telemetry.send | boolean |  Required. If `true`, sends Doc Detective telemetry. | `false`
telemetry.userId | string |  Optional. Identifier for the organization, group, or individual running Doc Detective. | 
logLevel | string |  Optional. Amount of detail to output when performing an operation.<br><br>Accepted values: `silent`, `error`, `warning`, `info`, `debug` | `info`

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
  "suggestTests": {
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
            {
              "name": "find",
              "params": {
                "moveTo": true,
                "click": true
              }
            }
          ]
        },
        {
          "name": "emphasis",
          "regex": [
            "(?<!\\*)\\*(?!\\*).+?(?<!\\*)\\*(?!\\*)"
          ],
          "actions": [
            "find"
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
            "checkLink",
            "goTo",
            "httpRequest"
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
          ],
          "actions": [
            "runShell",
            "setVariables",
            "httpRequest"
          ]
        },
        {
          "name": "codeBlock",
          "regex": [
            "(?=(```))(\\w|\\W)*(?<=```)"
          ],
          "actions": [
            "runShell",
            "setVariables",
            "httpRequest"
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
          ],
          "actions": [
            "checkLink",
            "find",
            "goTo",
            "httpRequest",
            "runShell",
            "saveScreenshot",
            "setVariables",
            "typeKeys",
            "wait"
          ]
        }
      ]
    }
  ],
  "integrations": {},
  "telemetry": {
    "send": false,
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
  "suggestTests": {
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
          ],
          "actions": [
            "find"
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
            "checkLink",
            "goTo",
            "httpRequest"
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
          ],
          "actions": [
            "runShell",
            "setVariables",
            "httpRequest"
          ]
        },
        {
          "name": "codeBlock",
          "regex": [
            "(?=(```))(\\w|\\W)*(?<=```)"
          ],
          "actions": [
            "runShell",
            "setVariables",
            "httpRequest"
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
          ],
          "actions": [
            "checkLink",
            "find",
            "goTo",
            "httpRequest",
            "runShell",
            "saveScreenshot",
            "setVariables",
            "typeKeys",
            "wait"
          ]
        }
      ]
    }
  ],
  "integrations": {},
  "telemetry": {
    "send": false,
    "userId": "Doc Detective"
  }
}
```
