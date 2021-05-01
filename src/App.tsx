import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import MagicTable from './components/MagicTable';
import UserForm from './components/UserForm';
import { getUsersReducer } from './reducers/reducer-users';
import logo from './logo.svg';

function App() {
  const dispatch = useDispatch();
  const headers = [
    ['firstname', 'Firstname'], 
    ['lastname', 'Lastname'], 
    ['middlename', 'Middlename'], 
    ['gender', 'Gender'], 
    ['email', 'Email']
  ];

  const styles = {
      topNav: {
          background: '#000',
          color: '#fff'
      }
  };

  useEffect(() => {
    dispatch(getUsersReducer(null, 5, 1));
  });

  return (
    
    <div className="container-fluid p-0 m-0">
      <nav className="navbar navbar-expand-lg navbar-dark" style={styles.topNav}>
        <img src={ logo } width="50" height="50" />
        <span>Cell5 Trial (ReactJS / Typescript)</span>
      </nav>
      <div className="container-fluid">
        <div className="row justify-content-between mt-3">
          <div className="col-3">
            <UserForm />
          </div>
          <div className="col-8">
            <MagicTable headers={headers} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
