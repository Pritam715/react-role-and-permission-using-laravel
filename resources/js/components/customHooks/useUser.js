import { useState } from 'react';

export default function useUser() {
    const getUser = () => {
        const jsonData = localStorage.getItem('user-info');
        const userData = JSON.parse(jsonData);
        return userData;
    };

    const [user, setUser] = useState(getUser());

    const saveUser = userData => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };
    return {
        setUser: saveUser,
        user
    }
}