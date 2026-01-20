import {
  IconPoint,
  IconUsers,
  IconSitemap,
  IconHome,
  IconCash,
  IconBellRinging,
  IconHelp,
  IconCategory,
  IconTerminal2,
  IconBrandAsana,
  IconTopologyStarRing3,
  IconAd,
  IconUserPlus,
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconHome,
    href: '/dashboards/modern',
    hideForRole: [1, 2, 3], // Hide from Staff
  },
  {
    id: uniqueId(),
    title: 'Admin Management',
    icon: IconBrandAsana,
    href: '/admin/admins',
    module: 'admin_management',
    hideForRole: [1, 2, 3, 4], // Hide from Staff // Custom property for filtering
  },
  {
    id: uniqueId(),
    title: 'Scrap Sale',
    icon: IconTopologyStarRing3,
    href: '/scrap-sale',
    hideForRole: [1, 2, 3],
  },
  {
    id: uniqueId(),
    title: 'Create Staff',
    icon: IconUserPlus,
    href: '/staff',
    hideForRole: [1, 2, 3], // Hide from Staff // Custom property for filtering
    // children: [
    //   {
    //     id: uniqueId(),
    //     title: 'Add Staff',
    //     icon: IconPoint,
    //     href: '/staff',
    //   },
    // ],
  },
  {
    id: uniqueId(),
    title: 'User',
    icon: IconUsers,
    href: '/user/',
    hideForRole: [1, 2, 3], // Hide from Staff
    children: [
      {
        id: uniqueId(),
        title: 'Users',
        icon: IconPoint,
        href: '/user/users',
      },
      {
        id: uniqueId(),
        title: 'Block Users',
        icon: IconPoint,
        href: '/user/block-users',
      },
      {
        id: uniqueId(),
        title: 'Premium Users',
        icon: IconPoint,
        href: '/user/premium-users',
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Ads Management',
    icon: IconAd,
    href: '/adsmanage/',
    hideForRole: [1, 2],
    children: [
      {
        id: uniqueId(),
        title: 'All Ads',
        icon: IconPoint,
        href: '/adsmanage/all-ads',
      },
      {
        id: uniqueId(),
        title: 'Pending Ads',
        icon: IconPoint,
        href: '/adsmanage/pending-ads',
      },
      {
        id: uniqueId(),
        title: 'Expired Ads',
        icon: IconPoint,
        href: '/adsmanage/expired-ads',
      },
      {
        id: uniqueId(),
        title: 'Reported Ads',
        icon: IconPoint,
        href: '/adsmanage/reported-ads',
      },
    ],
  },

  {
    id: uniqueId(),
    title: 'Privcy Policy',
    icon: IconSitemap,
    href: '/privacypolicytermsconditions/',
    children: [
      {
        id: uniqueId(),
        title: 'Privcy Policy',
        icon: IconPoint,
        href: '/privacypolicytermsconditions/privcy-policy',
      },
      {
        id: uniqueId(),
        title: 'Terms and Conditions',
        icon: IconPoint,
        href: '/privacypolicytermsconditions/terms-conditions',
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Notification',
    icon: IconBellRinging,
    href: '/notification/',
    hideForRole: [1, 2],
    children: [
      {
        id: uniqueId(),
        title: 'Product List',
        icon: IconPoint,
        href: '/notification/product-list',
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Price',
    icon: IconCash,
    href: '/price/',
    hideForRole: [1, 2],
    children: [
      {
        id: uniqueId(),
        title: 'Price List',
        icon: IconPoint,
        href: '/price/price-list',
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Help & Support',
    icon: IconHelp,
    href: '/help-support/',
    hideForRole: [1, 2],
    children: [
      {
        id: uniqueId(),
        title: 'Help & Support List',
        icon: IconPoint,
        href: '/help-support/help-support',
      },
      {
        id: uniqueId(),
        title: 'Support Dashboard',
        icon: IconPoint,
        href: '/support/dashboard',
        hideForRole: [1, 2, 3],
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Testimonial',
    icon: IconTerminal2,
    href: '/testimonial/',
    hideForRole: [1, 2],
    children: [
      {
        id: uniqueId(),
        title: 'Testimonial',
        icon: IconPoint,
        href: '/testimonial/testimonial',
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Category',
    icon: IconCategory,
    href: '/category/',
    hideForRole: [1, 2],
    children: [
      {
        id: uniqueId(),
        title: 'Brand',
        icon: IconPoint,
        href: '/category/brand-details',
      },
      {
        id: uniqueId(),
        title: 'Category',
        icon: IconPoint,
        href: '/category/category-details',
      },
      {
        id: uniqueId(),
        title: 'Sub-Category',
        icon: IconPoint,
        href: '/category/sub-category-details',
      },
      // {
      //   id: uniqueId(),
      //   title: 'Payment Type',
      //   icon: IconPoint,
      //   href: '/category/payment-type-details',
      // },
      // {
      //   id: uniqueId(),
      //   title: 'Tax',
      //   icon: IconPoint,
      //   href: '/category/tax-details',
      // },
    ],
  },
];

export default Menuitems;
