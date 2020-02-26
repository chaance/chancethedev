import React from 'react';
import { H4 } from '$components/Heading';
import { TwitterIcon } from '$components/Icons';
import Link from '$components/Link';
import VH from '@reach/visually-hidden';
import { leadingSlashIt, getBem } from '$lib/utils';
import config from '$src/../config';
import { PostMetaProps } from './index';
import './PostMeta.scss';

let bem = getBem('PostMeta');

const PostMeta: React.FC<PostMetaProps> = ({
  className,
  author,
  date,
  append,
  ...props
}) => {
  return (
    <div className={bem(className)} {...props}>
      {author && author.image && (
        <div className={bem({ el: 'image-wrapper' })}>
          <img src={leadingSlashIt(author.image)} alt={`${author.name} bio`} />
        </div>
      )}
      <div>
        {author && (
          <H4 className={bem({ el: 'author-name' })}>{author.name}</H4>
        )}
        <ul className={bem({ el: 'post-info' })}>
          {date && <li className={bem({ el: 'info-item' })}>{date}</li>}
          {append
            ? append.map((item, index) => (
                <li className={bem({ el: 'info-item' })} key={index}>
                  {item}
                </li>
              ))
            : null}
          <li className={bem({ el: 'info-item' })}>
            <Link target="_blank" rel="noopener noreferrer" to={config.twitter}>
              <VH>Twitter</VH>
              <TwitterIcon aria-hidden />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PostMeta;
