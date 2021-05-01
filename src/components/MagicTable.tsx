import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsersReducer, selectUserReducer, deleteUserReducer } from '../reducers/reducer-users';

function MagicTable(props: any) {
    const users = useSelector((state: any) => state.users);
    const records = useSelector((state: any) => state.total);
    const selectedUser = useSelector((state: any) => state.selectedUser);

    const headers = props.headers;
    const [sorts, setSorts] = useState<any>({});
    const [pages, setPages] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [recordsPerPage, setRecordsPerPage] = useState<any>(5);
    const [checkRows, setCheckRows] = useState<any>({});
    const sortSymbols = ['-', '▲', '▼'];

    const dispatch = useDispatch();

    const styles = {
        selectedRecord: {
            background: '#0EAFE1',
            fontWeight: 600,
            color: '#fff'
        }
    };

    const sortClick = (field: string) => {
        let n = sorts[field] | 0;
        sorts[field] = (n + 1) % 3;

        if (sorts[field] == 0) {
            delete sorts[field]; 
        }

        setSorts({...sorts});

        updatePages();

        dispatch(getUsersReducer(sorts, recordsPerPage, page));
    }

    const pageClick = (currPage: number) => {
        dispatch(getUsersReducer(sorts, recordsPerPage, currPage));
        setPage(currPage);
    }

    const showPages = () => {
        const pagination:any = [];
        
        for (let i = 1; i <= pages; ++i) {
            if (page != i) {
                pagination.push(<li className="page-item" key={i}>
                    <a className="page-link" onClick={() => pageClick(i)}>{i}</a>
                </li>)
            } else {
                pagination.push(<li className="page-item active" key={i}>
                    <span className="page-link">
                        {i}
                        <span className="sr-only">(current)</span>
                    </span>
                </li>)
            }
        }

        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    { pagination.map((li: any) => li) }
                </ul>
            </nav>
        );

        return pages;
    }

    const updatePages = () => {
        if (records) {
            let n = Math.ceil(records / recordsPerPage);
            setPages(n);
            setPage(page);
        }
    }

    const optionPages =  (n: number) => {
        const opt = [];

        opt.push(<option value="1" key="1">1</option>);
        opt.push(<option value="2" key="2">2</option>);
        opt.push(<option value="3" key="3">3</option>);
        opt.push(<option value="4" key="4">4</option>);

        for (let i = 1; i <= n; ++i) {
            let v = i * 5;
            opt.push(<option value={v} key={v}>{v}</option>);
        }

        return (
            <select className="form-control" value={recordsPerPage} onChange={onRecordsPerPage}>
                { opt.map((opt) => opt) }
            </select>
        );
    }

    const onRecordsPerPage = (e: any) => {
        let val = parseInt(e.target.value);
        setRecordsPerPage(val);
        updatePages();
        dispatch(getUsersReducer(sorts, val, page));
    }

    const onSelectUser = (data: any) => {
        let user = {
            id: data[0],
            firstname: data[1],
            lastname: data[2],
            middlename: data[3],
            gender: data[4],
            email: data[5]
        };

        if (selectedUser && selectedUser.id == data[0]) {
            user = {
                id: 0,
                firstname: '',
                lastname: '',
                middlename: '',
                gender: '',
                email: ''
            };
        }

        dispatch(selectUserReducer(user));
    }

    const onDelete = () => {
        let ids = [];
        for (let k in checkRows) {
            ids.push(k);
        }

        let str = ids.toString();

        if (str) {
            dispatch(deleteUserReducer(str));
            dispatch(getUsersReducer(sorts, recordsPerPage, page));
        }
    }

    const populate = () => {
        const rows = [];

        if (checkRows.length == 0) {
            initCheckRows();
        }

        let len = users ? users.length : 0;

        for (let i = 0; i < len; ++i) {
            let id = users[i][0];

            const td = [<td key={ 'col' + i + '_0' }>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" onChange={() => { checkRow(id) }}
                        checked={checkRows[id] ? true : false}/> 
                </div>
            </td>];

            for (let j = 1; j < users[i].length; ++j) {
                td.push(<td key={ 'col' + i + '_' + j }>{ users[i][j] }</td>)
            }
            
            rows.push(<tr style={selectedUser && selectedUser.id == id ? styles.selectedRecord : {}} key={ 'row' + i } 
                onClick={() => onSelectUser(users[i])}>
                { td.map((td) => td) }
            </tr>);
        }

        return (
            <>
                { rows.map((row) => row) }
            </>
        );
    };

    const initCheckRows = () => {
        if (users) {
            const arr: any = {};

            for (let i in users) {
                arr[users[i][0]] = true;
            }

            setCheckRows(arr);
        }
    }

    const checkRow = (id: number) => {
        checkRows[id] = !checkRows[id];
        const rows = checkRows;

        setCheckRows({...rows});
    }

    useEffect(() => {
        updatePages();
    });

    return (
        <div>
            <div className="row justify-content-between">
                <div className="col-3 d-flex align-items-end">
                    <button type="button" onClick={() => onDelete() } className="btn btn-danger">
                        Delete Selected
                    </button>
                </div>
                <div className="col-2">
                    <span>Records per page</span>
                    {optionPages(5)}
                </div>
            </div>
            
            <table className="table table-hover table-striped table-bordered mt-2">
                <thead>
                    <tr>
                        <th>#</th>
                        { headers.map((th: any) => <th onClick={() => 
                            sortClick(th[0])} key={ th[0] }>
                                <div className="row justify-content-between">
                                    <div className="col-4">{ th[1] }</div>
                                    <div className="col-2" style={{ width: '10px' }}>
                                        { sorts[th[0]] ? sortSymbols[sorts[th[0]]] : ' ' }
                                    </div>
                                </div>
                            </th>) 
                        }
                    </tr>
                </thead>
                <tbody>
                    { populate() }
                </tbody>
            </table>

            <div className="row">
                <div className="col-12">
                    {showPages()}
                </div>
            </div>
        </div>
    );
}



export default MagicTable;
