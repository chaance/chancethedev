import React from 'react';
import Link from '$components/Link';
import { leadingSlashIt, getBem } from '$lib/utils';
import { PaginationProps } from './index';
import './Pagination.scss';

let bem = getBem('Pagination');

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
    <nav className={bem(className)} aria-label="Post navigation">
      <ul className={bem({el: 'page-list'})}>
        {previousPagePath && (
          <li className={bem({el: 'page'})}>
            <Link
              to={leadingSlashIt(previousPagePath)}
              aria-label={previousAriaLabel || `See ${previousLabel}`}
            >
              {previousLabel}
            </Link>
          </li>
        )}
        {nextPagePath && (
          <li className={bem({el: 'page'})}>
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
