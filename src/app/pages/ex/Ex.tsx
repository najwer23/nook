import { Button } from 'najwer23morsels/lib/Button';
import { Grid } from 'najwer23morsels/lib/Grid';
import { TextBox } from 'najwer23morsels/lib/TextBox';
import { Typography } from 'najwer23morsels/lib/Typography';
import React, { useState } from 'react';
import { Stats } from './stats/Stats';
import { Workout } from './workout/Workout';

export const Ex: React.FC<{
  workoutName: string;
}> = ({ workoutName }) => {
  const [selecteTab, setSelectedTab] = useState<'workout' | 'stats'>('workout');

  return (
    <Grid layout="container" widthMax={'1400px'}>
      <Grid layout="container" widthMax={'100%'} margin={'0 0 30px 0'}>
        <Typography appearance="light" variant="display" style={{ margin: 0 }}>
          {workoutName}
        </Typography>

        <Grid
          layout="flex"
          justifyContent="flex-start"
          flexWrap="wrap"
          gap={{ col: '20px', row: '20px' }}
          margin={'20px 0 0'}
        >
          <Button
            height="40px"
            width="100px"
            backgroundColor="orange"
            onClick={() => setSelectedTab('workout')}
            backgroundColorDisabled="darkgrey"
            disabled={selecteTab == 'workout'}
          >
            <TextBox mobileSize={18} desktopSize={18}>
              Workout
            </TextBox>
          </Button>

          <Button
            height="40px"
            width="100px"
            backgroundColor="orange"
            onClick={() => setSelectedTab('stats')}
            backgroundColorDisabled="darkgrey"
            disabled={selecteTab == 'stats'}
          >
            <TextBox mobileSize={18} desktopSize={18}>
              Chart
            </TextBox>
          </Button>
        </Grid>
      </Grid>

      {selecteTab == 'workout' && <Workout workoutName={workoutName} />}
      {selecteTab == 'stats' && <Stats workoutName={workoutName} />}
    </Grid>
  );
};
