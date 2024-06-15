type Product = {
  id: number;
  title: string;
  desc?: string;
  img?: string;
  price: number;
  options?: { title: string; additionalPrice: number }[];
};

type Products = Product[];

export const featuredProducts: Products = [
  {
    id: 1,
    title: "Prezola",
    desc: "Ignite your taste buds with a fiery combination of spicy pepperoni, jalapeños, crushed red pepper flakes, and melted mozzarella cheese, delivering a kick with every bite.",
    img: "/temporary/p1.png",
    price: 24.9,
    options: [
      {
        title: "Small",
        additionalPrice: 0,
      },
      {
        title: "Medium",
        additionalPrice: 4,
      },
      {
        title: "Large",
        additionalPrice: 6,
      },
    ],
  },
  {
    id: 2,
    title: "Bacon Deluxe",
    desc: "Indulge in smoky goodness with a flame-grilled beef patty, topped with crispy bacon, melted cheddar cheese, caramelized onions, and a smattering of tangy BBQ sauce.",
    img: "/temporary/p2.png",
    price: 29.9,
    options: [
      {
        title: "Small",
        additionalPrice: 0,
      },
      {
        title: "Medium",
        additionalPrice: 4,
      },
      {
        title: "Large",
        additionalPrice: 6,
      },
    ],
  },
  {
    id: 3,
    title: "Bella Napoli",
    desc: "A classic Italian delight featuring a thin, crispy crust, tangy tomato sauce, fresh mozzarella, and a medley of aromatic herbs topped with lettuce, tomatoes, and a dollop of tangy mayo.",
    img: "/temporary/p3.png",
    price: 24.9,
    options: [
      {
        title: "Small",
        additionalPrice: 0,
      },
      {
        title: "Medium",
        additionalPrice: 4,
      },
      {
        title: "Large",
        additionalPrice: 6,
      },
    ],
  },
  {
    id: 4,
    title: "Spicy Arrabbiata",
    desc: "Ignite your taste buds with this fiery pasta creation, combining penne in a spicy tomato sauce infused with garlic, red chili flakes, and fresh basil for the ultimate comfort food experience.",
    img: "/temporary/p4.png",
    price: 26.9,
    options: [
      {
        title: "Small",
        additionalPrice: 0,
      },
      {
        title: "Medium",
        additionalPrice: 4,
      },
      {
        title: "Large",
        additionalPrice: 6,
      },
    ],
  },
  {
    id: 5,
    title: "Jalapeño Fiesta",
    desc: "Ignite your taste buds with a fiery kick! This burger features a succulent beef patty, fiery jalapeños, pepper jack cheese, and a zesty chipotle mayo sauce , and all the classic fixings on a toasted bun.",
    img: "/temporary/p5.png",
    price: 29.9,
    options: [
      {
        title: "Small",
        additionalPrice: 0,
      },
      {
        title: "Medium",
        additionalPrice: 4,
      },
      {
        title: "Large",
        additionalPrice: 6,
      },
    ],
  },
  {
    id: 6,
    title: "Margherita Magic",
    desc: "A timeless favorite with a twist, showcasing a thin crust topped with sweet tomatoes, fresh basil, creamy mozzarella, and a drizzle of extra virgin olive oil, fresh arugula, and a drizzle of balsamic glaze.",
    img: "/temporary/p6.png",
    price: 24.9,
    options: [
      {
        title: "Small",
        additionalPrice: 0,
      },
      {
        title: "Medium",
        additionalPrice: 4,
      },
      {
        title: "Large",
        additionalPrice: 6,
      },
    ],
  },
  {
    id: 7,
    title: "Garlic Parmesan Linguine",
    desc: "A garlic lover's delight, featuring linguine smothered in a creamy Parmesan sauce, infused with garlic and garnished with chopped parsley, bell peppers, and cherry tomatoes.",
    img: "/temporary/p7.png",
    price: 28.9,
    options: [
      {
        title: "Small",
        additionalPrice: 0,
      },
      {
        title: "Medium",
        additionalPrice: 4,
      },
      {
        title: "Large",
        additionalPrice: 6,
      },
    ],
  },
  {
    id: 8,
    title: "Mediterranean Delight",
    desc: "Embark on a culinary journey with this Mediterranean-inspired creation, featuring zesty feta cheese, Kalamata olives, sun-dried tomatoes, and a sprinkle of oregano.",
    img: "/temporary/p8.png",
    price: 32.9,
    options: [
      {
        title: "Small",
        additionalPrice: 0,
      },
      {
        title: "Medium",
        additionalPrice: 4,
      },
      {
        title: "Large",
        additionalPrice: 6,
      },
    ],
  },
  {
    id: 9,
    title: "Hawaiian Teriyaki",
    desc: "Experience a taste of the tropics with a juicy beef patty glazed in tangy teriyaki sauce, topped with grilled pineapple, crispy bacon, and fresh lettuce, and all the classic fixings on a toasted bun.",
    img: "/temporary/p9.png",
    price: 29.9,
    options: [
      {
        title: "Small",
        additionalPrice: 0,
      },
      {
        title: "Medium",
        additionalPrice: 4,
      },
      {
        title: "Large",
        additionalPrice: 6,
      },
    ],
  },
];

