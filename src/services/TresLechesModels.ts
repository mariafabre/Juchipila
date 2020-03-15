export interface BaseObject {
    id: string;
    name: string;
}

export interface Cookbook extends BaseObject {
    recipes: Recipe[];
    code: string;
    license?: string;
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
    drinkParings?: DrinkParing[];
}

export interface Ingredient extends BaseObject {
    quantity: number;
    unit: UnitEnum;
}

export interface DrinkParing extends BaseObject {
    href: string;
}

export interface User {
    cookbooksIds: string[];
    userAuth: firebase.auth.UserCredential;
}

export enum UnitEnum {
    PINCH,
    TEASPOON,
    TABLESPOON,
    FLUID_OUNCE,
    CUP,
    PINT,
    QUART,
    GALLON,
    MILLIGRAM,
    MILLILITER,
    LITER,
    GRAM
}