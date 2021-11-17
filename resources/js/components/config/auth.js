export const isAuthenticated = localStorage.getItem('user-info');


export const isAllowed = (user, rights) =>
    rights.some(right => user.rights.includes(right));

export const hasRole = (user, roles) =>
    roles.some(role => user.roles.includes(role));