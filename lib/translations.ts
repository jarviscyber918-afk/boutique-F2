// lib/translations.ts

export type Language = "fr" | "ar" | "en";

export interface Translations {
  nav: {
    officialDrop: string;
    dropCode: string;
    dropStatus: string;
    vipLine: string;
    bag: string;
    soundOn: string;
    soundOff: string;
    directConcierge: string;
  };
  hero: {
    badge1: string;
    badge2: string;
    headline1: string;
    headline2: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    countdownLabel: string;
    quotaLabel: string;
    quotaAllocated: string;
    guaranteedStock: string;
    cities: string;
  };
  search: {
    placeholder: string;
    matchingResults: (count: number) => string;
    oneClickHint: string;
    noResults: (query: string) => string;
    quickSuggestions: string;
    suggestFootwear: string;
    suggestClothing: string;
    suggestAccessories: string;
  };
  showcase: {
    officialCollection: string;
    availableItems: string;
    sortLabel: string;
    sortFeatured: string;
    sortPriceLow: string;
    sortPriceHigh: string;
    categories: {
      all: string;
      footwear: string;
      clothing: string;
      accessories: string;
    };
  };
  card: {
    essential: string;
    dropBadge: string;
    remaining: string;
    quickInspect: string;
    orderViaWhatsApp: string;
    addToBag: string;
    addedToBag: string;
  };
  quickView: {
    specTitle: string;
    chooseColor: string;
    chooseSize: string;
    technicalDetails: string;
    orderViaWhatsApp: string;
    addToBag: string;
    added: string;
  };
  cart: {
    title: string;
    itemsAllocated: (count: number) => string;
    freeCourierUnlocked: string;
    addMoreForFreeCourier: (amount: number) => string;
    emptyTitle: string;
    emptyDesc: string;
    exploreBtn: string;
    deliveryToggle: string;
    fullName: string;
    phone: string;
    city: string;
    address: string;
    subtotal: string;
    deliveryFee: string;
    freeFee: string;
    total: string;
    checkoutWhatsApp: string;
    copySummary: string;
    copied: string;
    reset: string;
    stockLockNotice: string;
  };
  lookbook: {
    campaignTag: string;
    title: string;
    description: string;
  };
  manifesto: {
    tag: string;
    title: string;
    description: string;
    pillars: Array<{ title: string; desc: string }>;
  };
  faq: {
    tag: string;
    title: string;
    description: string;
    items: Array<{ question: string; answer: string }>;
    helpTitle: string;
    helpDesc: string;
    helpBtn: string;
  };
  footer: {
    tagline: string;
    deliveryNotice: string;
    quickLinksTitle: string;
    stockItems: string;
    sneakers: string;
    hoodies: string;
    clientService: string;
    vipAlertsTitle: string;
    vipAlertsDesc: string;
    phonePlaceholder: string;
    subscribedMsg: string;
    copyright: string;
    badge: string;
  };
  whatsapp: {
    directOrderTitle: string;
    refLabel: string;
    itemLabel: string;
    sizeLabel: string;
    colorLabel: string;
    priceLabel: string;
    confirmRequest: string;
    cartOrderTitle: string;
    cartDetailsTitle: string;
    totalOrderTitle: string;
    clientDetailsTitle: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  fr: {
    nav: {
      officialDrop: "Drop 04.26 // Officiel",
      dropCode: "DROP 04.26",
      dropStatus: "ALLOCATION EN DIRECT",
      vipLine: "WhatsApp VIP",
      bag: "Panier",
      soundOn: "Couper le son",
      soundOff: "Activer le son",
      directConcierge: "Service Client WhatsApp Direct",
    },
    hero: {
      badge1: "GLOBAL DROP 04.26 // ALLOCATION LIVE",
      badge2: "Zero-Wait WhatsApp Dispatch",
      headline1: "Tactile Aesthetics",
      headline2: "Boutique Essentials.",
      description:
        "Vêtements techniques haute densité, toiles de coton peigné 600GSM et sneakers sculptées avant-garde. Commandez directement en 1 clic via WhatsApp sans perte de temps.",
      primaryCta: "Access Drop 04",
      secondaryCta: "Concierge Order Line",
      countdownLabel: "CLÔTURE DU DROP :",
      quotaLabel: "Quota Alloué",
      quotaAllocated: "87% Réservé",
      guaranteedStock: "Stock Garanti 58 Wilayas",
      cities: "Alger · Oran · Paris",
    },
    search: {
      placeholder: "Rechercher un modèle, couleur, taille...",
      matchingResults: (count) => `Résultats correspondants (${count})`,
      oneClickHint: "Cliquez pour commander en 1-clic",
      noResults: (query) => `Aucun résultat trouvé pour "${query}"`,
      quickSuggestions: "Suggestions rapides :",
      suggestFootwear: "Chaussures & Sneakers",
      suggestClothing: "Hoodies & Vestes",
      suggestAccessories: "Sacs & Accessoires",
    },
    showcase: {
      officialCollection: "COLLECTION OFFICIELLE",
      availableItems: "Articles Disponibles",
      sortLabel: "Tri :",
      sortFeatured: "Tri : Vedettes",
      sortPriceLow: "Prix : Croissant",
      sortPriceHigh: "Prix : Décroissant",
      categories: {
        all: "Tous les Produits",
        footwear: "Chaussures",
        clothing: "Vêtements",
        accessories: "Accessoires",
      },
    },
    card: {
      essential: "ESSENTIEL",
      dropBadge: "DROP",
      remaining: "RESTANTS",
      quickInspect: "Aperçu Rapide",
      orderViaWhatsApp: "Commander via WhatsApp",
      addToBag: "Ajouter au panier",
      addedToBag: "Ajouté au panier",
    },
    quickView: {
      specTitle: "SPÉCIFICATION TECHNIQUE",
      chooseColor: "Couleur :",
      chooseSize: "Choisir la taille",
      technicalDetails: "Détails Techniques & Composition",
      orderViaWhatsApp: "Commander via WhatsApp",
      addToBag: "Panier",
      added: "Ajouté",
    },
    cart: {
      title: "Votre Panier Drop",
      itemsAllocated: (count) =>
        `${count} article${count === 1 ? "" : "s"} sélectionné${count === 1 ? "" : "s"}`,
      freeCourierUnlocked: "Livraison Gratuite 58 Wilayas Débloquée !",
      addMoreForFreeCourier: (amount) =>
        `Ajoutez ${amount.toLocaleString()} DZD pour la livraison gratuite`,
      emptyTitle: "Votre panier est vide",
      emptyDesc: "Sélectionnez un article du DROP 04 pour réserver votre pièce.",
      exploreBtn: "Voir la Collection",
      deliveryToggle: "Ajouter vos coordonnées (Optionnel)",
      fullName: "Nom & Prénom",
      phone: "Numéro WhatsApp",
      city: "Wilaya / Ville",
      address: "Adresse de livraison",
      subtotal: "Sous-total",
      deliveryFee: "Livraison 58 Wilayas",
      freeFee: "GRATUITE",
      total: "Total",
      checkoutWhatsApp: "Commander via WhatsApp",
      copySummary: "Copier le récapitulatif",
      copied: "Copié !",
      reset: "Vider",
      stockLockNotice: "Blocage de stock instantané · Paiement à la livraison",
    },
    lookbook: {
      campaignTag: "CAMPAGNE VISUELLE DROP 04",
      title: "Lookbook Éditorial",
      description:
        "Sélection urbaine capturée à Tokyo, Berlin et Paris. Matériaux haute résistance et finitions brutes.",
    },
    manifesto: {
      tag: "ENGAGEMENT QUALITÉ",
      title: "Des matières d'exception, zéro compromis.",
      description:
        "Boutique Drop conçoit des pièces streetwear techniques résistantes et structurées, pensées pour un usage quotidien intensif. Chaque coupe est calibrée pour un tombé parfait.",
      pillars: [
        {
          title: "Coton Lourd 600GSM",
          desc: "Zéro polyester de remplissage. Coton peigné double-face traité aux enzymes minérales.",
        },
        {
          title: "Expérience Ultra Rapide",
          desc: "Navigation fluide et transmission de commande instantanée par message WhatsApp.",
        },
        {
          title: "Livraison Rapide 58 Wilayas",
          desc: "Expédition sous 24 à 48h avec paiement sécurisé à la livraison partout en Algérie.",
        },
        {
          title: "Séries Strictement Limitées",
          desc: "Éditions numérotées entre 50 et 120 pièces par drop. Aucun réassort.",
        },
      ],
    },
    faq: {
      tag: "GUIDE CLIENT & FOIRE AUX QUESTIONS",
      title: "Questions Fréquentes",
      description:
        "Tout savoir sur les tailles, la livraison 58 Wilayas et la commande WhatsApp.",
      items: [
        {
          question: "Comment fonctionne la commande directe via WhatsApp ?",
          answer:
            "Choisissez votre taille et couleur, puis cliquez sur 'Commander via WhatsApp'. Un message pré-formaté comprenant votre article, sa taille et son prix est envoyé directement à notre service client pour bloquer votre article instantanément.",
        },
        {
          question: "Quels sont les délais de livraison en Algérie et à l'international ?",
          answer:
            "Livraison express 58 Wilayas sous 24 à 48h avec suivi par messagerie. Livraison internationale vers l'Europe et l'Amérique du Nord sous 3 à 4 jours ouvrés via DHL Express.",
        },
        {
          question: "Les pièces sont-elles en édition limitée ?",
          answer:
            "Chaque pièce du DROP 04 est produite en série numérotée (entre 50 et 120 pièces dans le monde). Une fois le stock épuisé, aucune réédition ne sera effectuée.",
        },
        {
          question: "Comment choisir ma taille ?",
          answer:
            "Nos pièces adoptent une coupe contemporaine boxy / décontractée. Si vous préférez une coupe plus ajustée, nous vous conseillons de choisir une taille en dessous de votre taille habituelle.",
        },
      ],
      helpTitle: "Besoin d'un conseil sur votre taille ?",
      helpDesc: "Notre équipe vous répond directement sur WhatsApp.",
      helpBtn: "Discuter sur WhatsApp",
    },
    footer: {
      tagline:
        "Tactile Aesthetics & High-Density Streetwear Essentials. Boutique officielle en ligne avec commande directe 1-clic via WhatsApp.",
      deliveryNotice: "Livraison rapide 58 Wilayas & International",
      quickLinksTitle: "Navigation Rapide",
      stockItems: "Articles en Stock",
      sneakers: "Sneakers & Chaussures",
      hoodies: "Hoodies & Vestes",
      clientService: "Service Client WhatsApp",
      vipAlertsTitle: "Alertes VIP // DROP 05",
      vipAlertsDesc:
        "Recevez un accès prioritaire WhatsApp 30 minutes avant l'ouverture du prochain drop.",
      phonePlaceholder: "Numéro WhatsApp (ex: 0555...)",
      subscribedMsg: "Numéro enregistré avec succès pour le DROP 05.",
      copyright: "Boutique Drop. Tous droits réservés.",
      badge: "Plateforme Optimisée Vibe Coder · 100% Mobile Ready",
    },
    whatsapp: {
      directOrderTitle: "COMMANDE DIRECTE BOUTIQUE DROP",
      refLabel: "Réf :",
      itemLabel: "Article :",
      sizeLabel: "Taille :",
      colorLabel: "Couleur :",
      priceLabel: "Prix :",
      confirmRequest:
        "Bonjour, je souhaite commander cet article. Merci de me confirmer la disponibilité et les modalités de livraison.",
      cartOrderTitle: "NOUVELLE COMMANDE BOUTIQUE",
      cartDetailsTitle: "DÉTAILS DU PANIER",
      totalOrderTitle: "TOTAL COMMANDE",
      clientDetailsTitle: "COORDONNÉES CLIENT",
    },
  },

  ar: {
    nav: {
      officialDrop: "الإصدار 04.26 // رسمي",
      dropCode: "إصدار 04.26",
      dropStatus: "الحجز متاح مباشرة",
      vipLine: "واتساب VIP",
      bag: "السلة",
      soundOn: "كتم الصوت",
      soundOff: "تشغيل الصوت",
      directConcierge: "خدمة الزبائن عبر واتساب",
    },
    hero: {
      badge1: "الإصدار العالمي 04.26 // التوزيع متاح الآن",
      badge2: "إرسال فوري ومباشر عبر واتساب",
      headline1: "جماليات ملموسة",
      headline2: "أساسيات البوتيك.",
      description:
        "أزياء تقنية عالية الكثافة، قطن ممشط ثقيل 600GSM، وأحذية سنيكرز بتصميم مستقبلي. اطلب بنقرة واحدة عبر واتساب مباشرة دون أي انتظار.",
      primaryCta: "تصفح الإصدار 04",
      secondaryCta: "خط الطلبات المباشر",
      countdownLabel: "إغلاق الإصدار خلال :",
      quotaLabel: "الكمية المحجوزة",
      quotaAllocated: "87% محجوز",
      guaranteedStock: "توصيل مضمون لـ 58 ولاية",
      cities: "الجزائر · وهران · باريس",
    },
    search: {
      placeholder: "ابحث عن حذاء، ملابس، مقاس، أو لون...",
      matchingResults: (count) => `النتائج المطابقة (${count})`,
      oneClickHint: "انقر للطلب الفوري بنقرة واحدة",
      noResults: (query) => `لم نتمكن من العثور على نتائج لـ "${query}"`,
      quickSuggestions: "اقتراحات سريعة :",
      suggestFootwear: "أحذية وسنيكرز",
      suggestClothing: "هوديز وسترات",
      suggestAccessories: "حقائب وإكسسوارات",
    },
    showcase: {
      officialCollection: "المجموعة الرسمية",
      availableItems: "القطع المتوفرة",
      sortLabel: "الترتيب :",
      sortFeatured: "الترتيب : المميزة",
      sortPriceLow: "السعر : من الأقل للأعلى",
      sortPriceHigh: "السعر : من الأعلى للأقل",
      categories: {
        all: "الكل",
        footwear: "أحذية",
        clothing: "ملابس",
        accessories: "إكسسوارات",
      },
    },
    card: {
      essential: "أساسي",
      dropBadge: "إصدار",
      remaining: "متبقي",
      quickInspect: "معاينة سريعة",
      orderViaWhatsApp: "اطلب عبر واتساب",
      addToBag: "إضافة إلى السلة",
      addedToBag: "تمت الإضافة للسلة",
    },
    quickView: {
      specTitle: "المواصفات التقنية",
      chooseColor: "اللون :",
      chooseSize: "اختر المقاس",
      technicalDetails: "التفاصيل التقنية ومكونات القماش",
      orderViaWhatsApp: "اطلب الآن عبر واتساب",
      addToBag: "السلة",
      added: "تمت الإضافة",
    },
    cart: {
      title: "سلة المشتريات",
      itemsAllocated: (count) =>
        `${count} ${count === 1 ? "قطعة محددة" : "قطع محددة"}`,
      freeCourierUnlocked: "تم تفعيل التوصيل المجاني لـ 58 ولاية !",
      addMoreForFreeCourier: (amount) =>
        `أضف ${amount.toLocaleString()} دج للحصول على توصيل مجاني`,
      emptyTitle: "سلتك فارغة حالياً",
      emptyDesc: "اختر قطعة من الإصدار 04 لحجز حصتك مباشرة.",
      exploreBtn: "تصفح المجموعة",
      deliveryToggle: "إضافة معلومات التوصيل (اختياري)",
      fullName: "الاسم واللقب",
      phone: "رقم الواتساب",
      city: "الولاية / المدينة",
      address: "عنوان التوصيل",
      subtotal: "المجموع الفرعي",
      deliveryFee: "التوصيل لـ 58 ولاية",
      freeFee: "مجاني",
      total: "المجموع الكلي",
      checkoutWhatsApp: "تأكيد الطلب عبر واتساب",
      copySummary: "نسخ تفاصيل الطلب",
      copied: "تم النسخ !",
      reset: "إفراغ",
      stockLockNotice: "حجز فوري للقطعة · الدفع عند الاستلام يد بيد",
    },
    lookbook: {
      campaignTag: "الحملة البصرية للإصدار 04",
      title: "لوحة الإلهام والأزياء",
      description:
        "جلسات تصوير حضرية في طوكيو، برلين وباريس. أقمشة عالية التحمل وتشطيبات فائقة الجودة.",
    },
    manifesto: {
      tag: "معايير الجودة الفائقة",
      title: "خامات استثنائية، بدون أي تنازل.",
      description:
        "نصمم قطع ستريتوير تقنية عالية التحمل مصممة للاستخدام اليومي المستمر، وبقصّات مدروسة ومثالية.",
      pillars: [
        {
          title: "قطن ثقيل 600GSM",
          desc: "خالٍ من البوليستر. قطن ممشط مزدوج الوجه معالج بالإنزيمات المعدنية.",
        },
        {
          title: "تجربة طلب فائقة السرعة",
          desc: "تصفح مرن مع إرسال تفاصيل الطلب فوراً عبر تطبيق واتساب.",
        },
        {
          title: "توصيل سريع لـ 58 ولاية",
          desc: "شحن خلال 24 إلى 48 ساعة مع الدفع الآمن عند الاستلام.",
        },
        {
          title: "إصدارات محدودة وحصرية",
          desc: "كميات مرقمة بين 50 و120 قطعة فقط لكل إصدار دون إعادة إنتاج.",
        },
      ],
    },
    faq: {
      tag: "دليل الزبائن والأسئلة الشائعة",
      title: "الأسئلة الأكثر تكراراً",
      description:
        "كل ما تحتاج معرفته عن المقاسات، التوصيل لـ 58 ولاية، والطلب عبر واتساب.",
      items: [
        {
          question: "كيف تتم عملية الطلب عبر واتساب ؟",
          answer:
            "اختر المقاس واللون المناسبين ثم اضغط على 'اطلب عبر واتساب'. ستتلقى رسالة منسقة وجاهزة تحتوي على تفاصيل القطعة وسعرها، يتم إرسالها لخدمة العملاء لتأكيد الحجز فوراً.",
        },
        {
          question: "ما هي مدة التوصيل داخل الجزائر وخارجها ؟",
          answer:
            "التوصيل السريع لـ 58 ولاية يتم خلال 24 إلى 48 ساعة مع رقم تتبع. التوصيل الدولي لأوروبا وأمريكا الشمالية يستغرق 3 إلى 4 أيام عمل عبر DHL Express.",
        },
        {
          question: "هل القطع حصرية ومحدودة الكمية ؟",
          answer:
            "نعم، كل قطعة في الإصدار 04 تُنتج بأعداد محدودة جداً (بين 50 و120 قطعة عالمياً)، ولن يُعاد إنتاجها بعد نفاد الكمية.",
        },
        {
          question: "كيف أختار المقاس المناسب ؟",
          answer:
            "قطعنا مصممة بقصّة واسعة عصرية (Boxy Fit). إذا كنت تفضل مقاساً مضبوطاً على الجسم، ننصح باختيار مقاس أصغر بدرجة واحدة.",
        },
      ],
      helpTitle: "هل تحتاج مساعدة في اختيار المقاس ؟",
      helpDesc: "فريقنا متواجد على مدار الساعة للرد على استفساراتك على واتساب.",
      helpBtn: "تحدث معنا على واتساب",
    },
    footer: {
      tagline:
        "جماليات ملموسة وأساسيات ستريتوير عالية الكثافة. متجر رسمي مع طلب مباشر بنقرة واحدة عبر واتساب.",
      deliveryNotice: "توصيل سريع لـ 58 ولاية وشحن دولي",
      quickLinksTitle: "روابط سريعة",
      stockItems: "القطع المتوفرة",
      sneakers: "الأحذية والسنيكرز",
      hoodies: "الهوديز والسترات",
      clientService: "خدمة العملاء على واتساب",
      vipAlertsTitle: "تنبيهات VIP // الإصدار 05",
      vipAlertsDesc:
        "احصل على وصول حصري ومسبق عبر واتساب قبل 30 دقيقة من إطلاق الإصدار القادم.",
      phonePlaceholder: "رقم الواتساب (مثال: 0555...)",
      subscribedMsg: "تم تسجيل رقمك بنجاح للوصول المبكر للإصدار 05.",
      copyright: "بوتيك دروب. جميع الحقوق محفوظة.",
      badge: "منصة متطورة وسريعة الاستجابة 100%",
    },
    whatsapp: {
      directOrderTitle: "طلب مباشر من بوتيك دروب",
      refLabel: "رقم الطلب :",
      itemLabel: "المنتج :",
      sizeLabel: "المقاس :",
      colorLabel: "اللون :",
      priceLabel: "السعر :",
      confirmRequest:
        "مرحباً، أود طلب هذه القطعة. يرجى تأكيد التوفر وتفاصيل التوصيل.",
      cartOrderTitle: "طلب جديد من سلة المشتريات",
      cartDetailsTitle: "تفاصيل المنتجات",
      totalOrderTitle: "المجموع الكلي",
      clientDetailsTitle: "معلومات الزبون",
    },
  },

  en: {
    nav: {
      officialDrop: "Drop 04.26 // Official",
      dropCode: "DROP 04.26",
      dropStatus: "LIVE ALLOCATION",
      vipLine: "WhatsApp VIP",
      bag: "Bag",
      soundOn: "Mute sound",
      soundOff: "Enable sound",
      directConcierge: "Direct WhatsApp VIP Concierge",
    },
    hero: {
      badge1: "GLOBAL DROP 04.26 // ALLOCATION LIVE",
      badge2: "Zero-Wait WhatsApp Dispatch",
      headline1: "Tactile Aesthetics",
      headline2: "Boutique Essentials.",
      description:
        "High-density technical garments, 600GSM custom brushed French terry, and avant-garde sculpted footwear. Experience instantaneous 1-click WhatsApp checkout with zero latency.",
      primaryCta: "Access Drop 04",
      secondaryCta: "Concierge Order Line",
      countdownLabel: "DROP CLOSES IN:",
      quotaLabel: "Total Batch Quota",
      quotaAllocated: "87% Allocated",
      guaranteedStock: "Guaranteed Stock & Express Courier",
      cities: "Algiers · Paris · NYC",
    },
    search: {
      placeholder: "Search sneaker drops, hoodies, sizes...",
      matchingResults: (count) => `Matching Products (${count})`,
      oneClickHint: "Click for instant 1-click order",
      noResults: (query) => `No products found matching "${query}"`,
      quickSuggestions: "Quick suggestions:",
      suggestFootwear: "Footwear & Sneakers",
      suggestClothing: "Hoodies & Jackets",
      suggestAccessories: "Bags & Accessories",
    },
    showcase: {
      officialCollection: "OFFICIAL COLLECTION",
      availableItems: "Available Allocations",
      sortLabel: "Sort:",
      sortFeatured: "Sort: Featured",
      sortPriceLow: "Price: Low to High",
      sortPriceHigh: "Price: High to Low",
      categories: {
        all: "All Products",
        footwear: "Footwear",
        clothing: "Clothing",
        accessories: "Accessories",
      },
    },
    card: {
      essential: "ESSENTIAL",
      dropBadge: "DROP",
      remaining: "LEFT",
      quickInspect: "Quick Inspect",
      orderViaWhatsApp: "Order via WhatsApp",
      addToBag: "Add to Bag",
      addedToBag: "Added to Bag",
    },
    quickView: {
      specTitle: "TECHNICAL SPECIFICATION",
      chooseColor: "Color:",
      chooseSize: "Select Size",
      technicalDetails: "Technical Fabric Breakdown",
      orderViaWhatsApp: "Order via WhatsApp",
      addToBag: "Bag",
      added: "Added",
    },
    cart: {
      title: "Your Drop Bag",
      itemsAllocated: (count) =>
        `${count} unique item${count === 1 ? "" : "s"} allocated`,
      freeCourierUnlocked: "Free Express Courier Unlocked!",
      addMoreForFreeCourier: (amount) =>
        `Add ${amount.toLocaleString()} DZD more for Free Courier`,
      emptyTitle: "Your bag is empty",
      emptyDesc: "Select an item from Drop 04 to reserve your allocation.",
      exploreBtn: "Explore Collection",
      deliveryToggle: "Add Delivery Details (Optional)",
      fullName: "Full Name",
      phone: "WhatsApp Phone",
      city: "City / Wilaya",
      address: "Delivery Address",
      subtotal: "Subtotal",
      deliveryFee: "Express Courier Dispatch",
      freeFee: "COMPLIMENTARY",
      total: "Total Due",
      checkoutWhatsApp: "Instant WhatsApp Checkout",
      copySummary: "Copy Order Summary",
      copied: "Copied!",
      reset: "Reset",
      stockLockNotice: "Direct VIP Stock Lock · Cash on Delivery Available",
    },
    lookbook: {
      campaignTag: "DROP 04 VISUAL CAMPAIGN",
      title: "Sector Archival Lookbook",
      description:
        "Urban styling captured across Tokyo, Berlin, and Paris. High-durability materials with raw finishes.",
    },
    manifesto: {
      tag: "MATERIAL EXCELLENCE",
      title: "Exceptional materials, zero compromise.",
      description:
        "Boutique Drop designs high-tensile technical garments engineered for continuous urban utility. Every silhouette is calibrated for a structured drape.",
      pillars: [
        {
          title: "600GSM Heavyweight Build",
          desc: "Zero polyester fillers. Double-knit brushed combed cotton with mineral acid enzymes.",
        },
        {
          title: "Sub-100ms Tech Stack",
          desc: "Smooth responsive navigation with instant WhatsApp direct order serialization.",
        },
        {
          title: "Fast 58-Wilaya Dispatch",
          desc: "Dispatched in 24 to 48 hours with secure payment on delivery.",
        },
        {
          title: "Strictly Limited Batches",
          desc: "Numbered small runs between 50 and 120 pieces worldwide. No restocks.",
        },
      ],
    },
    faq: {
      tag: "CLIENT FAQ & DROP PROTOCOL",
      title: "Frequently Answered",
      description:
        "Everything you need to know regarding sizing, express dispatch, and WhatsApp checkout.",
      items: [
        {
          question: "How does the 1-Click WhatsApp order flow work?",
          answer:
            "Select your size and color, then tap 'Order via WhatsApp'. A formatted message with your item details, size, and price is generated directly into our concierge chat to lock your stock immediately.",
        },
        {
          question: "What are your shipping timelines?",
          answer:
            "National dispatch across 58 Wilayas in 24–48 hours with courier tracking. International shipping to Europe and North America in 3–4 business days via DHL Express.",
        },
        {
          question: "How limited are DROP 04 releases?",
          answer:
            "Every piece in Drop 04 is produced in strictly limited runs (50 to 120 pieces worldwide). Once stock is depleted, no restocks will take place.",
        },
        {
          question: "What sizing standards do you use?",
          answer:
            "Our pieces feature a contemporary boxy, relaxed drape. If you prefer a closer fit, we recommend sizing down by one size.",
        },
      ],
      helpTitle: "Need a personal sizing recommendation?",
      helpDesc: "Our live VIP concierge is available on WhatsApp.",
      helpBtn: "Chat on WhatsApp",
    },
    footer: {
      tagline:
        "Tactile Aesthetics & High-Density Streetwear Essentials. Official drop platform with 1-Click WhatsApp ordering.",
      deliveryNotice: "Fast courier dispatch across 58 Wilayas & Worldwide",
      quickLinksTitle: "Quick Navigation",
      stockItems: "Available Stock",
      sneakers: "Sneakers & Footwear",
      hoodies: "Hoodies & Outerwear",
      clientService: "WhatsApp Concierge",
      vipAlertsTitle: "VIP Early Access // DROP 05",
      vipAlertsDesc:
        "Receive encrypted access links 30 minutes before the next public drop.",
      phonePlaceholder: "WhatsApp Phone (e.g. 0555...)",
      subscribedMsg: "Successfully registered for DROP 05 VIP access.",
      copyright: "Boutique Drop. All rights reserved.",
      badge: "Vibe Coder Optimized · 100% Mobile Ready",
    },
    whatsapp: {
      directOrderTitle: "BOUTIQUE DROP DIRECT ORDER",
      refLabel: "Ref:",
      itemLabel: "Item:",
      sizeLabel: "Size:",
      colorLabel: "Color:",
      priceLabel: "Price:",
      confirmRequest:
        "Hello! I would like to order this item. Please confirm availability and delivery details.",
      cartOrderTitle: "NEW BOUTIQUE DROP ORDER",
      cartDetailsTitle: "BAG DETAILS",
      totalOrderTitle: "TOTAL DUE",
      clientDetailsTitle: "CUSTOMER LOGISTICS",
    },
  },
};
