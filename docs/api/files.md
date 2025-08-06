---
sidebar_position: 5
---

# File Management

The file management API allows you to upload, organize, and download files used in your Doc Detective tests. This includes test specifications, screenshots, recordings, and other assets.

## File Object

A file object contains the following properties:

```json
{
  "id": "file_123456789",
  "account_id": "account_123456789",
  "name": "homepage-screenshot.png",
  "path": "/screenshots/homepage-screenshot.png",
  "type": "image/png",
  "size": 245760,
  "category": "screenshot",
  "run_id": "run_987654321",
  "url": "https://files.doc-detective.com/file_123456789",
  "created_at": "2025-08-06T10:30:00Z",
  "expires_at": "2025-11-06T10:30:00Z"
}
```

### Properties

- `id` (string): Unique identifier for the file
- `account_id` (string): ID of the account that owns this file
- `name` (string): Original filename
- `path` (string): File path within your account's storage
- `type` (string): MIME type of the file
- `size` (integer): File size in bytes
- `category` (string): File category (`test_spec`, `screenshot`, `recording`, `asset`, `result`)
- `run_id` (string, nullable): ID of the test run that generated this file
- `url` (string): Temporary download URL
- `created_at` (string): ISO 8601 timestamp of file upload
- `expires_at` (string, nullable): ISO 8601 timestamp when the file expires

## Upload File

Upload a file to your account storage.

```http
POST /files
```

### Request

Use `multipart/form-data` encoding:

```http
Content-Type: multipart/form-data

--boundary
Content-Disposition: form-data; name="file"; filename="test-spec.json"
Content-Type: application/json

{
  "tests": [
    {
      "description": "Homepage test",
      "steps": [
        {
          "action": "goTo",
          "url": "https://example.com"
        }
      ]
    }
  ]
}
--boundary
Content-Disposition: form-data; name="path"

/test-specs/homepage-test.json
--boundary
Content-Disposition: form-data; name="category"

test_spec
--boundary--
```

### Form Fields

- `file` (file): The file to upload
- `path` (string, optional): Custom path for the file (defaults to root with original filename)
- `category` (string, optional): File category for organization
- `expires_at` (string, optional): ISO 8601 timestamp when the file should expire

### Response

```json
{
  "success": true,
  "data": {
    "id": "file_123456789",
    "account_id": "account_123456789",
    "name": "test-spec.json",
    "path": "/test-specs/homepage-test.json",
    "type": "application/json",
    "size": 1024,
    "category": "test_spec",
    "run_id": null,
    "url": "https://files.doc-detective.com/file_123456789",
    "created_at": "2025-08-06T10:30:00Z",
    "expires_at": null
  }
}
```

## Get File

Retrieve information about a specific file.

```http
GET /files/{file_id}
```

### Parameters

- `file_id` (string): The file ID

### Response

```json
{
  "success": true,
  "data": {
    "id": "file_123456789",
    "account_id": "account_123456789",
    "name": "homepage-screenshot.png",
    "path": "/screenshots/homepage-screenshot.png",
    "type": "image/png",
    "size": 245760,
    "category": "screenshot",
    "run_id": "run_987654321",
    "url": "https://files.doc-detective.com/file_123456789",
    "created_at": "2025-08-06T10:30:00Z",
    "expires_at": "2025-11-06T10:30:00Z"
  }
}
```

## Download File

Download a file's content.

```http
GET /files/{file_id}/download
```

### Parameters

- `file_id` (string): The file ID

### Response

Returns the file content with appropriate headers:

```http
HTTP/1.1 200 OK
Content-Type: image/png
Content-Length: 245760
Content-Disposition: attachment; filename="homepage-screenshot.png"

[Binary file content]
```

## List Files

List files in your account.

```http
GET /files
```

### Query Parameters

- `limit` (integer, optional): Number of files to return (default: 50, max: 100)
- `offset` (integer, optional): Number of files to skip (default: 0)
- `category` (string, optional): Filter by file category
- `run_id` (string, optional): Filter by test run ID
- `path` (string, optional): Filter by path prefix
- `type` (string, optional): Filter by MIME type

### Response

