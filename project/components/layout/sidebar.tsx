"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Home,
  Target,
  BarChart2,
  Settings,
  Menu,
  BookOpen,
  ListTodo,
  LineChart,
  Map
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { useState, useCallback, memo } from 'react';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Goals', href: '/goals', icon: Target },
  { name: 'Features', items: [
    { name: 'SMART Goals', href: '/features/smart-goals', icon: BookOpen },
    { name: 'Task Management', href: '/features/task-management', icon: ListTodo },
    { name: 'Progress Tracking', href: '/features/progress-tracking', icon: LineChart },
    { name: 'Roadmap', href: '/roadmap', icon: Map },
  ]},
  { name: 'Analytics', href: '/analytics', icon: BarChart2 },
  { name: 'Settings', href: '/settings', icon: Settings },
] as const;

// Memoize navigation items to prevent unnecessary re-renders
const NavLink = memo(function NavLink({ 
  href, 
  isActive, 
  isCollapsed, 
  icon: Icon, 
  children 
}: { 
  href: string;
  isActive: boolean;
  isCollapsed: boolean;
  icon: any;
  children?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      prefetch={true}
      className={cn(
        'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent/50',
        isActive ? 'bg-accent text-accent-foreground' : 'transparent',
        isCollapsed ? 'justify-center' : 'justify-start'
      )}
    >
      <Icon className={cn('h-4 w-4', isCollapsed ? 'mx-0' : 'mr-2')} />
      {!isCollapsed && children}
    </Link>
  );
});

export const Sidebar = memo(function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = useCallback(() => {
    setIsCollapsed(prev => !prev);
  }, []);

  const isLinkActive = useCallback((href: string) => {
    return pathname === href;
  }, [pathname]);

  // Don't show sidebar on landing page
  if (pathname === '/') return null;

  return (
    <div
      className={cn(
        'flex flex-col border-r bg-background',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex h-14 items-center border-b px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
        {!isCollapsed && (
          <span className="ml-2 text-lg font-semibold">Scofield</span>
        )}
      </div>
      <nav className="flex-1 space-y-1 p-2">
        {navigation.map((item) => {
          if ('items' in item) {
            return (
              <div key={item.name} className="space-y-1">
                {!isCollapsed && (
                  <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
                    {item.name}
                  </div>
                )}
                {item.items.map((subItem) => (
                  <NavLink
                    key={subItem.href}
                    href={subItem.href}
                    isActive={isLinkActive(subItem.href)}
                    isCollapsed={isCollapsed}
                    icon={subItem.icon}
                  >
                    {subItem.name}
                  </NavLink>
                ))}
              </div>
            );
          }

          return (
            <NavLink
              key={item.href}
              href={item.href}
              isActive={isLinkActive(item.href)}
              isCollapsed={isCollapsed}
              icon={item.icon}
            >
              {item.name}
            </NavLink>
          );
        })}
      </nav>
      <div className="border-t p-2">
        <ThemeToggle />
      </div>
    </div>
  );
});