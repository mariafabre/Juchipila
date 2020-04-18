import { LiquidUnitEnum, SolidUnitEnum } from "../views/utils/ConversionUtils";

export interface BaseObject {
    id: string;
    name: string;
}

export interface Cookbook extends BaseObject {
    recipes: Recipe[];
    code: string;
    date: string;
    license?: string;
    image?: string;
}

export interface Recipe extends BaseObject {
    versions: Version[];
}

export interface Version extends BaseObject {
    authors: string[];
    ingredients: Ingredient[];
    instructions: string;
    tags: string[];
    notes: string;
    locked: boolean;
    date: string;
    drinkIds?: string[];
    relatedRecipeIds?: string[];
}

export interface Ingredient extends BaseObject {
    quantity: number;
    unit: LiquidUnitEnum | SolidUnitEnum;
    recipeIds: string[];
}

export interface User {
    cookbooksIds: string[];
    userAuth: firebase.auth.UserCredential;
}