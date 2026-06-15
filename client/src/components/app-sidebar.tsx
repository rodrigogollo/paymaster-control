'use client';

import * as React from 'react';
import {
  AudioWaveform,
  CalendarClock,
  Command,
  Factory,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboard,
  Map,
  PieChart,
  Settings2,
  SquareChartGantt,
  Users,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/useAuth';

const data = {
  user: {
    name: 'User',
    email: 'uer@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Paymaster Control Inc.',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Dashboard',
      url: '/',
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: 'General',
          url: '/',
        },
      ],
    },
    {
      title: 'Employees',
      url: '/',
      icon: Users,
      items: [
        {
          title: 'General',
          url: '/users',
        },
      ],
    },
    {
      title: 'Projects',
      url: '/projects',
      icon: SquareChartGantt,
      items: [],
    },
    {
      title: 'Clients',
      url: '/clients',
      icon: Factory,
      items: [],
    },
    {
      title: 'Time Entries',
      url: '/time-entries',
      icon: CalendarClock,
      items: [],
    },

    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Employees',
      url: '/users',
      icon: Users,
    },
    {
      name: 'Projects',
      url: '/projects',
      icon: SquareChartGantt,
    },
    {
      name: 'Clients',
      url: '/clients',
      icon: Factory,
    },
    {
      name: 'Time Entries',
      url: '/time-entries',
      icon: CalendarClock,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { currentUser } = useAuth();

  if (currentUser) {
    data.user = currentUser;
    data.user.name =
      currentUser.name ||
      currentUser.firstName + ' ' + currentUser.lastName ||
      'User';
  }

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={data.navMain} /> */}
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
