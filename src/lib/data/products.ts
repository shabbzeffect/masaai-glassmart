import type { Product, ProductCategory } from '@/lib/types';

const img = (id: string) => `https://images.unsplash.com/${id}?q=80&w=1200&auto=format&fit=crop`;

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    name: 'Clear Float Glass',
    slug: 'clear-float-glass',
    group: 'Glass',
    summary: ' distortion-free flat glass for windows, shelving and general glazing.',
    description:
      'Clear float glass is the base material for most glazing work. It can be cut to size, edge-polished, toughened or laminated depending on the application. Use the quote form to confirm thickness and suitability for your project.',
    image: img('photo-1600585154340-be6161a56a0c'),
  },
  {
    name: 'Toughened Glass',
    slug: 'toughened-glass',
    group: 'Glass',
    summary: 'Heat-strengthened safety glass for doors, showers and balustrades.',
    description:
      'Toughened (tempered) glass is heat-treated so it breaks into small granular pieces rather than sharp shards. Required in many door, shower and balustrade applications. Made to measure — confirm sizes before ordering.',
    image: img('photo-1600607687939-ce8a6c25118c'),
  },
  {
    name: 'Laminated Safety Glass',
    slug: 'laminated-safety-glass',
    group: 'Glass',
    summary: 'Two or more panes bonded with an interlayer for security and sound control.',
    description:
      'Laminated glass holds together when broken, making it suitable for skylights, shopfronts, balustrades and areas needing extra security or acoustic control.',
    image: img('photo-1600566753086-00f18fb6b3ea'),
  },
  {
    name: 'Tinted & Solar-Control Glass',
    slug: 'tinted-solar-control-glass',
    group: 'Glass',
    summary: 'Reduce glare and heat gain with bronze, grey, green or coated options.',
    description:
      'Tinted and solar-control glass helps manage glare, heat and privacy. Options include body-tinted and coated low-emissivity glass. Share your orientation and goals for tailored guidance.',
    image: img('photo-1600047509807-ba8f99d2cdde'),
  },
  {
    name: 'Frosted & Patterned Glass',
    slug: 'frosted-patterned-glass',
    group: 'Glass',
    summary: 'Privacy glass for bathrooms, offices and partitions.',
    description:
      'Frosted, etched and patterned glass provides privacy while transmitting light. Suitable for shower screens, office partitions and doors.',
    image: img('photo-1600210492486-724fe5c67fb0'),
  },
  {
    name: 'Mirrors',
    slug: 'mirrors',
    group: 'Glass',
    summary: 'Cut-to-size mirrors with polished edges and fixing options.',
    description:
      'Mirrors cut to size with polished edges, suitable for bathrooms, gyms, wardrobes and commercial interiors. Bevelled and safety-backed options on request.',
    image: img('photo-1618220179428-22790b461013'),
  },
  {
    name: 'Shower Enclosures',
    slug: 'shower-enclosures',
    group: 'Architectural Systems',
    summary: 'Frameless and semi-framed shower screens, made to measure.',
    description:
      'Frameless and semi-framed shower enclosures in toughened safety glass with hardware in chrome, matte black and brushed finishes. Site measurement recommended.',
    image: img('photo-1584622650111-993a426fbf0a'),
  },
  {
    name: 'Office Partitions & Shopfronts',
    slug: 'office-partitions-shopfronts',
    group: 'Architectural Systems',
    summary: 'Frameless partitions, aluminium shopfronts and entrance systems.',
    description:
      'Glass office partitions, aluminium shopfronts and entrance doors for retail and workplaces. Coordinated supply and installation with patch fittings, locks and closers.',
    image: img('photo-1497366216548-37526070297c'),
  },
  {
    name: 'Balustrades & Staircase Glazing',
    slug: 'balustrades-staircase-glazing',
    group: 'Architectural Systems',
    summary: 'Frameless and posted glass balustrades for stairs and balconies.',
    description:
      'Glass balustrades using toughened and laminated safety glass with stainless or aluminium handrails and point fixings. Safety and fixing details confirmed per project.',
    image: img('photo-1600585154526-990dced4db0d'),
  },
  {
    name: 'Aluminium Windows & Doors',
    slug: 'aluminium-windows-doors',
    group: 'Architectural Systems',
    summary: 'Sliding, casement and folding aluminium systems with glazing.',
    description:
      'Aluminium windows and doors fabricated to size with glazing, gaskets, locks and handles. Suitable for homes and commercial buildings.',
    image: img('photo-1600573472592-401b489a3cdc'),
  },
  {
    name: 'Patch Fittings & Door Hardware',
    slug: 'patch-fittings-door-hardware',
    group: 'Hardware & Fittings',
    summary: 'Patch fittings, hinges, handles, locks and floor springs.',
    description:
      'Patch fittings, hinges, lever handles, locks, floor springs and door closers for frameless and framed glass doors. Finishes and load ratings vary — request guidance.',
    image: img('photo-1533090161767-e6ffed986c88'),
  },
  {
    name: 'Sliding Systems & Shower Fittings',
    slug: 'sliding-systems-shower-fittings',
    group: 'Hardware & Fittings',
    summary: 'Sliding door gears, shower hinges, knobs and seals.',
    description:
      'Sliding door tracks and rollers, shower hinges, clamps, knobs, towel bars and seals. Compatible with common glass thicknesses — confirm before ordering.',
    image: img('photo-1502005229762-cf1b2da7c5d6'),
  },
  {
    name: 'Sealants, Gaskets & Accessories',
    slug: 'sealants-gaskets-accessories',
    group: 'Hardware & Fittings',
    summary: 'Silicone sealants, gaskets, tapes, fasteners and tools.',
    description:
      'Structural and weather seal silicones, rubber gaskets, setting blocks, fasteners and installation accessories. Suitable for glazing and aluminium work.',
    image: img('photo-1530124566582-a618bc2615dc'),
  },
];

