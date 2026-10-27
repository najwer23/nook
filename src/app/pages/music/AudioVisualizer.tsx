import { Button } from 'najwer23morsels/lib/Button';
import { Grid } from 'najwer23morsels/lib/Grid';
import { TextBox } from 'najwer23morsels/lib/TextBox';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Song } from './Music.query';

interface AudioVisualizerProps {
  song: Song | null;
  setCounterSong: React.Dispatch<React.SetStateAction<number>>;
  playlistLength: number;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ song, setCounterSong, playlistLength }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isBuffering, setIsBuffering] = useState(true);
  const lastTimeRef = useRef(0);

  const throttledSetCurrentTime = useCallback((time: number) => {
    if (Date.now() - lastTimeRef.current > 1000) {
      setCurrentTime(time);
      lastTimeRef.current = Date.now();
    }
  }, []);

  const handleTimeUpdate = useCallback(
    (e: React.SyntheticEvent<HTMLAudioElement>) => {
      const target = e.currentTarget;
      throttledSetCurrentTime(target.currentTime);
    },
    [throttledSetCurrentTime],
  );

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !song) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      if (audio.src !== song.url) {
        audio.src = song.url;
      }

      try {
        await audio.play();
        setIsPlaying(true);
        setupAudio();
      } catch (error) {
        console.error('Play failed:', error);
      }
    }
  }, [isPlaying, song?.url]);

  const setupAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || audioCtxRef.current) return;
    const audioCtx = new AudioContext();
    audioCtxRef.current = audioCtx;
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    setIsBuffering(true);
    setDuration(0);
    setCurrentTime(0);

    if (!audio || !song) {
      setIsPlaying(false);
      return;
    }

    audio.src = song.url;

    if (isPlaying && audioCtxRef.current) {
      audio
        .play()
        .then(() => {
          setupAudio();
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }, [song?.url]);

  useEffect(() => {
    setDuration(0);
    setCurrentTime(0);
  }, []);

  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const displayTime = useMemo(() => {
    return `${formatTime(currentTime)} / ${formatTime(duration)}`;
  }, [duration, currentTime, formatTime]);

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (audio && duration > 0) {
      const percent = parseFloat(e.target.value);
      const newTime = (percent / 100) * duration;
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const seekValue = useMemo(() => (duration > 0 ? (currentTime / duration) * 100 : 0), [currentTime, duration]);

  return (
    <Grid layout="container" widthMax="100%" padding={'0'} minHeight={'170px'}>
      <Grid
        layout="flex"
        flexWrap="wrap"
        justifyContent="flexstart"
        alignItems="flexstart"
        widthMax="100%"
        gap={{ col: '40px', row: '20px' }}
      >
        <div>
          <TextBox tag="p" desktopSize={25} mobileSize={25} fontWeight={500}>
            {song?.name}
          </TextBox>

          <TextBox tag="p" desktopSize={16} mobileSize={16} fontWeight={400} color="black" margin={'-5px 0 10px'}>
            <i>{song?.author}</i>
          </TextBox>

          <Grid
            layout="flex"
            minHeight="20px"
            flexWrap="wrap"
            justifyContent="flexstart"
            alignItems="flexstart"
            widthMax="100%"
            gap={{ col: '10px', row: '0px' }}
          >
            <input
              type="range"
              min="0"
              max="100"
              value={seekValue}
              onChange={handleSeekChange}
              style={{ accentColor: '#ef5527' }}
            />

            <TextBox tag="p" desktopSize={14} mobileSize={14} fontWeight={400} color="gray">
              {displayTime}
            </TextBox>
          </Grid>

          <Grid
            layout="flex"
            minHeight="20px"
            flexWrap="wrap"
            justifyContent="flexstart"
            alignItems="flexstart"
            widthMax="100%"
            gap={{ col: '10px', row: '0px' }}
          >
            <Button
              type="button"
              height={'40px'}
              width={'60px'}
              padding={0}
              backgroundColor="purple"
              backgroundColorDisabled="grey"
              onClick={() => {
                if (song?.id == 1) {
                  setCounterSong(playlistLength - 1);
                } else {
                  setCounterSong((prev) => prev - 1);
                }
                setCurrentTime(0);
              }}
              margin={'20px 0 3px'}
            >
              <TextBox tag="span" desktopSize={16} mobileSize={16} fontWeight={400} color="white">
                Prev
              </TextBox>
            </Button>

            <Button
              type="button"
              height={'40px'}
              width={'60px'}
              padding={0}
              backgroundColor={isPlaying ? 'red' : '  green'}
              backgroundColorDisabled="grey"
              onClick={togglePlay}
              margin={'20px 0 3px'}
            >
              <TextBox tag="span" desktopSize={16} mobileSize={16} fontWeight={400} color="white">
                {isPlaying ? 'Stop' : 'Play'}
              </TextBox>
            </Button>

            <Button
              type="button"
              height={'40px'}
              width={'60px'}
              padding={0}
              backgroundColor="purple"
              backgroundColorDisabled="grey"
              onClick={() => {
                if (song?.id == playlistLength) {
                  setIsPlaying(false);
                  setCounterSong(0);
                } else {
                  setCounterSong((prev) => prev + 1);
                }
                setCurrentTime(0);
              }}
              margin={'20px 0 3px'}
            >
              <TextBox tag="span" desktopSize={16} mobileSize={16} fontWeight={400} color="white">
                Next
              </TextBox>
            </Button>
          </Grid>

          <TextBox tag="span" desktopSize={12} mobileSize={12} fontWeight={400} color="grey">
            {isBuffering && 'Buffering..'}
          </TextBox>
        </div>
      </Grid>

      <audio
        ref={audioRef}
        crossOrigin="anonymous"
        preload="auto"
        onLoadedMetadata={(e) => {
          const target = e.currentTarget as HTMLAudioElement;
          setDuration(target.duration || 0);
          setTimeout(() => {
            setIsBuffering(false);
          }, 400);
        }}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => {
          if (song?.id == playlistLength) {
            setIsPlaying(false);
          }
          setCounterSong((prev) => prev + 1);
          setCurrentTime(0);
        }}
      />
    </Grid>
  );
};

export default AudioVisualizer;
