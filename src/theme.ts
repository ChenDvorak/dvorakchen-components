export class ColorStrategy {
  constructor(
    public color: string,
    public text: string,
    public border?: string,
    public hover?: string,
    public hoverRing?: string,
    public focusRing?: string
  ) {
    this.toString = this.toString.bind(this);
  }

  toString() {
    return Object.values(this)
      .filter((v) => v && typeof v !== "function")
      .join(" ");
  }
}

const theme: Themestrategy = {
  primary: new ColorStrategy(
    "bg-purple-500",
    "text-white",
    undefined,
    "hover:bg-purple-400",
    "hover:ring-purple-400",
    "focus:ring-purple-500"
  ),
  secondary: new ColorStrategy(
    "bg-green-500",
    "text-white",
    undefined,
    "hover:bg-green-400",
    "hover:ring-green-400",
    "focus:ring-green-500"
  ),
  general: new ColorStrategy(
    "bg-white",
    "text-purple-500",
    "border-purple-500",
    undefined,
    undefined,
    "focus:ring-purple-400"
  ),
};

type Themestrategy = {
  primary: ColorStrategy;
  secondary: ColorStrategy;
  general: ColorStrategy;
};

export type ThemeAttributes = {
  primary?: boolean;
  secondary?: boolean;
  general?: boolean;
};

export function selectThemeColor(
  themeAttribute: ThemeAttributes
): ColorStrategy {
  if (themeAttribute.primary) {
    return getThemeColor("primary");
  }
  if (themeAttribute.secondary) {
    return getThemeColor("secondary");
  }
  return getThemeColor("general");
}

export function getThemeColor(themeAttributeKey: keyof ThemeAttributes) {
  return theme[themeAttributeKey];
}
