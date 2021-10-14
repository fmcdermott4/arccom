import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from './utils/auth';
import {useQuery} from '@apollo/client';
import {READ_ACCESS} from './utils/queries';

// Pages
import AuditResults from './pages/AuditResults';
import ConductAudit from './pages/ConductAudit';
import CreateAudit from './pages/CreateAudit';
import DeleteAudit from './pages/DeleteAudit';
// import Home from './pages/Home';
import IndividualAuditResults from './pages/IndividualAuditResults';
import Login from './pages/Login';
import SelectAuditToConduct from './pages/SelectAuditToConduct';
import SelectAuditToUpdate from './pages/SelectAuditToUpdate';
import Signup from './pages/Signup';
import UpdateAudit from './pages/UpdateAudit'


// Components
import Header from './components/Header';
import Navigation from './components/Navigation';


const httpLink = createHttpLink({
  uri: '/graphql',  
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = ()=> {
  
  if(!Auth.loggedIn()){
    return(
      <ApolloProvider client={client}>        
        <Router>
          <div className="flex-column justify-flex-start min-100-vh">
            <Header /> 
            <div className="container">
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            </div>
          </div>
        </Router>
      </ApolloProvider>
    )
  }
  const profile= Auth.getProfile();
  if(!profile.data.active){
    
    return(
      <ApolloProvider client={client}>           
        <Router>
          <div className="flex-column justify-flex-start min-100-vh">
            <Header /> 
            <div className="container">
              {alert("Inactive user")}
              {Auth.logout()} 
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            </div>
          </div>
        </Router>
      </ApolloProvider>
    )
  }
  return(
    <ApolloProvider client={client}>    
      <UserTypeRender/>
    </ApolloProvider>
  )
  // return (
  //   <ApolloProvider client={client}>
  //       <Router>        
  //         <div className="flex-column justify-flex-start min-100-vh">
  //           <Header />
  //           <Navigation /> 
  //           <div className="container">
  //             <Switch>
  //               <Route exact path="/">
  //                 <AuditResults />
  //               </Route>
  //               <Route exact path="/login">
  //                 <Login />
  //               </Route>
  //               <Route exact path="/signup">
  //                 <Signup />
  //               </Route>
  //               <Route exact path="/audits/selectaudittoconduct">
  //                 <SelectAuditToConduct />
  //               </Route>
  //               <Route exact path="/audits/conductaudit/:auditId">
  //                 <ConductAudit />
  //               </Route>  
  //               <Route exact path="/audits/createaudit">
  //                 <CreateAudit />
  //               </Route>
  //               <Route exact path="/audits/auditresults">
  //                 <AuditResults />
  //               </Route>
  //               <Route exact path="/audits/auditresults/:conductedAuditId">
  //                 <IndividualAuditResults />
  //               </Route>
  //               <Route exact path ="/audits/updateaudit/">
  //                 <SelectAuditToUpdate />
  //               </Route>
  //               <Route exact path="/audits/updateaudit/:auditId">
  //                 <UpdateAudit />
  //               </Route>
  //               <Route exact path="/audits/deleteaudit">
  //                 <DeleteAudit />
  //               </Route>
  //             </Switch>
  //           </div>
  //         </div>
  //       </Router>
  //   </ApolloProvider>
  // );
}





const UserTypeRender = () =>{
  const profile= Auth.getProfile();
  const {data, loading} = useQuery(READ_ACCESS,
    {
      variables: {id : profile.data.access},
    }
  )
  if(loading){
    return<div>Loading...</div>
  }  
  if(data.access.level === "admin"){
    return(
      <Router>        
          <div className="flex-column justify-flex-start min-100-vh">
            <Header />
            <Navigation /> 
            <div className="container">
              <Switch>
                <Route exact path="/">
                  <AuditResults />
                </Route>
                <Route exact path="/login">
                  <Login />
                </Route>
                <Route exact path="/signup">
                  <Signup />
                </Route>
                <Route exact path="/audits/selectaudittoconduct">
                  <SelectAuditToConduct />
                </Route>
                <Route exact path="/audits/conductaudit/:auditId">
                  <ConductAudit />
                </Route>
                <Route exact path="/audits/createaudit">
                  <CreateAudit />
                </Route>
                <Route exact path="/audits/auditresults">
                  <AuditResults />
                </Route>
                <Route exact path="/audits/auditresults/:conductedAuditId">
                  <IndividualAuditResults />
                </Route>
                <Route exact path ="/audits/updateaudit/">
                  <SelectAuditToUpdate />
                </Route>
                <Route exact path="/audits/updateaudit/:auditId">
                  <UpdateAudit />
                </Route>
                <Route exact path="/audits/deleteaudit">
                  <DeleteAudit />
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
    )
  }  
  if(data.access.level === "auditor"){
    return(
      <Router>        
          <div className="flex-column justify-flex-start min-100-vh">
            <Header />
            <Navigation /> 
            <div className="container">
              <Switch>
                <Route exact path="/">
                  <AuditResults />
                </Route>
                <Route exact path="/login">
                  <Login />
                </Route>
                <Route exact path="/signup">
                  <Signup />
                </Route>
                <Route exact path="/audits/selectaudittoconduct">
                  <SelectAuditToConduct />
                </Route>
                <Route exact path="/audits/conductaudit/:auditId">
                  <ConductAudit />
                </Route>
                <Route exact path="/audits/createaudit">
                  <CreateAudit />
                </Route>
                <Route exact path="/audits/auditresults">
                  <AuditResults />
                </Route>
                <Route exact path="/audits/auditresults/:conductedAuditId">
                  <IndividualAuditResults />
                </Route>
                <Route exact path ="/audits/updateaudit/">
                  <SelectAuditToUpdate />
                </Route>
                <Route exact path="/audits/updateaudit/:auditId">
                  <UpdateAudit />
                </Route>
                <Route exact path="/audits/deleteaudit">
                  <DeleteAudit />
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
    )
  }
  return(
    <Router>        
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <Navigation /> 
          <div className="container">
            <Switch>
              <Route exact path="/">
                <AuditResults />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
              {/* <Route exact path="/audits/selectaudittoconduct">
                <SelectAuditToConduct />
              </Route> */}
              {/* <Route exact path="/audits/conductaudit/:auditId">
                <ConductAudit />
              </Route>   */}
              {/* <Route exact path="/audits/createaudit">
                <CreateAudit />
              </Route>
              <Route exact path="/audits/auditresults">
                <AuditResults />
              </Route> */}
              <Route exact path="/audits/auditresults/:conductedAuditId">
                <IndividualAuditResults />
              </Route>
              {/* <Route exact path ="/audits/updateaudit/">
                <SelectAuditToUpdate />
              </Route> */}
              {/* <Route exact path="/audits/updateaudit/:auditId">
                <UpdateAudit />
              </Route> */}
              {/* <Route exact path="/audits/deleteaudit">
                <DeleteAudit />
              </Route> */}
            </Switch>
          </div>
        </div>
      </Router>
  )
}
  
export default App;
