export interface Variant {
  id: string;
  label: string | null;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  subcategoryId: string;
  description: string | null;
  isBestseller: boolean | null;
  available: boolean;
  onHold: boolean;
  variants: Variant[];
  image: string | null;
}

export const bakeryData = {
  categories: [
    { id: "cakes", name: "Cakes", description: null },
    { id: "cupcakes", name: "Cupcakes", description: null },
    { id: "pizza_pasta", name: "Pizza & Pasta", description: null },
    { id: "main_course", name: "Main Course", description: null },
    { id: "noodles", name: "Noodles", description: null },
    { id: "maggi", name: "Maggi", description: null },
    { id: "snacks", name: "Snacks & Burgers", description: null },
    { id: "combos", name: "Combos", description: null }
  ],
  products: [
    {
      id: "prod_001",
      name: "Black Forest Cake",
      categoryId: "cakes",
      subcategoryId: "classic_cakes",
      description: null,
      isBestseller: null,
      available: true,
      onHold: false,
      variants: [
        { id: "prod_001_500g", label: "500g", price: 799 },
        { id: "prod_001_1kg", label: "1kg", price: 1599 }
      ],
      image: null
    },
    {
      id: "prod_002",
      name: "Pineapple Cake",
      categoryId: "cakes",
      subcategoryId: "classic_cakes",
      description: null,
      isBestseller: null,
      available: true,
      onHold: false,
      variants: [
        { id: "prod_002_500g", label: "500g", price: 799 },
        { id: "prod_002_1kg", label: "1kg", price: 1599 }
      ],
      image: null
    },
    {
      id: "prod_034",
      name: "Margherita Pizza",
      categoryId: "pizza_pasta",
      subcategoryId: "pizza",
      description: null,
      isBestseller: null,
      available: true,
      onHold: false,
      variants: [{ id: "prod_034_single", label: null, price: 299 }],
      image: null
    },
    {
      id: "prod_061",
      name: "Paneer Roll",
      categoryId: "snacks",
      subcategoryId: "snacks",
      description: null,
      isBestseller: null,
      available: true,
      onHold: false,
      variants: [{ id: "prod_061_single", label: null, price: 149 }],
      image: null
    }
  ] as Product[]
};
