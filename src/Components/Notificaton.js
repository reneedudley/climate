import React from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import { getNotificationMessage } from '../Redux/city/city-selectors';
import { setNotificationMessage } from '../Redux/city/city-actions';

const Notification =({ message, onResetMessage })=> {
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={!!message}
            autoHideDuration={6000}
            onClose={e => onResetMessage()}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{message}</span>}
        />
    )
};

const mapDispatchToProps = (dispatch) => ({
    onResetMessage: () => {
      dispatch(setNotificationMessage(''))
    },
});

const mapStateToProps = (state) => ({
    message: getNotificationMessage(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
