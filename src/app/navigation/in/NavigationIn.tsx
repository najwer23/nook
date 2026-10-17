import { Grid } from 'najwer23morsels/lib/Grid';
import { NavigationDashboard } from 'najwer23morsels/lib/NavigationDashboard';
import { TextBox } from 'najwer23morsels/lib/TextBox';
import { useNavigate } from 'react-router-dom';
import { NavigationInAside } from './NavigationInAside';
import { NavigationInMobile } from './NavigationMobile';

interface Props {
  outlet?: React.ReactNode;
}

export const NavigationIn: React.FC<Props> = ({ outlet }) => {
  const navigate = useNavigate();

  return (
    <NavigationDashboard
      menuTopLeftColumn={
        <Grid layout="flex" justifyContent="flex-start" alignItems="center" minHeight={'100%'}>
          <TextBox
            desktopSize={25}
            mobileSize={25}
            fontWeight={500}
            tag="a"
            href="/"
            color="black"
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
        <Grid layout="flex" justifyContent="flex-end" alignItems="center" minHeight={'100%'}>
          <TextBox
            tag="a"
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
          </TextBox>
        </Grid>
      }
      menuMobile={<NavigationInMobile />}
      outlet={outlet}
      aside={<NavigationInAside />}
    />
  );
};
