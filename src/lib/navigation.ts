export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; desc?: string }[];
}

export const NAV: NavItem[] = [
  {
    label: 'Products',
    href: '/products',
    children: [
      { label: 'Clear Float Glass', href: '/products/clear-float-glass', desc: 'Cut to size' },
      { label: 'Toughened Glass', href: '/products/toughened-glass', desc: 'Safety glass' },
      { label: 'Laminated Safety Glass', href: '/products/laminated-safety-glass', desc: 'Security + acoustic' },
      { label: 'Shower Enclosures', href: '/products/shower-enclosures', desc: 'Frameless + sliding' },
      { label: 'Office & Shopfronts', href: '/products/office-partitions-shopfronts', desc: 'Workplaces + retail' },
      { label: 'Balustrades', href: '/products/balustrades-staircase-glazing', desc: 'Stairs + balconies' },
      { label: 'Hardware & Fittings', href: '/products/patch-fittings-door-hardware', desc: 'Hinges, locks, handles' },
      { label: 'View all products', href: '/products', desc: 'Full catalogue' },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Glass Cutting', href: '/services/glass-cutting-processing' },
      { label: 'Site Survey', href: '/services/measurement-site-survey' },
      { label: 'Shower Installation', href: '/services/shower-installation' },
      { label: 'Partitions & Shopfronts', href: '/services/partitions-shopfronts-installation' },
      { label: 'Balustrades', href: '/services/balustrade-installation' },
      { label: 'All services', href: '/services' },
    ],
  },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Projects', href: '/projects' },
  { label: 'Resources', href: '/resources' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];
