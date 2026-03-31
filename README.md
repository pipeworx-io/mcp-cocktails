# mcp-cocktails

Cocktails MCP — TheCocktailDB API (free, no auth)

Part of the [Pipeworx](https://pipeworx.io) open MCP gateway.

## Tools

| Tool | Description |
|------|-------------|
| `search_cocktails` | Search for cocktails by name. Returns a list of matching cocktails with key details. |
| `get_cocktail` | Get full details for a cocktail by its TheCocktailDB ID, including all ingredients and instructions. |
| `random_cocktail` | Get a random cocktail with full details including ingredients and instructions. |
| `cocktails_by_ingredient` | Find cocktails that use a specific ingredient (e.g., "vodka", "lime juice", "gin"). |

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

Or use the CLI:

```bash
npx pipeworx use cocktails
```

## License

MIT