export const pizzas: Products = [
  {
    id: 1,
    title: "Sicilian",
    desc: "Ignite your taste buds with a fiery combination of spicy pepperoni, jalapeños, crushed red pepper flakes, and melted mozzarella cheese, delivering a kick with every bite.",
    img: "/temporary/p1.png",
    price: 24.9,
    options: [
      {
        title: "Small",
        additionalPrice: 0,
      },
      {
        title: "Medium",
        additionalPrice: 4,
      },
      {
        title: "Large",
        additionalPrice: 6,
      },
    ],
  },
  {
    id: 2,
    title: "Mediterranean Delight",
    desc: "Embark on a culinary journey with this Mediterranean-inspired creation, featuring zesty feta cheese, Kalamata olives, sun-dried tomatoes, and a sprinkle of oregano.",
    img: "/temporary/p8.png",
    price: 32.9,
    options: [
      {
        title: "Small",
        additionalPrice: 0,
      },
      {
        title: "Medium",
        additionalPrice: 4,
      },
      {
        title: "Large",
        additionalPrice: 6,
      },
    ],
  },
  {
    id: 3,
    title: "Bella Napoli",
    desc: "A classic Italian delight featuring a thin, crispy crust, tangy tomato sauce, fresh mozzarella, and a medley of aromatic herbs topped with lettuce, tomatoes, and a dollop of tangy mayo.",
    img: "/temporary/p3.png",
    price: 26.9,
    options: [
      {
        title: "Small",
        additionalPrice: 0,
      },
      {
        title: "Medium",
        additionalPrice: 4,
      },
      {
        title: "Large",
        additionalPrice: 6,
      },
    ],
  },
  {
    id: 4,
    title: "Pesto Primavera",
    desc: "A classic Italian delight featuring a thin, crispy crust, tangy tomato sauce, fresh mozzarella, and a medley of aromatic herbs topped with lettuce, tomatoes, and a dollop of tangy mayo.",
    img: "/temporary/p10.png",
    price: 28.9,
    options: [
      {
        title: "Small",
        additionalPrice: 0,
      },
      {
        title: "Medium",
        additionalPrice: 4,
      },
      {
        title: "Large",
        additionalPrice: 6,
      },
    ],
  },
  {
    id: 5,
    title: "Veggie Supreme",
    desc: "A classic Italian delight featuring a thin, crispy crust, tangy tomato sauce, fresh mozzarella, and a medley of aromatic herbs topped with lettuce, tomatoes, and a dollop of tangy mayo.",
    img: "/temporary/p11.png",
    price: 24.9,
    options: [
      {
        title: "Small",
        additionalPrice: 0,
      },
      {
        title: "Medium",
        additionalPrice: 4,
      },
      {
        title: "Large",
        additionalPrice: 6,
      },
    ],
  },
  {
    id: 6,
    title: "Four Cheese Fantasy",
    desc: "Experience pure cheesy bliss with a melty blend of mozzarella, cheddar, provolone, and Parmesan cheeses, creating a rich and indulgent pizza experience.",
    img: "/temporary/p12.png",
    price: 22.9,
    options: [
      {
        title: "Small",
        additionalPrice: 0,
      },
      {
        title: "Medium",
        additionalPrice: 4,
      },
      {
        title: "Large",
        additionalPrice: 6,
      },
    ],
  },
];

