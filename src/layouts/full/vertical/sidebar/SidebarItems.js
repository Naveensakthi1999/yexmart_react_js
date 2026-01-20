import Menuitems from './MenuItems';
import { useLocation } from 'react-router';
import { Box, List, useMediaQuery } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { toggleMobileSidebar } from 'src/store/customizer/CustomizerSlice';
import NavItem from './NavItem';
import NavCollapse from './NavCollapse';
import NavGroup from './NavGroup/NavGroup';

const SidebarItems = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf('/'));
  const customizer = useSelector((state) => state.customizer);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';
  const dispatch = useDispatch();

  const userObj = useSelector((state) => state.loginUserReducer?.user?.user);
  const userRole = userObj?.role;
  const userPermissions = userObj?.userRole?.permissions || [];

  // Helper to check access
  const canViewItem = (item) => {
    // 1. If Super Admin (Role 5), can view everything
    if (userRole === 5) return true;

    // 2. Check for explicit hide property
    if (item.hideForRole && item.hideForRole.includes(userRole)) return false;

    // 3. If item has specific module requirement
    if (item.module) {
      if (userRole !== 4 && userRole !== 3) return false; // Only 3, 4 can see module items (Role 5 already bypassed)
      return userPermissions.some(p => (typeof p === 'string' ? p : p.module) === item.module);
    }

    // 3. Existing behavior: If 'AdminRoute' was wrapping everything, 
    // it implies everything was Role 4 only. 
    // We should probably allow Role 5 to see "common" items (Dashboard?) 
    // or strictly follow legacy behavior for items without 'module'.

    // DECISION: If no module specified, allow Role 5 (e.g. Dashboard)
    // But check if it was 'Create Staff' -> that might be Role 4 only?
    // For now, let's assume Role 5 can see common items. 
    // If strict role 4 is needed for specific legacy items, we can add 'role: 4' to MenuItems.
    return true;
  };

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {Menuitems.map((item) => {
          if (!canViewItem(item)) return null;

          // {/********SubHeader**********/}
          if (item.subheader) {
            return <NavGroup item={item} hideMenu={hideMenu} key={item.subheader} />;

            // {/********If Sub Menu**********/}
            /* eslint no-else-return: "off" */
          } else if (item.children) {
            return (
              <NavCollapse
                menu={item}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                pathWithoutLastPart={pathWithoutLastPart}
                level={1}
                key={item.id}
                onClick={() => dispatch(toggleMobileSidebar())}
              />
            );

            // {/********If Sub No Menu**********/}
          } else {
            return (
              <NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                onClick={() => dispatch(toggleMobileSidebar())}
              />
            );
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
