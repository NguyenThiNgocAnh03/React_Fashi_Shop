export const products = [
  // --- THỜI TRANG NỮ (SWEATERS & DRESSES) ---
  { 
    id: 1, 
    name: "Yellow Twist Sweater", 
    category: "Sweaters", 
    gender: "Women",
    price: 350000, 
    currency: "VND",
    image: "/img/products/product-1.jpg", 
    color: "Yellow",
    status: "Sale",
    sizes: ["S", "M", "L"],
    specs: {
      height: { min: 150, max: 165 },
      weight: { min: 42, max: 58 }
    },
    description: "Women's mustard yellow sweater featuring a wide V-neck and a stylish twist-knot detail at the front hem for a trendy, energetic look.",
    tags: ["sweater", "knitwear", "yellow", "winter clothing", "twist knit", "sale", "women"]
  },
  { 
    id: 2, 
    name: "Pink Lace-Up Sweater", 
    category: "Sweaters", 
    gender: "Women",
    price: 325000, 
    currency: "VND",
    image: "/img/products/product-2.jpg",
    color: "Pink",
    status: "In Stock",
    sizes: ["S", "M"],
    specs: {
      height: { min: 148, max: 160 },
      weight: { min: 40, max: 52 }
    },
    description: "Cropped pastel pink sweater with a charming and attractive open-back design featuring criss-cross lace-up detailing.",
    tags: ["cropped sweater", "croptop", "pink", "lace up", "knitwear", "women clothing", "women"]
  },
  { 
    id: 6, 
    name: "Bear Pattern Cream Sweater", 
    category: "Sweaters", 
    gender: "Women",
    price: 850000, 
    currency: "VND",
    image: "/img/products/product-6.jpg", 
    color: "Cream",
    status: "In Stock",
    sizes: ["S", "M", "L"],
    specs: {
      height: { min: 150, max: 168 },
      weight: { min: 43, max: 60 }
    },
    description: "Crewneck sweater in a cozy cream color, detailed with contrast brown ribbed trim and cute teddy bear graphics on both sleeves.",
    tags: ["bear sweater", "cream", "beige", "crewneck", "korean style", "cute knitwear", "women"]
  },
  {
    id: 10,
    name: "Chiffon Floral Dress",
    category: "Dresses",
    gender: "Women",
    price: 450000,
    currency: "VND",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&auto=format&fit=crop&q=80", 
    color: "Red",
    status: "In Stock",
    sizes: ["S", "M", "L"],
    specs: {
      height: { min: 153, max: 170 },
      weight: { min: 45, max: 58 }
    },
    description: "Elegant white chiffon long dress with gentle floral prints, elastic waist, and vintage puff sleeves.",
    tags: ["dress", "floral", "chiffon", "white dress", "summer", "women"]
  },

  // --- THỜI TRANG NAM (MEN'S WEAR) ---
  {
    id: 11,
    name: "Premium Oxford Cotton Shirt",
    category: "Shirts",
    gender: "Men",
    price: 380000,
    currency: "VND",
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=500&auto=format&fit=crop&q=80", 
    color: "Blue",
    status: "In Stock",
    sizes: ["M", "L", "XL", "XXL"],
    specs: {
      height: { min: 165, max: 185 },
      weight: { min: 55, max: 85 }
    },
    description: "Classic slim-fit Oxford cotton shirt in light blue. Breathable fabric perfect for office wear or formal events.",
    tags: ["shirt", "oxford", "blue shirt", "office", "men", "formal"]
  },
  {
    id: 12,
    name: "Minimalist Black Hoodie",
    category: "Sweaters",
    gender: "Men",
    price: 490000,
    currency: "VND",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&auto=format&fit=crop&q=80", 
    color: "Black",
    status: "Sale",
    sizes: ["M", "L", "XL", "XXL"],
    specs: {
      height: { min: 160, max: 188 },
      weight: { min: 50, max: 90 }
    },
    description: "Heavyweight regular-fit black hoodie made of premium fleece wool. Clean design with front kangaroo pouch pocket.",
    tags: ["hoodie", "black", "fleece", "streetwear", "men", "sale"]
  },
  {
    id: 13,
    name: "Slim Fit Stretch Jeans",
    category: "Pants",
    gender: "Men",
    price: 550000,
    currency: "VND",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format&fit=crop&q=80", 
    color: "Blue",
    status: "In Stock",
    sizes: ["29", "30", "31", "32", "34"],
    specs: {
      height: { min: 165, max: 182 },
      weight: { min: 56, max: 80 }
    },
    description: "Classic dark blue denim jeans with advanced stretch technology for ultimate daily mobility.",
    tags: ["jeans", "denim", "blue jeans", "slim fit", "men"]
  },

  // --- ĐỒ UNISEX (COATS & JACKETS) ---
  { 
    id: 3, 
    name: "Green Khaki Cargo Jacket", 
    category: "Coats & Jackets", 
    gender: "Unisex",
    price: 850000, 
    currency: "VND",
    image: "/img/products/product-3.jpg",
    color: "Green",
    status: "In Stock",
    sizes: ["M", "L", "XL"],
    specs: {
      height: { min: 158, max: 180 },
      weight: { min: 48, max: 78 }
    },
    description: "Heavyweight khaki shirt jacket in olive green, styled with military-inspired front flap pockets. Perfect as a unisex outerwear piece.",
    tags: ["jacket", "khaki", "olive green", "cargo pockets", "outerwear", "unisex"]
  },
  { 
    id: 8, 
    name: "Green Hooded Windbreaker", 
    category: "Coats & Jackets", 
    gender: "Unisex",
    price: 1100000, 
    currency: "VND",
    image: "/img/products/product-8.jpg", 
    color: "Green",
    status: "In Stock",
    sizes: ["S", "M", "L", "XL"],
    specs: {
      height: { min: 155, max: 185 },
      weight: { min: 45, max: 85 }
    },
    description: "Lightweight, 2-layer athletic windbreaker jacket with water-resistant fabric, full-zip closure, and an adjustable hood. Ideal for outdoor activities.",
    tags: ["windbreaker", "light jacket", "water resistant", "hooded jacket", "green jacket", "unisex"]
  },

  // --- PHỤ KIỆN & GIÀY DÉP (ACCESSORIES) ---
  { 
    id: 4, 
    name: "Microfiber Wool Scarf", 
    category: "Accessories", 
    gender: "Unisex",
    price: 1600000, 
    currency: "VND",
    image: "/img/products/product-4.jpg", 
    color: "Gray",
    status: "In Stock",
    sizes: ["Free Size"],
    specs: {
      height: { min: 140, max: 190 },
      weight: { min: 35, max: 100 }
    },
    description: "Premium large-sized winter scarf made of ultra-soft microfiber wool. Features a classic cable knit pattern in a versatile dark gray color.",
    tags: ["scarf", "wool scarf", "gray", "winter accessories", "cable knit", "unisex"]
  },
  { 
    id: 5, 
    name: "Yellow Lettering Baseball Cap", 
    category: "Accessories", 
    gender: "Unisex",
    price: 1100000, 
    currency: "VND",
    image: "/img/products/product-5.jpg", 
    status: "In Stock",
    sizes: ["Adjustable"],
    specs: {
      height: { min: 140, max: 190 },
      weight: { min: 35, max: 100 }
    },
    description: "Bright yellow baseball cap embroidered with minimalist text, featuring a trendy extended adjustable strap at the back.",
    tags: ["hat", "cap", "yellow hat", "baseball cap", "streetwear", "unisex"]
  },
  { 
    id: 7, 
    name: "Yellow Trekking Backpack", 
    category: "Bags & Backpacks", 
    gender: "Unisex",
    price: 1600000, 
    currency: "VND",
    image: "/img/products/product-7.jpg",
    color: "Yellow",
    status: "Sale",
    sizes: ["Large Capacity"],
    specs: {
      height: { min: 150, max: 190 },
      weight: { min: 40, max: 95 }
    },
    description: "Heavy-duty outdoor travel and hiking backpack with a large capacity. Designed in yellow and black with multiple functional compartments.",
    tags: ["backpack", "hiking bag", "travel backpack", "yellow bag", "outdoor gear", "sale", "unisex"]
  },
  { 
    id: 9, 
    name: "Converse High Top Sneakers", 
    category: "Shoes", 
    gender: "Unisex",
    price: 850000, 
    currency: "VND",
    image: "/img/products/product-9.jpg", 
    color: "Yellow",
    status: "In Stock",
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
    specs: {
      height: { min: 145, max: 188 },
      weight: { min: 40, max: 85 }
    },
    description: "Classic high-top canvas sneakers in bright yellow, featuring durable vulcanized rubber soles and the iconic star patch.",
    tags: ["shoes", "converse", "sneakers", "high top", "yellow shoes", "canvas shoes", "unisex"]
  }
];