import { Grid } from 'najwer23morsels/lib/Grid';
import { NavigationDashboard } from 'najwer23morsels/lib/NavigationDashboard';
import { Typography } from 'najwer23morsels/lib/Typography';
import { useNavigate } from 'react-router-dom';
import { NavigationInAside } from './NavigationInAside';
import { NavigationInMobile } from './NavigationInMobile';

interface Props {
  outlet?: React.ReactNode;
}

export const NavigationIn: React.FC<Props> = ({ outlet }) => {
  const navigate = useNavigate();

  return (
    <NavigationDashboard
      menuTopLeftColumn={
        <Grid layout="flex" justifyContent="flex-start" alignItems="center" minHeight={'100%'}>
          <Typography
            desktopSize={25}
            mobileSize={25}
            fontWeight={500}
            tag="a"
            href="/"
            variant="link"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
          >
            Nook
          </Typography>
        </Grid>
      }
      menuTopRightColumn={
        <Grid layout="flex" justifyContent="flex-end" alignItems="center" minHeight={'100%'}>
          <Typography
            tag="a"
            variant="link"
            href="/logout"
            onClick={(e) => {
              e.preventDefault();
              navigate('/logout');
            }}
            desktopSize={20}
            mobileSize={20}
            fontWeight={500}
          >
            Logout
          </Typography>
        </Grid>
      }
      menuMobile={<NavigationInMobile />}
      outlet={outlet}
      aside={<NavigationInAside />}
    />
  );
};
