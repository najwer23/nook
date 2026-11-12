import { Button } from 'najwer23morsels/lib/Button';
import { Grid } from 'najwer23morsels/lib/Grid';
import { Input } from 'najwer23morsels/lib/Input';
import { TextBox } from 'najwer23morsels/lib/TextBox';
import { useState } from 'react';

export const PaymentsTransferTitle: React.FC<{
  generatedText: string;
}> = ({ generatedText }) => {
  const [transferTitle, setTransferTitle] = useState(generatedText);

  return (
    <Grid layout="container" widthMax="583.8px" margin="20px 0 30px 0">
      <Grid
        margin="30px 0 0px"
        layout="split"
        gap={{ col: '20px' }}
        split={{
          mobile: ['1fr', '63.8px'],
          tablet: ['1fr', '63.8px'],
        }}
      >
        <Input
          kind="textarea"
          name="templateText"
          minHeight={'100px'}
          maxHeight={'200px'}
          defaultValue={generatedText}
          label="Transfer title"
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setTransferTitle(e.target.value)}
        />

        <Button variant="copy" textToCopy={transferTitle} margin={'20px 0 0 0'}>
          <TextBox mobileSize={16} desktopSize={16} color="inherit">
            Copy
          </TextBox>
        </Button>
      </Grid>
    </Grid>
  );
};
