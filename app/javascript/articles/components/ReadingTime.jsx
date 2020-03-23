import { h } from 'preact';
import PropTypes from 'prop-types';

export const ReadingTime = ({ articlePath, readingTime }) => {
  // we have ` ... || null` for the case article.reading_time is undefined
  return (
    <a href={articlePath} className="article-reading-time">
      {/* render readingTime value or 1 if the reading time is less than 1 */}
      {`${readingTime < 1 ? 1 : readingTime} min read`}
    </a>
  );
};

ReadingTime.defaultProps = {
  readingTime: null,
};

ReadingTime.propTypes = {
  articlePath: PropTypes.string.isRequired,
  readingTime: PropTypes.number,
};

ReadingTime.displayName = 'ReadingTime';
