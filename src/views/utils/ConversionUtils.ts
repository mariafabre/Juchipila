export enum LiquidUnitEnum {
    Milliliter = "Milliliters",
    Liter = "Liters",
    Teaspoon = "Teaspoons",
    Tablespoon = "Tablespoons",
    FluidOunce = "Fluid Ounces",
    Cup = "Cups",
    Pint = "Pints",
    Quart = "Quarts",
    Gallon = "Gallons"
}

export enum SolidUnitEnum {
    ICING_SUGAR = "Cups of Unsifted icing sugar",
    WHITE_SUGAR = "Cups of White sugar",
    GRANULATED_SUGAR = "Cups of Granulated sugar",
    BROWN_SUGAR = "Cups of Packed brown sugar",
    BUTTER = "Cups of Butter (2 sticks)",
    RAISINS = "Cups of Raisins",
    GROUND_ALMONDS = "Cups of Ground almonds",
    SYRUP = "Cups of Syrup",
    UNCOOKED_RICE = "Cups of Uncooked rice",
    HEAVY_CREAM = "Cups of Heavy cream",
    ROLLED_OATS = "Cups of Rolled oats",
    EGG = "Cups of Large egg",
    MILK = "Cups of Milk",
    VEGETABLE_OIL = "Cups of Vegetable oil",
    SALT = "Cups of Salt",
    MILLIGRAM = "Milligrams",
    GRAM = "Grams",
    OUNCE = "Ounces",
    POUND = "Pounds"
}

export enum NonSpecificUnitsEnum {
    PINCH = "Pinches",
    TOTASTE = "To taste"
}

export class ConversionUtils {
    static liquidConversionMap: Map<LiquidUnitEnum, number> = new Map([[LiquidUnitEnum.Milliliter, .202884], 
        [LiquidUnitEnum.Liter, 202.884], 
        [LiquidUnitEnum.Teaspoon, 1], 
        [LiquidUnitEnum.Tablespoon, 3],
        [LiquidUnitEnum.FluidOunce, 6], 
        [LiquidUnitEnum.Cup, 48], 
        [LiquidUnitEnum.Pint, 96], 
        [LiquidUnitEnum.Quart, 192], 
        [LiquidUnitEnum.Gallon, 768]]);

    static solidConversionMap: Map<SolidUnitEnum, number> = new Map([[SolidUnitEnum.ICING_SUGAR, 125],
        [SolidUnitEnum.WHITE_SUGAR, 1/225],
        [SolidUnitEnum.GRANULATED_SUGAR, 1/200],
        [SolidUnitEnum.BROWN_SUGAR, 1/220],
        [SolidUnitEnum.BUTTER, 1/225],
        [SolidUnitEnum.RAISINS, 1/200],
        [SolidUnitEnum.GROUND_ALMONDS, 1/110],
        [SolidUnitEnum.SYRUP, 1/350],
        [SolidUnitEnum.UNCOOKED_RICE, 1/200],
        [SolidUnitEnum.HEAVY_CREAM, 1/235],
        [SolidUnitEnum.ROLLED_OATS, 1/85],
        [SolidUnitEnum.EGG, 1/48],
        [SolidUnitEnum.MILK, 1/225],
        [SolidUnitEnum.VEGETABLE_OIL, 1/220],
        [SolidUnitEnum.SALT, 1/273],
        [SolidUnitEnum.MILLIGRAM, .001],
        [SolidUnitEnum.OUNCE, .035274],
        [SolidUnitEnum.POUND, .00220462],
        [SolidUnitEnum.GRAM, 1]
    ]);

    public static liquidConvertFromTo(amountFrom: number, from: LiquidUnitEnum, to: LiquidUnitEnum): number|undefined {
        let fromConv = this.liquidConversionMap.get(from);
        let toConv = this.liquidConversionMap.get(to);
        if (fromConv && toConv)
        {
            return amountFrom * fromConv / toConv;
        }       
    }

    public static solidConvertFromTo(amountFrom: number, from: SolidUnitEnum, to: SolidUnitEnum): number|undefined {
        let fromConv = this.solidConversionMap.get(from);
        let toConv = this.solidConversionMap.get(to);
        if (fromConv && toConv)
        {
            return amountFrom * toConv / fromConv;
        }  
    }
}