export const singleProduct: Product = {
  id: 1,
  title: "Sicilian",
  desc: "Ignite your taste buds with a fiery combination of spicy pepperoni, jalapeños, crushed red pepper flakes, and melted mozzarella cheese, delivering a kick with every bite.",
  img: "/temporary/p1.png",
  price: 24.9,
  options: [
    {
      title: "Small",
      additionalPrice: 0,
    },
    {
      title: "Medium",
      additionalPrice: 4,
    },
    {
      title: "Large",
      additionalPrice: 6,
    },
  ],
};

export const designerGlasses: Products = [
  {
    id: 1,
    title: "Chanel Sunglasses",
    desc: "Iconic cat-eye sunglasses with a timeless design and luxurious branding.",
    img: "/temporary/p1.png",
    price: 450,
    options: [
      {
        title: "Black Frame",
        additionalPrice: 0,
      },
      {
        title: "Gold Frame",
        additionalPrice: 20,
      },
      {
        title: "Silver Frame",
        additionalPrice: 15,
      },
    ],
  },
  {
    id: 2,
    title: "Dior Aviator Sunglasses",
    desc: "Classic aviator sunglasses with a sleek metal frame and subtle branding.",
    img: "/glasses/p2.png",
    price: 375,
    options: [
      {
        title: "Gold Frame",
        additionalPrice: 0,
      },
      {
        title: "Silver Frame",
        additionalPrice: 15,
      },
      {
        title: "Black Frame",
        additionalPrice: 10,
      },
    ],
  },
  {
    id: 3,
    title: "Gucci Square Sunglasses",
    desc: "Bold square sunglasses with a distinctive design and iconic Gucci branding.",
    img: "/glasses/p3.png",
    price: 400,
    options: [
      {
        title: "Tortoiseshell Frame",
        additionalPrice: 0,
      },
      {
        title: "Black Frame",
        additionalPrice: 10,
      },
      {
        title: "Gold Frame",
        additionalPrice: 20,
      },
    ],
  },
  {
    id: 4,
    title: "Prada Round Sunglasses",
    desc: "Retro-inspired round sunglasses with a sleek design and subtle Prada branding.",
    img: "/glasses/p4.png",
    price: 350,
    options: [
      {
        title: "Black Frame",
        additionalPrice: 0,
      },
      {
        title: "Gold Frame",
        additionalPrice: 15,
      },
      {
        title: "Silver Frame",
        additionalPrice: 10,
      },
    ],
  },
  {
    id: 5,
    title: "Ray-Ban Wayfarer Sunglasses",
    desc: "Iconic Wayfarer sunglasses with a classic design and timeless appeal.",
    img: "/glasses/rayban.png",
    price: 175,
    options: [
      {
        title: "Black Frame",
        additionalPrice: 0,
      },
      {
        title: "Gold Frame",
        additionalPrice: 10,
      },
      {
        title: "Silver Frame",
        additionalPrice: 5,
      },
    ],
  },
  {
    id: 6,
    title: "Versace Cat-Eye Sunglasses",
    desc: "Elegant cat-eye sunglasses with a sophisticated design and luxurious Versace branding.",
    img: "/glasses/p.png",
    price: 425,
    options: [
      {
        title: "Black Frame",
        additionalPrice: 0,
      },
      {
        title: "Gold Frame",
        additionalPrice: 20,
      },
      {
        title: "Silver Frame",
        additionalPrice: 15,
      },
    ],
  },
  {
    id: 7,
    title: "Fendi Aviator Sunglasses",
    desc: "Classic aviator sunglasses with a sleek metal frame and subtle Fendi branding.",
    img: "/glasses/p6.png",
    price: 375,
    options: [
      {
        title: "Gold Frame",
        additionalPrice: 0,
      },
      {
        title: "Silver Frame",
        additionalPrice: 15,
      },
      {
        title: "Black Frame",
        additionalPrice: 10,
      },
    ],
  },
  {
    id: 8,
    title: "Gucci Round Sunglasses",
    desc: "Retro-inspired round sunglasses with a sleek design and iconic Gucci branding.",
    img: "/glasses/p5.png",
    price: 350,
    options: [
      {
        title: "Tortoiseshell Frame",
        additionalPrice: 0,
      },
      {
        title: "Black Frame",
        additionalPrice: 10,
      },
      {
        title: "Gold Frame",
        additionalPrice: 20,
      },
    ],
  },
  {
    id: 9,
    title: "Prada Aviator Sunglasses",
    desc: "Classic aviator sunglasses with a sleek metal frame and subtle Prada branding.",
    img: "/glasses/Prada.png",
    price: 375,
    options: [
      {
        title: "Gold Frame",
        additionalPrice: 0,
      },
      {
        title: "Silver Frame",
        additionalPrice: 15,
      },
      {
        title: "Black Frame",
        additionalPrice: 10,
      },
    ],
  },
];

