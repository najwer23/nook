import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { useImmediateThrottledQuery } from '@app/hooks/useImmediateThrottledQuery';
import { Grid } from 'najwer23morsels/lib/Grid';
import { LoaderDots } from 'najwer23morsels/lib/LoaderDots';
import { TextBox } from 'najwer23morsels/lib/TextBox';
import { Typography } from 'najwer23morsels/lib/Typography';
import { useState } from 'react';
import AudioVisualizer from './AudioVisualizer';
import { queryPlaylist } from './Music.query';

interface Props {
  navigationType?: 'in' | 'home';
}

export const Music: React.FC<Props> = ({ navigationType = 'home' }) => {
  useDocumentTitle(`Music | ${import.meta.env.VITE_ANALYTICS_APP_NAME}`);

  const [counterSong, setCounterSong] = useState<number>(0);

  const {
    result: resultQueryPlaylist,
    isLoading: isLoadingQueryPlaylist,
    isError: isErrorQueryPlaylist,
  } = useImmediateThrottledQuery({
    queryKey: ['queryPlaylist', navigationType],
    queryFn: () => queryPlaylist(navigationType),
    staleTime: 30 * 1000 * 60,
    gcTime: 30 * 1000 * 60,
    retry: 0,
    enabled: true,
  });

  const playlist = resultQueryPlaylist?.data.audios ?? [];

  return (
    <Grid layout="container" widthMax={'100%'} padding="0">
      <Grid layout="container" widthMax="900px" margin="0 0 30px 0">
        <Typography appearance="light" variant="display" style={{ margin: 0 }}>
          Music
        </Typography>

        <Typography appearance="light" variant="caption">
          Free Music Archive
        </Typography>
      </Grid>

      {isLoadingQueryPlaylist && <LoaderDots />}

      {!isLoadingQueryPlaylist && isErrorQueryPlaylist && (
        <TextBox tag="p" desktopSize={16} mobileSize={16} fontWeight={500}>
          No results
        </TextBox>
      )}

      {!isLoadingQueryPlaylist && !isErrorQueryPlaylist && (
        <>
          <AudioVisualizer
            song={playlist[counterSong]}
            setCounterSong={setCounterSong}
            playlistLength={playlist.length}
          />

          <Grid margin={'10px 0 0 0'} layout="container" widthMax={'1400px'} minHeight="200px">
            <TextBox tag="p" desktopSize={32} mobileSize={24} fontWeight={500} margin={'0 0 10px 0'}>
              Playlist
            </TextBox>

            {playlist?.map((song) => (
              <TextBox
                style={{ cursor: 'pointer' }}
                key={song.id}
                onClick={() => {
                  setCounterSong(song.id - 1);
                }}
                tag="div"
                desktopSize={18}
                mobileSize={18}
                fontWeight={400}
                margin={'0 0px 5px 10px'}
              >
                {counterSong == song.id - 1 ? (
                  <Grid
                    padding={0}
                    margin={0}
                    minHeight={0}
                    layout="flex"
                    justifyContent="flexstart"
                    alignItems="flexstart"
                    gap={{ col: '10px', row: '0px' }}
                  >
                    <span style={{ display: 'inline-block', width: '20px', color: 'orangered' }}> {song.id}. </span>
                    <b>{song.author}</b> -{' '}
                    <i>
                      {song.name}, {song.licence}
                    </i>
                  </Grid>
                ) : (
                  <Grid
                    padding={0}
                    margin={0}
                    minHeight={0}
                    layout="flex"
                    justifyContent="flexstart"
                    alignItems="flexstart"
                    gap={{ col: '10px', row: '0px' }}
                  >
                    <span style={{ display: 'inline-block', width: '20px' }}> {song.id}. </span>
                    <b>{song.author}</b> -{' '}
                    <i>
                      {song.name}, {song.licence}
                    </i>
                  </Grid>
                )}
              </TextBox>
            ))}
          </Grid>
        </>
      )}
    </Grid>
  );
};
