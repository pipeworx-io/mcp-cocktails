/**
 * Cocktails MCP — TheCocktailDB API (free, no auth)
 *
 * Tools:
 * - search_cocktails: search cocktails by name
 * - get_cocktail: full details for a cocktail by ID
 * - random_cocktail: a random cocktail
 * - cocktails_by_ingredient: cocktails that use a specific ingredient
 */

interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

const tools: McpToolExport['tools'] = [
  {
    name: 'search_cocktails',
    description: 'Search for cocktails by name. Returns a list of matching cocktails with key details.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Cocktail name or partial name to search for' },
      },
      required: ['query'],
    },
  },
  {
    name: 'get_cocktail',
    description: 'Get full details for a cocktail by its TheCocktailDB ID, including all ingredients and instructions.',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'TheCocktailDB cocktail ID (e.g., "11007")' },
      },
      required: ['id'],
    },
  },
  {
    name: 'random_cocktail',
    description: 'Get a random cocktail with full details including ingredients and instructions.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'cocktails_by_ingredient',
    description: 'Find cocktails that use a specific ingredient (e.g., "vodka", "lime juice", "gin").',
    inputSchema: {
      type: 'object',
      properties: {
        ingredient: { type: 'string', description: 'Ingredient name to filter by (e.g., "vodka", "gin")' },
      },
      required: ['ingredient'],
    },
  },
];

// Raw cocktail shape returned by TheCocktailDB
interface RawCocktail {
  idDrink: string;
  strDrink: string;
  strCategory: string | null;
  strAlcoholic: string | null;
  strGlass: string | null;
  strInstructions: string | null;
  strDrinkThumb: string | null;
  strIngredient1: string | null;
  strIngredient2: string | null;
  strIngredient3: string | null;
  strIngredient4: string | null;
  strIngredient5: string | null;
  strIngredient6: string | null;
  strIngredient7: string | null;
  strIngredient8: string | null;
  strIngredient9: string | null;
  strIngredient10: string | null;
  strIngredient11: string | null;
  strIngredient12: string | null;
  strIngredient13: string | null;
  strIngredient14: string | null;
  strIngredient15: string | null;
  strMeasure1: string | null;
  strMeasure2: string | null;
  strMeasure3: string | null;
  strMeasure4: string | null;
  strMeasure5: string | null;
  strMeasure6: string | null;
  strMeasure7: string | null;
  strMeasure8: string | null;
  strMeasure9: string | null;
  strMeasure10: string | null;
  strMeasure11: string | null;
  strMeasure12: string | null;
  strMeasure13: string | null;
  strMeasure14: string | null;
  strMeasure15: string | null;
}

function formatIngredients(raw: RawCocktail): { ingredient: string; measure: string }[] {
  const ingredients: { ingredient: string; measure: string }[] = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = raw[`strIngredient${i}` as keyof RawCocktail] as string | null;
    const measure = raw[`strMeasure${i}` as keyof RawCocktail] as string | null;
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure?.trim() ?? '',
      });
    }
  }
  return ingredients;
}

function formatFullCocktail(raw: RawCocktail) {
  return {
    id: raw.idDrink,
    name: raw.strDrink,
    category: raw.strCategory ?? '',
    alcoholic: raw.strAlcoholic ?? '',
    glass: raw.strGlass ?? '',
    instructions: raw.strInstructions ?? '',
    thumbnail: raw.strDrinkThumb ?? '',
    ingredients: formatIngredients(raw),
  };
}

function formatSummaryCocktail(raw: RawCocktail) {
  return {
    id: raw.idDrink,
    name: raw.strDrink,
    category: raw.strCategory ?? '',
    alcoholic: raw.strAlcoholic ?? '',
    glass: raw.strGlass ?? '',
    thumbnail: raw.strDrinkThumb ?? '',
    ingredients: formatIngredients(raw),
  };
}

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'search_cocktails': {
      const query = args.query as string;
      const res = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error(`TheCocktailDB error: ${res.status}`);
      const data = (await res.json()) as { drinks: RawCocktail[] | null };
      if (!data.drinks) return { cocktails: [] };
      return {
        count: data.drinks.length,
        cocktails: data.drinks.map(formatSummaryCocktail),
      };
    }

    case 'get_cocktail': {
      const id = args.id as string;
      const res = await fetch(`${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`);
      if (!res.ok) throw new Error(`TheCocktailDB error: ${res.status}`);
      const data = (await res.json()) as { drinks: RawCocktail[] | null };
      if (!data.drinks || data.drinks.length === 0) {
        throw new Error(`Cocktail not found: ${id}`);
      }
      return formatFullCocktail(data.drinks[0]);
    }

    case 'random_cocktail': {
      const res = await fetch(`${BASE_URL}/random.php`);
      if (!res.ok) throw new Error(`TheCocktailDB error: ${res.status}`);
      const data = (await res.json()) as { drinks: RawCocktail[] | null };
      if (!data.drinks || data.drinks.length === 0) {
        throw new Error('Failed to retrieve a random cocktail');
      }
      return formatFullCocktail(data.drinks[0]);
    }

    case 'cocktails_by_ingredient': {
      const ingredient = args.ingredient as string;
      const res = await fetch(`${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`);
      if (!res.ok) throw new Error(`TheCocktailDB error: ${res.status}`);
      const data = (await res.json()) as {
        drinks: { idDrink: string; strDrink: string; strDrinkThumb: string }[] | null;
      };
      if (!data.drinks) return { ingredient, cocktails: [] };
      return {
        ingredient,
        count: data.drinks.length,
        cocktails: data.drinks.map((d) => ({
          id: d.idDrink,
          name: d.strDrink,
          thumbnail: d.strDrinkThumb,
        })),
      };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

export default { tools, callTool } satisfies McpToolExport;
