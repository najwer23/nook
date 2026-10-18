import { Typography } from 'najwer23morsels/lib/Typography';
import type { PostSection } from '../post/Post.types';

export const SectionSubheading: React.FC<{
  section: Extract<PostSection, { name: 'post-subheading' }>;
}> = ({ section }) => {
  return (
    <>
      <Typography appearance="light" variant="subheading">
        {section.data.text}
      </Typography>
    </>
  );
};
