import React, { useEffect, useState } from 'react';
import UserContext from './userContext';

const UserState = (props) => {
    const [userCreds, setUserCreds] = useState({});
    const url = 'http://localhost:8500/api/'

    const getUser = async () => {
        const getuser = await fetch(`${url}auth/getuser`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('renToken')
            },
        });
        const User = await getuser.json();
        setUserCreds(User);
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
        console.log(Pjson);
    }

    useEffect(() => {
        if (localStorage.getItem('renToken')) {
            getUser();
        }
    }, [localStorage.getItem('renToken')]);

    useEffect(() => {
        console.log(userCreds);
    }, [userCreds]);


    return (
        <UserContext.Provider
            value={{ userCreds, getUser, reportProduct }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserState;
