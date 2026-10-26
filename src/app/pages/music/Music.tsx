import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { useImmediateThrottledQuery } from '@app/hooks/useImmediateThrottledQuery';
import { Grid } from 'najwer23morsels/lib/Grid';
import { LoaderDots } from 'najwer23morsels/lib/LoaderDots';
import { TextBox } from 'najwer23morsels/lib/TextBox';
import { Typography } from 'najwer23morsels/lib/Typography';
import { useEffect, useState } from 'react';
import AudioVisualizer from './AudioVisualizer';
import { queryPlaylist, type Song } from './Music.query';

// import styles from './Music.module.css';

interface Props {}

export const Music: React.FC<Props> = ({}) => {
  useDocumentTitle(`Music | ${import.meta.env.VITE_ANALYTICS_APP_NAME}`);

  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [counterSong, setCounterSong] = useState<number>(0);

  const {
    result: resultQueryPlaylist,
    isLoading: isLoadingQueryPlaylist,
    isError: isErrorQueryPlaylist,
  } = useImmediateThrottledQuery({
    queryKey: ['queryPlaylist', 'queryPlaylist'],
    queryFn: () => queryPlaylist(),
    staleTime: 30 * 1000 * 60,
    gcTime: 30 * 1000 * 60,
    retry: 0,
    enabled: true,
  });

  const playlist = resultQueryPlaylist?.data.audios ?? [];

  useEffect(() => {
    if ((playlist.length > 0 && counterSong === 0 && !selectedSong) || counterSong >= playlist.length) {
      setCounterSong(0);
      setSelectedSong(null);
    }
  }, [counterSong, playlist.length]);

  const song = !selectedSong && playlist.length > 0 ? playlist[counterSong] : selectedSong;

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

      {!isLoadingQueryPlaylist && !isErrorQueryPlaylist && (
        <>
          <Grid layout="container" minHeight={'180px'}>
            <AudioVisualizer song={song} setCounterSong={setCounterSong} playlistLength={playlist.length} />
          </Grid>

          <Grid margin={'30px 0 0 0'} layout="container" widthMax={'1400px'} minHeight="200px">
            <TextBox tag="p" desktopSize={32} mobileSize={24} fontWeight={500} margin={'0 0 10px 0'}>
              Playlist
            </TextBox>

            <ul
              style={{
                paddingLeft: '30px',
              }}
            >
              {playlist?.map((song) => (
                <li
                  style={{ cursor: 'pointer' }}
                  key={song.id}
                  onClick={() => {
                    setSelectedSong(song);
                    setCounterSong(song.id - 1);
                  }}
                >
                  <Grid
                    minHeight="auto"
                    layout="flex"
                    flexWrap="nowrap"
                    gap={{ col: '10px', row: '0px' }}
                    margin={'0 0 10px'}
                  >
                    <TextBox tag="p" desktopSize={18} mobileSize={18} fontWeight={400}>
                      {counterSong == song.id - 1 ? (
                        <u>
                          <b>{song.author}</b> -{' '}
                          <i>
                            {song.name}, {song.licence}
                          </i>
                        </u>
                      ) : (
                        <>
                          <b>{song.author}</b> -{' '}
                          <i>
                            {song.name}, {song.licence}
                          </i>
                        </>
                      )}
                    </TextBox>
                  </Grid>
                </li>
              ))}
            </ul>
          </Grid>
        </>
      )}
    </Grid>
  );
};
