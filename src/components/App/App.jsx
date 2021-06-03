import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import { createMuiTheme, ThemeProvider } from '@material-ui/core'

import Post from '../Post/Post';
import UserPage from '../UserPage/UserPage';
import Account from '../Account/Account';
import Home from '../Home/Home';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Browse from '../Browse/Browse';
import BrowseDetail from '../BrowseDetail/BrowseDetail'
import EditPosts from '../EditPosts/EditPosts';
import Favorites from '../Favorites/Favorites';

// import './App.css';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#a5d6a7',
      },
      secondary: {
        main: '#e65100',
        sand: '#ffe69b',
      },
      typography: {
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(',')
      },
    },
})

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  const user = useSelector(store => store.user)
  console.log('user in APP: ', user)




  return (
   
    <Router> 
      <ThemeProvider theme={theme}>
    
      <div>
        {user.id && (<Nav/>)}
        
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/login" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <ProtectedRoute
            // shows AboutPage at all times (logged in or not)
            exact
            path="/browse"
          >
            <Browse />
          </ProtectedRoute>
          <ProtectedRoute
            exact
            path="/browse/detail/:id"
          >
            <BrowseDetail />
          </ProtectedRoute>
          <ProtectedRoute
            // shows AboutPage at all times (logged in or not)
            exact
            path="/post"
          >
            <Post />
          </ProtectedRoute>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/account"
          >
            <Account />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/edit/posts"
          >
            <EditPosts />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/favorites/:id"
          >
            <Favorites />
          </ProtectedRoute>

          {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LoginPage at /login
            exact
            path="/login"
            authRedirect="/user"
          >
            <LoginPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows RegisterPage at "/registration"
            exact
            path="/registration"
            authRedirect="/user"
          >
            <RegisterPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LandingPage at "/home"
            exact
            path="/home"
            authRedirect="/user"
          >
            <Home />
          </ProtectedRoute>
          

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
       </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
