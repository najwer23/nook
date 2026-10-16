import { Grid } from 'najwer23morsels/lib/Grid';
import { TextBox } from 'najwer23morsels/lib/TextBox';
import { useLocation, useNavigate } from 'react-router-dom';
import { linksAside } from '../links/Links.const';
import styles from './Aside.module.css';

export const Aside: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (to: string) => location.pathname === to;

  return (
    <Grid layout="container">
      {linksAside.map(({ to, label }) => (
        <Grid layout="container" margin={'0 0 5px 0'}>
          <TextBox
            key={to}
            tag="a"
            href={to}
            desktopSize={24}
            mobileSize={24}
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
        </Grid>
      ))}
    </Grid>
  );
};
