const JWTManager = () => {
    const getToken = () => localStorage.getItem('accessToken');
    const getRefreshToken = () => localStorage.getItem('refreshToken');

    const setToken = (token:string) => localStorage.setItem('accessToken', token);
    const setRefreshToken = (refreshToken:string) => localStorage.setItem('refreshToken', refreshToken);

    const getRoles = () => localStorage.getItem('userRoles');
    const setRoles = (roles:string) => localStorage.setItem('userRoles', roles);

    const eraseToken = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userRoles');
        return true;
    };

    return {
        eraseToken,
        getToken,
        getRefreshToken,
        setToken,
        setRefreshToken,
        getRoles,
        setRoles
    };
};

export default JWTManager();
