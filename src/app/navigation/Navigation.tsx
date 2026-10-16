import { Grid } from 'najwer23morsels/lib/Grid';
import { NavigationDashboard } from 'najwer23morsels/lib/NavigationDashboard';
import { TextBox } from 'najwer23morsels/lib/TextBox';
import { useLocation, useNavigate } from 'react-router-dom';
import { Aside } from './aside/Aside';
import { linksAside } from './links/Links.const';

interface Props {
  outlet?: React.ReactNode;
}

export const Navigation: React.FC<Props> = ({ outlet }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (to: string) => location.pathname === to;

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
      menuMobile={
        <>
          {linksAside.map(({ to, label }) => (
            <TextBox
              key={to}
              tag="a"
              href={to}
              desktopSize={30}
              mobileSize={30}
              fontWeight={400}
              color={isActive(to) ? 'grey' : 'var(--n23mTextBoxColor)'}
              colorHover={isActive(to) ? 'grey' : 'var(--n23mTextBoxColor)'}
              onClick={(e) => {
                e.preventDefault();
                navigate(to);
              }}
            >
              {label}
            </TextBox>
          ))}

          <TextBox
            tag="a"
            href="https://najwer23.github.io/resume/"
            desktopSize={34}
            mobileSize={34}
            fontWeight={600}
            target="_blank"
            rel="noreferrer"
            color="var(--n23mTextBoxColor)"
            colorHover="var(--n23mTextBoxColor)"
          >
            Résumé
          </TextBox>
        </>
      }
      outlet={outlet}
      aside={<Aside />}
    />
  );
};
