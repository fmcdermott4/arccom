import React from 'react';
import { Link } from 'react-router-dom';
// import { QUERY_ME } from '../../utils/queries';
// import { useQuery } from '@apollo/client';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    window.location.href='/';
  };
  // const { loading, data } = useQuery(QUERY_ME);
  let myProfile="/";
  // if(loading){
  //   myProfile = "/"
  // } 
  // if(Auth.loggedIn() && !loading){
  //   myProfile = "/profile/" + data.me._id;
  // }   
  return (
    <header className="bg-info text-dark mb-4 py-3 display-flex align-center">
      <div className="container flex-column justify-space-between-lg justify-center align-center text-center">
        <Link className="text-dark" to="/">
          <h1 className="m-0" style={{ fontSize: '3rem' }}>
            ARCCOM
          </h1>
        </Link>
        <p className="m-0" style={{ fontSize: '1.75rem', fontWeight: '700' }}>
          Supporting the fight.
        </p>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-primary m-2" to={myProfile}>
                View My Profile
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-primary m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