export const PRODUCTS: Product[] = [
  {
    name: 'Clear Float Glass — Cut to Size',
    slug: 'clear-float-glass-cut-to-size',
    category: 'Clear Float Glass',
    categorySlug: 'clear-float-glass',
    summary: 'Cut and edge-polished clear glass for windows, shelves and tabletops.',
    description:
      'Clear float glass cut to your dimensions with clean arrised or polished edges. Suitable for window replacement, shelving, tabletops and picture framing. For safety-critical locations, consider toughened or laminated options.',
    features: ['Cut to size', 'Arrised or polished edges', 'Multiple thicknesses', 'Drilling and notches on request'],
    applications: ['Windows', 'Shelves', 'Tabletops', 'Picture framing'],
    thicknesses: ['4mm', '5mm', '6mm', '8mm', '10mm', '12mm'],
    finishes: ['Clear'],
    material: 'Soda-lime float glass',
    safetyNotes: 'Annealed glass breaks into sharp pieces. Use toughened or laminated glass where safety glass is required.',
    availability: 'Made to order',
    sku: 'MG-GL-001',
    image: img('photo-1600585154340-be6161a56a0c'),
    related: ['toughened-glass-10mm-frameless-door', 'low-e-double-glazed-unit'],
  },
  {
    name: 'Toughened Glass 10mm — Frameless Door',
    slug: 'toughened-glass-10mm-frameless-door',
    category: 'Toughened Glass',
    categorySlug: 'toughened-glass',
    summary: '10mm toughened safety glass for frameless doors and partitions.',
    description:
      '10mm toughened safety glass processed for frameless doors and partitions, with polished edges and cut-outs for patch fittings. Sizes confirmed from site measurements or approved drawings.',
    features: ['Toughened safety glass', 'Polished edges', 'Cut-outs for patch fittings', 'Made to measure'],
    applications: ['Frameless doors', 'Office partitions', 'Shopfronts'],
    thicknesses: ['8mm', '10mm', '12mm'],
    finishes: ['Clear', 'Frosted', 'Tinted on request'],
    material: 'Toughened soda-lime glass',
    safetyNotes: 'Handle with care before installation. Toughened glass cannot be cut after toughening — all processing first.',
    availability: 'Made to order',
    sku: 'MG-TG-010',
    image: img('photo-1600607687939-ce8a6c25118c'),
    related: ['frameless-shower-screen-8mm', 'glass-balustrade-frameless'],
  },
  {
    name: 'Laminated Safety Glass 6.38mm',
    slug: 'laminated-safety-glass-638',
    category: 'Laminated Safety Glass',
    categorySlug: 'laminated-safety-glass',
    summary: '6.38mm laminated glass that stays in place when broken.',
    description:
      'Two panes bonded with a PVB interlayer. Holds together on impact, suitable for skylights, shopfronts, balustrades and added security. Thicker make-ups available on request.',
    features: ['Stays in place when broken', 'Improved security', 'Better sound reduction', 'UV filtering interlayer'],
    applications: ['Skylights', 'Shopfronts', 'Balustrades', 'Burglar resistance'],
    thicknesses: ['6.38mm', '8.38mm', '10.38mm', '12.38mm+'],
    finishes: ['Clear', 'Opal / frosted interlayer on request'],
    material: 'Laminated annealed / toughened options',
    availability: 'Available on request',
    sku: 'MG-LM-638',
    image: img('photo-1600566753086-00f18fb6b3ea'),
  },
  {
    name: 'Frameless Shower Screen 8mm',
    slug: 'frameless-shower-screen-8mm',
    category: 'Shower Enclosures',
    categorySlug: 'shower-enclosures',
    summary: '8mm toughened shower glass with hinges, seals and support bar.',
    description:
      'Made-to-measure frameless shower screen in 8mm toughened safety glass with wall-to-glass hinges, seals and support arm. Chrome, matte black or brushed nickel hardware subject to availability.',
    features: ['8mm toughened safety glass', 'Wall hinges + seals', 'Support bar', 'Made to measure'],
    applications: ['Residential bathrooms', 'Hotels', 'Gyms'],
    thicknesses: ['8mm', '10mm'],
    finishes: ['Clear', 'Frosted band / full frost on request'],
    availability: 'Made to order',
    sku: 'MG-SH-008',
    image: img('photo-1584622650111-993a426fbf0a'),
    related: ['sliding-shower-door-kit', 'mirror-cut-to-size-polished'],
  },
  {
    name: 'Sliding Shower Door Kit',
    slug: 'sliding-shower-door-kit',
    category: 'Shower Enclosures',
    categorySlug: 'shower-enclosures',
    summary: 'Sliding shower door gear with rollers, track and guides.',
    description:
      'Sliding shower door kit including top track, rollers, guides and seals for 8mm glass. Suitable for wide openings where hinged doors are impractical.',
    features: ['Smooth roller gear', 'For 8mm glass', 'Seals included', 'Multiple lengths'],
    applications: ['Wide shower openings', 'Bathrooms'],
    availability: 'In stock',
    sku: 'MG-HW-SLD01',
    image: img('photo-1502005229762-cf1b2da7c5d6'),
  },
  {
    name: 'Glass Balustrade — Frameless',
    slug: 'glass-balustrade-frameless',
    category: 'Balustrades & Staircase Glazing',
    categorySlug: 'balustrades-staircase-glazing',
    summary: 'Frameless balustrade with base channel or point fixings.',
    description:
      'Frameless glass balustrade using toughened-laminated safety glass in a base channel or on point fixings with handrail options. Fixing method and glass build-up confirmed per location and exposure.',
    features: ['Toughened-laminated safety glass', 'Base channel or spiders', 'Handrail options', 'Site survey available'],
    applications: ['Balconies', 'Staircases', 'Terraces', 'Commercial atria'],
    thicknesses: ['12mm+', '13.52mm+', '17.52mm+'],
    availability: 'Made to order',
    sku: 'MG-BAL-001',
    image: img('photo-1600585154526-990dced4db0d'),
  },
  {
    name: 'Office Glass Partition System',
    slug: 'office-glass-partition-system',
    category: 'Office Partitions & Shopfronts',
    categorySlug: 'office-partitions-shopfronts',
    summary: 'Single-glazed office partitions with doors and manifestation.',
    description:
      'Single-glazed office partitions with aluminium or slimline framing, glass doors, locks and acoustic seals. Frosted banding and branding film options on request.',
    features: ['10–12mm glass', 'Frameless or slim frame', 'Door + ironmongery', 'Manifestation options'],
    applications: ['Offices', 'Meeting rooms', 'Clinics', 'Studios'],
    availability: 'Made to order',
    sku: 'MG-OFF-001',
    image: img('photo-1497366216548-37526070297c'),
  },
  {
    name: 'Aluminium Shopfront System',
    slug: 'aluminium-shopfront-system',
    category: 'Office Partitions & Shopfronts',
    categorySlug: 'office-partitions-shopfronts',
    summary: 'Aluminium shopfront with glass door, closer and lock.',
    description:
      'Aluminium shopfront framing with toughened glass, entrance door, floor spring or closer, lock and handles. Powder-coated colour options subject to availability.',
    features: ['Powder-coated aluminium', 'Toughened glass', 'Door gear included', 'Signage transom option'],
    applications: ['Retail', 'Restaurants', 'Offices'],
    availability: 'Made to order',
    sku: 'MG-SHP-001',
    image: img('photo-1441986300917-64674bd600d8'),
  },
  {
    name: 'Mirror — Cut to Size, Polished',
    slug: 'mirror-cut-to-size-polished',
    category: 'Mirrors',
    categorySlug: 'mirrors',
    summary: 'Mirrors cut to size with polished edges and fixing guidance.',
    description:
      'Float mirrors cut to size with polished edges for bathrooms, wardrobes, gyms and commercial interiors. Safety backing and bevel options on request. Fix with appropriate mirror adhesive and mechanical support.',
    features: ['Cut to size', 'Polished edges', 'Safety backing option', 'Bevel on request'],
    applications: ['Bathrooms', 'Wardrobes', 'Gyms', 'Salons'],
    thicknesses: ['4mm', '5mm', '6mm'],
    availability: 'Made to order',
    sku: 'MG-MR-005',
    image: img('photo-1618220179428-22790b461013'),
  },
  {
    name: 'Patch Fitting Set — Frameless Door',
    slug: 'patch-fitting-set-frameless-door',
    category: 'Patch Fittings & Door Hardware',
    categorySlug: 'patch-fittings-door-hardware',
    summary: 'Top and bottom patch fittings with pivot for 10–12mm glass.',
    description:
      'Patch fitting set for frameless glass doors: top patch, bottom patch with pivot, and optional lock patch. For 10–12mm toughened glass. Finish options subject to availability.',
    features: ['For 10–12mm glass', 'Pivot included', 'Matching finishes', 'Fixings included'],
    applications: ['Frameless doors', 'Office entrances'],
    availability: 'In stock',
    sku: 'MG-HW-PF01',
    image: img('photo-1533090161767-e6ffed986c88'),
  },
  {
    name: 'Floor Spring + Double-Action Set',
    slug: 'floor-spring-double-action',
    category: 'Patch Fittings & Door Hardware',
    categorySlug: 'patch-fittings-door-hardware',
    summary: 'Floor spring with accessories for heavy glass doors.',
    description:
      'Concealed floor spring for double-action glass doors with adjustable closing speed and backcheck. Includes cement box and cover plate. Selection depends on door weight and width.',
    features: ['Adjustable closing', 'Backcheck', 'Cover plates', 'For heavy doors'],
    applications: ['Commercial entrances', 'Shopfronts', 'Offices'],
    availability: 'Available on request',
    sku: 'MG-HW-FS01',
    image: img('photo-1581092160562-40aa08e78837'),
  },
  {
    name: 'Pull Handle — Stainless 600mm',
    slug: 'pull-handle-stainless-600',
    category: 'Patch Fittings & Door Hardware',
    categorySlug: 'patch-fittings-door-hardware',
    summary: '600mm stainless pull handle for glass and timber doors.',
    description:
      'Tubular stainless-steel pull handle, 600mm centres, back-to-back fixings for single or double doors. Suitable for glass doors with pre-drilled holes.',
    features: ['Grade 304 stainless', 'Back-to-back fix', '600mm centres'],
    applications: ['Glass doors', 'Entrances', 'Shopfronts'],
    availability: 'In stock',
    sku: 'MG-HW-PH600',
    image: img('photo-1583847268964-b28dc8f51f92'),
  },
  {
    name: 'Structural Silicone Sealant',
    slug: 'structural-silicone-sealant',
    category: 'Sealants, Gaskets & Accessories',
    categorySlug: 'sealants-gaskets-accessories',
    summary: 'Neutral-cure silicone for glazing and weather sealing.',
    description:
      'Neutral-cure silicone sealant for glass-to-glass, glass-to-aluminium and perimeter weather sealing. Colour and movement capability vary by product — request guidance for structural use.',
    features: ['Neutral cure', 'Weather resistant', 'Glazing compatible'],
    applications: ['Glazing', 'Shopfronts', 'Bathrooms'],
    availability: 'In stock',
    sku: 'MG-AC-SIL01',
    image: img('photo-1530124566582-a618bc2615dc'),
  },
  {
    name: 'Low-E Double-Glazed Unit',
    slug: 'low-e-double-glazed-unit',
    category: 'Tinted & Solar-Control Glass',
    categorySlug: 'tinted-solar-control-glass',
    summary: 'Insulating glass unit for heat and sound control.',
    description:
      'Double-glazed sealed unit with low-emissivity coating and argon-filled cavity options. Made to size for windows, curtain walling and skylights. Spacer, thickness and coating confirmed per performance target.',
    features: ['Low-E coating', 'Insulating cavity', 'Made to size', 'Tint options'],
    applications: ['Windows', 'Curtain walling', 'Skylights'],
    availability: 'Made to order',
    sku: 'MG-IGU-001',
    image: img('photo-1600047509807-ba8f99d2cdde'),
  },
  {
    name: 'Aluminium Sliding Window',
    slug: 'aluminium-sliding-window',
    category: 'Aluminium Windows & Doors',
    categorySlug: 'aluminium-windows-doors',
    summary: 'Two-track aluminium sliding window, glazed to order.',
    description:
      'Two-track aluminium sliding window with rollers, locks and glazing bead. Powder-coated finish and mosquito-screen provision on request. Sizes made to site measurements.',
    features: ['Two-track sliding', 'Lock + rollers', 'Mosquito screen option', 'Made to measure'],
    applications: ['Homes', 'Apartments', 'Offices'],
    availability: 'Made to order',
    sku: 'MG-AL-SW01',
    image: img('photo-1600573472592-401b489a3cdc'),
  },
  {
    name: 'Frosted Privacy Glass — Sandblasted Effect',
    slug: 'frosted-privacy-glass',
    category: 'Frosted & Patterned Glass',
    categorySlug: 'frosted-patterned-glass',
    summary: 'Frosted glass for bathrooms, partitions and doors.',
    description:
      'Frosted-effect glass for privacy while transmitting light. Options include acid-etch style, sandblasted and filmed finishes. Full frost or banded designs.',
    features: ['Privacy + light', 'Easy to clean options', 'Design banding available'],
    applications: ['Bathrooms', 'Office partitions', 'Doors'],
    thicknesses: ['4mm', '5mm', '6mm', '8mm', '10mm'],
    availability: 'Made to order',
    sku: 'MG-FR-001',
    image: img('photo-1600210492486-724fe5c67fb0'),
  },
];

export function getProduct(categorySlug: string, slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.categorySlug === categorySlug && p.slug === slug);
}

export function getCategory(slug: string): ProductCategory | undefined {
  return PRODUCT_CATEGORIES.find((c) => c.slug === slug);
}
