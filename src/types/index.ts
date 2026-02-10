export type PhaseNumber = 1 | 2 | 3;

export type Category = '主食' | '湯品' | '沙拉' | '點心' | '飲品' | '配菜';

export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

export interface Recipe {
  slug: string;
  title: string;
  description: string;
  phase: PhaseNumber[];
  category: Category;
  prepTime: number;
  cookTime: number;
  servings: number;
  ingredients: Ingredient[];
  steps: string[];
  tips?: string;
  image?: string;
  tags: string[];
}

export interface PhaseInfo {
  phase: PhaseNumber;
  title: string;
  duration: string;
  description: string;
  allowed: string[];
  avoided: string[];
  color: string;
}

// AI Recipe Assistant types
export type AIProvider = 'claude' | 'gemini';

export interface AIRecipeRequest {
  ingredients: string[];
  phase: PhaseNumber;
  provider: AIProvider;
  preferences?: string;
}

export interface AIGeneratedRecipe {
  title: string;
  description: string;
  phase: PhaseNumber[];
  category: Category;
  prepTime: number;
  cookTime: number;
  servings: number;
  ingredients: Ingredient[];
  steps: string[];
  tips?: string;
  tags: string[];
}

export interface AIRecipeResponse {
  recipe: AIGeneratedRecipe;
  provider: AIProvider;
  disclaimer: string;
}
