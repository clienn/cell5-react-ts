export const getUsers = (users: any) => {
    return {
        type: 'GET_USERS',
        payload: users
    }
}

export const createUser = (user: any) => {
    return {
        type: 'CREATE_USER',
        payload: user
    }
}

export const deleteUser = (ids: any) => {
    return {
        type: 'DELETE_USER',
        payload: ids
    }
}

export const selectUser = (user: any) => {
    return {
        type: 'SELECT_USER',
        payload: user
    }
}

export const editUser = (user: any) => {
    return {
        type: 'EDIT_USER',
        payload: user
    }
}
