import React from 'react';
import { CustomButton } from '../../elements/CustomButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux stuff
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../../redux/actions/dataActions';

// MUI stuff
import { FavoriteBorder } from '@material-ui/icons';
import FavoriteIcon from '@material-ui/icons/Favorite';

const LikeButton = ({ user: { authenticated, likes }, screamId, likeScream, unlikeScream }) => {
  const likedScream = () => {
    return !!(likes && likes.find((like) => like.screamId === screamId));
  };

  const handleLikeScream = () => {
    likeScream(screamId);
  };

  const handleUnLikeScream = () => {
    unlikeScream(screamId);
  };

  const likeButton = !authenticated ? (
    <CustomButton tip="Like">
      <Link to="/login">
        <FavoriteBorder color="primary" />
      </Link>
    </CustomButton>
  ) : likedScream() ? (
    <CustomButton tip="Undo like" onClick={handleUnLikeScream}>
      <FavoriteIcon color="secondary" />
    </CustomButton>
  ) : (
    <CustomButton tip="Like" onClick={handleLikeScream}>
      <FavoriteBorder color="primary" />
    </CustomButton>
  );

  return <>{likeButton}</>;
};

LikeButton.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatchToProps = {
  likeScream,
  unlikeScream
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeButton);
