import { recipes } from '@/data/recipes';
import { Recipe, PhaseNumber, Category } from '@/types';

export function getAllRecipes(): Recipe[] {
  return recipes;
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return recipes.find((r) => r.slug === slug);
}

export function getRecipesByPhase(phase: PhaseNumber): Recipe[] {
  return recipes.filter((r) => r.phase.includes(phase));
}

export function getRecipesByCategory(category: Category): Recipe[] {
  return recipes.filter((r) => r.category === category);
}

export function searchRecipes(query: string): Recipe[] {
  const q = query.toLowerCase();
  return recipes.filter(
    (r) =>
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export function filterRecipes(options: {
  phase?: PhaseNumber;
  category?: Category;
  query?: string;
}): Recipe[] {
  let result = recipes;

  if (options.phase) {
    result = result.filter((r) => r.phase.includes(options.phase!));
  }

  if (options.category) {
    result = result.filter((r) => r.category === options.category);
  }

  if (options.query) {
    const q = options.query.toLowerCase();
    result = result.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  return result;
}

export function getAllSlugs(): string[] {
  return recipes.map((r) => r.slug);
}
