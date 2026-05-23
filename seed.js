import mongoose from "mongoose";
import dotenv from "dotenv";
import foodModel from "./models/foodModel.js";

dotenv.config();

const foods = [
  // Salad
  {
    name: "Premium Greek Salad",
    description: "A crisp medley of tomatoes, cucumbers, kalamata olives, red onions, and rich feta cheese tossed in Greek dressing.",
    price: 149,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop",
    category: "Salad"
  },
  {
    name: "Classic Caesar Salad",
    description: "Crisp romaine lettuce and garlicky croutons tossed in a creamy, flavorful Caesar dressing, topped with shaved parmesan.",
    price: 199,
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500&auto=format&fit=crop",
    category: "Salad"
  },
  {
    name: "Quinoa Avocado Power Bowl",
    description: "Nutritious organic quinoa, fresh avocado, cherry tomatoes, and mixed greens served with a zesty lemon-herb vinaigrette.",
    price: 229,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop",
    category: "Salad"
  },
  {
    name: "Mediterranean Chickpea Salad",
    description: "A refreshing blend of protein-packed chickpeas, red onion, bell peppers, fresh parsley, and crumbled feta in lemon-garlic dressing.",
    price: 159,
    image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=500&auto=format&fit=crop",
    category: "Salad"
  },
  {
    name: "Asian Sesame Ginger Salad",
    description: "Sliced grilled chicken breast, shredded green cabbage, carrots, cilantro, and toasted almonds with a sweet sesame ginger vinaigrette.",
    price: 219,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop",
    category: "Salad"
  },

  // Rolls
  {
    name: "Paneer Tikka Roll",
    description: "Soft, marinated paneer cubes grilled to perfection, wrapped in a flaky paratha with crisp onions and green chutney.",
    price: 179,
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500&auto=format&fit=crop",
    category: "Rolls"
  },
  {
    name: "Crispy Veg Spring Rolls",
    description: "Golden-fried, crispy rolls stuffed with seasoned wok-tossed vegetables, served with sweet chili dip.",
    price: 129,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop",
    category: "Rolls"
  },
  {
    name: "Smoked Chicken Shawarma Roll",
    description: "Tender, thinly sliced spiced chicken wrapped in soft pita bread with creamy garlic toum sauce, pickled veggies, and fries.",
    price: 219,
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=500&auto=format&fit=crop",
    category: "Rolls"
  },
  {
    name: "Spicy Paneer Kathi Roll",
    description: "Paneer fingers sauteed with green peppers, sweet onions, and a fiery Schezwan glaze wrapped in a toasted whole wheat paratha.",
    price: 169,
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500&auto=format&fit=crop",
    category: "Rolls"
  },
  {
    name: "Classic Egg & Cheese Roll",
    description: "Double egg fluffy omelet topped with melting cheddar cheese, green chilis, and coriander leaves wrapped in a buttered tandoori roti.",
    price: 139,
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=500&auto=format&fit=crop",
    category: "Rolls"
  },

  // Deserts
  {
    name: "Creamy Caramel Flan",
    description: "A silky smooth custard dessert baked in a decadent caramel glaze, melting effortlessly in your mouth.",
    price: 159,
    image: "https://images.unsplash.com/photo-1528975604071-b4daaf779a43?w=500&auto=format&fit=crop",
    category: "Deserts"
  },
  {
    name: "Mango Panna Cotta",
    description: "An elegant Italian sweet cream dessert gelatin-set and topped with a luscious, vibrant tropical mango coulis.",
    price: 189,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&auto=format&fit=crop",
    category: "Deserts"
  },
  {
    name: "Fudge Brownie Sundae",
    description: "A warm, rich chocolate fudge brownie topped with premium vanilla bean ice cream, hot chocolate sauce, and toasted nuts.",
    price: 169,
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500&auto=format&fit=crop",
    category: "Deserts"
  },
  {
    name: "Warm Apple Pie a la Mode",
    description: "Classic spiced apple pie baked in a golden flaky double crust, served warm with a scoop of Madagascar vanilla bean gelato.",
    price: 199,
    image: "https://images.unsplash.com/photo-1519869325930-281384150729?w=500&auto=format&fit=crop",
    category: "Deserts"
  },
  {
    name: "Double Chocolate Lava Cake",
    description: "Decadent personal-sized dark chocolate cake with a hot, liquid molten chocolate core that flows beautifully when cut.",
    price: 179,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop",
    category: "Deserts"
  },

  // Sandwich
  {
    name: "Classic Triple-Decker Club",
    description: "A grand toasted sandwich layered with sliced turkey, smoked bacon, fresh lettuce, tomatoes, and house herb mayonnaise.",
    price: 139,
    image: "https://images.unsplash.com/photo-1567234669013-216f9fa16d7a?w=500&auto=format&fit=crop",
    category: "Sandwich"
  },
  {
    name: "Artisanal Grilled Cheese & Pesto",
    description: "Melty sourdough loaded with sharp cheddar, mozzarella, and a rich basil walnut pesto, grilled to golden perfection.",
    price: 119,
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&auto=format&fit=crop",
    category: "Sandwich"
  },
  {
    name: "Avocado Smashed Toast Sandwich",
    description: "Creamy whipped avocado, heirloom tomatoes, pickled radishes, and microgreens on toasted multi-grain bread.",
    price: 159,
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=500&auto=format&fit=crop",
    category: "Sandwich"
  },
  {
    name: "Pesto Chicken Tomato Panini",
    description: "Rustic Italian panini bread pressed with warm grilled chicken strips, ripe sliced tomatoes, baby spinach, and green basil pesto.",
    price: 189,
    image: "https://images.unsplash.com/photo-1481070414801-51fd732d7184?w=500&auto=format&fit=crop",
    category: "Sandwich"
  },
  {
    name: "Smoked Salmon Cream Cheese Toast",
    description: "Toasted dark rye bread smeared with thick dill cream cheese, loaded with Norwegian smoked salmon, capers, and red onion rings.",
    price: 249,
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=500&auto=format&fit=crop",
    category: "Sandwich"
  },

  // Cake
  {
    name: "Premium Belgian Chocolate Cake",
    description: "Layers of decadent, moist chocolate cake filled and frosted with ultra-rich Belgian dark chocolate ganache.",
    price: 349,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop",
    category: "Cake"
  },
  {
    name: "Luxurious Red Velvet Cake",
    description: "Indulgent crimson-hued cocoa sponge cake layered with a sweet, velvety-smooth whipped cream cheese frosting.",
    price: 399,
    image: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=500&auto=format&fit=crop",
    category: "Cake"
  },
  {
    name: "New York Strawberry Cheesecake",
    description: "A rich, velvety cream cheese filling on a buttery graham cracker crust, topped with fresh, glazed strawberries.",
    price: 379,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&auto=format&fit=crop",
    category: "Cake"
  },
  {
    name: "Tiramisu Espresso Gateau",
    description: "Elegant Italian cake layers of espresso-soaked ladyfingers, rich mascarpone cream, and dark cocoa powder dusting.",
    price: 389,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&auto=format&fit=crop",
    category: "Cake"
  },
  {
    name: "Classic Spiced Carrot Cake",
    description: "Warmly spiced sponge cake packed with fresh grated carrots, crunchy walnuts, and raisins, frosted with sweet cream cheese.",
    price: 359,
    image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=500&auto=format&fit=crop",
    category: "Cake"
  },

  // Pure Veg
  {
    name: "Shahi Paneer Butter Masala",
    description: "Cubes of premium fresh cottage cheese cooked in a silky, rich tomato-cream gravy infused with aromatic butter.",
    price: 249,
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop",
    category: "Pure Veg"
  },
  {
    name: "Dal Makhani Signature",
    description: "Whole black lentils and red kidney beans slow-cooked overnight on coal, enriched with cream and homemade butter.",
    price: 199,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop",
    category: "Pure Veg"
  },
  {
    name: "Mix Vegetables Kadai",
    description: "A vibrant assortment of fresh vegetables stir-fried in a spicy, freshly ground kadai masala and thick onion-tomato gravy.",
    price: 189,
    image: "https://images.unsplash.com/photo-1585938338392-50a59970d8ee?w=500&auto=format&fit=crop",
    category: "Pure Veg"
  },
  {
    name: "Dum Premium Veg Biryani",
    description: "Slow dum-cooked fragrant long-grain basmati rice layered with assorted seasonal veggies, saffron, and fresh mint, served with raita.",
    price: 269,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop",
    category: "Pure Veg"
  },
  {
    name: "Paneer Tikka Masala Gravy",
    description: "Skewered, clay-oven charred cottage cheese cubes, sweet bell peppers, and onions folded into a semi-dry tandoori masala gravy.",
    price: 229,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&auto=format&fit=crop",
    category: "Pure Veg"
  },

  // Pasta
  {
    name: "Creamy Fettuccine Alfredo",
    description: "Perfectly al dente fettuccine pasta tossed in a luxurious, creamy sauce of butter, heavy cream, and garlic parmesan cheese.",
    price: 259,
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=500&auto=format&fit=crop",
    category: "Pasta"
  },
  {
    name: "Spaghetti Marinara Bolognese",
    description: "Spaghetti strands topped with a savory, slow-simmered rich red tomato marinara sauce, ground herbs, and melting parmesan.",
    price: 279,
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500&auto=format&fit=crop",
    category: "Pasta"
  },
  {
    name: "Fiery Penne Arrabbiata Pasta",
    description: "Rigid tube penne pasta tossed in a robust, hot red sauce made from garlic, cherry tomatoes, and red chili flakes.",
    price: 239,
    image: "https://images.unsplash.com/photo-1563379971899-660589a01cc3?w=500&auto=format&fit=crop",
    category: "Pasta"
  },
  {
    name: "Pesto Penne Cherry Tomatoes",
    description: "Tube penne pasta tossed in a luxurious basil, toasted pine nut, and cold-pressed olive oil pesto, dotted with blistered cherry tomatoes.",
    price: 249,
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=500&auto=format&fit=crop",
    category: "Pasta"
  },
  {
    name: "Four-Cheese Baked Lasagna",
    description: "Generous flat lasagna sheet layers baked with marinara sauce, fresh ricotta, soft mozzarella, provolone, and parmesan.",
    price: 299,
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500&auto=format&fit=crop",
    category: "Pasta"
  },

  // Noodles
  {
    name: "Sizzling Veg Hakka Noodles",
    description: "Wok-tossed Chinese eggless noodles loaded with crunchy julienned bell peppers, carrots, cabbage, and savory sauces.",
    price: 169,
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop",
    category: "Noodles"
  },
  {
    name: "Spicy Schezwan Garlic Noodles",
    description: "Fiery, stir-fried noodles tossed in a bold and fiery homemade Schezwan sauce loaded with roasted garlic chunks.",
    price: 189,
    image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=500&auto=format&fit=crop",
    category: "Noodles"
  },
  {
    name: "Singapore Street Rice Noodles",
    description: "Thin vermicelli rice noodles stir-fried with fragrant Madras curry powder, bell peppers, beansprouts, and green onions.",
    price: 199,
    image: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=500&auto=format&fit=crop",
    category: "Noodles"
  },
  {
    name: "Spicy Chili Garlic Noodles",
    description: "Wok-fired hot spicy noodles coated in a rich charred chili-garlic paste and dressed with crunchy green onions.",
    price: 179,
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop",
    category: "Noodles"
  },
  {
    name: "Thai Street Pad See Ew Noodles",
    description: "Flat, broad hand-cut rice noodles stir-fried in sweet dark soy sauce, fresh garlic, organic tofu cubes, and Chinese broccoli.",
    price: 199,
    image: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=500&auto=format&fit=crop",
    category: "Noodles"
  }
];

const seedDB = async () => {
  try {
    console.log("Connecting to Database...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected successfully!");

    console.log("Dropping existing food collection to start fresh...");
    await foodModel.deleteMany({});
    console.log("Existing collection dropped successfully!");

    console.log(`Seeding ${foods.length} premium menu products...`);
    const inserted = await foodModel.insertMany(foods);
    console.log(`Successfully seeded ${inserted.length} products!`);

    await mongoose.disconnect();
    console.log("Database disconnected. Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed with error:", error.message);
    process.exit(1);
  }
};

seedDB();
