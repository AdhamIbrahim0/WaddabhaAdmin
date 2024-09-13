import { INavData } from '@coreui/angular';
import { cilBriefcase, cilPenAlt } from '@coreui/icons';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
  },
  // {
  //   title: true,
  //   name: 'Theme',
  // },
  {
    name: 'Categories',
    url: '/categories',
    iconComponent: { name: 'cil-menu' },
  },
  {
    name: 'Services',
    url: '/services',
    iconComponent: { name: 'cil-briefcase', content: cilBriefcase },
  },
  {
    name: 'Contracts',
    url: '/contracts',
    iconComponent: { name: 'cil-pen-alt', content: cilPenAlt },
  },
  {
    name: 'Users',
    url: '/users',
    iconComponent: { name: 'cil-user' },
  },
];
