import { Button, Grid, Paper, Typography, useMediaQuery } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React, { useState } from 'react'
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom'

Modal.setAppElement('#root');

const Deactivate = () => {
    const navigate = useNavigate()
    const matches = useMediaQuery('(min-width:700px)');

    const [isopen, setIsOpen] = useState(true)
    const closeModal = () => {
        setIsOpen(false)
        navigate("/")
    }

    return (
        <>
            <Modal isOpen={isopen} style={{
                overlay: {
                    backgroundColor: 'rgba(115,115,115,0.2)',
                },
                content: {
                    width: matches ? '40rem' : "20rem",
                    marginTop: matches ? '10%' : "40%",
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    height: '400px',
                },
            }}>
                <div>
                    <Button
                        style={{ position: 'absolute', right: '14px', top: '20px' }}
                        color='secondary'
                        onClick={() => closeModal()}
                    >
                        <Close />
                    </Button>
                    <Paper elevation={0} style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", alignItems: "center", marginTop: `${matches ? "15%" : "30%"}` }}>
                        <Typography>Your account has been deactivated due to complaints.You can contact us on</Typography>
                        <Typography variant='h5'>rentech45@gmail.com</Typography>
                    </Paper>
                </div>
            </Modal>
        </>
    )
}

export default Deactivate