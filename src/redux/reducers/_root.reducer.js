import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import posts from './posts.reducer';
import categories from './categories.reducer';
import browser from './browser.reducer';
import account from './account.reducer';
import favorites from './favorites.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  posts, // contains all posts from users
  categories, // contains categories from DB
  browser, // retrieves browser info
  account, // retrieves account info of specific user
  favorites, // retrieves favorites of specific user
});

export default rootReducer;
