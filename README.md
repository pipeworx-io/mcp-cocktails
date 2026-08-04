# mcp-cocktails

Cocktails MCP — TheCocktailDB API (free, no auth)

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `search_cocktails` | Search TheCocktailDB for cocktail recipes by name. Returns name, category, alcoholic/non-alcoholic classification, glassware, thumbnail, and ingredient list with measurements (no preparation instructions — use get_cocktail for those). |
| `get_cocktail` | Get full cocktail recipe by ID. Returns ingredients with exact measurements, preparation steps, glassware type, and garnish. |
| `random_cocktail` | Get a random cocktail recipe. Returns ingredients with measurements, instructions, glassware, and garnish details. |
| `cocktails_by_ingredient` | List all TheCocktailDB cocktails that contain a specific ingredient (e.g., 'vodka', 'lime juice'). Returns cocktail id, name, and thumbnail only — use get_cocktail to retrieve full recipes. |

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "cocktails": {
      "url": "https://gateway.pipeworx.io/cocktails/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Cocktails data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
