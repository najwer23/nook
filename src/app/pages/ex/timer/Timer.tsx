import { Button } from 'najwer23morsels/lib/Button';
import { TextBox } from 'najwer23morsels/lib/TextBox';
import { VALIDATOR_MESSAGE_COLORS } from 'najwer23morsels/lib/validator';
import { useEffect, useState } from 'react';
import styles from './Timer.module.css';

const endTimerSound = new Audio(new URL('/music/p.wav', import.meta.url).href);

export const Timer: React.FC<{
  time: number;
  repCurrent: number;
  forceStop: boolean;
  repCurrentChange: string;
}> = ({ time, repCurrent, forceStop, repCurrentChange }) => {
  const [timeLeft, setTimeLeft] = useState<number>(time);
  const [timeEvent, setTimeEvent] = useState<'play' | 'pause'>('pause');

  useEffect(() => {
    if (forceStop) {
      handlePauseTimer();
      setTimeLeft(0);
    } else if (repCurrentChange.includes('stop')) {
      handlePauseTimer();
      setTimeLeft(time);
    } else if (repCurrentChange.includes('play') && repCurrent != 0 && !forceStop) {
      handleRefreshTimer();
    }
  }, [forceStop, repCurrentChange, repCurrent]);

  useEffect(() => {
    if (timeEvent === 'play') {
      const timer = setTimeout(() => {
        setTimeLeft((prevTimeLeft) => (prevTimeLeft > 0 ? prevTimeLeft - 1 : 0));
        if (timeLeft === 1) {
          endTimerSound.play().catch((error) => {
            console.error('Error playing sound:', error);
          });
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeEvent, timeLeft]);

  const handlePauseTimer = () => {
    setTimeEvent('pause');
  };

  const handleRefreshTimer = () => {
    setTimeLeft(time);
    setTimeEvent('play');
  };

  const handlePlayTimer = () => {
    setTimeEvent('play');
  };

  return (
    <div>
      <div className={styles.timer}>
        <TextBox tag="span" desktopSize={140} mobileSize={140} fontWeight={600} color="white">
          {timeLeft}
        </TextBox>
      </div>
      <div className={styles.timerControls}>
        <Button type="button" variant="secondary" onClick={handleRefreshTimer}>
          <TextBox desktopSize={16} mobileSize={16} color="inherit">
            Refresh
          </TextBox>
        </Button>

        <Button
          type="button"
          variant="secondary"
          backgroundColor={timeEvent === 'play' ? VALIDATOR_MESSAGE_COLORS.error : undefined}
          borderColor={timeEvent === 'play' ? VALIDATOR_MESSAGE_COLORS.error : undefined}
          disabled={timeEvent === 'pause'}
          onClick={handlePauseTimer}
        >
          <div className={[styles.timerIcon, styles.paused].join(' ')}></div>
        </Button>

        <Button
          type="button"
          variant="secondary"
          backgroundColor={timeEvent === 'pause' ? VALIDATOR_MESSAGE_COLORS.success : undefined}
          borderColor={timeEvent === 'pause' ? VALIDATOR_MESSAGE_COLORS.success : undefined}
          disabled={timeEvent === 'play'}
          onClick={handlePlayTimer}
        >
          <div className={styles.timerIcon}></div>
        </Button>
      </div>
    </div>
  );
};
