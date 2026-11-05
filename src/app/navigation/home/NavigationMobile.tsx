import { Grid } from 'najwer23morsels/lib/Grid';
import { TextBox } from 'najwer23morsels/lib/TextBox';
import { Typography } from 'najwer23morsels/lib/Typography';
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
          <Typography variant="subheading" tag="p" fontWeight={600} color="grey">
            Account
          </Typography>
        </Grid>

        <Typography
          variant="link"
          href="/auth/login"
          desktopSize={28}
          mobileSize={28}
          fontWeight={isActive('/auth/login') ? 600 : 400}
          color={isActive('/auth/login') ? 'grey' : undefined}
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            navigate('/auth/login');
          }}
        >
          Login
        </Typography>
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
                <Typography
                  variant="link"
                  href={to}
                  desktopSize={28}
                  mobileSize={28}
                  fontWeight={active ? 600 : 400}
                  {...getNavigationLinkProps(type, to, navigate)}
                >
                  {label}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      ))}

      <Typography variant="caption" tag="p" color="grey">
        © Nook
      </Typography>
    </Grid>
  );
};
