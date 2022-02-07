import React from 'react';
import { Close } from '@material-ui/icons';
import Modal from 'react-modal';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
    notif: {
        display: 'flex',
        justifyContent: 'space-between',
    }
}))

const Notification = (props) => {
    const { isNotificationOpen, setIsNotificationOpen, matches } = props;
    const classes = useStyles();

    return (
        <>
            <Modal
                isOpen={isNotificationOpen}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(115,115,115,0.2)',
                        position: 'fixed'
                    },
                    content: {
                        width: matches ? '400px' : 'auto',
                        marginTop:'5.5rem',
                        marginLeft: matches ? 'auto' : 'auto',
                        padding: matches ? '0.5%' : '0.5% 0% 0% 3%',
                        // marginRight: 'auto',
                        height: matches ? '580px' : '440px',
                        position: 'fixed'
                    },
                }}
            >
                <div className={classes.notif}>
                    <Typography variant='h6' component='span'>
                        Notifications
                    </Typography>
                    <Button
                        color='secondary'
                        onClick={() => setIsNotificationOpen(false)}
                    >
                        <Close />
                    </Button>
                </div>
                <hr />
            </Modal>
        </>
    );
};

export default Notification;
