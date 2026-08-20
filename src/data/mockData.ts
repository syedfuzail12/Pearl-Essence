import { CategoryInfo, Product, Testimonial, BlogPost, Coupon, CustomisationEnquiry, Order } from '../types';

export const BRAND_DETAILS = {
  name: 'Pearlessence',
  tagline: 'Modest • Luxe • Timeless • Soft Elegance',
  instagram: '@pearlesseence_co',
  instagramUrl: 'https://www.instagram.com/pearlesseence_co',
  phone: '+91 98450 12345',
  whatsappNumber: '919845012345', // Clean digits for wa.me
  email: 'concierge@pearlessence.co',
  location: 'Bangalore Atelier, Karnataka, India',
  fullAddress: 'Pearlessence Private Studio, 4th Block, Koramangala & Indiranagar, Bangalore, Karnataka 560034, India',
  hours: 'Mon – Sat: 10:00 AM – 7:30 PM IST',
  gstNumber: '29AAACP1234F1Z8',
  deliveryTimeCopy: 'Each Pearlessence abaya is crafted exclusively on order to ensure premium quality and precise finishing. Delivery Time: 15 working days from order confirmation. Kindly note that delivery timelines may vary slightly during peak seasons or festive periods.',
  returnPolicyCopy: 'As all abayas are designed and tailored on order, we do not offer exchanges or returns. We kindly request you to review product details, size charts, and customization options carefully before placing your order.',
  story: 'Pearlessence was created for women who value modesty without compromising on elegance. Each design is inspired by simplicity, femininity, and timeless luxury. We don\'t follow trends — we create pieces meant to stay with you. Every abaya is a reflection of grace, confidence, and quiet strength.'
};

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'linen',
    name: 'Linen Abayas',
    tagline: 'Breathable. Effortless. Everyday elegance.',
    description: 'Breathable. Effortless. Everyday elegance. Pure Belgian & organic washed linens tailored with relaxed silhouettes that stay breezy yet impeccably structured in warm weather.',
    bestFor: 'Ideal for summer & daily wear.',
    heroImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1200&auto=format&fit=crop',
    accentColor: '#D8C9AE'
  },
  {
    id: 'armani',
    name: 'Armani Abayas',
    tagline: 'Structured drape with a polished finish.',
    description: 'Structured drape with a polished finish. Crafted from ultra-smooth heavyweight Armani silk-crepe that resists creasing and flows with authoritative grace.',
    bestFor: 'Perfect for work & formal gatherings.',
    heroImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1200&auto=format&fit=crop',
    accentColor: '#111010'
  },
  {
    id: 'satin',
    name: 'Luxury Satin Abayas',
    tagline: 'Soft sheen, graceful fall, party-ready.',
    description: 'Soft sheen, graceful fall, party-ready. Lustrous duchess and hammered satins engineered to catch candlelight subtly while maintaining a modest, opaque silhouette.',
    bestFor: 'Iftar parties, events, evening wear.',
    heroImage: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1200&auto=format&fit=crop',
    accentColor: '#B49B73'
  },
  {
    id: 'formal',
    name: 'Formal Abayas',
    tagline: 'Minimal silhouettes with refined details.',
    description: 'Minimal silhouettes with refined details. Tailored tailoring lines, subtle pearl edge pipings, and hidden magnetic front closures designed for modern executive elegance.',
    bestFor: 'Office, meetings, elegant occasions.',
    heroImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
    accentColor: '#3A3733'
  },
  {
    id: 'qatar',
    name: 'Qatar Abayas',
    tagline: 'Premium fabric with rich flow and luxury touch.',
    description: 'Premium fabric with rich flow and luxury touch. Sourced directly from premier Gulf mills, featuring traditional Doha cut volume, rich weight, and artisanal handcrafted pearl tassels.',
    bestFor: 'High-end, statement modest wear.',
    heroImage: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1200&auto=format&fit=crop',
    accentColor: '#B49B73'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    slug: 'the-doha-pearl-qatar-abaya',
    name: 'The Doha Pearl Qatar Abaya',
    fabricCategory: 'qatar',
    fabricName: 'Imported Royal Qatar Nida & Pearl Tassels',
    price: 7490,
    originalPrice: 8490,
    isBestseller: true,
    isNewArrival: false,
    inStock: true,
    stockCount: 12,
    leadTimeDays: 15,
    shortDescription: 'Signature wide-flowing Gulf silhouette with subtle ivory hand-stitched pearl droplets along the kimono sleeve.',
    fullDescription: 'The Doha Pearl is our flagship tribute to traditional Gulf craftsmanship. Spun from imported high-density Qatar Nida fabric, it creates an unparalleled liquid cascade as you move. Each sleeve cuff is delicately finished with understated natural freshwater pearl droplets.',
    fabricComposition: '100% Premium Qatar Nida Silk-Crepe (Non-see-through, matte luster)',
    drapeAndFit: 'Generous A-line Gulf cut with wide kimono sleeves. Fits effortlessly over formal layers.',
    occasion: ['Weddings', 'Eid Festivities', 'Luxury Soirées', 'Formal Evenings'],
    careInstructions: [
      'Dry clean recommended to preserve pearl accents',
      'Or gentle hand wash in cold water with mild detergent',
      'Steam iron on low setting from reverse side'
    ],
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop'
    ],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL', 'Custom'],
    colors: [
      { name: 'Midnight Onyx', hex: '#111010' },
      { name: 'Soft Cashmere Beige', hex: '#E8DFCF' },
      { name: 'Deep Espresso', hex: '#2B231D' }
    ],
    customisation: {
      allowLengthAdjustment: true,
      allowSleeveAdjustment: true,
      sleeveStyles: ['Wide Kimono', 'Elasticated Frill', 'Fitted Pearl Button Cuff'],
      embroideryOptions: ['Ivory Pearl Hemline', 'Subtle Tone-on-Tone Threadwork', 'Plain Minimalist'],
      fabricSwapsAvailable: true,
      notesPrompt: 'Specify your exact height and preferred floor clearance.'
    },
    rating: 4.9,
    reviewCount: 38
  },
  {
    id: 'prod-2',
    slug: 'the-elysian-luxury-satin-abaya',
    name: 'The Elysian Luxury Satin Abaya',
    fabricCategory: 'satin',
    fabricName: 'Heavyweight Hammered Duchess Satin',
    price: 6890,
    originalPrice: 7690,
    isBestseller: true,
    isNewArrival: true,
    inStock: true,
    stockCount: 8,
    leadTimeDays: 15,
    shortDescription: 'Captivating soft sheen with fluid drape and detachable belt for Iftar parties and celebratory evenings.',
    fullDescription: 'Crafted from radiant hammered satin, The Elysian offers a subtle, sophisticated glimmer under ambient lighting without being overly glossy. Its tailored shoulder line falls into a dramatic floor-sweeping hem.',
    fabricComposition: '100% Woven Polyester Duchess Satin with peach-skin interior backing',
    drapeAndFit: 'Fluid, weighted drape with optional matching belt to customize the modest silhouette.',
    occasion: ['Iftar Gatherings', 'Eid-ul-Fitr', 'Reception Dinners', 'Special Celebrations'],
    careInstructions: [
      'Dry clean only',
      'Do not wring or tumble dry',
      'Low steam iron inside out'
    ],
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop'
    ],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL', 'Custom'],
    colors: [
      { name: 'Pearl Champagne', hex: '#E8DFCF' },
      { name: 'Smoky Rose', hex: '#C8A99B' },
      { name: 'Obsidian Black', hex: '#111010' }
    ],
    customisation: {
      allowLengthAdjustment: true,
      allowSleeveAdjustment: true,
      sleeveStyles: ['Tiered Bell Sleeve', 'Classic Straight', 'Slim Buttoned'],
      embroideryOptions: ['Clean Minimalist (No embroidery)', 'Subtle Champagne Piping'],
      fabricSwapsAvailable: true
    },
    rating: 5.0,
    reviewCount: 29
  },
  {
    id: 'prod-3',
    slug: 'the-verona-pure-linen-abaya',
    name: 'The Verona Pure Linen Abaya',
    fabricCategory: 'linen',
    fabricName: 'Washed European Flax Linen',
    price: 4990,
    isBestseller: true,
    isNewArrival: false,
    inStock: true,
    stockCount: 15,
    leadTimeDays: 15,
    shortDescription: 'Ultra-breathable washed linen abaya designed for Bangalore summers and effortless weekend brunches.',
    fullDescription: 'The Verona embodies understated organic luxury. Enzyme-washed for unmatched softness from the first wear, this abaya allows natural airflow while preserving clean tailoring lines. Features side pockets and invisible snap buttons.',
    fabricComposition: '100% Pure European Organic Flax Linen (Pre-shrunk)',
    drapeAndFit: 'Relaxed straight cut with relaxed dropped shoulders and deep inseam pockets.',
    occasion: ['Daily Wear', 'Weekend Brunches', 'Summer Travel', 'Casual Outings'],
    careInstructions: [
      'Machine wash gentle cycle cold',
      'Line dry in shade',
      'Embrace natural linen crinkle or warm steam press'
    ],
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1000&auto=format&fit=crop'
    ],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL', 'Custom'],
    colors: [
      { name: 'Oatmeal Sand', hex: '#D8C9AE' },
      { name: 'Sage Mist', hex: '#8A9A83' },
      { name: 'Ink Charcoal', hex: '#3A3733' }
    ],
    customisation: {
      allowLengthAdjustment: true,
      allowSleeveAdjustment: true,
      sleeveStyles: ['Straight Relaxed', 'Turn-back French Cuff', 'Gathered Elastic'],
      embroideryOptions: ['No embroidery', 'Contrast Sand Stitching'],
      fabricSwapsAvailable: false
    },
    rating: 4.8,
    reviewCount: 44
  },
  {
    id: 'prod-4',
    slug: 'the-milanese-armani-crepe-abaya',
    name: 'The Milanese Armani Crepe Abaya',
    fabricCategory: 'armani',
    fabricName: 'Italian Armani Silk-Crepe',
    price: 5890,
    originalPrice: 6490,
    isBestseller: false,
    isNewArrival: true,
    inStock: true,
    stockCount: 10,
    leadTimeDays: 15,
    shortDescription: 'Impeccably sharp drape that resists wrinkles all day. The ultimate choice for corporate poise.',
    fullDescription: 'Crafted for the discerning professional, The Milanese utilizes genuine Armani silk-crepe with a matte micro-texture. It maintains crisp structural geometry from early morning meetings to evening networking events.',
    fabricComposition: '100% Double-face Armani Micro-Crepe (Crease-resistant)',
    drapeAndFit: 'Tailored architectural drape with slim lapels and concealed magnetic front placket.',
    occasion: ['Boardroom Meetings', 'Conferences', 'Formal Dinners', 'Everyday Luxury'],
    careInstructions: [
      'Dry clean or hand wash cold',
      'Hang dry on shaped hanger',
      'Medium heat iron with press cloth'
    ],
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1000&auto=format&fit=crop'
    ],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL', 'Custom'],
    colors: [
      { name: 'Executive Noir', hex: '#111010' },
      { name: 'Muted Taupe', hex: '#8C7F72' },
      { name: 'Navy Slate', hex: '#263140' }
    ],
    customisation: {
      allowLengthAdjustment: true,
      allowSleeveAdjustment: true,
      sleeveStyles: ['Tailored Suit Cuff', 'Straight Minimal', 'Flared Slit Cuff'],
      embroideryOptions: ['Minimal Clean', 'Hidden Monogram Inside Placket'],
      fabricSwapsAvailable: true
    },
    rating: 4.9,
    reviewCount: 22
  },
  {
    id: 'prod-5',
    slug: 'the-athena-minimalist-formal-abaya',
    name: 'The Athena Minimalist Formal Abaya',
    fabricCategory: 'formal',
    fabricName: 'Heavyweight Korean Poly-Crepe with Pearl Trim',
    price: 5490,
    isBestseller: false,
    isNewArrival: false,
    inStock: true,
    stockCount: 14,
    leadTimeDays: 15,
    shortDescription: 'Refined silhouette featuring delicate hand-sewn ivory micro-pearls along the sleeve hem.',
    fullDescription: 'The Athena is designed for the lover of clean lines. The silhouette is sleek and uncluttered, accented only by a single row of genuine freshwater seed pearls along each wrist.',
    fabricComposition: '100% Premium Korean Georgette Crepe (Double Layered Front)',
    drapeAndFit: 'Modest straight cut with gentle flare at the hem. Non-clinging.',
    occasion: ['Office', 'Formal Lunches', 'Seminars', 'Family Gatherings'],
    careInstructions: ['Dry clean only', 'Do not iron directly over pearls'],
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1000&auto=format&fit=crop'
    ],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL', 'Custom'],
    colors: [
      { name: 'Pure Ink', hex: '#111010' },
      { name: 'Alabaster Ivory', hex: '#F5F1E8' }
    ],
    customisation: {
      allowLengthAdjustment: true,
      allowSleeveAdjustment: true,
      sleeveStyles: ['Seed Pearl Cuff', 'Classic Closed', 'Kimono Cut'],
      embroideryOptions: ['Seed Pearls (Standard)', 'Plain (No Pearls)'],
      fabricSwapsAvailable: false
    },
    rating: 4.7,
    reviewCount: 19
  },
  {
    id: 'prod-6',
    slug: 'the-souq-royal-qatar-open-abaya',
    name: 'The Souq Royal Qatar Open Abaya',
    fabricCategory: 'qatar',
    fabricName: 'Rawda Qatar Silk Chiffon & Satin Trim',
    price: 8290,
    originalPrice: 9290,
    isBestseller: true,
    isNewArrival: true,
    inStock: true,
    stockCount: 6,
    leadTimeDays: 15,
    shortDescription: 'High-end statement open abaya with coordinating slip dress option. Rich dramatic sweep.',
    fullDescription: 'Inspired by traditional Doha souq bespoke tailoring, this royal piece features rich panels of Rawda silk chiffon lined with featherweight crepe, accented with champagne gold piping and a matching tie-belt.',
    fabricComposition: '100% Qatar Rawda Chiffon & Poly-Satin trim',
    drapeAndFit: 'Extravagant flowing open front with deep side pleats.',
    occasion: ['Nikah & Weddings', 'Eid Celebrations', 'VIP Galas'],
    careInstructions: ['Specialist dry clean only', 'Store in breathable garment bag'],
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop'
    ],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL', 'Custom'],
    colors: [
      { name: 'Royal Onyx & Gold', hex: '#111010' },
      { name: 'Pearl Beige & Champagne', hex: '#E8DFCF' }
    ],
    customisation: {
      allowLengthAdjustment: true,
      allowSleeveAdjustment: true,
      sleeveStyles: ['Doha Grand Bell', 'Buttoned Satin Cuff'],
      embroideryOptions: ['Champagne Piping', 'Gold Threadwork on Cuffs'],
      fabricSwapsAvailable: true
    },
    rating: 5.0,
    reviewCount: 31
  }
];

