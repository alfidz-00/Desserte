// =============================================================================
// DESSERTÉ — Central Data Store
// Replace these with API calls when connecting to Supabase
// =============================================================================

const DESSERTE_DATA = {

  // ---------------------------------------------------------------------------
  // CATEGORIES
  // ---------------------------------------------------------------------------
  categories: [
    { id: 'all', name: 'All', icon: '✦', slug: 'all' },
    { id: 'cakes', name: 'Cakes', icon: '🎂', slug: 'cakes' },
    { id: 'chocolate', name: 'Chocolate', icon: '🍫', slug: 'chocolate' },
    { id: 'cheesecake', name: 'Cheesecake', icon: '🍰', slug: 'cheesecake' },
    { id: 'pastry', name: 'Pastry', icon: '🥐', slug: 'pastry' },
    { id: 'ice-cream', name: 'Ice Cream', icon: '🍨', slug: 'ice-cream' },
    { id: 'drinks', name: 'Drinks', icon: '🥤', slug: 'drinks' },
    { id: 'best-seller', name: 'Best Sellers', icon: '⭐', slug: 'best-seller' },
  ],

  // ---------------------------------------------------------------------------
  // PRODUCTS
  // ---------------------------------------------------------------------------
  baseProducts: [
{
    "id": "chocolate-royale",
    "name": "Chocolate Royale",
    "category": [
      "cakes",
      "chocolate",
      "best-seller"
    ],
    "price": 45000,
    "image": "images/products/cake-1.jpg",
    "fallbackColor": "#3D1F00",
    "description": "Rich chocolate cake layered with smooth chocolate cream and premium chocolate ganache.",
    "ingredients": "Dark chocolate, butter, eggs, sugar, flour, heavy cream, cocoa powder",
    "badge": "Best Seller",
    "rating": 4.9,
    "reviewCount": 312,
    "sizes": [
      {
        "id": "slice",
        "name": "Slice",
        "price": 45000
      },
      {
        "id": "small",
        "name": "Small Cake (6\")",
        "price": 280000
      },
      {
        "id": "medium",
        "name": "Medium Cake (8\")",
        "price": 380000
      },
      {
        "id": "large",
        "name": "Large Cake (10\")",
        "price": 480000
      }
    ]
  },
  {
    "id": "tiramisu-classic",
    "name": "Tiramisu Classic Gateau",
    "category": [
      "cakes",
      "best-seller"
    ],
    "price": 42000,
    "image": "images/products/cake-2.jpg",
    "fallbackColor": "#5D4037",
    "description": "Authentic Italian tiramisu with espresso-soaked ladyfingers and mascarpone cream dusted with cocoa.",
    "ingredients": "Mascarpone, eggs, sugar, espresso, ladyfingers, cocoa powder, dark rum",
    "badge": "Best Seller",
    "rating": 4.9,
    "reviewCount": 289,
    "sizes": [
      {
        "id": "slice",
        "name": "Slice",
        "price": 42000
      },
      {
        "id": "small",
        "name": "Small (4 portion)",
        "price": 165000
      },
      {
        "id": "medium",
        "name": "Medium (6 portion)",
        "price": 245000
      },
      {
        "id": "large",
        "name": "Large (8 portion)",
        "price": 320000
      }
    ]
  },
  {
    "id": "matcha-cream-cake",
    "name": "Matcha Blossom Cake",
    "category": [
      "cakes"
    ],
    "price": 46000,
    "image": "images/products/cake-3.jpg",
    "fallbackColor": "#2E7D32",
    "description": "Delicate Japanese matcha sponge layered with light matcha cream and white chocolate ganache.",
    "ingredients": "Premium matcha powder, flour, eggs, sugar, cream, white chocolate",
    "badge": "New",
    "rating": 4.7,
    "reviewCount": 128,
    "sizes": [
      {
        "id": "slice",
        "name": "Slice",
        "price": 46000
      },
      {
        "id": "small",
        "name": "Small Cake (6\")",
        "price": 295000
      },
      {
        "id": "medium",
        "name": "Medium Cake (8\")",
        "price": 395000
      },
      {
        "id": "large",
        "name": "Large Cake (10\")",
        "price": 495000
      }
    ]
  },
  {
    "id": "red-velvet",
    "name": "Red Velvet Royale",
    "category": [
      "cakes"
    ],
    "price": 44000,
    "image": "images/products/cake-4.jpg",
    "fallbackColor": "#B71C1C",
    "description": "Elegant red velvet layers with tangy cream cheese frosting and velvet crumb decoration.",
    "ingredients": "Flour, cocoa, buttermilk, red food coloring, cream cheese, butter",
    "badge": null,
    "rating": 4.7,
    "reviewCount": 198,
    "sizes": [
      {
        "id": "slice",
        "name": "Slice",
        "price": 44000
      },
      {
        "id": "small",
        "name": "Small Cake (6\")",
        "price": 285000
      },
      {
        "id": "medium",
        "name": "Medium Cake (8\")",
        "price": 385000
      },
      {
        "id": "large",
        "name": "Large Cake (10\")",
        "price": 485000
      }
    ]
  },
  {
    "id": "dark-chocolate-mousse",
    "name": "Dark Chocolate Mousse Gateau",
    "category": [
      "cakes",
      "chocolate"
    ],
    "price": 48000,
    "image": "images/products/cake-5.jpg",
    "fallbackColor": "#1A0A00",
    "description": "Silky dark chocolate mousse layered with delicate chocolate sponge and cocoa glaze.",
    "ingredients": "Dark chocolate 70%, eggs, sugar, cream, vanilla, gelatin",
    "badge": "New",
    "rating": 4.8,
    "reviewCount": 95,
    "sizes": [
      {
        "id": "slice",
        "name": "Slice",
        "price": 48000
      },
      {
        "id": "small",
        "name": "Small Cake (6\")",
        "price": 290000
      },
      {
        "id": "medium",
        "name": "Medium Cake (8\")",
        "price": 390000
      }
    ]
  },
  {
    "id": "mille-crepe",
    "name": "French Mille Crêpe",
    "category": [
      "cakes",
      "best-seller"
    ],
    "price": 49000,
    "image": "images/products/cake-6.jpg",
    "fallbackColor": "#F5E6C8",
    "description": "Twenty delicate crêpe layers filled with silky pastry cream, finished with caramelized sugar.",
    "ingredients": "Flour, eggs, milk, butter, pastry cream, sugar",
    "badge": "Best Seller",
    "rating": 4.8,
    "reviewCount": 201,
    "sizes": [
      {
        "id": "slice",
        "name": "Slice",
        "price": 49000
      },
      {
        "id": "small",
        "name": "Small Cake (6\")",
        "price": 315000
      },
      {
        "id": "medium",
        "name": "Medium Cake (8\")",
        "price": 425000
      },
      {
        "id": "large",
        "name": "Large Cake (10\")",
        "price": 535000
      }
    ]
  },
  {
    "id": "opera-gateau",
    "name": "Parisian Opera Gateau",
    "category": [
      "cakes",
      "chocolate"
    ],
    "price": 47000,
    "image": "images/products/cake-7.jpg",
    "fallbackColor": "#3E2723",
    "description": "Traditional French opera cake with almond sponge soaked in coffee syrup, ganache and coffee buttercream.",
    "ingredients": "Almond sponge, coffee syrup, dark ganache, coffee buttercream, dark chocolate glaze",
    "badge": null,
    "rating": 4.8,
    "reviewCount": 164,
    "sizes": [
      {
        "id": "slice",
        "name": "Slice",
        "price": 47000
      },
      {
        "id": "small",
        "name": "Small (6\")",
        "price": 310000
      },
      {
        "id": "medium",
        "name": "Medium (8\")",
        "price": 420000
      }
    ]
  },
  {
    "id": "black-forest-royale",
    "name": "Black Forest Royale",
    "category": [
      "cakes",
      "chocolate"
    ],
    "price": 45000,
    "image": "images/products/cake-8.jpg",
    "fallbackColor": "#2C1810",
    "description": "Classic German cake layered with chocolate sponge, Chantilly cream, and sweet dark cherries.",
    "ingredients": "Cocoa sponge, dark cherries, cherry kirsch syrup, whipped cream, chocolate shavings",
    "badge": null,
    "rating": 4.7,
    "reviewCount": 182,
    "sizes": [
      {
        "id": "slice",
        "name": "Slice",
        "price": 45000
      },
      {
        "id": "small",
        "name": "Small Cake (6\")",
        "price": 290000
      },
      {
        "id": "medium",
        "name": "Medium Cake (8\")",
        "price": 390000
      },
      {
        "id": "large",
        "name": "Large Cake (10\")",
        "price": 490000
      }
    ]
  },
  {
    "id": "vanilla-berry-sponge",
    "name": "Vanilla Berry Sponge Cake",
    "category": [
      "cakes"
    ],
    "price": 43000,
    "image": "images/products/cake-9.jpg",
    "fallbackColor": "#FFF8E1",
    "description": "Fluffy vanilla chiffon cake layered with fresh mixed berries compote and light diplomat cream.",
    "ingredients": "Vanilla chiffon, mixed berries, heavy cream, sugar, fresh mint",
    "badge": null,
    "rating": 4.6,
    "reviewCount": 147,
    "sizes": [
      {
        "id": "slice",
        "name": "Slice",
        "price": 43000
      },
      {
        "id": "small",
        "name": "Small Cake (6\")",
        "price": 275000
      },
      {
        "id": "medium",
        "name": "Medium Cake (8\")",
        "price": 375000
      }
    ]
  },
  {
    "id": "lotus-caramel-cake",
    "name": "Lotus Biscoff Caramel Cake",
    "category": [
      "cakes",
      "best-seller"
    ],
    "price": 46000,
    "image": "images/products/cake-10.jpg",
    "fallbackColor": "#C97A3E",
    "description": "Moist sponge cake layered with rich Lotus Biscoff spread, speculoos crunch, and salted caramel glaze.",
    "ingredients": "Biscoff cookies, speculoos spread, caramel drizzle, butter, brown sugar, eggs",
    "badge": "Best Seller",
    "rating": 4.9,
    "reviewCount": 228,
    "sizes": [
      {
        "id": "slice",
        "name": "Slice",
        "price": 46000
      },
      {
        "id": "small",
        "name": "Small Cake (6\")",
        "price": 295000
      },
      {
        "id": "medium",
        "name": "Medium Cake (8\")",
        "price": 395000
      },
      {
        "id": "large",
        "name": "Large Cake (10\")",
        "price": 495000
      }
    ]
  },
  {
    "id": "strawberry-cheesecake",
    "name": "Strawberry New York Cheesecake",
    "category": [
      "cheesecake",
      "best-seller"
    ],
    "price": 48000,
    "image": "images/products/cheesecake-11.png",
    "fallbackColor": "#C0392B",
    "description": "Velvety New York-style cheesecake topped with fresh strawberry compote and whole berries.",
    "ingredients": "Cream cheese, eggs, sugar, sour cream, graham crackers, butter, fresh strawberries",
    "badge": "Best Seller",
    "rating": 4.8,
    "reviewCount": 245,
    "sizes": [
      {
        "id": "slice",
        "name": "Slice",
        "price": 48000
      },
      {
        "id": "small",
        "name": "Small Cake (6\")",
        "price": 310000
      },
      {
        "id": "medium",
        "name": "Medium Cake (8\")",
        "price": 420000
      },
      {
        "id": "large",
        "name": "Large Cake (10\")",
        "price": 520000
      }
    ]
  },
  {
    "id": "burnt-basque",
    "name": "San Sebastián Burnt Basque",
    "category": [
      "cheesecake",
      "best-seller"
    ],
    "price": 52000,
    "image": "images/products/cheesecake-12.png",
    "fallbackColor": "#6D4C41",
    "description": "San Sebastián-style cheesecake with a caramelized top and luxuriously creamy center.",
    "ingredients": "Cream cheese, eggs, heavy cream, sugar, flour",
    "badge": "Best Seller",
    "rating": 4.8,
    "reviewCount": 176,
    "sizes": [
      {
        "id": "slice",
        "name": "Slice",
        "price": 52000
      },
      {
        "id": "small",
        "name": "Small Cake (6\")",
        "price": 330000
      },
      {
        "id": "medium",
        "name": "Medium Cake (8\")",
        "price": 440000
      },
      {
        "id": "large",
        "name": "Large Cake (10\")",
        "price": 560000
      }
    ]
  },
  {
    "id": "blueberry-swirl-cheesecake",
    "name": "Blueberry Swirl Cheesecake",
    "category": [
      "cheesecake"
    ],
    "price": 48000,
    "image": "images/products/cheesecake-13.png",
    "fallbackColor": "#4A148C",
    "description": "Dense baked cheesecake swirled with wild Canada blueberry compote on a buttery graham crust.",
    "ingredients": "Cream cheese, wild blueberries, digestive biscuits, heavy cream, lemon zest",
    "badge": null,
    "rating": 4.7,
    "reviewCount": 154,
    "sizes": [
      {
        "id": "slice",
        "name": "Slice",
        "price": 48000
      },
      {
        "id": "small",
        "name": "Small Cake (6\")",
        "price": 315000
      },
      {
        "id": "medium",
        "name": "Medium Cake (8\")",
        "price": 425000
      }
    ]
  },
  {
    "id": "japanese-cotton-cheesecake",
    "name": "Japanese Soufflé Cotton Cheesecake",
    "category": [
      "cheesecake"
    ],
    "price": 45000,
    "image": "images/products/cheesecake-14.png",
    "fallbackColor": "#FFFDE7",
    "description": "Ultra-light, fluffy soufflé cheesecake with melt-in-the-mouth texture and delicate cheese aroma.",
    "ingredients": "Philadelphia cream cheese, fresh milk, butter, whipped egg whites, lemon juice",
    "badge": "New",
    "rating": 4.9,
    "reviewCount": 189,
    "sizes": [
      {
        "id": "slice",
        "name": "Slice",
        "price": 45000
      },
      {
        "id": "small",
        "name": "Whole (6\")",
        "price": 185000
      },
      {
        "id": "medium",
        "name": "Whole (8\")",
        "price": 285000
      }
    ]
  },
  {
    "id": "lotus-biscoff-cheesecake",
    "name": "Lotus Biscoff Cream Cheesecake",
    "category": [
      "cheesecake",
      "best-seller"
    ],
    "price": 50000,
    "image": "images/products/cheesecake-15.png",
    "fallbackColor": "#D35400",
    "description": "Smooth baked cheesecake infused with Lotus Biscoff cookie butter, topped with melted cookie spread.",
    "ingredients": "Cream cheese, Lotus Biscoff biscuits, cookie spread, brown sugar, heavy cream",
    "badge": "Best Seller",
    "rating": 4.9,
    "reviewCount": 302,
    "sizes": [
      {
        "id": "slice",
        "name": "Slice",
        "price": 50000
      },
      {
        "id": "small",
        "name": "Small Cake (6\")",
        "price": 325000
      },
      {
        "id": "medium",
        "name": "Medium Cake (8\")",
        "price": 435000
      }
    ]
  },
  {
    "id": "matcha-green-tea-cheesecake",
    "name": "Uji Matcha Baked Cheesecake",
    "category": [
      "cheesecake"
    ],
    "price": 49000,
    "image": "images/products/cheesecake-16.png",
    "fallbackColor": "#2E7D32",
    "description": "Harmonious blend of rich French cream cheese and Kyoto ceremonial matcha on Oreo base.",
    "ingredients": "Kyoto matcha, cream cheese, Oreo crust, white chocolate, organic cream",
    "badge": null,
    "rating": 4.7,
    "reviewCount": 142,
    "sizes": [
      {
        "id": "slice",
        "name": "Slice",
        "price": 49000
      },
      {
        "id": "small",
        "name": "Small Cake (6\")",
        "price": 320000
      },
      {
        "id": "medium",
        "name": "Medium Cake (8\")",
        "price": 430000
      }
    ]
  },
  {
    "id": "mango-passionfruit-cheesecake",
    "name": "Mango Passionfruit Cheesecake",
    "category": [
      "cheesecake"
    ],
    "price": 48000,
    "image": "images/products/cheesecake-17.png",
    "fallbackColor": "#F57F17",
    "description": "Refreshing tropical baked cheesecake layered with Alphonso mango mousse and passionfruit coulis.",
    "ingredients": "Cream cheese, Alphonso mango puree, passionfruit juice, graham crust, gelatin",
    "badge": "New",
    "rating": 4.8,
    "reviewCount": 116,
    "sizes": [
      {
        "id": "slice",
        "name": "Slice",
        "price": 48000
      },
      {
        "id": "small",
        "name": "Small Cake (6\")",
        "price": 315000
      },
      {
        "id": "medium",
        "name": "Medium Cake (8\")",
        "price": 425000
      }
    ]
  },
  {
    "id": "oreo-cookies-cheesecake",
    "name": "Oreo Cookies & Cream Cheesecake",
    "category": [
      "cheesecake",
      "chocolate"
    ],
    "price": 46000,
    "image": "images/products/cheesecake-18.png",
    "fallbackColor": "#212121",
    "description": "Classic New York cheesecake loaded with crunchy Oreo pieces inside and topped with dark ganache.",
    "ingredients": "Cream cheese, crushed Oreos, vanilla extract, butter, dark chocolate ganache",
    "badge": null,
    "rating": 4.7,
    "reviewCount": 175,
    "sizes": [
      {
        "id": "slice",
        "name": "Slice",
        "price": 46000
      },
      {
        "id": "small",
        "name": "Small Cake (6\")",
        "price": 295000
      },
      {
        "id": "medium",
        "name": "Medium Cake (8\")",
        "price": 395000
      }
    ]
  },
  {
    "id": "double-chocolate-cheesecake",
    "name": "Belgian Double Chocolate Cheesecake",
    "category": [
      "cheesecake",
      "chocolate"
    ],
    "price": 52000,
    "image": "images/products/cheesecake-19.png",
    "fallbackColor": "#3E2723",
    "description": "Decadent baked cheesecake infused with melted 70% Callebaut dark chocolate and chocolate crust.",
    "ingredients": "Callebaut dark chocolate, cream cheese, cocoa powder, chocolate cookie crust, cream",
    "badge": null,
    "rating": 4.8,
    "reviewCount": 210,
    "sizes": [
      {
        "id": "slice",
        "name": "Slice",
        "price": 52000
      },
      {
        "id": "small",
        "name": "Small Cake (6\")",
        "price": 340000
      },
      {
        "id": "medium",
        "name": "Medium Cake (8\")",
        "price": 450000
      }
    ]
  },
  {
    "id": "raspberry-velvet-cheesecake",
    "name": "Raspberry Velvet Cheesecake",
    "category": [
      "cheesecake"
    ],
    "price": 50000,
    "image": "images/products/cheesecake-20.png",
    "fallbackColor": "#880E4F",
    "description": "Silky smooth baked cheesecake with tart European raspberry glaze and edible gold flakes.",
    "ingredients": "Cream cheese, fresh raspberries, shortbread base, organic sugar, lemon juice",
    "badge": null,
    "rating": 4.8,
    "reviewCount": 133,
    "sizes": [
      {
        "id": "slice",
        "name": "Slice",
        "price": 50000
      },
      {
        "id": "small",
        "name": "Small Cake (6\")",
        "price": 325000
      },
      {
        "id": "medium",
        "name": "Medium Cake (8\")",
        "price": 435000
      }
    ]
  },
  {
    "id": "matcha-latte",
    "name": "Uji Matcha Iced Latte",
    "category": [
      "drinks",
      "best-seller"
    ],
    "price": 35000,
    "image": "images/products/drink-21.jpg",
    "fallbackColor": "#388E3C",
    "description": "Premium ceremonial-grade Uji matcha whisked with fresh milk and touch of cane sugar.",
    "ingredients": "Ceremonial Uji matcha, fresh milk, organic cane sugar, ice",
    "badge": "Best Seller",
    "rating": 4.9,
    "reviewCount": 310,
    "sizes": [
      {
        "id": "regular",
        "name": "Regular (350ml)",
        "price": 35000
      },
      {
        "id": "large",
        "name": "Large (500ml)",
        "price": 45000
      }
    ]
  },
  {
    "id": "chocolate-shake",
    "name": "Belgian Chocolate Dream Shake",
    "category": [
      "drinks",
      "chocolate",
      "best-seller"
    ],
    "price": 42000,
    "image": "images/products/drink-22.jpg",
    "fallbackColor": "#3E2723",
    "description": "Thick, indulgent milkshake blended with premium Belgian chocolate and topped with whipped cream.",
    "ingredients": "Fresh milk, Belgian chocolate gelato, chocolate syrup, Chantilly cream",
    "badge": "Best Seller",
    "rating": 4.8,
    "reviewCount": 267,
    "sizes": [
      {
        "id": "regular",
        "name": "Regular (350ml)",
        "price": 42000
      },
      {
        "id": "large",
        "name": "Large (500ml)",
        "price": 55000
      }
    ]
  },
  {
    "id": "strawberry-milk-boba",
    "name": "Fresh Strawberry Milk Cream",
    "category": [
      "drinks"
    ],
    "price": 36000,
    "image": "images/products/drink-23.jpg",
    "fallbackColor": "#E91E63",
    "description": "Handmade fresh strawberry puree layered with creamy whole milk and sweet cold foam.",
    "ingredients": "Fresh strawberries, whole milk, sweet cream foam, natural strawberry puree",
    "badge": null,
    "rating": 4.7,
    "reviewCount": 184,
    "sizes": [
      {
        "id": "regular",
        "name": "Regular (350ml)",
        "price": 36000
      },
      {
        "id": "large",
        "name": "Large (500ml)",
        "price": 48000
      }
    ]
  },
  {
    "id": "caramel-macchiato",
    "name": "Vanilla Caramel Macchiato",
    "category": [
      "drinks"
    ],
    "price": 38000,
    "image": "images/products/drink-24.jpg",
    "fallbackColor": "#795548",
    "description": "Freshly steamed milk with vanilla syrup, marked with espresso and finished with caramel drizzle.",
    "ingredients": "Arabica espresso, vanilla bean syrup, fresh milk, salted caramel sauce",
    "badge": null,
    "rating": 4.8,
    "reviewCount": 215,
    "sizes": [
      {
        "id": "regular",
        "name": "Regular (350ml)",
        "price": 38000
      },
      {
        "id": "large",
        "name": "Large (500ml)",
        "price": 50000
      }
    ]
  },
  {
    "id": "sparkling-berry-lemonade",
    "name": "Sparkling Berry Lemonade",
    "category": [
      "drinks"
    ],
    "price": 32000,
    "image": "images/products/drink-25.jpg",
    "fallbackColor": "#AD1457",
    "description": "Effervescent soda infused with freshly squeezed lemons, crushed raspberries, and mint.",
    "ingredients": "Sparkling water, fresh lemon juice, raspberry syrup, mint leaves, cane sugar",
    "badge": "New",
    "rating": 4.7,
    "reviewCount": 122,
    "sizes": [
      {
        "id": "regular",
        "name": "Regular (350ml)",
        "price": 32000
      },
      {
        "id": "large",
        "name": "Large (500ml)",
        "price": 44000
      }
    ]
  },
  {
    "id": "peach-blossom-tea",
    "name": "White Peach Blossom Iced Tea",
    "category": [
      "drinks"
    ],
    "price": 28000,
    "image": "images/products/drink-26.jpg",
    "fallbackColor": "#FF8A80",
    "description": "Aromatic Taiwanese white tea brewed with natural peach essence and tender peach slices.",
    "ingredients": "Oolong white tea, white peach extract, fresh peach chunks, rock sugar",
    "badge": null,
    "rating": 4.6,
    "reviewCount": 153,
    "sizes": [
      {
        "id": "regular",
        "name": "Regular (350ml)",
        "price": 28000
      },
      {
        "id": "large",
        "name": "Large (500ml)",
        "price": 38000
      }
    ]
  },
  {
    "id": "hazelnut-praline-coffee",
    "name": "Hazelnut Praline Iced Coffee",
    "category": [
      "drinks"
    ],
    "price": 38000,
    "image": "images/products/drink-27.jpg",
    "fallbackColor": "#4E342E",
    "description": "Double espresso shaken with roasted hazelnut paste, cold milk, and chocolate flakes.",
    "ingredients": "Double espresso, Piedmont hazelnut paste, whole milk, ice",
    "badge": null,
    "rating": 4.8,
    "reviewCount": 178,
    "sizes": [
      {
        "id": "regular",
        "name": "Regular (350ml)",
        "price": 38000
      },
      {
        "id": "large",
        "name": "Large (500ml)",
        "price": 50000
      }
    ]
  },
  {
    "id": "royal-earl-grey-tea",
    "name": "Royal Earl Grey Milk Tea",
    "category": [
      "drinks"
    ],
    "price": 34000,
    "image": "images/products/drink-28.jpg",
    "fallbackColor": "#A1887F",
    "description": "Classic Ceylon black tea perfumed with bergamot orange, blended with smooth creamy milk.",
    "ingredients": "Earl Grey tea leaves, bergamot oil, fresh milk, brown sugar",
    "badge": null,
    "rating": 4.7,
    "reviewCount": 195,
    "sizes": [
      {
        "id": "regular",
        "name": "Regular (350ml)",
        "price": 34000
      },
      {
        "id": "large",
        "name": "Large (500ml)",
        "price": 46000
      }
    ]
  },
  {
    "id": "avocado-espresso-float",
    "name": "Avocado Espresso Affogato Float",
    "category": [
      "drinks"
    ],
    "price": 42000,
    "image": "images/products/drink-29.jpg",
    "fallbackColor": "#689F38",
    "description": "Rich blended Mentega avocado crowned with a scoop of vanilla gelato and single shot espresso.",
    "ingredients": "Fresh avocado, vanilla bean gelato, espresso shot, chocolate drizzle",
    "badge": "New",
    "rating": 4.9,
    "reviewCount": 140,
    "sizes": [
      {
        "id": "regular",
        "name": "Regular (400ml)",
        "price": 42000
      },
      {
        "id": "large",
        "name": "Large (550ml)",
        "price": 55000
      }
    ]
  },
  {
    "id": "mint-dark-choco",
    "name": "Iced Mint Dark Chocolate",
    "category": [
      "drinks",
      "chocolate"
    ],
    "price": 36000,
    "image": "images/products/drink-30.jpg",
    "fallbackColor": "#004D40",
    "description": "Cooling garden mint syrup blended with rich melted dark chocolate and creamy milk.",
    "ingredients": "Dark chocolate 65%, peppermint extract, fresh milk, whipped topping",
    "badge": null,
    "rating": 4.6,
    "reviewCount": 118,
    "sizes": [
      {
        "id": "regular",
        "name": "Regular (350ml)",
        "price": 36000
      },
      {
        "id": "large",
        "name": "Large (500ml)",
        "price": 48000
      }
    ]
  },
  {
    "id": "tropical-mango-frappe",
    "name": "Tropical Mango Coconut Frappé",
    "category": [
      "drinks"
    ],
    "price": 38000,
    "image": "images/products/drink-31.jpg",
    "fallbackColor": "#FFB300",
    "description": "Sweet Gedong mango blended with coconut cream and topped with toasted coconut flakes.",
    "ingredients": "Ripe mango, coconut cream, crushed ice, agave nectar",
    "badge": null,
    "rating": 4.7,
    "reviewCount": 135,
    "sizes": [
      {
        "id": "regular",
        "name": "Regular (350ml)",
        "price": 38000
      },
      {
        "id": "large",
        "name": "Large (500ml)",
        "price": 52000
      }
    ]
  },
  {
    "id": "gelato-vanilla",
    "name": "Madagascar Vanilla Bean Gelato",
    "category": [
      "ice-cream",
      "best-seller"
    ],
    "price": 32000,
    "image": "images/products/icecream-32.png",
    "fallbackColor": "#FFF8E1",
    "description": "Authentic Italian gelato crafted with Bourbon vanilla beans from Madagascar and pure cream.",
    "ingredients": "Whole milk, heavy cream, organic egg yolks, Madagascar vanilla beans, sugar",
    "badge": "Best Seller",
    "rating": 4.9,
    "reviewCount": 285,
    "sizes": [
      {
        "id": "single",
        "name": "Single Scoop",
        "price": 32000
      },
      {
        "id": "double",
        "name": "Double Scoop",
        "price": 55000
      },
      {
        "id": "triple",
        "name": "Triple Scoop",
        "price": 75000
      }
    ]
  },
  {
    "id": "strawberry-gelato",
    "name": "Artisan Strawberry Sorbet",
    "category": [
      "ice-cream"
    ],
    "price": 30000,
    "image": "images/products/icecream-33.png",
    "fallbackColor": "#C62828",
    "description": "Dairy-free sorbet bursting with 100% natural sun-ripened strawberry sweetness and lemon zest.",
    "ingredients": "Fresh strawberries, mineral water, lemon juice, organic sugar",
    "badge": null,
    "rating": 4.7,
    "reviewCount": 167,
    "sizes": [
      {
        "id": "single",
        "name": "Single Scoop",
        "price": 30000
      },
      {
        "id": "double",
        "name": "Double Scoop",
        "price": 52000
      }
    ]
  },
  {
    "id": "dark-choco-gelato",
    "name": "Belgian Dark Chocolate Gelato",
    "category": [
      "ice-cream",
      "chocolate",
      "best-seller"
    ],
    "price": 34000,
    "image": "images/products/icecream-34.png",
    "fallbackColor": "#1A0A00",
    "description": "Deep, bittersweet 72% Belgian dark chocolate churned slowly for an unbeatably dense texture.",
    "ingredients": "Belgian dark chocolate, cocoa mass, heavy cream, milk, sugar",
    "badge": "Best Seller",
    "rating": 4.9,
    "reviewCount": 310,
    "sizes": [
      {
        "id": "single",
        "name": "Single Scoop",
        "price": 34000
      },
      {
        "id": "double",
        "name": "Double Scoop",
        "price": 58000
      },
      {
        "id": "triple",
        "name": "Triple Scoop",
        "price": 78000
      }
    ]
  },
  {
    "id": "salted-caramel-gelato",
    "name": "Salted Butter Caramel Crunch",
    "category": [
      "ice-cream"
    ],
    "price": 34000,
    "image": "images/products/icecream-35.png",
    "fallbackColor": "#D7CCC8",
    "description": "Handmade caramelized sugar infused with French Guérande sea salt and crunchy praline bits.",
    "ingredients": "Caramelized sugar, Guérande sea salt, whole cream, praline almonds",
    "badge": null,
    "rating": 4.8,
    "reviewCount": 204,
    "sizes": [
      {
        "id": "single",
        "name": "Single Scoop",
        "price": 34000
      },
      {
        "id": "double",
        "name": "Double Scoop",
        "price": 58000
      }
    ]
  },
  {
    "id": "pistachio-gelato",
    "name": "Bronte Pistachio Deluxe Gelato",
    "category": [
      "ice-cream"
    ],
    "price": 38000,
    "image": "images/products/icecream-36.png",
    "fallbackColor": "#A5D6A7",
    "description": "Authentic Sicilian Bronte pistachios lightly roasted and finely stone-ground into velvet gelato.",
    "ingredients": "Sicilian Bronte pistachios, organic milk, cream, raw cane sugar",
    "badge": "New",
    "rating": 4.9,
    "reviewCount": 145,
    "sizes": [
      {
        "id": "single",
        "name": "Single Scoop",
        "price": 38000
      },
      {
        "id": "double",
        "name": "Double Scoop",
        "price": 65000
      }
    ]
  },
  {
    "id": "mint-choco-sundae",
    "name": "Mint Stracciatella Sundae",
    "category": [
      "ice-cream",
      "chocolate"
    ],
    "price": 35000,
    "image": "images/products/icecream-37.jpeg",
    "fallbackColor": "#80CBC4",
    "description": "Cool peppermint cream studded with thin, melt-in-mouth dark chocolate ribbon shards.",
    "ingredients": "Fresh mint infusion, Callebaut chocolate shavings, whole milk, cream",
    "badge": null,
    "rating": 4.6,
    "reviewCount": 118,
    "sizes": [
      {
        "id": "single",
        "name": "Single Scoop",
        "price": 35000
      },
      {
        "id": "double",
        "name": "Double Scoop",
        "price": 60000
      }
    ]
  },
  {
    "id": "blueberry-yogurt-icecream",
    "name": "Wild Blueberry Frozen Yogurt",
    "category": [
      "ice-cream"
    ],
    "price": 32000,
    "image": "images/products/icecream-38.jpeg",
    "fallbackColor": "#7E57C2",
    "description": "Tangy Greek frozen yogurt folded with plump, antioxidant-rich wild blueberries.",
    "ingredients": "Greek yogurt, wild blueberries, honey, probiotic cultures",
    "badge": null,
    "rating": 4.7,
    "reviewCount": 132,
    "sizes": [
      {
        "id": "single",
        "name": "Single Scoop",
        "price": 32000
      },
      {
        "id": "double",
        "name": "Double Scoop",
        "price": 55000
      }
    ]
  },
  {
    "id": "waffle-cone-sundae",
    "name": "Signature Waffle Cone Sundae",
    "category": [
      "ice-cream",
      "best-seller"
    ],
    "price": 48000,
    "image": "images/products/icecream-39.jpeg",
    "fallbackColor": "#D7CCC8",
    "description": "Crisp handmade waffle cone holding two artisan scoops, chocolate ganache drizzle, and roasted nuts.",
    "ingredients": "Handmade waffle cone, 2 scoops of your choice, chocolate fudge, chopped hazelnuts",
    "badge": "Best Seller",
    "rating": 4.9,
    "reviewCount": 312,
    "sizes": [
      {
        "id": "double",
        "name": "Double Scoop Cone",
        "price": 48000
      },
      {
        "id": "triple",
        "name": "Triple Scoop Cone",
        "price": 68000
      }
    ]
  },
  {
    "id": "tropical-parfait-gelato",
    "name": "Tropical Mango Passion Sorbet",
    "category": [
      "ice-cream"
    ],
    "price": 32000,
    "image": "images/products/icecream-40.jpg",
    "fallbackColor": "#FFB74D",
    "description": "Exotic tropical sorbet blending sweet mango nectar and aromatic passion fruit pulp.",
    "ingredients": "Mango puree, passionfruit pulp, lime juice, water, organic sugar",
    "badge": null,
    "rating": 4.7,
    "reviewCount": 98,
    "sizes": [
      {
        "id": "single",
        "name": "Single Scoop",
        "price": 32000
      },
      {
        "id": "double",
        "name": "Double Scoop",
        "price": 55000
      }
    ]
  },
  {
    "id": "croissant-butter",
    "name": "French Butter Croissant",
    "category": [
      "pastry",
      "best-seller"
    ],
    "price": 22000,
    "image": "images/products/pastry-41.jpg",
    "fallbackColor": "#D4A017",
    "description": "Flaky, golden French croissant with 81 crisp laminated layers baked with Normandy butter.",
    "ingredients": "Normandy butter, French flour, sourdough starter, milk, sea salt",
    "badge": "Best Seller",
    "rating": 4.9,
    "reviewCount": 380,
    "sizes": [
      {
        "id": "single",
        "name": "Single Piece",
        "price": 22000
      },
      {
        "id": "pack3",
        "name": "Box of 3",
        "price": 60000
      },
      {
        "id": "pack6",
        "name": "Box of 6",
        "price": 115000
      }
    ]
  },
  {
    "id": "eclair",
    "name": "Classic Chocolate Éclair",
    "category": [
      "pastry",
      "chocolate",
      "best-seller"
    ],
    "price": 28000,
    "image": "images/products/pastry-42.jpg",
    "fallbackColor": "#2C1810",
    "description": "Crisp choux pastry piped full with silky Tahitian vanilla pastry cream and dipped in dark chocolate glaze.",
    "ingredients": "Choux pastry, Madagascar vanilla pastry cream, Belgian chocolate glaze",
    "badge": "Best Seller",
    "rating": 4.8,
    "reviewCount": 220,
    "sizes": [
      {
        "id": "single",
        "name": "Single",
        "price": 28000
      },
      {
        "id": "pack3",
        "name": "Box of 3",
        "price": 78000
      },
      {
        "id": "pack6",
        "name": "Box of 6",
        "price": 148000
      }
    ]
  },
  {
    "id": "choco-hazelnut-tart",
    "name": "Chocolate Hazelnut Praline Tart",
    "category": [
      "pastry",
      "chocolate"
    ],
    "price": 35000,
    "image": "images/products/pastry-43.jpg",
    "fallbackColor": "#4A2500",
    "description": "Buttery cocoa crust cradling roasted hazelnut praline and a shiny dome of dark chocolate ganache.",
    "ingredients": "Pâte sablée, roasted hazelnut praline, 70% dark ganache, gold leaf",
    "badge": "New",
    "rating": 4.8,
    "reviewCount": 160,
    "sizes": [
      {
        "id": "single",
        "name": "Single Tart",
        "price": 35000
      },
      {
        "id": "box4",
        "name": "Box of 4",
        "price": 128000
      }
    ]
  },
  {
    "id": "lemon-tart",
    "name": "Lemon Meringue Curd Tart",
    "category": [
      "pastry"
    ],
    "price": 32000,
    "image": "images/products/pastry-44.jpg",
    "fallbackColor": "#F9A825",
    "description": "Crisp pastry shell filled with zesty Meyer lemon curd and crowned with torched Italian meringue.",
    "ingredients": "Shortcrust shell, Meyer lemon curd, eggs, butter, whipped Italian meringue",
    "badge": null,
    "rating": 4.7,
    "reviewCount": 175,
    "sizes": [
      {
        "id": "single",
        "name": "Single Tart",
        "price": 32000
      },
      {
        "id": "box4",
        "name": "Box of 4",
        "price": 118000
      }
    ]
  },
  {
    "id": "pain-au-chocolat",
    "name": "Parisian Pain Au Chocolat",
    "category": [
      "pastry",
      "chocolate",
      "best-seller"
    ],
    "price": 26000,
    "image": "images/products/pastry-45.jpg",
    "fallbackColor": "#5D4037",
    "description": "Golden laminated dough wrapping two batons of melted bittersweet French dark chocolate.",
    "ingredients": "French butter, cocoa batons, laminated yeast dough, egg wash",
    "badge": "Best Seller",
    "rating": 4.8,
    "reviewCount": 290,
    "sizes": [
      {
        "id": "single",
        "name": "Single Piece",
        "price": 26000
      },
      {
        "id": "pack3",
        "name": "Box of 3",
        "price": 72000
      }
    ]
  },
  {
    "id": "almond-croissant",
    "name": "Twice-Baked Almond Croissant",
    "category": [
      "pastry"
    ],
    "price": 30000,
    "image": "images/products/pastry-46.jpg",
    "fallbackColor": "#D7CCC8",
    "description": "Butter croissant filled with rich almond frangipane cream, topped with toasted sliced almonds.",
    "ingredients": "Almond frangipane, butter croissant, rum syrup, toasted sliced almonds, icing sugar",
    "badge": "New",
    "rating": 4.9,
    "reviewCount": 198,
    "sizes": [
      {
        "id": "single",
        "name": "Single Piece",
        "price": 30000
      },
      {
        "id": "pack3",
        "name": "Box of 3",
        "price": 84000
      }
    ]
  },
  {
    "id": "fruit-tartlet",
    "name": "Fresh Seasonal Berry Tartlet",
    "category": [
      "pastry"
    ],
    "price": 34000,
    "image": "images/products/pastry-47.jpg",
    "fallbackColor": "#D81B60",
    "description": "Crisp shortbread tart filled with smooth vanilla bean pastry cream and fresh assorted berries.",
    "ingredients": "Sweet shortcrust, crème pâtissière, strawberries, blueberries, apricot glaze",
    "badge": null,
    "rating": 4.7,
    "reviewCount": 142,
    "sizes": [
      {
        "id": "single",
        "name": "Single Tart",
        "price": 34000
      },
      {
        "id": "box4",
        "name": "Box of 4",
        "price": 125000
      }
    ]
  },
  {
    "id": "cinnamon-danish",
    "name": "Glazed Cinnamon Swirl Danish",
    "category": [
      "pastry"
    ],
    "price": 25000,
    "image": "images/products/pastry-48.jpg",
    "fallbackColor": "#8D6E63",
    "description": "Flaky coiled pastry with fragrant Saigon cinnamon brown sugar filling and vanilla cream icing.",
    "ingredients": "Danish puff pastry, Saigon cinnamon, brown sugar, vanilla sugar glaze",
    "badge": null,
    "rating": 4.6,
    "reviewCount": 130,
    "sizes": [
      {
        "id": "single",
        "name": "Single",
        "price": 25000
      },
      {
        "id": "box4",
        "name": "Box of 4",
        "price": 92000
      }
    ]
  },
  {
    "id": "pistachio-cruffin",
    "name": "Pistachio Chantilly Cruffin",
    "category": [
      "pastry"
    ],
    "price": 32000,
    "image": "images/products/pastry-49.jpg",
    "fallbackColor": "#81C784",
    "description": "Hybrid of croissant and muffin rolled in sugar and filled to bursting with nutty pistachio cream.",
    "ingredients": "Croissant dough, pistachio cream, caster sugar, roasted crushed pistachios",
    "badge": "New",
    "rating": 4.8,
    "reviewCount": 165,
    "sizes": [
      {
        "id": "single",
        "name": "Single",
        "price": 32000
      },
      {
        "id": "box4",
        "name": "Box of 4",
        "price": 118000
      }
    ]
  },
  {
    "id": "vanilla-choux",
    "name": "Tahitian Vanilla Craquelin Choux",
    "category": [
      "pastry"
    ],
    "price": 24000,
    "image": "images/products/pastry-50.jpg",
    "fallbackColor": "#FFE082",
    "description": "Delicate choux puff with a crunchy sugar craquelin crust, filled with chilled Tahitian diplomat cream.",
    "ingredients": "Choux pastry, butter craquelin, Tahitian vanilla diplomat cream, powdered sugar",
    "badge": null,
    "rating": 4.7,
    "reviewCount": 155,
    "sizes": [
      {
        "id": "single",
        "name": "Single Piece",
        "price": 24000
      },
      {
        "id": "box4",
        "name": "Box of 4",
        "price": 88000
      }
    ]
  }
  ],

  // ---------------------------------------------------------------------------
// PROMOTIONS
  // ---------------------------------------------------------------------------
  promos: [
    {
      id: 'sweet-weekend',
      title: 'Sweet Weekend',
      subtitle: 'Every Saturday & Sunday',
      description: 'Get 20% off on all selected cakes and pastries. Because weekends deserve something sweet.',
      badge: '20% OFF',
      badgeColor: '#C9A84C',
      code: 'WEEKEND20',
      validUntil: '2026-12-31',
      image: 'images/promos/promo-weekend.jpg',
      bgColor: '#1A3A2A',
    },
    {
      id: 'birthday-treat',
      title: 'Birthday Treat',
      subtitle: 'For Your Special Day',
      description: 'Celebrate with a complimentary slice of cake on your birthday. Register and get your sweet surprise.',
      badge: 'FREE SLICE',
      badgeColor: '#C9A84C',
      code: 'BIRTHDAY',
      validUntil: '2026-12-31',
      image: 'images/promos/promo-birthday.jpg',
      bgColor: '#2C4A35',
    },
    {
      id: 'bundle-deal',
      title: 'Buy More, Save More',
      subtitle: 'Bundle & Celebrate',
      description: 'Purchase any 3 items and get special bundle pricing. Perfect for your next gathering or celebration.',
      badge: 'BUNDLE DEAL',
      badgeColor: '#C9A84C',
      code: 'BUNDLE3',
      validUntil: '2026-11-30',
      image: 'images/promos/promo-bundle.jpg',
      bgColor: '#1E3D2A',
    },
    {
      id: 'free-delivery',
      title: 'Free Delivery Day',
      subtitle: 'Every Wednesday',
      description: 'Enjoy free delivery on all orders above Rp 150.000 every Wednesday. Order and we will bring it to you.',
      badge: 'FREE DELIVERY',
      badgeColor: '#C9A84C',
      code: 'FREEWED',
      validUntil: '2026-12-31',
      image: 'images/promos/promo-delivery.jpg',
      bgColor: '#243D2E',
    },
  ],

  // ---------------------------------------------------------------------------
  // OUTLETS
  // ---------------------------------------------------------------------------
  outlets: [
    {
      id: 'outlet-sudirman',
      name: 'Desserté Sudirman',
      address: 'Jl. Jend. Sudirman Kav. 52-53, Senayan, Jakarta Selatan',
      phone: '+62 858 7780 2506',
      hours: 'Mon–Sun: 10:00 – 22:00',
      maps: 'https://maps.google.com/?q=-6.2,106.82',
      lat: -6.2271,
      lng: 106.8225,
    },
    {
      id: 'outlet-kemang',
      name: 'Desserté Kemang',
      address: 'Jl. Kemang Raya No. 45, Kemang, Jakarta Selatan',
      phone: '+62 882 1651 4968',
      hours: 'Mon–Sun: 11:00 – 23:00',
      maps: 'https://maps.google.com/?q=-6.26,106.81',
      lat: -6.2611,
      lng: 106.8124,
    },
    {
      id: 'outlet-pondok-indah',
      name: 'Desserté Pondok Indah',
      address: 'Pondok Indah Mall 2, Jl. Metro Pondok Indah, Jakarta Selatan',
      phone: '+62 21 7513-9988',
      hours: 'Mon–Thu: 10:00 – 22:00 | Fri–Sun: 10:00 – 23:00',
      maps: 'https://maps.google.com/?q=-6.28,106.78',
      lat: -6.2844,
      lng: 106.7836,
    },
    {
      id: 'outlet-bsd',
      name: 'Desserté BSD City',
      address: 'Jl. BSD Grand Boulevard, BSD City, Tangerang Selatan',
      phone: '+62 21 5372-4410',
      hours: 'Mon–Sun: 10:00 – 21:30',
      maps: 'https://maps.google.com/?q=-6.32,106.66',
      lat: -6.3209,
      lng: 106.6657,
    },
    {
      id: 'outlet-bandung',
      name: 'Desserté Bandung',
      address: 'Jl. Riau No. 72, Citarum, Bandung',
      phone: '+62 22 4231-5566',
      hours: 'Mon–Sun: 10:00 – 21:00',
      maps: 'https://maps.google.com/?q=-6.9,107.61',
      lat: -6.9011,
      lng: 107.6123,
    },
  ],

  // ---------------------------------------------------------------------------
  // REVIEWS
  // ---------------------------------------------------------------------------
  reviews: [
    {
      id: 'r1',
      name: 'Siti Rahayu',
      avatar: 'SR',
      rating: 5,
      date: '2 days ago',
      product: 'Chocolate Royale',
      review: 'Benar-benar luar biasa! Chocolate Royale-nya sangat rich dan tidak terlalu manis. Packagingnya juga cantik banget, pas banget buat hadiah.',
    },
    {
      id: 'r2',
      name: 'Budi Santoso',
      avatar: 'BS',
      rating: 5,
      date: '1 week ago',
      product: 'Tiramisu Classic',
      review: 'Tiramisu terenak yang pernah saya coba di Jakarta. Rasanya autentik, tidak terlalu manis, dan teksturnya sempurna. Wajib coba!',
    },
    {
      id: 'r3',
      name: 'Anindita Purnama',
      avatar: 'AP',
      rating: 5,
      date: '3 days ago',
      product: 'Custom Birthday Cake',
      review: 'Pesan custom birthday cake untuk ulang tahun suami dan hasilnya melebihi ekspektasi. Dekorasinya elegan, rasanya enak, dan teamnya sangat responsif.',
    },
    {
      id: 'r4',
      name: 'Kevin Wijaya',
      avatar: 'KW',
      rating: 4,
      date: '5 days ago',
      product: 'Strawberry Cheesecake',
      review: 'Cheesecake-nya enak banget! Creamy dengan strawberry yang segar. Highly recommended untuk pecinta cheesecake.',
    },
    {
      id: 'r5',
      name: 'Dewi Kusuma',
      avatar: 'DK',
      rating: 5,
      date: '1 week ago',
      product: 'Burnt Basque Cheesecake',
      review: 'Burnt Basque-nya luar biasa! Creamy di dalam, karamelized di luar. Ini favorit saya sekarang, selalu repeat order setiap minggu.',
    },
    {
      id: 'r6',
      name: 'Rizky Pratama',
      avatar: 'RP',
      rating: 5,
      date: '2 weeks ago',
      product: 'Matcha Cream Cake',
      review: 'Matcha cake-nya tidak terlalu strong, balance antara manis dan bitter-nya pas banget. Tampilannya juga aesthetic, cocok untuk foto!',
    },
  ],

};

