import React from 'react';
import cx from 'classnames';
import Link from '$components/Link';
import { leadingSlashIt } from '$lib/utils';
import { PaginationProps } from './index';

const styles = require('./Pagination.module.scss');

const Pagination: React.FC<PaginationProps> = ({
  className,
  previousPagePath,
  previousAriaLabel,
  previousLabel = 'Older Posts',
  nextPagePath,
  nextAriaLabel,
  nextLabel = 'Newer Posts',
}) => {
  return (
    <nav className={cx(className, styles.wrapper)} aria-label="Post navigation">
      <ul className={styles.pageList}>
        {previousPagePath && (
          <li className={styles.page}>
            <Link
              to={leadingSlashIt(previousPagePath)}
              aria-label={previousAriaLabel || `See ${previousLabel}`}
            >
              {previousLabel}
            </Link>
          </li>
        )}
        {nextPagePath && (
          <li className={styles.page}>
            <Link
              to={leadingSlashIt(nextPagePath)}
              aria-label={nextAriaLabel || `See ${nextLabel}`}
            >
              {nextLabel}
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
