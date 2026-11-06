import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { Grid } from 'najwer23morsels/lib/Grid';
import { Typography } from 'najwer23morsels/lib/Typography';

export const Home = () => {
  useDocumentTitle(`Home | ${import.meta.env.VITE_ANALYTICS_APP_NAME}`);

  return (
    <Grid layout="container" widthMax="100%" padding="0">
      <Grid layout="container" widthMax="900px" margin="0 0 30px 0">
        <Typography variant="display" style={{ margin: 0 }}>
          About
        </Typography>

        <Typography variant="body">
          Nook is a personal web dashboard that brings together a collection of useful online tools, utilities, and
          applications in one place. Designed to simplify everyday activities and organize personal information, it
          offers features for managing household finances, tracking fitness progress, creating blog content, exploring
          music, and organizing travel memories. The platform combines publicly accessible applications with a private
          dashboard available after authentication. Built with React, TypeScript, and Fastify, Nook is a full-stack web
          application featuring interactive interfaces, data visualization, and a custom backend API.
        </Typography>

        <Typography variant="subheading">Public Applications</Typography>

        <Typography variant="body">
          <b>Blog Post Creator</b> A dedicated writing tool for creating, editing, and organizing blog post drafts. It
          provides a convenient workspace for preparing articles, developing ideas, and managing written content before
          publishing it on a personal blog or website.
        </Typography>

        <Typography variant="body">
          <b>Music Player</b> A web based music player that provides a dedicated interface for listening to music
          directly from the browser. It brings music playback into the Nook platform as part of its collection of
          everyday entertainment and productivity tools.
        </Typography>

        <Typography variant="body">
          <b>Vacations</b> A travel gallery for browsing and organizing vacation memories, destinations, and travel
          photographs. Its responsive masonry grid layout presents images in a visually appealing format, making it easy
          to explore travel experiences across different screen sizes.
        </Typography>

        <Typography variant="body">
          <b>Weather & Stock Quotes</b> A collection of information tools for checking weather conditions and following
          stock market quotations. It provides quick access to weather information and financial market data without
          having to switch between multiple websites.
        </Typography>

        <Typography variant="subheading">Personal Dashboard (After Login)</Typography>

        <Typography variant="body">
          <b>Exercise Tracker</b> A personal fitness tracker for recording bodyweight exercises and monitoring workout
          activity over time. It supports tracking exercises such as push-ups, squats, pull-ups, and sit-ups, helping
          maintain a history of training sessions, monitor exercise performance, and follow fitness progress.
        </Typography>

        <Typography variant="body">
          <b>Weight & BMI</b> A weight tracking application for recording body weight measurements and monitoring
          changes over time. It calculates Body Mass Index (BMI) based on recorded measurements and provides historical
          data visualization to help understand weight trends and follow long term progress.
        </Typography>

        <Typography variant="body">
          <b>Invoices & Household Expenses</b> A personal invoice and household expense management application designed
          to keep financial records organized in one place. It allows tracking invoices, recording payment dates,
          monitoring outstanding balances, and managing household bills. Interactive charts and spending analytics help
          visualize expenses, compare costs over time, identify unexpected increases, and better understand household
          spending patterns.
        </Typography>

        <Typography variant="subheading">Why?</Typography>

        <Typography variant="body">
          Nook started as a solution to a practical problem. My household bills and invoices were scattered across
          emails, PDF documents, and bank statements, making it difficult to keep track of expenses and understand how
          household costs changed over time. I wanted a centralized expense management tool where I could organize
          invoices, monitor payments, compare spending trends, identify unexpected increases, and find financial records
          whenever needed.
        </Typography>

        <Typography variant="body">
          What started as a personal household expense tracker gradually evolved into a larger collection of
          applications covering different areas of everyday life. Today, Nook also includes fitness tracking, weight
          monitoring, content creation, music playback, and travel galleries.
        </Typography>

        <Typography variant="body">
          Beyond its practical purpose, Nook is also a full stack software development project built with React,
          TypeScript, and Fastify. It provides an opportunity to develop and experiment with modern web technologies,
          reusable UI components, frontend architecture, REST API development, data management, authentication, and
          interactive data visualization.
        </Typography>
      </Grid>
    </Grid>
  );
};