export const SIZE_CHART = [
  { size: 'S', bust: '38 in / 96 cm', waist: '40 in / 101 cm', hip: '44 in / 112 cm', shoulder: '14.5 in / 37 cm', sleeve: '22.5 in / 57 cm', standardLength: '52 in / 132 cm', customNote: 'Adjustable length (48–56 in) upon request' },
  { size: 'M', bust: '41 in / 104 cm', waist: '43 in / 109 cm', hip: '47 in / 119 cm', shoulder: '15.5 in / 39 cm', sleeve: '23.0 in / 58 cm', standardLength: '54 in / 137 cm', customNote: 'Adjustable sleeve style & length (+/- 3 in)' },
  { size: 'L', bust: '44 in / 112 cm', waist: '46 in / 117 cm', hip: '50 in / 127 cm', shoulder: '16.5 in / 42 cm', sleeve: '23.5 in / 60 cm', standardLength: '56 in / 142 cm', customNote: 'Free length shortening or extension' },
  { size: 'XL', bust: '48 in / 122 cm', waist: '50 in / 127 cm', hip: '54 in / 137 cm', shoulder: '17.5 in / 44 cm', sleeve: '24.0 in / 61 cm', standardLength: '58 in / 147 cm', customNote: 'Custom bust / waist shaping available' },
  { size: 'XXL', bust: '52 in / 132 cm', waist: '54 in / 137 cm', hip: '58 in / 147 cm', shoulder: '18.5 in / 47 cm', sleeve: '24.5 in / 62 cm', standardLength: '60 in / 152 cm', customNote: 'Custom tailored to exact client measurements' },
  { size: 'Custom', bust: 'Tailored', waist: 'Tailored', hip: 'Tailored', shoulder: 'Tailored', sleeve: 'Tailored', standardLength: 'Tailored to height', customNote: 'Share height + bust via WhatsApp for bespoke cut' }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    customerName: 'Ayesha Khan',
    city: 'Bangalore (Indiranagar)',
    rating: 5,
    productName: 'The Doha Pearl Qatar Abaya',
    fabricCategory: 'qatar',
    comment: 'The quality of the Qatar Nida fabric is out of this world. You cannot find this level of modest luxury in standard stores in Bangalore. The pearl details on the cuffs are so subtle and high-end. Delivered in exactly 15 days in the most beautiful luxury box packaging!',
    source: 'WhatsApp',
    date: 'August 2026',
    isPublished: true
  },
  {
    id: 'test-2',
    customerName: 'Dr. Fatima Zahra',
    city: 'Hyderabad',
    rating: 5,
    productName: 'The Milanese Armani Crepe Abaya',
    fabricCategory: 'armani',
    comment: 'I ordered the Armani Abaya for my hospital conferences. The drape is structured, zero wrinkles even after long shifts, and the modest cut feels so empowering. Customized the sleeve length via WhatsApp and it fits like a dream.',
    source: 'WhatsApp',
    date: 'July 2026',
    isPublished: true
  },
  {
    id: 'test-3',
    customerName: 'Mariam Siddiqui',
    city: 'Dubai / Bangalore',
    rating: 5,
    productName: 'The Elysian Luxury Satin Abaya',
    fabricCategory: 'satin',
    comment: 'Wore this for an Eid celebration in Dubai and received so many compliments. It has that soft candlelight glow without looking loud. Truly quiet luxury. Pearlessence has become my go-to boutique.',
    source: 'Instagram',
    date: 'June 2026',
    isPublished: true
  },
  {
    id: 'test-4',
    customerName: 'Zainab Qureshi',
    city: 'Bangalore (Koramangala)',
    rating: 5,
    productName: 'The Verona Pure Linen Abaya',
    fabricCategory: 'linen',
    comment: 'The Belgian linen is so soft and breathable. In Bangalore weather it feels like a breeze. The craftsmanship is pristine. Worth every single rupee.',
    source: 'Verified Buyer',
    date: 'August 2026',
    isPublished: true
  },
  {
    id: 'test-5',
    customerName: 'Hafsa Rahman',
    city: 'Mumbai',
    rating: 5,
    productName: 'The Souq Royal Qatar Open Abaya',
    fabricCategory: 'qatar',
    comment: 'Ordered custom measurements for my sister\'s Nikah. The owner personally guided me on WhatsApp for shoulder measurements. The finishing is flawless!',
    source: 'WhatsApp',
    date: 'May 2026',
    isPublished: true
  },
  {
    id: 'test-6',
    customerName: 'Tasneem Banu',
    city: 'Calicut, Kerala',
    rating: 5,
    productName: 'The Athena Minimalist Formal Abaya',
    fabricCategory: 'formal',
    comment: 'Minimal, modest, and so elegant. The seed pearls along the wrist add just the right amount of grace. Thank you Pearlessence!',
    source: 'Instagram',
    date: 'April 2026',
    isPublished: true
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'the-definitive-guide-to-abaya-fabrics-linen-armani-qatar-nida',
    title: 'The Definitive Guide to Abaya Fabrics: Linen, Armani Crepe & Qatar Nida',
    excerpt: 'Understanding fabric weight, drape, breathability, and opacity when investing in a timeless modest wardrobe.',
    content: `Modest luxury is anchored in fabric integrity. Unlike fast fashion where synthetic polyester dominates, an abaya tailored from authentic Qatar Nida or Belgian flax linen breathes with you and holds its drape for years.

In this guide, we break down the 5 essential fabrics in the Pearlessence atelier:
1. **Belgian Flax Linen**: The natural cellular structure of flax allows maximum thermal regulation. Perfect for warm climates.
2. **Armani Silk-Crepe**: Twisted micro-yarns create a firm, crease-resistant drape with an architectural silhouette.
3. **Hammered Duchess Satin**: Woven with a soft peach-skin backing to ensure modesty while catching ambient light gracefully.
4. **Korean Formal Georgette Crepe**: Crisp, weighted, and completely opaque with minimal maintenance required.
5. **Doha Qatar Nida**: Sourced directly from Gulf mills, famed for its deep color saturation and rich, liquid flow.`,
    coverImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop',
    publishedAt: 'August 10, 2026',
    readTime: '4 min read',
    author: 'Pearlessence Editorial Team',
    tags: ['Fabric Guide', 'Modest Fashion', 'Luxury Abayas', 'Bangalore'],
    metaTitle: 'The Definitive Guide to Abaya Fabrics | Pearlessence Bangalore',
    metaDescription: 'Learn the differences between Linen, Armani Crepe, Satin, and Qatar Nida abayas from Bangalore modest fashion atelier Pearlessence.'
  },
  {
    id: 'post-2',
    slug: 'styling-your-abaya-for-iftar-eid-5-timeless-looks',
    title: 'Styling Your Abaya for Iftar & Eid: 5 Timeless, Understated Looks',
    excerpt: 'Curate soft elegance for festive evenings using pearl accessories, monochrome hijabs, and fluid textures.',
    content: `Festive modest fashion does not require heavy sequins or loud colors. Quiet luxury embraces tonal layering, delicate pearl accents, and harmonious neutrals like champagne, warm sand, and deep obsidian.

Discover our stylists' top 5 tips for Eid and celebratory evenings:
- **Tonal Hijab Pairing**: Match your silk or chiffon hijab within one shade of your abaya’s dominant tone.
- **Statement Pearl Accents**: Choose single-strand freshwater pearls or minimalist gold cuffs to complement our sleeve details.
- **Slip Dress Coordination**: For open abayas, opt for a bias-cut matte satin inner slip.
- **Footwear Harmony**: Pointed-toe ivory mules or soft leather babouches elevate the floor sweep gracefully.`,
    coverImage: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop',
    publishedAt: 'July 24, 2026',
    readTime: '3 min read',
    author: 'Pearlessence Stylists',
    tags: ['Eid Edit', 'Styling Tips', 'Modest Luxury', 'Bangalore'],
    metaTitle: 'Styling Abayas for Eid & Celebrations | Pearlessence Bangalore',
    metaDescription: 'Discover modest quiet luxury styling tips for Eid, Iftar, and festive dinners with Pearlessence.'
  },
  {
    id: 'post-3',
    slug: 'the-art-of-bespoke-custom-abaya-measurements-guide',
    title: 'The Art of Bespoke: How to Take Exact Measurements for Your Custom Abaya',
    excerpt: 'A step-by-step masterclass on measuring abaya length, shoulder drop, and sleeve span for a flawless tailored fit.',
    content: `Because every Pearlessence abaya is crafted exclusively on order, precision in measurement guarantees a garment that feels bespoke to your posture and style.

Key measurements to know:
1. **Abaya Length**: Measure from the highest point of the shoulder down over the bust to your desired floor clearance (usually 1-2 inches above shoe heel).
2. **Shoulder Width**: Across the back from shoulder bone tip to shoulder bone tip.
3. **Sleeve Length**: From the shoulder bone down over the elbow to the wrist bone.
4. **Bust / Chest**: Around the fullest part of the bust, with comfortable room for layered clothing underneath.`,
    coverImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop',
    publishedAt: 'June 18, 2026',
    readTime: '5 min read',
    author: 'Master Tailor, Pearlessence Atelier',
    tags: ['Size Guide', 'Bespoke Tailoring', 'Custom Abaya', 'Made to Order'],
    metaTitle: 'How to Measure for a Custom Abaya | Pearlessence Size Guide',
    metaDescription: 'Step-by-step guide to measuring yourself for bespoke abayas from Bangalore premier modest atelier.'
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'PEARL10',
    discountPercentage: 10,
    discountType: 'percentage',
    minOrderValue: 4000,
    validUntil: '2026-12-31',
    isActive: true,
    description: '10% off on your first order with Pearlessence'
  },
  {
    code: 'EIDLUXE',
    discountPercentage: 15,
    discountType: 'percentage',
    minOrderValue: 7000,
    validUntil: '2026-09-30',
    isActive: true,
    description: '15% off on orders above ₹7,000 for festive curation'
  },
  {
    code: 'BANGALOREVIP',
    discountPercentage: 0,
    discountType: 'fixed',
    fixedAmount: 500,
    minOrderValue: 5000,
    validUntil: '2026-11-30',
    isActive: true,
    description: 'Flat ₹500 off for Bangalore atelier clientele'
  }
];

