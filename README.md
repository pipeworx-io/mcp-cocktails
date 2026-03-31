# @pipeworx/mcp-cocktails

MCP server for cocktail recipes — search drinks, get ingredients and mixing instructions.

## Tools

| Tool | Description |
|------|-------------|
| `search_cocktails` | Search for cocktails by name |
| `get_cocktail` | Get full details for a cocktail by ID |
| `random_cocktail` | Get a random cocktail with full details |
| `cocktails_by_ingredient` | Find cocktails that use a specific ingredient |

## Quick Start

Add to your MCP client config:

```json
{
  "mcpServers": {
    "cocktails": {
      "url": "https://gateway.pipeworx.io/cocktails/mcp"
    }
  }
}
```

Or run via CLI:

```bash
npx pipeworx use cocktails
```

## License

MIT
