---
name: "LorebookConverter"
description: "Converts JanitorAI Lorebook JSON into Lorebary/SillyTavern World Info JSON. Invoke when the user asks to convert or implement a JanitorAI lorebook converter."
---

# LorebookConverter

Use this skill when the user asks to convert a JanitorAI Lorebook JSON file into a Lorebary/SillyTavern-compatible World Info JSON file, or when they ask you to implement the converter tool for that workflow.

## Goal

Create or run a standalone Python CLI converter that reads JanitorAI Lorebook JSON and writes Lorebary/SillyTavern World Info JSON using the exact mapping rules below.

## Runtime Constraints

- Use only Python standard libraries:
  - `json`
  - `argparse`
  - `os`
- Do not add external dependencies.
- Keep the converter self-contained and easy to run from the command line.

## CLI Contract

Provide command-line arguments for custom input and output paths:

```bash
python lorebook_converter.py --input janitor_lore.json --output lorebary_lore.json
```

Default values:

- Input file: `janitor_lore.json`
- Output file: `lorebary_lore.json`

Use `argparse` for CLI parsing.

## Input Contract

The JanitorAI input file must be a top-level JSON array:

```json
[
  {
    "name": "Example Entry",
    "key": ["example", "keyword"],
    "content": "Entry content",
    "enabled": true,
    "insertion_order": 100
  }
]
```

Reject the input with a clear error if:

- The input file is missing.
- The input JSON is invalid.
- The script cannot read or write files due to permissions.
- The top-level value is not an array.
- Any entry is not an object.
- A required entry field is missing or has the wrong type.

Required JanitorAI fields:

- `name`
- `content`
- `enabled`
- Either `key` as an array, or `keysRaw` as a string

Optional JanitorAI fields:

- `key`
- `keysRaw`
- `insertion_order`

## Output Root

The output file must be a JSON object with this exact fixed root metadata:

```json
{
  "name": "Converted Lorebook",
  "description": "Auto-converted from JanitorAI",
  "scan_depth": 50,
  "token_budget": 2048,
  "recursive_scanning": false,
  "entries": []
}
```

## Entry Mapping Rules

Iterate through every input entry and assign an auto-incrementing `uid`, starting at `1`.

For each entry, create exactly these output fields:

| Output Field | Source / Value |
|---|---|
| `uid` | Auto-incrementing integer: `1`, `2`, `3`, ... |
| `key` | Use input `key` array if present; otherwise split `keysRaw` by commas, trim whitespace from each item, and use the resulting array |
| `keysecondary` | `[]` |
| `comment` | Input `name` |
| `content` | Input `content` |
| `constant` | `false` |
| `selective` | `true` |
| `insertion_order` | Input `insertion_order` if present; otherwise `100` |
| `enabled` | Input `enabled` boolean |
| `position` | `1` |
| `useProbability` | `true` |
| `probability` | `100` |
| `macro` | `false` |
| `matchWholeWords` | `true` |
| `caseSensitive` | `false` |
| `extensions` | `{}` |

Do not add extra fields to converted entries.

## Validation Requirements

After writing the output file:

1. Read the output file back from disk.
2. Parse it as JSON.
3. Validate that:
   - The root object exists.
   - The root contains the required metadata fields.
   - `entries` is an array.
   - The number of converted entries matches the input count.
   - Every entry contains exactly the required output fields.
   - Every entry has the correct field types.
   - `uid` values are sequential from `1` through the number of entries.
4. Only print a success message after validation passes.

If validation fails, print a clear error message and exit without claiming success.

## Error Handling

Handle common failures with user-friendly messages:

- Missing input file:
  - Tell the user the input path was not found.
- Invalid JSON:
  - Tell the user the input file is not valid JSON.
- Permission errors:
  - Tell the user the script could not read or write the file.
- Unexpected structure:
  - Tell the user the input does not match the expected JanitorAI Lorebook array format.
- Output validation failure:
  - Tell the user the generated file failed Lorebary/SillyTavern structure validation.

## Success Output

When conversion and validation succeed, print a concise summary to the console:

```text
Conversion complete.
Converted entries: 12
Output file: /full/path/to/lorebary_lore.json
```

Use the absolute output path in the success message.

## Implementation Notes

- Use `json.load` for reading the input.
- Use `json.dump(..., indent=2)` for writing the output.
- Use `os.path.abspath` when reporting the output path.
- Keep conversion logic deterministic: every run over the same input should produce the same output structure.
- Do not modify lore content, rename entries, infer missing lore, or apply world-specific transformations.
- Preserve the JanitorAI `enabled` boolean exactly as provided.
- Treat `insertion_order` as optional and default it to `100` only when absent.
