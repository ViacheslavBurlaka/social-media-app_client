import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';

// Redux stuff
import { connect } from 'react-redux';
import { markNotificationsRead } from '../../redux/actions/userActions';

// MUI stuff
import { Menu, MenuItem, Tooltip, Typography, Badge } from '@material-ui/core';

// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
import IconButton from '@material-ui/core/IconButton';

const Notifications = ({ notifications, markNotificationsRead }) => {
  dayjs.extend(relativeTime);

  const initialState = {
    anchorEl: null
  };

  const [state, setState] = useState(initialState);

  const handleOpen = (event) => {
    setState((prevState) => ({
      ...prevState,
      anchorEl: event.target
    }));
  };

  const handleClose = () => {
    setState((prevState) => ({
      ...prevState,
      anchorEl: null
    }));
  };

  const onMenuOpened = () => {
    let unreadNotificationsIds = notifications
      .filter((notification) => !notification.read)
      .map((notification) => notification.notificationId);

    markNotificationsRead(unreadNotificationsIds);
  };

  let notificationIcon;
  if (notifications && notifications.length > 0) {
    const unreadNotifications = notifications.filter((notification) => notification.read === false);
    notificationIcon =
      unreadNotifications.length > 0 ? (
        <Badge badgeContent={unreadNotifications.length} color="secondary">
          <NotificationsIcon />
        </Badge>
      ) : (
        <NotificationsIcon />
      );
  } else {
    notificationIcon = <NotificationsIcon />;
  }

  let notificationsMarkup =
    notifications && notifications.length > 0 ? (
      notifications.map((notification) => {
        const { type, createdAt, read, screamId, recipient, sender } = notification;
        const verb = type === 'like' ? 'liked' : 'commented on';
        const time = dayjs(createdAt).fromNow();
        const iconColor = read ? 'primary' : 'secondary';
        const icon =
          type === 'like' ? (
            <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
          ) : (
            <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
          );

        return (
          <MenuItem key={createdAt} onClick={handleClose}>
            {icon}
            <Typography
              component={Link}
              color={'textPrimary'}
              variant={'body1'}
              to={`/users/${recipient}/scream/${screamId}`}
            >
              {sender} {verb} your scream {time}
            </Typography>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no notifications yet</MenuItem>
    );

  return (
    <>
      <Tooltip title="Notifications" placement={'top'}>
        <IconButton
          aria-owns={state.anchorEl ? 'simple-menu' : undefined}
          aria-haspopup={'tree'}
          onClick={handleOpen}
        >
          {notificationIcon}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={state.anchorEl}
        open={Boolean(state.anchorEl)}
        onClose={handleClose}
        onEntered={onMenuOpened}
      >
        {notificationsMarkup}
      </Menu>
    </>
  );
};

Notifications.propTypes = {
  notifications: PropTypes.array.isRequired,
  markNotificationsRead: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  notifications: state.user.notifications
});

export default connect(mapStateToProps, { markNotificationsRead })(Notifications);
