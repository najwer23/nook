import { Typography } from 'najwer23morsels/lib/Typography';
import type { PostSection } from '../post/Post.types';

export const SectionP: React.FC<{
  section: Extract<PostSection, { name: 'post-p' }>;
}> = ({ section }) => {
  return (
    <>
      <Typography variant="body">{section.data.text}</Typography>
    </>
  );
};
