import React from 'react';
import {
  Home,
  BookOpen,
  Users,
  Info,
  AlertTriangle,
  Map,
  Award,
  ShoppingBag,
  User,
  Image,
  Camera,
  Clipboard,
  Briefcase,
  CheckSquare,
  Sliders,
  Box,
  Send,
  Code,
  Command,
  MessageCircle,
  Circle,
  CreditCard,
  Table,
  Phone,
  Layers,
} from 'react-feather';
import { UserRoles } from '../core/enums';

interface ISidebarItem {
  id?: any;
  title?: string;
  icon?: React.ReactNode;
  permissions?: Array<string>;
  path?: string;
  newTab?: boolean;
  children?: any;
}

interface ISidebarItemWithChilde extends ISidebarItem {
  children?: Array<ISidebarItem>;
}
export const NavigationConfig: Array<ISidebarItemWithChilde> = [
  {
    id: 'home',
    title: 'داشبورد',
    path: '/',
    icon: <Home className="sidebar-icon" size={16} />,
    permissions: [UserRoles.UserReal, UserRoles.UserLegal],
  },
  {
    id: 'user',
    title: 'کاربران',
    icon: <User size={20} />,
    path: '/Users',
    permissions: [UserRoles.UserReal],
    newTab: true,
  },
];

export const navigationDetail = [];
