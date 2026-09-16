// lib/products.ts

export interface ProductColor {
  name: string;
  hex: string;
  images: string[];
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: "all" | "footwear" | "clothing" | "accessories";
  priceDZD: number;
  priceEUR: number;
  originalPriceDZD?: number;
  colors: ProductColor[];
  sizes: string[];
  stockCount: number;
  isLimitedDrop: boolean;
  dropNumber: string;
  description: string;
  fabricSpecs: string[];
  modelDetails: string;
}

export const STORE_CONFIG = {
  brandName: "BOUTIQUE DROP",
  brandMonogram: "BD",
  brandTagline: "Tactile Aesthetics & High-Density Streetwear Essentials",
  dropCode: "DROP 04.26",
  dropStatus: "ALLOCATION LIVE",
  whatsAppPhone: "+213555123456", // Default Boutique Sales line
  freeShippingThresholdDZD: 35000,
};

export const CATEGORY_TILES = [
  {
    id: "footwear" as const,
    titleFR: "Chaussures & Sneakers",
    titleAR: "الأحذية والسنيكرز",
    titleEN: "Footwear & Sneakers",
    descFR: "Runners sculptés, semelles Vibram® et claquettes",
    descAR: "تصاميم سنيكرز حصرية بنعل فيبرام مريح",
    descEN: "Sculpted runners, Vibram® soles & luxury slides",
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=800&auto=format&fit=crop",
    countBadge: "4 Modèles",
  },
  {
    id: "clothing" as const,
    titleFR: "Vêtements Streetwear",
    titleAR: "الملابس والستريتوير",
    titleEN: "Streetwear Clothing",
    descFR: "Hoodies 600GSM, parkas techniques et cargo pants",
    descAR: "هوديز ثقيلة 600GSM وبناطيل كارجو عالية الجودة",
    descEN: "600GSM heavyweight hoodies, technical parkas & cargoes",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop",
    countBadge: "5 Modèles",
  },
  {
    id: "accessories" as const,
    titleFR: "Accessoires & Carry",
    titleAR: "الإكسسوارات والحقائب",
    titleEN: "Accessories & Carry",
    descFR: "Sacs tactiques Cordura®, casquettes déperlantes",
    descAR: "حقائب كوردورا تكتيكية وقبعات مضادة للماء",
    descEN: "Tactical Cordura® crossbody bags & waterproof caps",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
    countBadge: "3 Modèles",
  },
];

