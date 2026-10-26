import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { Grid } from 'najwer23morsels/lib/Grid';
import { LoaderDots } from 'najwer23morsels/lib/LoaderDots';
import { Picture } from 'najwer23morsels/lib/Picture';
import { Typography } from 'najwer23morsels/lib/Typography';
import { lazy, Suspense } from 'react';

const MIN_FALLBACK_MS = 500;

const Masonry = lazy(() =>
  Promise.all([
    import('najwer23morsels/lib/Masonry'),
    new Promise((resolve) => setTimeout(resolve, MIN_FALLBACK_MS)),
  ]).then(([m]) => ({ default: m.Masonry })),
);

interface Props {}

export const Vacations: React.FC<Props> = ({}) => {
  useDocumentTitle(`Vacations | ${import.meta.env.VITE_ANALYTICS_APP_NAME}`);

  return (
    <Grid layout="container" widthMax="100%" padding="0">
      <Grid layout="container" widthMax="100%" margin="0 0 30px 0">
        <Typography appearance="light" variant="display" style={{ margin: 0 }}>
          Vacations
        </Typography>

        <Typography appearance="light" variant="caption">
          A curated collection of European evenings, city corners, and golden light.
        </Typography>
      </Grid>

      <Grid layout="container" widthMax={'100%'} padding={'0px 0px 30px 0px'} minHeight="2800px">
        <div>
          <Suspense fallback={<LoaderDots />}>
            <Masonry
              gap={{ col: '20px', row: '20px' }}
              col={{
                mobile: 1,
                smallDesktop: 3,
                desktop: 3,
                tablet: 2,
              }}
            >
              {[
                {
                  src: 'https://i.pinimg.com/originals/6d/a7/bf/6da7bf87e217fa0efe1bfdb290fa162e.jpg',
                  alt: 'The Da Vinci Glow',
                  ar: 296 / 443,
                },
                {
                  src: 'https://i.pinimg.com/originals/26/79/47/267947eeae9cc87f649f427cbf91ac98.jpg',
                  alt: 'A Night Sky over the Tatra Mountains..',
                  ar: 274 / 301,
                },
                {
                  src: 'https://i.pinimg.com/1200x/f9/c0/f0/f9c0f05a0f2b34e887de76158189c79f.jpg',
                  alt: 'Pyrenees from an airplane',
                  ar: 120 / 161,
                },
                {
                  src: 'https://i.pinimg.com/736x/ad/ee/00/adee00c3e14918e042d865545756c0be.jpg',
                  alt: 'Basketball museum in Madrid',
                  ar: 120 / 161,
                },
                {
                  src: 'https://i.pinimg.com/736x/9d/c0/86/9dc0865ba564486c6b206661873a44a5.jpg',
                  alt: 'Temple Expiatori de la Sagrada Família',
                  ar: 3 / 4,
                },
                {
                  src: 'https://i.ibb.co/PxQ2gPG/beach-1236581-1280.jpg',
                  alt: 'Let’s have some Margaritas and make some bad decisions!',
                  ar: 16 / 9,
                },
                {
                  src: 'https://i.ibb.co/HqDCPGd/nature-3279419-1280.jpg',
                  alt: 'Meteora in Greece',
                  ar: 1280 / 853,
                },
                {
                  src: 'https://i.ibb.co/XsgHyx3/guell-park-1157681-1280.jpg',
                  alt: 'Park Güell, Barcelona',
                  ar: 160 / 83,
                },
                {
                  src: 'https://i.ibb.co/8sQ3XdY/avignon-1521541-1280.jpg',
                  alt: 'Avinhon, France, Provence-Alpes-Côte d’Azur',
                  ar: 16 / 9,
                },
                {
                  src: 'https://i.ibb.co/71RfB42/sunset-6007980-1280.jpg',
                  alt: 'Lavender in Provence-Alpes-Côte d’Azur, France',
                  ar: 1280 / 853,
                },
                {
                  src: 'https://i.ibb.co/42tv8k2/great-way-968932-1280.jpg',
                  alt: 'Gran Vía nr 1, Madryt',
                  ar: 1280 / 853,
                },
                {
                  src: 'https://i.ibb.co/WySmVXZ/308961156-649702816779384-5607195473166324459-n.jpg',
                  alt: 'Camp Nou, Barcelona',
                  ar: 537 / 403,
                },
                { src: 'https://i.ibb.co/C5XpQkh/barcelona-2371946-1280.jpg', alt: 'Barcelona', ar: 16 / 9 },
                { src: 'https://i.ibb.co/tsCt9tX/el-born-5301517-1280.jpg', alt: 'Barcelona', ar: 427 / 640 },
                { src: 'https://i.ibb.co/CKJcN53/santorini-4996901-1280.jpg', alt: 'Santorini', ar: 1280 / 853 },
                {
                  src: 'https://i.ibb.co/BLfrW0j/gordes-village-luberon-69-1024x682.jpg',
                  alt: 'Gordes, France',
                  ar: 512 / 341,
                },
                {
                  src: 'https://i.ibb.co/S5PV6qy/2df84435-ce2b-42d1-a9cc-e62e9e914441.webp',
                  alt: 'Lisboa',
                  ar: 400 / 267,
                },
                {
                  src: 'https://i.ibb.co/t8kdHrB/71c30ea8-2b4e-48ba-980b-b222c5dcaa38.webp',
                  alt: 'Zlatni Rat, Croatia',
                  ar: 800 / 533,
                },
                {
                  src: 'https://i.ibb.co/H4Mch3B/barcelona-1545605-640.jpg',
                  alt: 'La Pedrera / Casa Milà, Barcelona',
                  ar: 121 / 160,
                },
                {
                  src: 'https://i.ibb.co/sJxhNVC/quadrant-magic-subirachs-portada-1024x488.jpg',
                  alt: 'Magic square, Barcelona',
                  ar: 128 / 61,
                },
                { src: 'https://i.ibb.co/9tT9wfq/wroclaw-1511660-640.jpg', alt: 'Wrocław', ar: 128 / 85 },
                {
                  src: 'https://i.ibb.co/Gs5K4pJ/318467739-179571174674590-2719368099439007366-n.jpg',
                  alt: 'Jakuszyce',
                  ar: 4 / 3,
                },
              ].map(({ src, alt, ar }, i) => (
                <div key={i}>
                  <Picture src={src} alt={alt} key={i} ar={ar} border figcaption={alt} figcaptionColor="grey" />
                </div>
              ))}
            </Masonry>
          </Suspense>
        </div>
      </Grid>
    </Grid>
  );
};
