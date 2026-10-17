import { Grid } from 'najwer23morsels/lib/Grid';
import { TextBox } from 'najwer23morsels/lib/TextBox';
import { useLocation, useNavigate } from 'react-router-dom';
import { isExternalLink, navigationLinkSections } from './NavigationLinks.const';

export const NavigationAside: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (to: string) => location.pathname === to;

  return (
    <Grid layout="container">
      {navigationLinkSections.map(({ title, links }) => (
        <Grid key={title} layout="container" margin="0 0 24px 0">
          <Grid layout="container" margin="0 0 8px 0">
            <TextBox tag="p" desktopSize={14} mobileSize={14} fontWeight={600} color="grey">
              {title}
            </TextBox>
          </Grid>

          {links.map(({ to, label }) => {
            const external = isExternalLink(to);
            const active = !external && isActive(to);

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
                  {...(external
                    ? { target: '_blank', rel: 'noreferrer' }
                    : {
                        onClick: (e: React.MouseEvent) => {
                          e.preventDefault();
                          navigate(to);
                        },
                      })}
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