export const PRODUCTS: Product[] = [
  // FOOTWEAR
  {
    id: "nv-matrix-runner",
    name: "Matrix Kinetic Sneaker V2",
    subtitle: "Chunky Avant-Garde Sculpted Footwear",
    category: "footwear",
    priceDZD: 38500,
    priceEUR: 250,
    originalPriceDZD: 44000,
    isLimitedDrop: true,
    stockCount: 4,
    dropNumber: "04.2",
    description: "Semelle géométrique sculptée avec amorti haute restitution Vibram®. Tige en mesh respirant balistique renforcée d'empiècements en cuir suédé italien.",
    fabricSpecs: [
      "Semelle extérieure sculptée Vibram®",
      "Mesh balistique & Daim italien brossé",
      "Système de laçage rapide Speed-Toggle",
      "Semelle intérieure Ortholite® mémoire de forme"
    ],
    modelDetails: "Taille standard. Prenez votre pointure habituelle.",
    sizes: ["40", "41", "42", "43", "44", "45"],
    colors: [
      {
        name: "Triple Black",
        hex: "#1e293b",
        images: [
          "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop"
        ]
      },
      {
        name: "Ice Chalk",
        hex: "#e2e8f0",
        images: [
          "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1000&auto=format&fit=crop"
        ]
      }
    ]
  },
  {
    id: "nv-cyber-low",
    name: "Vortex Low Retro Sneaker",
    subtitle: "Full-Grain Calfskin Everyday Runner",
    category: "footwear",
    priceDZD: 34000,
    priceEUR: 220,
    isLimitedDrop: false,
    stockCount: 8,
    dropNumber: "04.3",
    description: "Sneaker basse épurée en cuir de veau pleine fleur avec semelle cupsole cousue main et perforations respirantes à l'avant.",
    fabricSpecs: [
      "100% Cuir de veau nappa pleine fleur",
      "Doublure intérieure en cuir micro-perforé",
      "Semelle en caoutchouc vulcanisé cousue 360°",
      "Lacets cirés en coton épais"
    ],
    modelDetails: "Pointure exacte standard européenne.",
    sizes: ["40", "41", "42", "43", "44", "45"],
    colors: [
      {
        name: "Blanc Pure & Gomme",
        hex: "#f8fafc",
        images: [
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop"
        ]
      },
      {
        name: "Noir & Platine",
        hex: "#0f172a",
        images: [
          "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop"
        ]
      }
    ]
  },
  {
    id: "nv-runner-slide",
    name: "Vortex Monolith Slide",
    subtitle: "Hydrophobic Sculpted Foam Footwear",
    category: "footwear",
    priceDZD: 16500,
    priceEUR: 110,
    isLimitedDrop: false,
    stockCount: 14,
    dropNumber: "04.4",
    description: "Claquette moulée en composé EVA à cellules fermées avec assise plantaire anatomique et crampons crantés tout-terrain.",
    fabricSpecs: [
      "Mousse EVA bio-sourcée hydrofuge",
      "Voûte plantaire ergonomique sculptée",
      "Semelle crantée antidérapante",
      "Finition texturée mate"
    ],
    modelDetails: "Prenez votre pointure habituelle.",
    sizes: ["40", "41", "42", "43", "44", "45"],
    colors: [
      {
        name: "Slate Onyx",
        hex: "#1e293b",
        images: [
          "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop"
        ]
      },
      {
        name: "Sand Clay",
        hex: "#d6d3d1",
        images: [
          "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop"
        ]
      }
    ]
  },
  {
    id: "nv-tactical-boot",
    name: "Tactile Monolith Combat Boot",
    subtitle: "Ballistic Nylon & Vibram Lug Tread",
    category: "footwear",
    priceDZD: 46000,
    priceEUR: 295,
    isLimitedDrop: true,
    stockCount: 3,
    dropNumber: "04.5",
    description: "Botte urbaine montante en Cordura 1000D et cuir huilé avec fermeture éclair latérale YKK étanche pour chaussage rapide.",
    fabricSpecs: [
      "Semelle commando tout-terrain Vibram®",
      "Cordura® balistique imperméable",
      "Zip latéral d'enfilage rapide YKK®",
      "Semelle anti-perforation et renfort talon"
    ],
    modelDetails: "Chaussant normal. Confort immédiat sans période de rodage.",
    sizes: ["41", "42", "43", "44", "45"],
    colors: [
      {
        name: "Noir Militaire",
        hex: "#0f172a",
        images: [
          "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=1000&auto=format&fit=crop"
        ]
      }
    ]
  },

  // CLOTHING
  {
    id: "nv-parka-01",
    name: "Tactile Modular Parka V1",
    subtitle: "3-Layer Waterproof Technical Outerwear",
    category: "clothing",
    priceDZD: 42500,
    priceEUR: 280,
    originalPriceDZD: 48000,
    isLimitedDrop: true,
    stockCount: 6,
    dropNumber: "04.1",
    description: "Confectionnée en nylon ripstop haute densité 480GSM traité avec membrane déperlante DWR invisible. Dotée de fermetures magnétiques Fidlock® et coutures thermosoudées.",
    fabricSpecs: [
      "100% Nylon Ripstop Cordura® Technique",
      "Boucles magnétiques Fidlock® V-Buckle",
      "Zips étanches AquaGuard® YKK",
      "Sangles de portage internes amovibles"
    ],
    modelDetails: "Le mannequin mesure 1m85 et porte une taille L.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      {
        name: "Noir Onyx",
        hex: "#0f172a",
        images: [
          "https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000&auto=format&fit=crop"
        ]
      },
      {
        name: "Olive Cyber",
        hex: "#3e4637",
        images: [
          "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1000&auto=format&fit=crop"
        ]
      }
    ]
  },
  {
    id: "nv-hoodie-heavy",
    name: "Acid Heavyweight Hoodie",
    subtitle: "600GSM Custom Brushed French Terry",
    category: "clothing",
    priceDZD: 24500,
    priceEUR: 160,
    originalPriceDZD: 29000,
    isLimitedDrop: true,
    stockCount: 9,
    dropNumber: "04.3",
    description: "Sweat à capuche ultra lourd 600GSM double épaisseur traité au délavage minéral vintage. Coupe boxy structurée avec épaules tombantes.",
    fabricSpecs: [
      "100% Coton Peigné Bio (600GSM)",
      "Traitement délavage enzymatique aux acides",
      "Capuche double épaisseur sans cordons agressifs",
      "Embouts métalliques gravés au laser"
    ],
    modelDetails: "Le mannequin mesure 1m80 et porte une taille M pour une coupe boxy.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      {
        name: "Carbon Wash",
        hex: "#334155",
        images: [
          "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1000&auto=format&fit=crop"
        ]
      },
      {
        name: "Vintage Bone",
        hex: "#f1f5f9",
        images: [
          "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop"
        ]
      }
    ]
  },
  {
    id: "nv-tee-box",
    name: "Architectural Oversized Tee",
    subtitle: "300GSM Structured Heavy Jersey",
    category: "clothing",
    priceDZD: 12500,
    priceEUR: 85,
    isLimitedDrop: false,
    stockCount: 15,
    dropNumber: "04.6",
    description: "T-shirt en jersey de coton compact 300GSM avec col renforcé 3cm indéformable et manches mi-longues.",
    fabricSpecs: [
      "100% Coton Lourd Peigné (300GSM)",
      "Traitement silicone anti-boulochage",
      "Logo ton sur ton sérigraphié haute densité",
      "Double surpiqûre aux ourlets"
    ],
    modelDetails: "Le mannequin mesure 1m83 et porte une taille M.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      {
        name: "Blanc Craie",
        hex: "#f8fafc",
        images: [
          "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1000&auto=format&fit=crop"
        ]
      },
      {
        name: "Noir Profond",
        hex: "#0f172a",
        images: [
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop"
        ]
      }
    ]
  },
  {
    id: "nv-cargo-pant",
    name: "Architectural Cargo Trousers",
    subtitle: "Multi-Strap Modular Utility Pants",
    category: "clothing",
    priceDZD: 29500,
    priceEUR: 195,
    isLimitedDrop: true,
    stockCount: 7,
    dropNumber: "04.7",
    description: "Pantalon cargo articulé en sergé de coton japonais 320GSM avec 8 poches compartimentées et serrage réglable aux chevilles.",
    fabricSpecs: [
      "Sergé de Coton Japonais Haute Densité",
      "Anneaux D et quincaillerie en alliage noir mat",
      "Genoux articulés renforcés",
      "Poches 3D à soufflet spacieuses"
    ],
    modelDetails: "Taille 32 / L standard.",
    sizes: ["30", "32", "34", "36"],
    colors: [
      {
        name: "Noir Obsidienne",
        hex: "#1e293b",
        images: [
          "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1584865288642-42078afe6942?q=80&w=1000&auto=format&fit=crop"
        ]
      }
    ]
  },
  {
    id: "nv-heavy-crewneck",
    name: "Boxy Minimalist Crewneck",
    subtitle: "500GSM Terry Minimal Sweatshirt",
    category: "clothing",
    priceDZD: 21000,
    priceEUR: 140,
    isLimitedDrop: false,
    stockCount: 10,
    dropNumber: "04.8",
    description: "Sweatshirt col rond épuré en molleton non brossé lourd avec emmanchures raglan et bord-côtes renforcés.",
    fabricSpecs: [
      "100% Coton peigné compact 500GSM",
      "Coutures flatlock plates anti-frottements",
      "Drape boxy moderne",
      "Prérétréci en usine"
    ],
    modelDetails: "Coupe décontractée fidèle à la taille.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      {
        name: "Gris Ciment",
        hex: "#94a3b8",
        images: [
          "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop"
        ]
      }
    ]
  },

  // ACCESSORIES
  {
    id: "nv-crossbody-pouch",
    name: "Vortex Molle Crossbody Rig",
    subtitle: "Weatherproof Tactical Utility Bag",
    category: "accessories",
    priceDZD: 14500,
    priceEUR: 95,
    isLimitedDrop: true,
    stockCount: 8,
    dropNumber: "04.5",
    description: "Sacoche tactique compacte en Cordura® balistique 1000D avec boucle à ouverture rapide Cobra® et compartiment rembourré.",
    fabricSpecs: [
      "Tissu Cordura® 1000D ultra résistant",
      "Boucle de sécurité tactique rapide",
      "Poche zippée invisible anti-RFID",
      "Sangle ergonomique réglable multiposition"
    ],
    modelDetails: "Taille unique réglable.",
    sizes: ["UNIQUE"],
    colors: [
      {
        name: "Noir Mat",
        hex: "#0f172a",
        images: [
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop"
        ]
      },
      {
        name: "Hazard Orange",
        hex: "#ea580c",
        images: [
          "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop"
        ]
      }
    ]
  },
  {
    id: "nv-tactical-cap",
    name: "Tactile Tactical Structured Cap",
    subtitle: "Water-Repellent Ripstop Headwear",
    category: "accessories",
    priceDZD: 9500,
    priceEUR: 65,
    isLimitedDrop: false,
    stockCount: 20,
    dropNumber: "04.8",
    description: "Casquette 6 panneaux en nylon déperlant avec boucle de serrage métallique et logo gravé.",
    fabricSpecs: [
      "Nylon Ripstop DWR déperlant",
      "Bandeau absorbant CoolMax®",
      "Boucle de réglage arrière en métal noir",
      "Visière pré-incurvée structurée"
    ],
    modelDetails: "Taille unique réglable.",
    sizes: ["UNIQUE"],
    colors: [
      {
        name: "Noir",
        hex: "#0f172a",
        images: [
          "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1534215754734-18e55d13e346?q=80&w=1000&auto=format&fit=crop"
        ]
      }
    ]
  },
  {
    id: "nv-leather-wallet",
    name: "Monolith RFID Tactical Wallet",
    subtitle: "Anodized Aluminum & Bridle Leather",
    category: "accessories",
    priceDZD: 11000,
    priceEUR: 75,
    isLimitedDrop: false,
    stockCount: 16,
    dropNumber: "04.9",
    description: "Porte-cartes ultra fin en aluminium aérospatial anodisé avec éjection mécanique rapide et protection anti-RFID.",
    fabricSpecs: [
      "Boîtier aluminium aéronautique 6061-T6",
      "Capacité 1 à 7 cartes + pince à billets",
      "Mécanisme d'éjection en éventail d'une seule main",
      "Blocage complet des fréquences RFID/NFC"
    ],
    modelDetails: "Dimensions compactes : 10cm x 6cm x 1cm.",
    sizes: ["UNIQUE"],
    colors: [
      {
        name: "Gunmetal",
        hex: "#334155",
        images: [
          "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop"
        ]
      }
    ]
  }
];

