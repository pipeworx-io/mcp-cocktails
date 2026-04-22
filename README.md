# mcp-cocktails

Cocktails MCP — TheCocktailDB API (free, no auth)

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 250+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `search_cocktails` | Search for cocktails by name. Returns matching recipes with ingredients, measurements, instructions, and drink category. |
| `get_cocktail` | Get full cocktail recipe by ID. Returns ingredients with exact measurements, preparation steps, glassware type, and garnish. |
| `random_cocktail` | Get a random cocktail recipe. Returns ingredients with measurements, instructions, glassware, and garnish details. |
| `cocktails_by_ingredient` | Find all cocktails containing a specific ingredient (e.g., "vodka", "lime juice", "gin"). Returns matching recipes with full ingredient lists. |

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

Or connect to the full Pipeworx gateway for access to all 250+ data sources:

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

- [All tools and guides](https://github.com/pipeworx-io/examples)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
