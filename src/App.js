import React from 'react';
import {Switch,Route} from 'react-router-dom';
import './App.css';

import {Homepage} from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './component/header/header.component';
import SigninAndSignup from './pages/signinAndsignup/signinAndsignup.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import {connect} from "react-redux";
import {setCurrentUser} from "./redux/user-reducer/user.actions";


class App extends React.Component {

   unsubscribeFromAuth = null;
  
  componentDidMount()
  {
    const {setCurrentUser}=this.props;

    this.unsubscribeFromAuth=auth.onAuthStateChanged( async userAuth => 
      {
       if (userAuth)
       { 
        const userRef= await createUserProfileDocument(userAuth);

        userRef.onSnapshot( snapShot => {
          setCurrentUser(
             {
             id : snapShot.id,
             ...snapShot.data()
            }
          );
          
        });
       }
       setCurrentUser(userAuth);
    });
  }

  componentWillUnmount()
  {
    this.unsubscribeFromAuth();
  }

  render()
  {
    return (
      <div >
        <Header />
          <Switch>
            <Route exact path='/' component={Homepage}/>
            <Route exact path="/shop" component={ShopPage}/>
            <Route exact path="/signin" component={SigninAndSignup}/>
          </Switch>      
      </div>
    );
  }
}

const mapPropsToDispatch = dispatch => ({
  setCurrentUser : user => dispatch(setCurrentUser(user))
});

export default connect(null,mapPropsToDispatch)(App);