export const LOOKBOOK_ITEMS = [
  {
    id: "lb-01",
    title: "NEO-URBAN SECTOR",
    subtitle: "Tactile Modular Parka & Acid Heavyweight Hoodie",
    image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1200&auto=format&fit=crop",
    location: "Tokyo, Japan",
    tag: "LOOK 01 // UTILITY"
  },
  {
    id: "lb-02",
    title: "METALLIC RUNNER",
    subtitle: "Matrix Runner V2 paired with Molle Rig",
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1200&auto=format&fit=crop",
    location: "Berlin, Germany",
    tag: "LOOK 02 // FOOTWEAR"
  },
  {
    id: "lb-03",
    title: "VINTAGE MINERAL PATINA",
    subtitle: "600GSM custom enzyme acid treatment details",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1200&auto=format&fit=crop",
    location: "Paris, France",
    tag: "LOOK 03 // TEXTILE"
  }
];

export const FAQ_DATA = [
  {
    question: "Comment fonctionne la commande directe via WhatsApp ?",
    answer: "Choisissez votre taille et couleur, puis cliquez sur 'Commander via WhatsApp'. Un message pré-formaté comprenant votre article, sa taille et son prix est envoyé directement à notre service client pour bloquer votre article instantanément."
  },
  {
    question: "Quels sont les délais de livraison en Algérie et à l'international ?",
    answer: "Livraison express 58 Wilayas sous 24 à 48h avec suivi par messagerie. Livraison internationale vers l'Europe et l'Amérique du Nord sous 3 à 4 jours ouvrés via DHL Express."
  },
  {
    question: "Les pièces sont-elles en édition limitée ?",
    answer: "Chaque pièce du DROP 04 est produite en série numérotée (entre 50 et 120 pièces dans le monde). Une fois le stock épuisé, aucune réédition ne sera effectuée."
  },
  {
    question: "Comment choisir ma taille ?",
    answer: "Nos pièces adoptent une coupe contemporaine boxy / décontractée. Si vous préférez une coupe plus ajustée, nous vous conseillons de choisir une taille en dessous de votre taille habituelle."
  }
];
