import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoDark from 'src/assets/images/logos/dark-logo.svg';
import LogoDarkRTL from 'src/assets/images/logos/dark-rtl-logo.svg';
import LogoLight from 'src/assets/images/logos/light-logo.svg';
import LogoLightRTL from 'src/assets/images/logos/light-logo-rtl.svg';
import { styled } from '@mui/material';

const Logo = () => {
  const customizer = useSelector((state) => state.customizer);
  const LinkStyled = styled(Link)(() => ({
    height: customizer.TopbarHeight,
    width: customizer.isCollapse ? '40px' : '180px',
    overflow: 'hidden',
    display: 'block',
  }));

  const logoSrc =
    customizer.activeDir === 'ltr'
      ? customizer.activeMode === 'dark'
        ? LogoLight
        : LogoDark
      : customizer.activeMode === 'dark'
      ? LogoDarkRTL
      : LogoLightRTL;

  return (
    <LinkStyled
      to="/"
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* <img src={logoSrc} alt="Logo" style={{ maxHeight: '100%', width: 'auto' }} /> */}
      <img src={LogoLight} alt="Logo" style={{ maxHeight: '50%', width: 'auto' }} />
    </LinkStyled>
  );
};

export default Logo;
