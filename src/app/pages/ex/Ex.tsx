import { Button } from 'najwer23morsels/lib/Button';
import { Grid } from 'najwer23morsels/lib/Grid';
import { TextBox } from 'najwer23morsels/lib/TextBox';
import { Typography } from 'najwer23morsels/lib/Typography';
import { useState } from 'react';
import { Stats } from './stats/Stats';
import { Test } from './test/Test';
import { Workout } from './workout/Workout';

export const Ex: React.FC<{
  workoutName: string;
}> = ({ workoutName }) => {
  const [selectedTab, setSelectedTab] = useState<'workout' | 'stats' | 'test'>('stats');

  return (
    <Grid layout="container">
      <Grid layout="container" widthMax="100%" margin="0 0 30px 0">
        <Typography variant="display" style={{ margin: 0 }}>
          {workoutName}
        </Typography>

        <Grid
          layout="flex"
          justifyContent="flex-start"
          flexWrap="wrap"
          gap={{ col: '15px', row: '15px' }}
          margin="30px 0 0"
        >
          <Button variant="secondary" onClick={() => setSelectedTab('stats')} disabled={selectedTab === 'stats'}>
            <TextBox mobileSize={16} desktopSize={16} color="inherit">
              Stats
            </TextBox>
          </Button>

          <Button variant="secondary" onClick={() => setSelectedTab('workout')} disabled={selectedTab === 'workout'}>
            <TextBox mobileSize={16} desktopSize={16} color="inherit">
              Workout
            </TextBox>
          </Button>

          <Button variant="secondary" onClick={() => setSelectedTab('test')} disabled={selectedTab === 'test'}>
            <TextBox mobileSize={16} desktopSize={16} color="inherit">
              Test
            </TextBox>
          </Button>
        </Grid>
      </Grid>

      {selectedTab === 'stats' && <Stats workoutName={workoutName} />}

      {selectedTab === 'workout' && <Workout workoutName={workoutName} setSelectedTab={setSelectedTab} />}

      {selectedTab === 'test' && <Test workoutName={workoutName} setSelectedTab={setSelectedTab} />}
    </Grid>
  );
};
