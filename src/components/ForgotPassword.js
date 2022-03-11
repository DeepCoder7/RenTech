import { Button, makeStyles, Paper, TextField } from '@material-ui/core'
import React, { useState, useContext } from 'react'
import clsx from 'clsx';
import Modal from 'react-modal';
import modalContext from '../contexts/modalOpener/modalContext';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: '600px',
        justifyContent: 'center',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
            paddingLeft: theme.spacing(2.5),
            paddingRight: theme.spacing(2.5),
            paddingTop: theme.spacing(2),
            width: theme.spacing(64),
        }
    },
    paper: {
        height: theme.spacing(18),
    },
    paperHeight: {
        height: theme.spacing(32),
    },
    mY2: {
        marginTop: theme.spacing(2),
    },
    mY4: {
        marginTop: theme.spacing(4),
    },
}))
const ForgotPassword = () => {
    const modalOpener = useContext(modalContext);
    const { setIsLoginOpen } = modalOpener;

    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [allOTP, setAllOTP] = useState({ resOTP: '', checkOTP: '# $ #%%', otpGen: false })
    const [changePassModal, setChangePassModal] = useState(false);
    const [changePass, setChangePass] = useState({ newPass: '', confPass: '' })
    const onChange = e => {
        setEmail(e.target.value);
    }
    const changeOTP = e => {
        setAllOTP({ ...allOTP, [e.target.name]: e.target.value });
    }
    const changePassword = e => {
        setChangePass({ ...changePass, [e.target.name]: e.target.value })
    }
    const getOTP = async (e) => {
        e.preventDefault();
        const respo = await fetch('http://localhost:8500/api/auth/resPassOTP', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }),
        });

        const respJson = await respo.json();
        setAllOTP({ ...allOTP, ['checkOTP']: respJson.OTP, ['otpGen']: true });
    }
    const verifyOTP = e => {
        if ((allOTP.checkOTP === allOTP.resOTP) && (allOTP.resOTP.length == 6)) {
            setChangePassModal(true);
        } else {
            console.log("Not Matched");
        }
    }

    const changeUserPass = async () => {
        if ((changePass.newPass === changePass.confPass) && (changePass.newPass.length >= 6)) {
            const respo = await fetch('http://localhost:8500/api/auth/changePass', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, newPassword: changePass.newPass }),
            });
            const response = await respo.json();
            if (response.success) {
                console.log(response.message);
                setIsLoginOpen(true);
            } else {
                console.log(response.message);
            }
        } else {
            console.log("Not Matches");
        }
        setChangePassModal(false);
        setEmail('');
        setAllOTP({ resOTP: '', checkOTP: '# $ #%%', otpGen: false });
        setChangePass({ newPass: '', confPass: '' });
    }

    return (
        <>
            <div className={classes.root}>
                <Modal
                    isOpen={changePassModal}
                    style={{
                        overlay: {
                            backgroundColor: 'rgba(115,115,115,0.2)',
                        },
                        content: {
                            padding: 6,
                            width: '330px',
                            height: '255px',
                            top: '40%',
                            left: '40%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-around',
                        },
                    }}
                >
                    <Button color='secondary' onClick={() => setChangePassModal(false)}>Close</Button>
                    <TextField
                        label='New Password'
                        variant='outlined'
                        name='newPass'
                        onChange={changePassword}
                        type='password'
                    />
                    <TextField
                        label='Confirm Password'
                        variant='outlined'
                        name='confPass'
                        onChange={changePassword}
                        type='password'
                        className={classes.mY2}
                    />
                    <Button
                        size='small'
                        variant='contained'
                        color='primary'
                        className={classes.mY2}
                        onClick={changeUserPass}
                    >
                        change PassWord
                    </Button>
                </Modal>


                <Paper
                    elevation={3}
                    className={clsx(classes.paper, {
                        [classes.paperHeight]: allOTP.otpGen,
                    })}
                >
                    <TextField
                        fullWidth
                        variant='outlined'
                        name='email'
                        value={email}
                        onChange={onChange}
                        label='Email'
                    />
                    {!allOTP.otpGen && <Button
                        variant="contained"
                        color="primary"
                        className={classes.mY2}
                        onClick={getOTP}
                    >
                        Get OTP
                    </Button>}
                    {allOTP.otpGen && <><TextField
                        fullWidth
                        label='OTP'
                        variant='outlined'
                        name='resOTP'
                        className={classes.mY4}
                        value={allOTP.resOTP}
                        onChange={changeOTP}
                    />
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.mY2}
                            onClick={verifyOTP}
                        >
                            Verify OTP
                        </Button>
                    </>}
                </Paper>
            </div>
        </>
    )
}

export default ForgotPassword