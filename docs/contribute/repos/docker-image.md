---
sidebar_position: 6
---
# `docker-image` (alpha)

> This repo is in alpha. It's not ready for production use.

[`docker-image`](https://github.com/doc-detective/docker-image) runs Doc Detective in a container. While Doc Detective can run on most machines as-is, this Docker image simplifies installation and running Doc Detective on machines without Node.js or with heightened security requirements.

This repo depends on [`doc-detective`](doc-detective) for performing the tests.

## Usage Guidelines

To use the Doc Detective Docker image, follow these steps:

1. Pull the image from Docker Hub:
   ```
   docker pull docdetective/docdetective
   ```

2. Run Doc Detective tests in the current directory:
   ```
   docker run --rm -v .:/app docdetective/docdetective
   ```

   This command:
   - Mounts your current directory to `/app` in the container
   - Runs Doc Detective on any test files in that directory
   - Automatically cleans up the container after execution (`--rm`)

3. To run tests from a specific file:
   ```
   docker run --rm -v .:/app docdetective/docdetective --input my-tests.spec.json
   ```

4. If you have a custom `.doc-detective.json` config file:
   ```
   docker run --rm -v .:/app docdetective/docdetective --config .doc-detective.json
   ```

5. To pass environment variables to your tests:
   ```
   docker run --rm -v .:/app -e API_KEY=your_key docdetective/docdetective
   ```

6. You can pass any Doc Detective arguments to the container:
   ```
   docker run --rm -v .:/app docdetective/docdetective --input tests.spec.json --output results.json
   ```

Note: This image runs Doc Detective in a headless mode and isn't compatible with the `record` step. If you need to record test runs, use the [Doc Detective CLI](https://github.com/doc-detective/doc-detective) directly in your local environment.

For more detailed information on using the Docker image, refer to the [Docker image README](https://github.com/doc-detective/docker-image/blob/main/README.md).
