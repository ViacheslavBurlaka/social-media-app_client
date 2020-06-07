import React, { useState } from 'react';
import PropTypes from 'prop-types';

// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import { Button } from '@material-ui/core';

const styles = {
  Btn: {
    marginRight: '0.25rem',
    '&:last-of-type': {
      marginRight: 0
    }
  }
};

const Pagination = ({ classes, pageLimit, totalRecords, paginate }) => {
  const [selectedPage, setSelectedPage] = useState(1);

  let pages = [];

  for (let i = 1; i <= Math.ceil(totalRecords / pageLimit); i++) {
    pages.push(i);
  }

  const handleClick = (page, event) => {
    const selected = +event.target.innerText;
    setSelectedPage(selected);
    paginate(page);
  };

  const paginationMarkup =
    totalRecords > pageLimit ? (
      <div className="Pagination">
        {pages.map((page) => {
          return (
            <Button
              key={page}
              className={classes.Btn}
              onClick={(e) => handleClick(page, e)}
              size="small"
              color="primary"
              variant={page === selectedPage ? 'contained' : 'text'}
            >
              {page}
            </Button>
          );
        })}
      </div>
    ) : null;

  return <>{paginationMarkup}</>;
};

Pagination.propTypes = {
  classes: PropTypes.object.isRequired,
  pageLimit: PropTypes.number.isRequired,
  totalRecords: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired
};

export default withStyles(styles)(Pagination);
