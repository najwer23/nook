import { SectionCode } from '../sections/SectionCode';
import { SectionP } from '../sections/SectionP';
import { SectionSubheading } from '../sections/SectionSubheading';
import { SectionTitle } from '../sections/SectionTitle';
import type { PostSection } from './Post.types';

export const PostRenderSection: React.FC<{
  id: number;
  section: PostSection;
}> = ({ section, id }) => {
  switch (section.name) {
    case 'post-title':
      return <SectionTitle id={id} section={section} />;

    case 'post-p':
      return <SectionP section={section} />;

    case 'post-code':
      return <SectionCode section={section} />;

    case 'post-subheading':
      return <SectionSubheading section={section}></SectionSubheading>;

    // case 'group':
    //   return (
    //     <div>
    //       {section.data.children?.map((child: BlogPostSection, index: number) => (
    //         <BlogPostRenderSection key={index} section={child} id={id} />
    //       ))}
    //     </div>
    //   );

    default:
      return null;
  }
};
