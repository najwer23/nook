import { Grid } from 'najwer23morsels/lib/Grid';
import { TextBox } from 'najwer23morsels/lib/TextBox';
import { useLocation, useNavigate } from 'react-router-dom';
import { getNavigationLinkProps, getNavigationLinkType } from '../Naviagtion.utils';
import { navigationHomeLinkSections } from './NavigationLinks.const';

export const NavigationAside: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (to: string) => location.pathname === to;

  return (
    <Grid layout="container">
      {navigationHomeLinkSections.map(({ title, links }) => (
        <Grid key={title} layout="container" margin="0 0 24px 0">
          <Grid layout="container" margin="0 0 8px 0">
            <TextBox tag="p" desktopSize={14} mobileSize={14} fontWeight={600} color="black">
              {title}
            </TextBox>
          </Grid>

          {links.map((link) => {
            const { to, label } = link;
            const type = getNavigationLinkType(link);
            const active = type === 'internal' && isActive(to);

            return (
              <Grid key={to} layout="container" margin="0 0 5px 0">
                <TextBox
                  tag="a"
                  href={to}
                  desktopSize={20}
                  mobileSize={20}
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
    </Grid>
  );
};
