import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { createUserReducer, getUsersReducer } from '../reducers/reducer-users';

function UserForm() {
    const user = useSelector((state: any) => state.selectedUser);
    const isUpdate = useSelector((state: any) => state.isUpdate);
    const currentPage = useSelector((state: any) => state.currentPage);
    const recordsPerPage = useSelector((state: any) => state.recordsPerPage);
    const dispatch = useDispatch();
    

    const [firstname, setFirstname] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [middlename, setMiddlename] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const onInputFirstname = (e: any) => {
        setFirstname(e.target.value);
        user.firstname = e.target.value;
    }

    const onInputLastname = (e: any) => {
        setLastname(e.target.value);
        user.lastname = e.target.value;
    }

    const onInputMiddlename = (e: any) => {
        setMiddlename(e.target.value);
        user.middlename = e.target.value;
    }

    const onInputGender = (e: any) => {
        setGender(e.target.value);
        user.gender = e.target.value;
    }

    const onInputEmail = (e: any) => {
        setEmail(e.target.value);
        user.email = e.target.value;
    }

    const clearInputs = () => {
        user.id = 0;
        user.firstname = '';
        user.lastname = '';
        user.middlename = '';
        user.gender = 'M';
        user.email = '';

        setFirstname('');
        setLastname('');
        setMiddlename('');
        setGender('M');
        setEmail('');
    }

    const onSave = () => {
        let data = {
            id: isUpdate ? user.id : 0,
            firstname: firstname,
            lastname: lastname,
            middlename: middlename,
            gender: gender,
            email: email
        };

        dispatch(createUserReducer(data, isUpdate));
        dispatch(getUsersReducer({updated_at: 2}, recordsPerPage, currentPage));

        clearInputs();
    }

    useEffect(() => {
        if (user) {
            setFirstname(user.firstname);
            setLastname(user.lastname);
            setMiddlename(user.middlename);
            setGender(user.gender);
            setEmail(user.email);
        }
    });

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="form-group">
                    <label>Firstname</label>
                    <input type="text" onChange={onInputFirstname} className="form-control" placeholder="Enter your firstname" value={user ? user.firstname : ''} />
                </div>
                
                <div className="form-group">
                    <label>Lastname</label>
                    <input type="text" onChange={onInputLastname} className="form-control" placeholder="Enter your lastname" value={user ? user.lastname : ''} />
                </div>

                <div className="form-group">
                    <label>Middlename</label>
                    <input type="text" onChange={onInputMiddlename} className="form-control" placeholder="Enter your middlename" value={user ? user.middlename : ''} />
                </div>

                <div className="form-group">
                    <label>Select Gender</label>
                    <select className="form-control" onChange={onInputGender} value={user ? user.gender : 'M'}>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" onChange={onInputEmail} className="form-control" placeholder="name@example.com" value={user ? user.email : ''} />
                    <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
            </div>

            <div className="col-md-12 text-right">
                <button type="button" onClick={() => onSave() } className="btn btn-primary">
                    { user && user.id ? 'Update' : 'Save' }
                </button>
            </div>
        </div>
    );
}

export default UserForm;