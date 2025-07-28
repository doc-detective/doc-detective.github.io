---
sidebar_label: Set up your test environment
description: Set up an environment for Doc Detective tests.
---

# Set up your test environment

You can use Doc Detective directly against your production site. For testing, it's often useful to set up a local HTML server to run your tests. There are many server options. Live Server is a free utility that creates a local server that monitors your files for changes and updates the browser window automatically.

1. Download [TestExamples.zip](./TestExamples.zip) and expand the file to your local disk.

2. Install Live Server. You can find the Live Server installer [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

3. Navigate to the TestExamples folder and enter the command: `live-server`. 

4. Open a browser window to  `http://localhost:8080`.

Running your files against a local server allows you to make edits and see them in real time. You will need to be able to serve up the files in a browser window in order to experiment with video recording and other features.

