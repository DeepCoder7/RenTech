import React, { useContext, useEffect, useState } from 'react';
import UserContext from './userContext';

const UserState = (props) => {
    const [userCreds, setUserCreds] = useState({ bookMarkProducts: '', role:'user' });
    const url = 'http://localhost:8500/api/';

    const getUser = async () => {
        if (localStorage.getItem('renToken')) {
            const getuser = await fetch(`${url}auth/getuser`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('renToken')
                },
            });
            const User = await getuser.json();
            setUserCreds(User);
            if(User.role === 'Admin'){
                localStorage.setItem('rolo',User.role);
            }
        } else {
            setUserCreds({ bookMarkProducts: '' });
        }
    }

    const reportProduct = async (proOwnId, proID, descOfReport) => {
        const report = await fetch(`${url}reportProduct/ReportProduct`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('renToken')
            },
            body: JSON.stringify({ proOwnId, proID, descOfReport })
        })
        const Pjson = await report.json();
        if(Pjson.success){
            return {success:"success",message:Pjson.message}
        }else{
            return {success:'error', message:Pjson.message}
        }
    }

    useEffect(() => {
        if (localStorage.getItem('renToken')) {
            getUser();
        } else {
            setUserCreds({ bookMarkProducts: '' });
        }
    }, [localStorage.getItem('renToken')]);

    return (
        <UserContext.Provider
            value={{ userCreds, getUser, reportProduct }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserState;
