import { SyntaxHighlight } from '@app/syntaxhighlight/SyntaxHighlight';
import { Button } from 'najwer23morsels/lib/Button';
import { Dialog } from 'najwer23morsels/lib/Dialog';
import type { FormType } from 'najwer23morsels/lib/Form';
import { Form } from 'najwer23morsels/lib/Form';
import { Grid } from 'najwer23morsels/lib/Grid';
import { Input } from 'najwer23morsels/lib/Input';
import { TextBox } from 'najwer23morsels/lib/TextBox';
import { useEffect, useState } from 'react';
import { usePostStore } from './Post.store';
import type { PostJson } from './Post.types';

export const PostDialogImport: React.FC<{}> = () => {
  const setPostJson = usePostStore.use.setPostJson();
  const postJson = usePostStore.use.postJson();
  const importDialogOpen = usePostStore.use.importDialogOpen();
  const closeImportDialog = usePostStore.use.closeImportDialog();

  const [jsonText, setJsonText] = useState(JSON.stringify(postJson, null, 2));

  useEffect(() => {
    setJsonText(JSON.stringify(postJson, null, 2));
  }, [postJson]);

  const handleOnSubmit = (form: FormType) => {
    if (Object.values(form).some(({ error }) => error)) return;

    setPostJson(() => JSON.parse(form.json.value) as PostJson);
    closeImportDialog();
  };

  return (
    <Dialog widthMax={'900px'} open={importDialogOpen} onCancel={() => closeImportDialog()}>
      <Grid layout="container" padding="0px 30px 30px 30px" margin="auto" widthMin={'min(800px, calc(100vw - 25px))'}>
        <TextBox mobileSize={20} desktopSize={20} margin={'0 0 30px'} tag="h3" fontWeight={700}>
          Import JSON post
        </TextBox>

        <Form
          onSubmit={handleOnSubmit}
          isError={false}
          isPending={false}
          isSuccess={false}
          errorMsg={undefined}
          successMsg={undefined}
        >
          <Grid layout={'container'} margin={'30px 0 30px 0'} minHeight="0">
            <SyntaxHighlight>
              {JSON.stringify(
                {
                  title: '',
                  id: '',
                  sections: [],
                },
                null,
                2,
              )}
            </SyntaxHighlight>
          </Grid>

          <Input
            kind="textarea"
            label="JSON"
            name="json"
            value={jsonText}
            validatorOptions={[{ type: 'empty' }, { type: 'json' }]}
            placeholder="Place for your JSON"
            onChange={(e) => setJsonText(e.target.value)}
          />

          <Grid
            layout="flex"
            widthMax={'100%'}
            padding={'0'}
            justifyContent="flex-end"
            alignItems="right"
            margin={'30px 0 0 0'}
          >
            <Button
              type="submit"
              height={'40px'}
              width={'80px'}
              padding={0}
              backgroundColor="#4BB543"
              backgroundColorDisabled="grey"
            >
              <TextBox tag="span" desktopSize={16} mobileSize={16} fontWeight={400} color="white">
                Save
              </TextBox>
            </Button>
          </Grid>
        </Form>
      </Grid>
    </Dialog>
  );
};
