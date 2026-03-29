export type Category = "Light" | "Heat" | "Motion" | "Sound" | "Forces" | "Electricity";

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  published: boolean;
  createdAt: string;
  updatedAt?: string;
}

export const categories: Category[] = ["Light", "Heat", "Motion", "Sound", "Forces", "Electricity"];

export const categoryColors: Record<Category, string> = {
  Light: "bg-amber/20 text-amber",
  Heat: "bg-terracotta/20 text-terracotta",
  Motion: "bg-sage/20 text-sage",
  Sound: "bg-dusty-rose/20 text-dusty-rose",
  Forces: "bg-charcoal/10 text-charcoal",
  Electricity: "bg-amber/20 text-amber",
};
