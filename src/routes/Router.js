import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import Loadable from '../layouts/full/shared/loadable/Loadable';
import ProtectedRoute from '../utils/Route/ProtectedRoute';
import GestRoute from '../utils/Route/GestRoute';
import AdminRoute from '../utils/Route/AdminRoute';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const ModernDash = Loadable(lazy(() => import('../views/dashboard/Modern')));

// authentication
const Login = Loadable(lazy(() => import('../views/authentication/auth1/Login')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));

// Master Page
const BrandDetails = Loadable(lazy(() => import('../views/master/BrandDetails')));
const CategoryDetails = Loadable(lazy(() => import('../views/master/CategoryDetails')));
const SubCategoryDetails = Loadable(lazy(() => import('../views/master/SubCategoryDetails')));
const PaymentTypeDetails = Loadable(lazy(() => import('../views/master/PaymentTypeDetails')));
const TaxDetails = Loadable(lazy(() => import('../views/master/TaxDetails')));

// Ads Management Page
// const AdsManagementDetails = Loadable(lazy(() => import('../views/adsmanagement/AdsManagementDetails')));
const ScrapManagement = Loadable(lazy(() => import('../views/scrapsale/ScrapManagement')));
const AllAds = Loadable(lazy(() => import('../views/adsmanagement/AllAds')));
const PendingAds = Loadable(lazy(() => import('../views/adsmanagement/PendingAds')));
const ExpiredAds = Loadable(lazy(() => import('../views/adsmanagement/ExpiredAds')));
const ReportedAds = Loadable(lazy(() => import('../views/adsmanagement/ReportedAds')));

// Create Staff page
const CreateStaff = Loadable(lazy(() => import('../views/staff/Staff')));

// User Page
const Users = Loadable(lazy(() => import('../views/user/Users')));
const BlockUsers = Loadable(lazy(() => import('../views/user/BlockUsers')));
const PremiumUsers = Loadable(lazy(() => import('../views/user/PremiumUsers')));

const PrivacyPolicy = Loadable(lazy(() => import('../views/privacypolicy/Pp')));
const TermsConditions = Loadable(lazy(() => import('../views/termsconditions/TermsConditions')));
// Item Page
// const ItemStockDetails = Loadable(lazy(() => import('../views/items/ItemStockDetails')));

// Notification
const Notification = Loadable(lazy(() => import('../views/notification/Notification')));

// Price
const Price = Loadable(lazy(() => import('../views/prize/Prize')));

// Help Support
const HelpSupport = Loadable(lazy(() => import('../views/helpsupport/HelpSupport')));

// Testimonial
const Testimonial = Loadable(lazy(() => import('../views/testimonial/Testimonial')));

// Admin Pages
const AdminManagement = Loadable(lazy(() => import('../views/admin/AdminManagement')));
const SupportDashboard = Loadable(lazy(() => import('../views/support/SupportDashboard')));
const Error403 = Loadable(lazy(() => import('../views/authentication/Error403')));

import PermissionRoute from '../utils/Route/PermissionRoute';

const Router = [
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <FullLayout />
      </ProtectedRoute>
    ),
    // element: <FullLayout />,
    children: [
      {
        path: '/dashboards/modern',
        exact: true,
        element: (
          <PermissionRoute module="dashboard">
            {/* <AdminRoute> */}
            <ModernDash />
            {/* </AdminRoute> */}
          </PermissionRoute>
        ),
      },

      // Create Staff page
      {
        path: '/staff',
        exact: true,
        element: (
          <AdminRoute>
            <CreateStaff />
          </AdminRoute>
        ),
      },
      {
        path: '/scrap-sale',
        exact: true,
        element: (
          <AdminRoute>
            <ScrapManagement />
          </AdminRoute>
        ),
      },

      {
        path: '/user/users',
        exact: true,
        element: (
          <PermissionRoute module="users">
            {/* <AdminRoute> */}
            <Users />
            {/* </AdminRoute> */}
          </PermissionRoute>
        ),
      },
      {
        path: '/user/block-users',
        exact: true,
        element: (
          <PermissionRoute module="users">
            {/* <AdminRoute> */}
            <BlockUsers />
            {/* </AdminRoute> */}
          </PermissionRoute>
        ),
      },
      {
        path: '/user/premium-users',
        exact: true,
        element: (
          <PermissionRoute module="users">
            {/* <AdminRoute> */}
            <PremiumUsers />
            {/* </AdminRoute> */}
          </PermissionRoute>
        ),
      },

      { path: '/category/brand-details', exact: true, element: <BrandDetails /> },
      { path: '/category/category-details', exact: true, element: <CategoryDetails /> },
      { path: '/category/sub-category-details', exact: true, element: <SubCategoryDetails /> },
      { path: '/category/payment-type-details', exact: true, element: <PaymentTypeDetails /> },
      { path: '/category/tax-details', exact: true, element: <TaxDetails /> },

      {
        path: '/adsmanage/pending-ads',
        exact: true,
        element: (
          <PermissionRoute module="ads">
            <PendingAds />
          </PermissionRoute>
        ),
      },
      {
        path: '/adsmanage/expired-ads',
        exact: true,
        element: (
          <PermissionRoute module="ads">
            <ExpiredAds />
          </PermissionRoute>
        ),
      },
      {
        path: '/adsmanage/reported-ads',
        exact: true,
        element: (
          <PermissionRoute module="ads">
            <ReportedAds />
          </PermissionRoute>
        ),
      },
      {
        path: '/adsmanage/all-ads',
        exact: true,
        element: (
          <PermissionRoute module="ads">
            <AllAds />
          </PermissionRoute>
        ),
      },

      {
        path: '/privacypolicytermsconditions/privcy-policy',
        exact: true,
        element: <PrivacyPolicy />,
      },
      {
        path: '/privacypolicytermsconditions/terms-conditions',
        exact: true,
        element: <TermsConditions />,
      },

      // { path: '/item/item-stock-details', exact: true, element: <ItemStockDetails /> },

      // Notificaiton
      { path: '/notification/product-list', exact: true, element: <Notification /> },

      // Price
      { path: '/price/price-list', exact: true, element: <Price /> },

      // Help & Support
      { path: '/help-support/help-support', exact: true, element: <HelpSupport /> },
      { path: '/support/dashboard', exact: true, element: <AdminRoute><SupportDashboard /></AdminRoute> },

      // Testimonial
      { path: '/testimonial/testimonial', exact: true, element: <Testimonial /> },

      // Admin Management (Super Admin / Admin with permission)
      {
        path: '/admin/admins',
        exact: true,
        element: (
          // <AdminRoute>
          <PermissionRoute module="admin_management">
            <AdminManagement />
          </PermissionRoute>
          // </AdminRoute>
        ),
      },

      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/',
    element: (
      <GestRoute>
        <BlankLayout />
      </GestRoute>
    ),
    children: [
      { path: '/', element: <Navigate to="/auth/login" /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/auth/404', element: <Error /> },
      { path: '/auth/403', element: <Error403 /> },
      { path: '/auth/login', element: <Login /> },

      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
