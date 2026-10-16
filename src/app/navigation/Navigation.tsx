import { Grid } from 'najwer23morsels/lib/Grid';
import { NavigationDashboard } from 'najwer23morsels/lib/NavigationDashboard';
import { TextBox } from 'najwer23morsels/lib/TextBox';
import { useLocation, useNavigate } from 'react-router-dom';

interface Props {
  outlet?: React.ReactNode;
}

export const Navigation: React.FC<Props> = ({ outlet }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (href: string) => {
    return href.includes(location.pathname);
  };

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
          {[
            { href: '/#/portfolio', label: 'Portfolio' },
            { href: '/#/contact', label: 'Contact' },
            { href: '/#/weather', label: 'Weather' },
            { href: '/#/stock-quotes', label: 'Stock Quotes' },
            { href: '/#/blog', label: 'Blog' },
            { href: '/#/visitors', label: 'Visitors' },
            {
              href: 'https://najwer23.github.io/resume/',
              label: 'Résumé',
              desktopSize: 34,
              mobileSize: 34,
              fontWeight: 600,
              target: '_blank',
              rel: 'noreferrer',
            },
          ].map(({ href, label, desktopSize = 30, mobileSize = 30, fontWeight = 400, target, rel }) => (
            <TextBox
              key={label}
              tag="a"
              href={href}
              desktopSize={desktopSize}
              mobileSize={mobileSize}
              fontWeight={fontWeight}
              color={isActive(href) ? 'grey' : 'var(--n23mTextBoxColor)'}
              colorHover={isActive(href) ? 'grey' : 'var(--n23mTextBoxColor)'}
              target={target}
              rel={rel}
            >
              {label}
            </TextBox>
          ))}
        </>
      }
      outlet={outlet}
      aside={undefined}
    ></NavigationDashboard>
  );
};
