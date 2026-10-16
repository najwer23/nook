import { SyntaxHighlight } from '@app/syntaxhighlight/SyntaxHighlight';
import { Grid } from 'najwer23morsels/lib/Grid';
import type { PostSection } from '../post/Post.types';

export const SectionCode: React.FC<{
  section: Extract<PostSection, { name: 'post-code' }>;
}> = ({ section }) => {
  return (
    <Grid layout={'container'} margin={'30px 0 30px 0'} minHeight="0">
      <SyntaxHighlight>{section.data.code}</SyntaxHighlight>
    </Grid>
  );
};
