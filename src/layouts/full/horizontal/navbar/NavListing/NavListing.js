
import Menudata from '../Menudata';
import { useLocation } from 'react-router';
import { Box, List, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import NavItem from '../NavItem/NavItem';
import NavCollapse from '../NavCollapse/NavCollapse';

const NavListing = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf('/'));
  const customizer = useSelector((state) => state.customizer);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';

  const userObj = useSelector((state) => state.loginUserReducer?.user?.user);
  const userRole = userObj?.role;
  const userPermissions = userObj?.userRole?.permissions || [];

  const canViewItem = (item) => {
    if (userRole === 5) return true;
    if (item.hideForRole && item.hideForRole.includes(userRole)) return false;
    if (item.module) {
      if (userRole !== 4 && userRole !== 3) return false;
      return userPermissions.some(p => (typeof p === 'string' ? p : p.module) === item.module);
    }
    return true;
  };

  return (
    <Box>
      <List sx={{ p: 0, display: 'flex', gap: '3px', zIndex: '100' }}>
        {Menudata.map((item) => {
          if (item.subheader || item.navlabel || !canViewItem(item)) return null;

          if (item.children) {
            return (
              <NavCollapse
                menu={item}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                pathWithoutLastPart={pathWithoutLastPart}
                level={1}
                key={item.id}
              />
            );

            // {/********If Sub No Menu**********/}
          } else {
            return (
              <NavItem item={item} key={item.id} pathDirect={pathDirect} hideMenu={hideMenu} />
            );
          }
        })}
      </List>
    </Box>
  );
};
export default NavListing;
