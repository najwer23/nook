import { Grid } from 'najwer23morsels/lib/Grid';
import { TextBox } from 'najwer23morsels/lib/TextBox';
import { useLocation, useNavigate } from 'react-router-dom';
import { getNavigationLinkProps, getNavigationLinkType } from '../Naviagtion.utils';
import { navigationHomeLinkSections } from './NavigationLinks.const';

export const NavigationMobile: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (to: string) => location.pathname === to;

  return (
    <Grid layout="container" margin={0}>
      <Grid layout="container" margin="0 0 24px 0">
        <Grid layout="container" margin="0 0 8px 0">
          <TextBox tag="p" desktopSize={20} mobileSize={20} fontWeight={600} color="grey">
            Account
          </TextBox>
        </Grid>
        <TextBox
          tag="a"
          href="/auth/login"
          desktopSize={28}
          mobileSize={28}
          fontWeight={isActive('/auth/login') ? 600 : 400}
          color={isActive('/auth/login') ? 'grey' : 'var(--n23mTextBoxColor)'}
          colorHover={isActive('/auth/login') ? 'grey' : 'var(--n23mTextBoxColor)'}
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            navigate('/auth/login');
          }}
        >
          Login
        </TextBox>
      </Grid>

      {navigationHomeLinkSections.map(({ title, links }) => (
        <Grid key={title} layout="container" margin="0 0 24px 0">
          <Grid layout="container" margin="0 0 8px 0">
            <TextBox tag="p" desktopSize={20} mobileSize={20} fontWeight={600} color="grey">
              {title}
            </TextBox>
          </Grid>

          {links.map((link) => {
            const { to, label } = link;
            const type = getNavigationLinkType(link);
            const active = type === 'internal' && isActive(to);

            return (
              <Grid key={to} layout="container" margin="0 0 8px 0">
                <TextBox
                  tag="a"
                  href={to}
                  desktopSize={28}
                  mobileSize={28}
                  fontWeight={active ? 600 : 400}
                  color={active ? 'grey' : 'var(--n23mTextBoxColor)'}
                  colorHover={active ? 'grey' : 'var(--n23mTextBoxColor)'}
                  {...getNavigationLinkProps(type, to, navigate)}
                >
                  {label}
                </TextBox>
              </Grid>
            );
          })}
        </Grid>
      ))}

      <TextBox tag="p" desktopSize={14} mobileSize={14} color="grey">
        © Nook
      </TextBox>
    </Grid>
  );
};
