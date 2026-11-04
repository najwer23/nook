import { ButtonCopy } from 'najwer23morsels/lib/ButtonCopy';
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

      <ButtonCopy textToCopy={transferTitle} height="40px" width="80px" backgroundColor="indigo">
        <TextBox mobileSize={18} desktopSize={18} color="white">
          Copy
        </TextBox>
      </ButtonCopy>
    </Grid>
  );
};
