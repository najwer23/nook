import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { storageItemSet } from '@app/storage/storageItemSet';
import { SyntaxHighlight } from '@app/syntaxhighlight/SyntaxHighlight';
import { Button } from 'najwer23morsels/lib/Button';
import { Grid } from 'najwer23morsels/lib/Grid';
import { TextBox } from 'najwer23morsels/lib/TextBox';
import { useEffect, useRef, useState } from 'react';
import { usePostStore } from './post/Post.store';
import { PostDialogEdit } from './post/PostDialogEdit';
import { PostDialogImport } from './post/PostDialogImport';
import { PostRenderSection } from './post/PostRenderSection';

const STORAGE_KEY = 'blog-post-creator';

export const BlogPostCreator = () => {
  useDocumentTitle(`Blog Post Creator | ${import.meta.env.VITE_ANALYTICS_APP_NAME}`);

  const postJson = usePostStore.use.postJson();
  const setPostJson = usePostStore.use.setPostJson();
  const startAddSection = usePostStore.use.startAddSection();
  const removeSection = usePostStore.use.removeSection();
  const openSectionIdDialog = usePostStore.use.openSectionIdDialog();
  const openImportDialog = usePostStore.use.openImportDialog();

  const dragItemIndex = useRef<number | null>(null);
  const dragOverIndex = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!postJson) return;
    storageItemSet(localStorage, STORAGE_KEY, postJson, 999999);
  }, [postJson]);

  const moveSection = (from: number, to: number) => {
    if (from === to) return;

    const nextSections = [...postJson.sections];
    const [moved] = nextSections.splice(from, 1);
    nextSections.splice(to, 0, moved);

    setPostJson((prev) => ({
      ...prev,
      sections: nextSections,
    }));
  };

  const handleDragStart = (index: number) => {
    dragItemIndex.current = index;
    setIsDragging(true);
  };

  const handleDragEnter = (index: number) => {
    dragOverIndex.current = index;
  };

  const handleDragEnd = () => {
    if (dragItemIndex.current !== null && dragOverIndex.current !== null) {
      moveSection(dragItemIndex.current, dragOverIndex.current);
    }

    dragItemIndex.current = null;
    dragOverIndex.current = null;
    setIsDragging(false);
  };

  return (
    <Grid layout="container" widthMax="1600px" padding="40px 20px 40px 20px" margin="auto">
      <PostDialogImport />
      <PostDialogEdit />

      <TextBox mobileSize={20} desktopSize={20} margin="0 0 20px">
        Import
      </TextBox>

      <Button height="40px" width="120px" backgroundColor="orangered" onClick={openImportDialog} margin={'20px 0 40px'}>
        <TextBox mobileSize={18} desktopSize={18} color="white">
          JSON
        </TextBox>
      </Button>

      <Grid layout="flex" justifyContent="flex-start" alignItems="flex-start" margin={'0 0 100px'} flexWrap="wrap">
        <Grid layout="container" widthMax="450px" widthMin={'min(450px, 100vw)'} margin="0 0 40px">
          <TextBox mobileSize={20} desktopSize={20} margin="0 0 40px">
            Sections
          </TextBox>

          <Button
            height="40px"
            width="100px"
            backgroundColor="orange"
            onClick={() => startAddSection('post-title')}
            backgroundColorDisabled="darkgrey"
            disabled={postJson?.sections?.filter((x) => x.name == 'post-title').length > 0}
          >
            <TextBox mobileSize={18} desktopSize={18}>
              Post Title
            </TextBox>
          </Button>

          <Button
            height="40px"
            width="120px"
            backgroundColor="orange"
            onClick={() => startAddSection('post-p')}
            margin={'20px 0 0'}
          >
            <TextBox mobileSize={18} desktopSize={18}>
              Paragraph
            </TextBox>
          </Button>

          <Button
            height="40px"
            width="60px"
            backgroundColor="orange"
            onClick={() => startAddSection('post-code')}
            margin={'20px 0 0'}
          >
            <TextBox mobileSize={18} desktopSize={18}>
              Code
            </TextBox>
          </Button>

          <Button
            height="40px"
            width="120px"
            backgroundColor="orange"
            onClick={() => startAddSection('post-subheading')}
            margin={'20px 0 0'}
          >
            <TextBox mobileSize={18} desktopSize={18}>
              Subheading
            </TextBox>
          </Button>
        </Grid>

        <Grid layout="container" widthMax="1100px" widthMin={'min(1100px, calc(100vw - 40px))'} margin={0}>
          <TextBox mobileSize={20} desktopSize={20} margin="0 0 40px">
            Post
          </TextBox>

          <Grid layout="container" widthMax={'1190px'} margin={0}>
            {postJson?.sections?.map((section, index) => (
              <Grid
                key={index}
                layout="flex"
                flexWrap="nowrap"
                justifyContent="flexstart"
                alignItems="flexstart"
                widthMax={'1190px'}
                gap={{ col: '10px', row: '20px' }}
                margin={0}
              >
                <Grid layout="container" widthMin="200px" widthMax={'200px'} margin={0}>
                  <TextBox mobileSize={8} desktopSize={8} margin={'3px 0 0px'}>
                    {index} {section.name}
                  </TextBox>
                  <Grid layout="flex" justifyContent="flex-start" margin={0} gap={{ col: '10px', row: '20px' }}>
                    <Button
                      width="40px"
                      height="20px"
                      backgroundColor="#4BB543"
                      onClick={() => openSectionIdDialog(index)}
                    >
                      <TextBox mobileSize={10} desktopSize={10} color="white">
                        Edit
                      </TextBox>
                    </Button>
                    <Button width="40px" height="20px" backgroundColor="#ff3333" onClick={() => removeSection(index)}>
                      <TextBox mobileSize={10} desktopSize={10} color="white">
                        Del
                      </TextBox>
                    </Button>
                    <Button
                      width="40px"
                      height="20px"
                      backgroundColor="purple"
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragEnter={() => handleDragEnter(index)}
                      onDragEnd={handleDragEnd}
                      onDragOver={(e) => e.preventDefault()}
                      style={{
                        opacity: isDragging && dragItemIndex.current === index ? 0.4 : 1,
                        cursor: 'move',
                      }}
                    >
                      <TextBox mobileSize={10} desktopSize={10} color="white">
                        Drag
                      </TextBox>
                    </Button>
                  </Grid>
                </Grid>

                <Grid layout="container" widthMax="1600px" widthMin={'min(900px, calc(100vw - 240px))'} margin="0">
                  <PostRenderSection section={section} id={1} />
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <hr />

      <Grid layout="container" widthMax="1600px" widthMin={'min(500px, calc(100vw - 40px))'} margin="40px 0 50px 0">
        <TextBox mobileSize={20} desktopSize={20} margin="0 0 40px">
          JSON
        </TextBox>

        <SyntaxHighlight>{JSON.stringify(postJson, null, 2)}</SyntaxHighlight>
      </Grid>
    </Grid>
  );
};
