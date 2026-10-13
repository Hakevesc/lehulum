'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import { Icon } from './Icon';

const navGroups = [
  {
    label: 'Designer',
    items: [
      { label: 'Design System', href: '/design-system', icon: 'layout' },
      { label: 'Presentation', href: '/presentation', icon: 'smartphone' },
      { label: 'Component Library', href: '/component-library', icon: 'layout' }
    ]
  },
  {
    label: 'Registry',
    items: [
      { label: 'Screens', href: '/presentation?view=screens', icon: 'home' },
      { label: 'Flows', href: '/presentation?view=flows', icon: 'send' },
      { label: 'Scenarios', href: '/presentation?view=scenarios', icon: 'bell' }
    ]
  }
];

export function DesignerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div className="sidebar-brand" style={{ flexShrink: 0 }}>
        <div className="brand-mark">M</div>
        <div className="brand-copy">
          <strong>M-PESA Designer</strong>
          <span>Smart UI System</span>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <ThemeToggle />
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto' }}>
        {navGroups.map((group) => (
          <div key={group.label}>
            <div className="nav-section-label">{group.label}</div>
            {group.items.map((item) => {
              const isActive = pathname === item.href || (item.href === '/presentation' && pathname.startsWith('/presentation'));
              return (
                <Link key={item.href} href={item.href} className={`nav-link ${isActive ? 'active' : ''}`}>
                  <Icon name={item.icon} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </aside>
  );
}