import { Grid } from 'najwer23morsels/lib/Grid';
import { NavigationDashboard } from 'najwer23morsels/lib/NavigationDashboard';
import { TextBox } from 'najwer23morsels/lib/TextBox';
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
          <TextBox
            desktopSize={20}
            mobileSize={20}
            fontWeight={500}
            tag="a"
            href="/"
            color="grey"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
          >
            Nook
          </TextBox>
        </Grid>
      }
      menuTopRightColumn={
        <Grid layout="flex" justifyContent="flex-end">
          <TextBox
            tag="a"
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
          </TextBox>
        </Grid>
      }
      menuMobile={<NavigationMobile />}
      outlet={outlet}
      aside={<NavigationAside />}
    />
  );
};
