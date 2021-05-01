import { getUsers, selectUser } from '../actions/index';

const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYTI3MDEwYWI1MmMxODZmOWVkYjM3MzdlZTc2NTIxZDg4MDE5ZGVkOTRmMjliMTEzMTZhYmZjMzkzNzE3NjZiNjYyNzlhNzg0NTc0YTk3NmQiLCJpYXQiOjE2MTkyNzc5MjAuNTAyMTc4LCJuYmYiOjE2MTkyNzc5MjAuNTAyMTgyLCJleHAiOjE2NTA4MTM5MjAuNTAwMDQ4LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.ezU2bub1KifOeBZrFR2TKX4GGwdsLDnM0Jx7v15RJlPgcQbbnlWkSmnc_Xe3lsCyQfL2hsBBHvPXj384yTrb-JhPNNVV-Y79K5F0hVqk-vTy3IxMl9t42ZBzZMn_nWM8jK5Od0IWa0ScMM5TctT_8K5XZAk1AZSObpeaRGUsoSEVBH46_Cc0eTn4FXNzvO83ire1qQ5vXTd2tcjG8SiC94EO9qaILV8BeLSm23cjvsrFVIE01vpn7zjy0LgEhN6Qh2Xlbf_KYSYCryWT_Rslo0cgsXojeubq0Bg5tq5UWIsmCwJzvOBYlt2l8O2JP54F-AntCDXhipYQSTmbVgFxxuKCsi5gNT8ZsF6YHZKARPI2CjkFJ8iYgS3Dq4g439b-ncQyg6yhMvXX51r32Rqxqgs-aEKCiqvBoskVLfRyrSamZFquZ23SGFaQZ_XF3rBVkDadNVEugc3udUP_HzcufP_2gR-SEI9vCLwhNGgtpciCUmrYwmV1te5Abh8NMUjDKN1XY24fKwCJs-KYIb0EDvyWTZymPH6EC80cdAM_5iot48lekfIF9IdlZ1mNHcHVBzQ_8U7qDMXaDiPs32SekKZcCpabHTdKwrpD8nAN8B9kzik1X9LmT8Vi2oJQI-t3dmnu_tvsdShUxRuvTBH9gr1ZAUSJCjkbvp9N0U-b6Nk';
    
export const usersReducer = (state = [], action: any) => {
    switch(action.type) {
        case 'GET_USERS':
            let payload = action.payload ? action.payload.data : [];
            let data = payload.data;

            let columns:any = [];

            for (let i in data) {
                let cols:Array<string> = [];
            
                for (let j in data[i]) {
                    cols.push(data[i][j]);
                }
            
                columns.push(cols);
            }

            return {...state, users: columns, total: payload.total, recordsPerPage: payload.per_page, 
                currentPage: payload.currentPage, isUpdate: false
            };

        case 'CREATE_USER':
            return {...state, user: action.payload};

        case 'SELECT_USER':
            return {...state, selectedUser: action.payload, isUpdate: true};
    }

    return state;
}

export const getUsersReducer = (data: any, records: number, page: number) => async (dispatch: any) => {
    const sorts:any = [];

    for (let k in data) {
        sorts.push([k, data[k]]);
    }

    let body = {
        sorts: sorts,
        records: records,
        page: page
    };

    const users = await fetch("http://localhost:8000/api/v1/users", {
        "method": "POST",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + API_KEY
        },
        "body": JSON.stringify(body)
    })
    .then(response => response.json())
    .catch(err => {
        console.log(err);
    });

    dispatch(getUsers(users));
}

export const createUserReducer = (user: any, isUpdate: boolean) => async () => {
    console.log(user);
    let method = isUpdate ? 'PUT' : 'POST';

    await fetch("http://localhost:8000/api/v1/user/save", {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            "Authorization": "Bearer " + API_KEY
        },
        body: JSON.stringify(user)
    });
}

export const selectUserReducer = (user: any) => async (dispatch: any) => {
    dispatch(selectUser(user));
}

export const deleteUserReducer = (ids: any) => async () => {
    let data = {
        ids: ids
    }

    await fetch("http://localhost:8000/api/v1/user/delete", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            "Authorization": "Bearer " + API_KEY
        },
        body: JSON.stringify(data)
    });
}