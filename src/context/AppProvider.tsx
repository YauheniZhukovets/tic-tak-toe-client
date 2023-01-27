import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {User} from '../interface/interface';
import {LOGIN_ROUTE} from '../utils/consts';

const ChatContext = React.createContext<any>(null)

type ChatProviderType = {
    children?: React.ReactNode
}

export const AppProvider: React.FC<ChatProviderType> = React.memo(({children}) => {
    const navigate = useNavigate()
    const [user, setUser] = useState<User>()
    const [users, setUsers] = useState<User[]>()

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo')!)
        setUser(userInfo)

        if (!userInfo) {
            navigate(LOGIN_ROUTE)
        }
    }, [navigate])

    return (
        <ChatContext.Provider value={{
            users,
            setUsers,
            user,
            setUser,
        }}>
            {children}
        </ChatContext.Provider>)
})


export const AppState = () => {
    return useContext(ChatContext)
}