import Image from 'next/image';
import { BlogPost } from '@/lib/blog';
import { ClassAttributes, ImgHTMLAttributes } from 'react';
import { ExtraProps } from 'hast-util-to-jsx-runtime';

type props = {
  image: ClassAttributes<HTMLImageElement> & ImgHTMLAttributes<HTMLImageElement> & ExtraProps;
  post: BlogPost;
};

export default function BlogImage({ image, post }: Readonly<props>) {
  const imageSize = post.imageSizes[image.src!];

  return <Image src={image.src!} alt={image.alt!} width={imageSize.width} height={imageSize.height} />;
}
