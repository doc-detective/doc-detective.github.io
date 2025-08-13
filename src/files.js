const fs = require("fs");
const YAML = require("yaml");
const axios = require("axios");
const { URL } = require("url");

/**
 * Reads and parses content from a remote URL or local file path, supporting JSON and YAML formats.
 *
 * Attempts to parse the file content as JSON first, then YAML. If both parsing attempts fail, returns the raw content as a string. Returns `null` if the file cannot be read.
 *
 * @param {Object} options
 * @param {string} options.fileURLOrPath - The URL or local file path to read.
 * @returns {Promise<Object|string|null>} Parsed object for JSON or YAML files, raw string for other formats, or `null` if reading fails.
 *
 * @throws {Error} If {@link fileURLOrPath} is missing, not a string, or is an empty string.
 */
async function readFile({ fileURLOrPath }) {
  if (!fileURLOrPath) {
    throw new Error("fileURLOrPath is required");
  }
  if (typeof fileURLOrPath !== "string") {
    throw new Error("fileURLOrPath must be a string");
  }
  if (fileURLOrPath.trim() === "") {
    throw new Error("fileURLOrPath cannot be an empty string");
  }

  let content;
  let isRemote = false;

  try {
    const parsedURL = new URL(fileURLOrPath);
    isRemote =
      parsedURL.protocol === "http:" || parsedURL.protocol === "https:";
  } catch (error) {
    // Not a valid URL, assume local file path
  }

  if (isRemote) {
    try {
      const response = await axios.get(fileURLOrPath);
      content = response.data;
    } catch (error) {
      console.warn(
        `Error reading remote file from ${fileURLOrPath}: ${error.message}`
      );
      return null;
    }
  } else {
    try {
      content = await fs.promises.readFile(fileURLOrPath, "utf8");
    } catch (error) {
      if (error.code === "ENOENT") {
        console.warn(`File not found: ${fileURLOrPath}`);
      } else {
        console.warn(`Error reading file: ${error.message}`);
      }
      return null;
    }
  }

  // Parse based on file extension
  const ext = fileURLOrPath.split('.').pop().toLowerCase();

  if (ext === "json") {
    try {
      return JSON.parse(content);
    } catch (error) {
      console.warn(`Failed to parse JSON: ${error.message}`);
      return content;
    }
  } else if (ext === "yaml" || ext === "yml") {
    try {
      return YAML.parse(content);
    } catch (error) {
      console.warn(`Failed to parse YAML: ${error.message}`);
      return content;
    }
  } else {
    return content;
  }
}

module.exports = { readFile };
