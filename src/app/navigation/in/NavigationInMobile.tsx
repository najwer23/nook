import { Grid } from 'najwer23morsels/lib/Grid';
import { Typography } from 'najwer23morsels/lib/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import { getNavigationLinkProps, getNavigationLinkType } from '../Naviagtion.utils';
import { navigationInLinkSections } from './NavigationInLinks.const';

export const NavigationInMobile: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (to: string) => location.pathname === to;

  return (
    <Grid layout="container" margin={0}>
      <Grid layout="container" margin="0 0 24px 0">
        <Grid layout="container" margin="0 0 8px 0">
          <Typography variant="subheading" color="grey">
            Account
          </Typography>
        </Grid>

        <Typography
          variant="link"
          href="/logout"
          desktopSize={28}
          mobileSize={28}
          fontWeight={isActive('/logout') ? 600 : 400}
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            navigate('/logout');
          }}
        >
          Logout
        </Typography>
      </Grid>

      {navigationInLinkSections.map(({ title, links }) => (
        <Grid key={title} layout="container" margin="0 0 24px 0">
          <Grid layout="container" margin="0 0 8px 0">
            <Typography variant="subheading" color="grey">
              {title}
            </Typography>
          </Grid>

          {links.map((link) => {
            const { to, label } = link;
            const type = getNavigationLinkType(link);
            const active = type === 'internal' && isActive(to);

            if (type === 'internal') {
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
            }

            return (
              <Grid key={to} layout="container" margin="0 0 8px 0">
                <Typography
                  variant="link"
                  desktopSize={28}
                  mobileSize={28}
                  tag="a"
                  href={to}
                  {...getNavigationLinkProps(type, to, navigate)}
                >
                  {label}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      ))}

      <Typography variant="caption" color="grey">
        © Nook
      </Typography>
    </Grid>
  );
};
