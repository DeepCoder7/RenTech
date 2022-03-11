import React from 'react'
import NotifyContext from './notifyContext';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure();

const NotifyState = (props) => {

    const notify = (info, message) => {
        if(info === 'success'){
            toast.success(message, { position: toast.POSITION.BOTTOM_LEFT })
        }else if(info === 'warn'){
            toast.warn(message, { position: toast.POSITION.BOTTOM_LEFT })
        }
        else{
            toast.error(message, { position: toast.POSITION.BOTTOM_LEFT })
        }
    }

    return (
        <NotifyContext.Provider value={{ notify }}>
            {props.children}
        </NotifyContext.Provider>
    )
}

export default NotifyState;