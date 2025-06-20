---
title: Introduction
sidebar_label: Introduction
---

# Doc Detective

Validate your content with Doc Detective:

```bash
npx doc-detective
```

Want to use the Docker image? [Check it out](https://github.com/doc-detective/docker-image).

See the [Installation](/docs/get-started/installation.md) guide to get started. Come chat on [Discord](https://discord.gg/uAfSjVH7yr)!

## What is Doc Detective?

Doc Detective is a doc content testing framework that simplifies the process of keeping your docs accurate and up-to-date. You write tests, and Doc Detective runs them directly against your product to ensure your docs match your user experience. Whether it’s a UI-based process or a series of API calls, Doc Detective can help you find doc bugs before your users do.

Doc Detective ingests test specifications and text files, parses them for testable actions, then executes those actions in a browser. The results (PASS/FAIL and context) are output as a JSON object so that other pieces of infrastructure can parse and manipulate them as needed.

## What can Doc Detective do?

Doc Detective can do a lot, especially with a bit of creativity.

### Test documentation for accuracy/freshness

Doc Detective’s core strength is the ability to systematically check each and every element of your documentation for adherence to the reality of your product. Each of the following items can be inspected:

- Existence of page elements
- Written text (such as a heading or a button string)
- Screenshots
- Links
- API endpoints, functionality, and responses
- Anything you can write a script to verify

### Generate screenshots or video to accompany documentation

When Doc Detective runs tests, it can take screenshots and make recordings. You can include this media in the documentation to complement written processes, aiding the readers who prefer visual media while making sure your videos and images are up-to-date.

## What can't Doc Detective do?

It’s important to know your limits, and Doc Detective’s too.

### Write your documentation

Doc Detective doesn’t scan your code or generate documentation. It verifies the accuracy of documentation by running tests against your product.

### Write your code

While Doc Detective can write tests from scanning your documentation, it can’t write code for you. Sorry.

## Who is Doc Detective for?

As an open-source and accessible project, Doc Detective is for anyone who is interested! More specifically, here are some groups who could benefit:

- **Small teams:** There’s often limited personnel or budget dedicated to a project, and documentation takes a backseat as a result. With Doc Detective, you can spend less time reviewing published documentation and trust that it is still functional and accurate for the end user.
- **Large teams:** The more people you have contributing to a project, the faster it can change shape. In cases where development is outpacing documentation, Doc Detective keeps a watchful eye on the changes made and note any inconsistencies.
- **Anything in between:** You can be a team of one or of one thousand and still find a use for Doc Detective. When it comes time to address the documentation of your project, look to Doc Detective to ease the burden and help bring consistency and accuracy to the end user.

## Next steps

Want to take Doc Detective for a spin? [Get started](/docs/get-started/installation.md).
