import { Grid } from 'najwer23morsels/lib/Grid';
import { NavigationDashboard } from 'najwer23morsels/lib/NavigationDashboard';
import { Typography } from 'najwer23morsels/lib/Typography';
import { useNavigate } from 'react-router-dom';
import { NavigationAside } from './NavigationAside';
import { NavigationMobile } from './NavigationMobile';

interface Props {
  outlet?: React.ReactNode;
}

export const Navigation: React.FC<Props> = ({ outlet }) => {
  const navigate = useNavigate();

  return (
    <NavigationDashboard
      menuTopLeftColumn={
        <Grid layout="flex" justifyContent="flex-start" alignItems="center" minHeight={'100%'}>
          <Typography
            variant="link"
            desktopSize={25}
            mobileSize={25}
            fontWeight={500}
            tag="a"
            href="/"
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
            href="/auth/login"
            onClick={(e) => {
              e.preventDefault();
              navigate('/auth/login');
            }}
            desktopSize={20}
            mobileSize={20}
            fontWeight={500}
          >
            Login
          </Typography>
        </Grid>
      }
      menuMobile={<NavigationMobile />}
      outlet={outlet}
      aside={<NavigationAside />}
    />
  );
};