type Menu = {
  id: number;
  slug: string;
  title: string;
  desc?: string;
  img?: string;
  color: string;
}[];

export const menu: Menu = [
  {
    id: 1,
    slug: "lifestyle",
    title: "Lifestyle Products",
    desc: "Enhance your life with stylish, functional lifestyle products.",
    img: "/temporary/m1.png",
    color: "white",
  },
  {
    id: 2,
    slug: "Awareness",
    title: "Health and Wellness",
    desc: "Prioritize health with our wellness and fitness essentials.",
    img: "/temporary/m2.png",
    color: "black",
  },
  {
    id: 3,
    slug: "Self Development",
    title: "Increase Intelligent Quotient",
    desc: "Boost your IQ with brain-training tools and educational resources.",
    img: "/temporary/m3.png",
    color: "white",
  },
];

export const womenBags = [
  {
    id: 1,
    title: "Chanel Classic Flap Bag",
    desc: "Timeless elegance with luxurious quilting and iconic CC logo.",
    img: "/bags/chanel.png",
    price: 5000,
    options: [
      {
        title: "Black Leather",
        additionalPrice: 0,
      },
      {
        title: "Beige Leather",
        additionalPrice: 200,
      },
      {
        title: "Red Leather",
        additionalPrice: 300,
      },
    ],
  },
  {
    id: 2,
    title: "Louis Vuitton Speedy 30",
    desc: "Classic monogram canvas with spacious interior and sturdy handles.",
    img: "/bags/louis_v.png",
    price: 1500,
    options: [
      {
        title: "Monogram Canvas",
        additionalPrice: 0,
      },
      {
        title: "Damier Ebene",
        additionalPrice: 100,
      },
      {
        title: "Damier Azur",
        additionalPrice: 150,
      },
    ],
  },
  {
    id: 3,
    title: "Gucci Marmont Matelassé",
    desc: "Softly structured with chevron matelassé leather and GG logo.",
    img: "/bags/gucci.png",
    price: 2500,
    options: [
      {
        title: "Black Leather",
        additionalPrice: 0,
      },
      {
        title: "White Leather",
        additionalPrice: 150,
      },
      {
        title: "Pink Leather",
        additionalPrice: 200,
      },
    ],
  },
  {
    id: 4,
    title: "Prada Saffiano Tote",
    desc: "Structured tote with durable saffiano leather and gold-tone hardware.",
    img: "/bags/Medium-717446DTI0W7715_A.png",
    price: 3000,
    options: [
      {
        title: "Black Leather",
        additionalPrice: 0,
      },
      {
        title: "Blue Leather",
        additionalPrice: 150,
      },
      {
        title: "Red Leather",
        additionalPrice: 200,
      },
    ],
  },
  {
    id: 6,
    title: "Fendi Peekaboo",
    desc: "Elegant and versatile with distinctive twist-lock closure and partitioned interior.",
    img: "/bags/8BN335ARNMF1OQA_01.png",
    price: 4500,
    options: [
      {
        title: "Black Leather",
        additionalPrice: 0,
      },
      {
        title: "Brown Leather",
        additionalPrice: 200,
      },
      {
        title: "Pink Leather",
        additionalPrice: 300,
      },
    ],
  },
  {
    id: 8,
    title: "Balenciaga City Bag",
    desc: "Urban chic with distinctive hardware and spacious interior.",
    img: "/bags/balenciaga.png",
    price: 2100,
    options: [
      {
        title: "Black Leather",
        additionalPrice: 0,
      },
      {
        title: "Blue Leather",
        additionalPrice: 150,
      },
      {
        title: "Grey Leather",
        additionalPrice: 200,
      },
    ],
  },
  {
    id: 9,
    title: "Dior Lady Dior",
    desc: "Iconic design with cannage stitching and charming Dior charms.",
    img: "/bags/dior.png",
    price: 4000,
    options: [
      {
        title: "Black Leather",
        additionalPrice: 0,
      },
      {
        title: "Red Leather",
        additionalPrice: 200,
      },
      {
        title: "White Leather",
        additionalPrice: 250,
      },
    ],
  },
];

