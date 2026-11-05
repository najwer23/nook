import { Button } from 'najwer23morsels/lib/Button';
import { Grid } from 'najwer23morsels/lib/Grid';
import { Input } from 'najwer23morsels/lib/Input';
import { TextBox } from 'najwer23morsels/lib/TextBox';
import { useEffect, useState } from 'react';

export const PaymentsTransferTitle: React.FC<{
  generatedText: string;
}> = ({ generatedText }) => {
  const [transferTitle, setTransferTitle] = useState(generatedText);

  useEffect(() => {
    setTransferTitle(generatedText);
  }, [generatedText]);

  return (
    <Grid layout="container" widthMax="900px" margin="30px 0 30px 0">
      <Input
        kind="textarea"
        name="templateText"
        defaultValue={generatedText}
        label="Transfer title"
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setTransferTitle(e.target.value)}
      />

      <Button variant="copy" textToCopy={transferTitle}>
        <TextBox mobileSize={16} desktopSize={16} color="inherit">
          Copy
        </TextBox>
      </Button>
    </Grid>
  );
};
