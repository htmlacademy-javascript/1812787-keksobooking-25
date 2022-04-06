import {setUserFormSubmit, resetPage} from './userForm.js';
import './userFormStartPage.js';
import {getData} from './load.js';

getData();
setUserFormSubmit(resetPage);