// ---------------------------------------------------------------------------
// DYNAMIC PRODUCTS (Local database synced with localStorage)
// ---------------------------------------------------------------------------
function getStoredProducts() {
  try {
    const custom = JSON.parse(localStorage.getItem('desserte_custom_products') || '[]');
    const deleted = JSON.parse(localStorage.getItem('desserte_deleted_products') || '[]');
    const base = (DESSERTE_DATA.baseProducts || []).filter(p => !deleted.includes(p.id));
    const validCustom = (custom || []).filter(p => !deleted.includes(p.id));
    return [...validCustom, ...base];
  } catch (e) {
    return DESSERTE_DATA.baseProducts || [];
  }
}

Object.defineProperty(DESSERTE_DATA, 'products', {
  get: function() {
    return getStoredProducts();
  },
  set: function(val) {
    this._products = val;
  },
  configurable: true,
  enumerable: true
});

// ---------------------------------------------------------------------------
// ORDERS DATABASE (Stored in localStorage)
// ---------------------------------------------------------------------------
const DEFAULT_SAMPLE_ORDERS = [
  {
    id: '#DS-4021',
    customer: 'Siti Rahayu',
    phone: '0812-3456-7890',
    email: 'siti.rahayu@gmail.com',
    type: 'Delivery',
    address: 'Jl. Senayan No. 12, Jakarta Selatan (Pagar Hitam)',
    payment: 'E-Wallet & QRIS (GoPay)',
    items: 'Chocolate Royale (Slice) x2',
    itemList: [
      { name: 'Chocolate Royale', size: 'Slice', quantity: 2, price: 45000 }
    ],
    subtotal: 90000,
    discount: 0,
    deliveryFee: 15000,
    total: 'Rp 105.000',
    totalNum: 105000,
    customerNotes: 'Minta ekstra sendok dan garpu ya.',
    status: 'processing',
    time: '10 min ago',
    date: 'Hari ini'
  },
  {
    id: '#DS-4020',
    customer: 'Budi Santoso',
    phone: '0813-8899-7711',
    email: 'budi.santoso@yahoo.com',
    type: 'Self-Pickup',
    address: 'Ambil di Outlet Sudirman (Pukul 14:00)',
    payment: 'Bank Transfer (BCA VA)',
    items: 'Tiramisu Classic (Slice) x1',
    itemList: [
      { name: 'Tiramisu Classic', size: 'Slice', quantity: 1, price: 42000 }
    ],
    subtotal: 42000,
    discount: 0,
    deliveryFee: 0,
    total: 'Rp 42.000',
    totalNum: 42000,
    customerNotes: '',
    status: 'preparing',
    time: '25 min ago',
    date: 'Hari ini'
  },
  {
    id: '#DS-4019',
    customer: 'Anindita Purnama',
    phone: '0857-1122-3344',
    email: 'anindita.p@gmail.com',
    type: 'Delivery',
    address: 'Jl. Gandaria 1 No. 5, Jakarta Selatan',
    payment: 'Kartu Kredit',
    items: 'Custom Cake (8") x1',
    itemList: [
      { name: 'Custom Cake (8")', size: '8 inch', quantity: 1, price: 430000, notes: 'Chocolate | Vanilla cream | Birthday | "Happy Bday Kevin"' }
    ],
    subtotal: 430000,
    discount: 0,
    deliveryFee: 0,
    total: 'Rp 430.000',
    totalNum: 430000,
    customerNotes: 'Lilin angka 25 tolong dipastikan ada ya.',
    status: 'delivered',
    time: '1 hr ago',
    date: 'Hari ini'
  },
  {
    id: '#DS-4018',
    customer: 'Kevin Wijaya',
    phone: '0819-0909-1212',
    email: 'kevin.w@outlook.com',
    type: 'Delivery',
    address: 'Apartemen Senopati Suites Tower 2 Lt 15',
    payment: 'E-Wallet & QRIS (OVO)',
    items: 'Strawberry Cheesecake (Slice) x1',
    itemList: [
      { name: 'Strawberry Cheesecake', size: 'Slice', quantity: 1, price: 48000 }
    ],
    subtotal: 48000,
    discount: 0,
    deliveryFee: 15000,
    total: 'Rp 63.000',
    totalNum: 63000,
    customerNotes: '',
    status: 'delivered',
    time: '2 hrs ago',
    date: 'Hari ini'
  }
];

function getStoredOrders() {
  try {
    const raw = localStorage.getItem('desserte_orders');
    if (!raw) {
      localStorage.setItem('desserte_orders', JSON.stringify(DEFAULT_SAMPLE_ORDERS));
      return DEFAULT_SAMPLE_ORDERS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return DEFAULT_SAMPLE_ORDERS;
  }
}

function saveOrders(orders) {
  try {
    localStorage.setItem('desserte_orders', JSON.stringify(orders));
  } catch (e) {
    console.error('Error saving orders', e);
  }
}

DESSERTE_DATA.getStoredProducts = getStoredProducts;
DESSERTE_DATA.getStoredOrders = getStoredOrders;
DESSERTE_DATA.saveOrders = saveOrders;

// Export for module usage or attach to window
if (typeof module !== 'undefined') {
  module.exports = DESSERTE_DATA;
} else {
  window.DESSERTE_DATA = DESSERTE_DATA;
  window.getStoredOrders = getStoredOrders;
  window.saveOrders = saveOrders;
}
