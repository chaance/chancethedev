import React from 'react';
import cx from 'classnames';
import { H4 } from '$components/Heading';
import { TwitterIcon } from '$components/Icons';
import Link from '$components/Link';
import VH from '@reach/visually-hidden';
import { leadingSlashIt } from '$lib/utils';
import config from '$src/../config';
import { PostMetaProps } from './index';

const styles = require('./PostMeta.module.scss');

const PostMeta: React.FC<PostMetaProps> = ({
  className,
  author,
  date,
  append,
  ...props
}) => {
  return (
    <div className={cx(className, 'PostMeta', styles.wrapper)} {...props}>
      {author && author.image && (
        <div className={styles.imageWrapper}>
          <img
            className={styles.image}
            src={leadingSlashIt(author.image)}
            alt={`${author.name} bio`}
          />
        </div>
      )}
      <div>
        {author && <H4 className={styles.authorName}>{author.name}</H4>}
        <PostInfo date={date} append={append} />
      </div>
    </div>
  );
};

function PostInfo({ date, append }: any) {
  return (
    <ul className={styles.postInfo}>
      {date && <InfoItem>{date}</InfoItem>}
      {append
        ? (append as React.ReactNode[]).map((item, index) => (
            <InfoItem key={index}>{item}</InfoItem>
          ))
        : null}
      <InfoItem>
        <Link target="_blank" rel="noopener noreferrer" to={config.twitter}>
          <VH>Twitter</VH>
          <TwitterIcon aria-hidden />
        </Link>
      </InfoItem>
    </ul>
  );
}

function InfoItem(props: any) {
  return <li className={styles.infoItem} {...props} />;
}

export default PostMeta;
