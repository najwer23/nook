import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { Grid } from 'najwer23morsels/lib/Grid';
import { Typography } from 'najwer23morsels/lib/Typography';
// import styles from './Home.module.css';

export const Home = () => {
  useDocumentTitle(`Home | ${import.meta.env.VITE_ANALYTICS_APP_NAME}`);

  return (
    <Grid layout="container" widthMax={'100%'} padding="0">
      <Grid layout="container" widthMax="900px" margin="0 0 30px 0">
        <Typography appearance="light" variant="display" style={{ margin: 0 }}>
          About
        </Typography>
        <Typography appearance="light" variant="body">
          A full-stack personal hub built with React, TypeScript, and Fastify. Track household bills and invoices,
          monitor weather and stock quotes, log gym workouts, and draft blog posts, all in one place. Includes
          interactive charts and spending analytics. Deployed to GitHub Pages via a CI/CD pipeline.
        </Typography>

        <Typography appearance="light" variant="subheading">
          Why?
        </Typography>

        <Typography appearance="light" variant="body">
          I built it because my bills were scattered across emails, PDFs, and bank statements, and I could never tell
          whether my costs were creeping up. I wanted one simple place to see the trend, spot unexpected increases, and
          find any invoice in seconds.
        </Typography>

        <Typography appearance="light" variant="body">
          It's also a hands-on project: a full-stack app built with React (using a design system) and Fastify.
        </Typography>
      </Grid>
    </Grid>
  );
};