export const selfDevelopmentBooks = [
  {
    id: 1,
    title: "Atomic Habits",
    desc: "Transform your life with small, easy changes. Discover the power of habits and how to build them.",
    img: "/books/atomic_habits.png",
    price: 20,
    options: [
      {
        title: "Hardcover",
        additionalPrice: 5,
      },
      {
        title: "Paperback",
        additionalPrice: 0,
      },
      {
        title: "eBook",
        additionalPrice: -5,
      },
    ],
  },
  {
    id: 2,
    title: "The Power of Now",
    desc: "Achieve spiritual enlightenment and mindfulness. Learn to live in the present moment.",
    img: "/books/power-now.png",
    price: 18,
    options: [
      {
        title: "Hardcover",
        additionalPrice: 5,
      },
      {
        title: "Paperback",
        additionalPrice: 0,
      },
      {
        title: "eBook",
        additionalPrice: -5,
      },
    ],
  },
  {
    id: 3,
    title: "Think and Grow Rich",
    desc: "Unlock the secrets to financial success and personal achievement with timeless principles.",
    img: "/books/lf.png",
    price: 15,
    options: [
      {
        title: "Hardcover",
        additionalPrice: 5,
      },
      {
        title: "Paperback",
        additionalPrice: 0,
      },
      {
        title: "eBook",
        additionalPrice: -5,
      },
    ],
  },
  {
    id: 4,
    title: "The 7 Habits of Highly Effective People",
    desc: "Develop powerful habits that lead to personal and professional success. A must-read classic.",
    img: "/books/seven-habits.png",
    price: 25,
    options: [
      {
        title: "Hardcover",
        additionalPrice: 5,
      },
      {
        title: "Paperback",
        additionalPrice: 0,
      },
      {
        title: "eBook",
        additionalPrice: -5,
      },
    ],
  },
  {
    id: 5,
    title: "Mindset: The New Psychology of Success",
    desc: "Learn how the right mindset can transform your life and drive success in various areas.",
    img: "/books/mindset.png",
    price: 22,
    options: [
      {
        title: "Hardcover",
        additionalPrice: 5,
      },
      {
        title: "Paperback",
        additionalPrice: 0,
      },
      {
        title: "eBook",
        additionalPrice: -5,
      },
    ],
  },
  {
    id: 6,
    title: "Grit: The Power of Passion and Perseverance",
    desc: "Discover the power of perseverance and passion to achieve long-term goals.",
    img: "/books/Grit.png",
    price: 24,
    options: [
      {
        title: "Hardcover",
        additionalPrice: 5,
      },
      {
        title: "Paperback",
        additionalPrice: 0,
      },
      {
        title: "eBook",
        additionalPrice: -5,
      },
    ],
  },
  {
    id: 7,
    title: "You Are a Badass",
    desc: "Stop doubting your greatness and start living an awesome life with this motivating guide.",
    img: "/books/you_badass.png",
    price: 19,
    options: [
      {
        title: "Hardcover",
        additionalPrice: 5,
      },
      {
        title: "Paperback",
        additionalPrice: 0,
      },
      {
        title: "eBook",
        additionalPrice: -5,
      },
    ],
  },
  {
    id: 8,
    title: "Daring Greatly",
    desc: "Learn how vulnerability can be a strength and lead to a more fulfilling life.",
    img: "/books/web36.png",
    price: 23,
    options: [
      {
        title: "Hardcover",
        additionalPrice: 5,
      },
      {
        title: "Paperback",
        additionalPrice: 0,
      },
      {
        title: "eBook",
        additionalPrice: -5,
      },
    ],
  },
  {
    id: 9,
    title: "The Subtle Art of Not Giving a F*ck",
    desc: "Embrace a counterintuitive approach to living a good life with less stress and more freedom.",
    img: "/books/thesubtleart.png",
    price: 21,
    options: [
      {
        title: "Hardcover",
        additionalPrice: 5,
      },
      {
        title: "Paperback",
        additionalPrice: 0,
      },
      {
        title: "eBook",
        additionalPrice: -5,
      },
    ],
  },
];