export const INITIAL_CUSTOMISATION_ENQUIRIES: CustomisationEnquiry[] = [
  {
    id: 'enq-101',
    createdAt: '2026-08-18T14:30:00Z',
    name: 'Sana Fatima',
    phone: '+91 98451 99882',
    email: 'sana.f@gmail.com',
    productReference: 'The Doha Pearl Qatar Abaya',
    preferredFabric: 'qatar',
    sourcePage: '/shop/product/the-doha-pearl-qatar-abaya',
    notes: 'Height 5ft 8in. Would like abaya length 58 inches with matching raw silk slip and champagne pearl cuffs.',
    status: 'Confirmed',
    budgetEstimate: '₹8,500'
  },
  {
    id: 'enq-102',
    createdAt: '2026-08-19T09:15:00Z',
    name: 'Dr. Rehana Begum',
    phone: '+91 97410 44552',
    preferredFabric: 'armani',
    sourcePage: '/customise',
    notes: 'Executive formal abaya with custom hidden pen pocket and elasticated sleeve for easy wudhu.',
    status: 'New',
    budgetEstimate: '₹6,500'
  },
  {
    id: 'enq-103',
    createdAt: '2026-08-17T18:40:00Z',
    name: 'Zoya Merchant',
    phone: '+91 98200 12890',
    email: 'zoya@merchant.in',
    productReference: 'The Elysian Luxury Satin Abaya',
    preferredFabric: 'satin',
    sourcePage: '/shop/luxury-satin-abayas',
    notes: 'Inquiry for bridal sister party wear. Needs 3 coordinating pieces with customized length for family.',
    status: 'Converted',
    budgetEstimate: '₹22,000'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-8001',
    orderNumber: 'PEARL-8001',
    createdAt: '2026-08-16T11:20:00Z',
    customerName: 'Ayesha Khan',
    customerEmail: 'ayesha.k@outlook.com',
    customerPhone: '+91 98450 67890',
    items: [
      {
        id: 'ci-1',
        productId: 'prod-1',
        product: INITIAL_PRODUCTS[0],
        size: 'M',
        color: 'Midnight Onyx',
        quantity: 1,
        customisationNotes: {
          customLength: '54 inches',
          sleeveStyle: 'Fitted Pearl Button Cuff'
        }
      }
    ],
    subtotal: 7490,
    gstAmount: 374.5,
    shippingFee: 0,
    discountAmount: 749,
    couponCode: 'PEARL10',
    total: 7115.5,
    status: 'In Production',
    paymentStatus: 'Paid',
    paymentMethod: 'Razorpay (UPI / Card / NetBanking)',
    shippingAddress: {
      id: 'addr-1',
      fullName: 'Ayesha Khan',
      phone: '+91 98450 67890',
      line1: 'Flat 402, Prestige Hermitage, Kensington Road',
      line2: 'Near Ulsoor Lake',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560042'
    },
    estimatedDeliveryDate: '2026-08-31',
    trackingNumber: 'DEL-BLR-992140',
    courierName: 'Delhivery Express',
    giftWrapping: true,
    giftNote: 'With warm blessings on your special day.',
    policyAcknowledged: true
  },
  {
    id: 'ord-8002',
    orderNumber: 'PEARL-8002',
    createdAt: '2026-08-18T16:45:00Z',
    customerName: 'Mariam Siddiqui',
    customerEmail: 'mariam.s@gmail.com',
    customerPhone: '+91 98860 33211',
    items: [
      {
        id: 'ci-2',
        productId: 'prod-3',
        product: INITIAL_PRODUCTS[2],
        size: 'L',
        color: 'Oatmeal Sand',
        quantity: 1
      }
    ],
    subtotal: 4990,
    gstAmount: 249.5,
    shippingFee: 0,
    discountAmount: 0,
    total: 5239.5,
    status: 'Confirmed',
    paymentStatus: 'COD - Due on Delivery',
    paymentMethod: 'Cash on Delivery (COD)',
    shippingAddress: {
      id: 'addr-2',
      fullName: 'Mariam Siddiqui',
      phone: '+91 98860 33211',
      line1: 'House 14, 12th Main Road, 4th Block',
      line2: 'Koramangala',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560034'
    },
    estimatedDeliveryDate: '2026-09-02',
    policyAcknowledged: true
  }
];
