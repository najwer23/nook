import { Button } from 'najwer23morsels/lib/Button';
import { Calendar } from 'najwer23morsels/lib/Calendar';
import { Dialog } from 'najwer23morsels/lib/Dialog';
import type { FormType } from 'najwer23morsels/lib/Form';
import { Form } from 'najwer23morsels/lib/Form';
import { Grid } from 'najwer23morsels/lib/Grid';
import { Input } from 'najwer23morsels/lib/Input';
import { TextBox } from 'najwer23morsels/lib/TextBox';
import { usePostStore } from './Post.store';

export const PostDialogEdit: React.FC<{}> = () => {
  const sectionId = usePostStore.use.sectionId();
  const sectionIdDialogOpen = usePostStore.use.sectionIdDialogOpen();
  const closeSectionIdDialog = usePostStore.use.closeSectionIdDialog();
  const updateSectionData = usePostStore.use.updateSectionData();
  const updateSectionDataAndTitle = usePostStore.use.updateSectionDataAndTitle();
  const postJson = usePostStore.use.postJson();

  const section = postJson?.sections?.[sectionId];

  const handleOnSubmit = (form: FormType) => {
    if (Object.values(form).some(({ error }) => error)) return;

    switch (section.name) {
      case 'post-title': {
        const data = {
          title: form.title.value,
          date: form.date.value.split('-').reverse().join('/'),
        };
        updateSectionDataAndTitle(sectionId, section.name, data, form.newIndex.value);
        break;
      }

      case 'post-subheading':
      case 'post-p': {
        const data = {
          text: form.text.value,
        };
        updateSectionData(sectionId, section.name, data, form.newIndex.value);
        break;
      }

      case 'post-code': {
        const data = {
          code: form.code.value,
        };
        updateSectionData(sectionId, section.name, data, form.newIndex.value);
        break;
      }
    }

    closeSectionIdDialog();
  };

  return (
    <>
      <Dialog widthMax={'900px'} open={sectionIdDialogOpen} onCancel={() => closeSectionIdDialog()}>
        <Grid layout="container" padding="0px 30px 30px 30px" margin="auto" widthMin={'min(800px, calc(100vw - 25px))'}>
          <TextBox mobileSize={20} desktopSize={20} margin={'0 0 30px'} tag="h3" fontWeight={700}>
            Editing section {sectionId}
          </TextBox>

          <Form
            key={`${sectionId}-${section?.name}`}
            onSubmit={handleOnSubmit}
            isError={false}
            isPending={false}
            isSuccess={false}
            errorMsg={undefined}
            successMsg={undefined}
          >
            <Input
              label="New Index"
              type="text"
              name="newIndex"
              defaultValue={String(sectionId)}
              validatorOptions={[
                { type: 'empty' },
                { type: 'numberInRange', options: { min: 0, max: postJson?.sections?.length - 1 } },
              ]}
              placeholder="New Index"
            />

            {section?.name === 'post-title' && (
              <>
                <Input
                  label="Title"
                  type="text"
                  name="title"
                  defaultValue={section?.data.title}
                  validatorOptions={[{ type: 'empty' }]}
                  placeholder="Post Title"
                />

                <Calendar label="Date" name="date" defaultValue={section?.data.date} placeholder="Post Date" />
              </>
            )}

            {section?.name === 'post-p' && (
              <>
                <Input
                  kind="textarea"
                  label="Paragraph"
                  name="text"
                  defaultValue={section?.data.text}
                  validatorOptions={[{ type: 'empty' }]}
                  placeholder="Place for your paragraph"
                />
              </>
            )}

            {section?.name === 'post-subheading' && (
              <>
                <Input
                  kind="textarea"
                  label="Subheading"
                  name="text"
                  defaultValue={section?.data.text}
                  validatorOptions={[{ type: 'empty' }]}
                  placeholder="Place for your subheading"
                />
              </>
            )}

            {section?.name === 'post-code' && (
              <>
                <Input
                  kind="textarea"
                  label="Code"
                  name="code"
                  defaultValue={section?.data.code}
                  validatorOptions={[{ type: 'empty' }]}
                  placeholder="Place for your paragraph"
                />
              </>
            )}

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
    </>
  );
};