```json
{
  "success": true,
  "data": {
    "files": [
      {
        "id": "file_123456789",
        "account_id": "account_123456789",
        "name": "homepage-screenshot.png",
        "path": "/screenshots/homepage-screenshot.png",
        "type": "image/png",
        "size": 245760,
        "category": "screenshot",
        "run_id": "run_987654321",
        "url": "https://files.doc-detective.com/file_123456789",
        "created_at": "2025-08-06T10:30:00Z",
        "expires_at": "2025-11-06T10:30:00Z"
      }
    ],
    "total": 1,
    "limit": 50,
    "offset": 0
  }
}
```

## Update File

Update file metadata.

```http
PUT /files/{file_id}
```

### Parameters

- `file_id` (string): The file ID

### Request Body

```json
{
  "name": "updated-screenshot.png",
  "path": "/screenshots/updated-screenshot.png",
  "category": "screenshot",
  "expires_at": "2025-12-06T10:30:00Z"
}
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "file_123456789",
    "account_id": "account_123456789",
    "name": "updated-screenshot.png",
    "path": "/screenshots/updated-screenshot.png",
    "type": "image/png",
    "size": 245760,
    "category": "screenshot",
    "run_id": "run_987654321",
    "url": "https://files.doc-detective.com/file_123456789",
    "created_at": "2025-08-06T10:30:00Z",
    "expires_at": "2025-12-06T10:30:00Z"
  }
}
```

## Delete File

Delete a file from your account storage.

```http
DELETE /files/{file_id}
```

### Parameters

- `file_id` (string): The file ID

### Response

```json
{
  "success": true,
  "data": {
    "message": "File deleted successfully"
  }
}
```

## File Categories

Files are organized into categories for better management:

### test_spec
Test specification files (JSON, YAML)
- Used to define tests for execution
- Can be referenced in test runs

### screenshot
Screenshot images generated by tests
- PNG format images
- Automatically generated by screenshot actions
- Linked to specific test runs

### recording
Video recordings of test execution
- MP4, WebM, or GIF format
- Generated by record/stopRecord actions
- Useful for debugging and documentation

### asset
Static assets used in tests
- Images, documents, or other files
- Referenced in test specifications
- Manually uploaded by users

### result
Test result files and reports
- JSON result files
- Generated automatically after test runs
- Contains detailed execution information

## File Storage

### Storage Limits
- **Free accounts**: 1 GB total storage
- **Pro accounts**: 10 GB total storage  
- **Enterprise accounts**: 100 GB total storage

### File Retention
- Files without expiration dates are kept indefinitely (within storage limits)
- Files with expiration dates are automatically deleted after expiry
- Test-generated files (screenshots, recordings) expire after 90 days by default

### Supported File Types

#### Test Specifications
- `.json` - JSON test specifications
- `.yaml`, `.yml` - YAML test specifications

#### Images
- `.png` - PNG images (screenshots)
- `.jpg`, `.jpeg` - JPEG images
- `.gif` - GIF images (recordings)

#### Videos
- `.mp4` - MP4 videos (recordings)
- `.webm` - WebM videos (recordings)

#### Documents
- `.pdf` - PDF documents
- `.txt` - Text files
- `.md` - Markdown files

## File URLs

File URLs are temporary and expire after 24 hours for security. To access a file:

1. Get the file information to retrieve the current URL
2. Use the URL immediately for downloads
3. Request a new URL if the previous one has expired

## Error Responses

### 400 Bad Request

```json
{
  "success": false,
  "error": {
    "code": "INVALID_FILE_TYPE",
    "message": "File type not supported"
  }
}
```

### 404 Not Found

```json
{
  "success": false,
  "error": {
    "code": "FILE_NOT_FOUND",
    "message": "File not found"
  }
}
```

### 413 Payload Too Large

```json
{
  "success": false,
  "error": {
    "code": "FILE_TOO_LARGE",
    "message": "File size exceeds maximum limit"
  }
}
```

### 507 Insufficient Storage

```json
{
  "success": false,
  "error": {
    "code": "STORAGE_QUOTA_EXCEEDED",
    "message": "Account storage quota exceeded"
  }
}
```