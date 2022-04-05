import React, { useContext, useEffect, useState } from 'react';
import { Close } from '@material-ui/icons';
import Modal from 'react-modal';
import { Button, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import notifyContext from '../../contexts/NotificationBar/notifyContext';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    notif: {
        display: 'flex',
        justifyContent: 'space-between',
    }
}))

Modal.setAppElement('#root');

const Notification = (props) => {
    const { isNotificationOpen, setIsNotificationOpen, matches } = props;
    const classes = useStyles();

    const notifyCon = useContext(notifyContext);
    const { notify } = notifyCon;

    const [notifications, setNotifications] = useState([]);

    const getNotification = async () => {
        const respOfRequest = await fetch(`http://localhost:8500/api/notifyUS/notification`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('renToken'),
            },
        });
        const respNotification = await respOfRequest.json();
        if (respNotification.success) {
            notify("success", "Get Notification successfull");
            setNotifications(respNotification.notification);
            console.log(respNotification.notification);
        } else {
            notify("error", respNotification.message);
        }
    }

    const Confirm = async (RecId, _id) => {
        try {
            const respo = await fetch(
                `http://localhost:8500/api/notifyUS/replyNotific/Confirm/${_id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('renToken'),
                    },
                }
            );

            const respoJson = await respo.json();
            if (respoJson.success) {
                notify('success', respoJson.message)
            } else {
                notify('error', respoJson.message);
            }
        } catch (err) {
            notify('error', err);
        }
    }

    const Reject = async (RecId, _id) => {
        console.log(RecId, _id);
    }

    useEffect(() => {
        if (localStorage.getItem('renToken')) {
            getNotification();
        }
        // eslint-disable-next-line
    }, [localStorage.getItem('renToken')])


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
                        marginTop: '5.5rem',
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
                <div>
                    {
                        notifications &&
                        notifications.map((notification) => {
                            return (
                                <Paper key={notification._id}>
                                    <h4>{notification.messageNote}</h4>
                                    <Link to={`/productPage/${notification.proId}`}>Product</Link>
                                    {notification.role === 'userToUser' && <>
                                        <Button variant='contained' onClick={() => { Confirm(notification.userId, notification._id) }}>Confirm</Button>
                                        <Button variant='contained' onClick={() => { Reject(notification.userId, notification._id) }}>Reject</Button>
                                    </>}
                                </Paper>
                            )
                        })
                    }
                </div>
            </Modal>
        </>
    );
};

export default Notification;