export const lifestyleProducts = [
  {
    id: 1,
    title: "Piguet",
    desc: "Experience a transformative journey with 'Piguet'. Discover practical strategies to make meaningful changes in your life and build lasting habits.",
    img: "/lifestyle/piguet.png",
    price: 20,
    options: [
      {
        title: "Hardcover",
        additionalPrice: 5,
      },
      {
        title: "Paperback",
        additionalPrice: 0,
      },
      {
        title: "eBook",
        additionalPrice: -5,
      },
    ],
  },
  {
    id: 2,
    title: "Hitman White T-Shirt",
    desc: "Step into style with the Hitman White T-Shirt. Featuring a sleek and minimalist design, this t-shirt combines comfort with a modern aesthetic, perfect for any casual occasion.",
    img: "/lifestyle/hitman_white_men_mockup_400x400.png",
    price: 25,
    options: [
      {
        title: "Small",
        additionalPrice: 0,
      },
      {
        title: "Medium",
        additionalPrice: 0,
      },
      {
        title: "Large",
        additionalPrice: 0,
      },
      {
        title: "Extra Large",
        additionalPrice: 0,
      },
    ],
  },
  {
    id: 3,
    title: "BVLGARI Wrist Watch",
    desc: "Experience timeless elegance with our BVLGARI Wrist Watch. Featuring a luxurious design and impeccable craftsmanship, this watch is the perfect accessory for any occasion.",
    img: "/lifestyle/bulgari-2023-serpenti-tubogas-infinity-p-w-64c7e28c86ce5.png",
    price: 500,
    options: [
      {
        title: "Leather Strap",
        additionalPrice: 0,
      },
      {
        title: "Metal Bracelet",
        additionalPrice: 50,
      },
      {
        title: "Rubber Strap",
        additionalPrice: 20,
      },
    ],
  },
  {
    id: 4,
    title: "The 7 Habits of Highly Effective People",
    desc: "Develop powerful habits that lead to personal and professional success. A must-read classic.",
    img: "/lifestyle/seven-habits.png",
    price: 25,
    options: [
      {
        title: "Hardcover",
        additionalPrice: 5,
      },
      {
        title: "Paperback",
        additionalPrice: 0,
      },
      {
        title: "eBook",
        additionalPrice: -5,
      },
    ],
  },
  {
    id: 5,
    title: "Mindset: The New Psychology of Success",
    desc: "Learn how the right mindset can transform your life and drive success in various areas.",
    img: "/books/mindset.png",
    price: 22,
    options: [
      {
        title: "Hardcover",
        additionalPrice: 5,
      },
      {
        title: "Paperback",
        additionalPrice: 0,
      },
      {
        title: "eBook",
        additionalPrice: -5,
      },
    ],
  },
  {
    id: 6,
    title: "Grit: The Power of Passion and Perseverance",
    desc: "Discover the power of perseverance and passion to achieve long-term goals.",
    img: "/books/Grit.png",
    price: 24,
    options: [
      {
        title: "Hardcover",
        additionalPrice: 5,
      },
      {
        title: "Paperback",
        additionalPrice: 0,
      },
      {
        title: "eBook",
        additionalPrice: -5,
      },
    ],
  },
  {
    id: 7,
    title: "You Are a Badass",
    desc: "Stop doubting your greatness and start living an awesome life with this motivating guide.",
    img: "/books/you_badass.png",
    price: 19,
    options: [
      {
        title: "Hardcover",
        additionalPrice: 5,
      },
      {
        title: "Paperback",
        additionalPrice: 0,
      },
      {
        title: "eBook",
        additionalPrice: -5,
      },
    ],
  },
  {
    id: 8,
    title: "Daring Greatly",
    desc: "Learn how vulnerability can be a strength and lead to a more fulfilling life.",
    img: "/books/web36.png",
    price: 23,
    options: [
      {
        title: "Hardcover",
        additionalPrice: 5,
      },
      {
        title: "Paperback",
        additionalPrice: 0,
      },
      {
        title: "eBook",
        additionalPrice: -5,
      },
    ],
  },
  {
    id: 9,
    title: "The Subtle Art of Not Giving a F*ck",
    desc: "Embrace a counterintuitive approach to living a good life with less stress and more freedom.",
    img: "/books/thesubtleart.png",
    price: 21,
    options: [
      {
        title: "Hardcover",
        additionalPrice: 5,
      },
      {
        title: "Paperback",
        additionalPrice: 0,
      },
      {
        title: "eBook",
        additionalPrice: -5,
      },
    ],
  },
];
