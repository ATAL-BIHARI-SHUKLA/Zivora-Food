// src/data/sampleMenuData.js
import img1 from "../assets/stdf.jpg";
import id2 from "../assets/id2.jpeg";
import id3 from "../assets/id3.jpeg";
import id4 from "../assets/id4.jpeg";
import id5 from "../assets/id5.jpeg";
import id6 from "../assets/id6.jpeg";
import id7 from "../assets/id7.jpeg";
import id8 from "../assets/id8.jpeg";
import id9 from "../assets/id9.jpg";

export const menuCategories = [
  { id: "all", name: "All Menu" },
  { id: "starters", name: "Starters" },
  { id: "mains", name: "Main Courses" },
  { id: "desserts", name: "Desserts" },
  { id: "drinks", name: "Drinks" },
];

export const menuSections = [
  { id: "food", name: "Food Menu" },
  { id: "drinks", name: "Drinks Menu" },
  { id: "specials", name: "Chef's Specials" },
  { id: "seasonal", name: "Seasonal Offers" },
];

export const menuItems = {
  starters: [
    {
      id: 1,
      name: "Truffle Arancini",
      description: "Crispy risotto balls with black truffle and mozzarella",
      price: 12.5,
      isPopular: true,
      isVegetarian: true,
      image: img1,
    },
    {
      id: 2,
      name: "Tuna Tartare",
      description: "Fresh tuna with avocado, sesame and soy dressing",
      price: 16.0,
      isNew: true,
      image: id2,
    },
  ],
  mains: [
    {
      id: 3,
      name: "Filet Mignon",
      description: "8oz grass-fed beef with truffle mashed potatoes",
      price: 34.0,
      isChefSpecial: true,
      image: id3,
    },
    {
      id: 4,
      name: "Mushroom Risotto",
      description: "Creamy arborio rice with wild mushrooms and parmesan",
      price: 22.0,
      isVegetarian: true,
      image: id4,
    },
  ],
  desserts: [
    {
      id: 5,
      name: "Chocolate Soufflé",
      description: "Warm chocolate soufflé with vanilla bean ice cream",
      price: 10.5,
      image: id5,
    },
    {
      id: 6,
      name: "Crème Brûlée",
      description: "Classic vanilla custard with caramelized sugar top",
      price: 9.5,
      isVegetarian: true,
      image: id6,
    },
  ],
  drinks: [
    {
      id: 7,
      name: "Signature Cocktails",
      description: "Ask your server about today's special creations",
      price: 14.0,
      image: id7,
    },
    {
      id: 8,
      name: "Wine Selection",
      description: "Extensive list of international wines available",
      price: "Bottle from $35",
      image: id8,
    },
    {
      id: 9,
      name: "Fresh Juices",
      description: "Freshly squeezed juices made to order",
      price: 6.5,
      isVegetarian: true,
      image: id9,
    },
  ],
};
export const categories = ["starters", "mains", "desserts", "drinks"];
