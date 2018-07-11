let _singleton = Symbol();
const LOG_IN_URL = 'http://sheltered-brook-33412.herokuapp.com/api/login'
const LOG_OUT_URL = 'http://sheltered-brook-33412.herokuapp.com/api/logout';
const PROFILE_URL = 'http://sheltered-brook-33412.herokuapp.com/api/profile';
const PROFILE2_URL = 'http://sheltered-brook-33412.herokuapp.com/api/profile2';
const CUSTOMER_URL = 'http://sheltered-brook-33412.herokuapp.com/api/customer';



class UserService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new UserService(_singleton);
        return this[_singleton]
    }

    loginUser(username,password){
        return fetch(LOG_IN_URL, {
            method: 'post',
            body: JSON.stringify({username:username, password: password}),
            credentials: "include",
            headers: {
                'content-type': 'application/json'
            }
        }).then(function(response){
           return response == null ? null :  response.json() ;
        })
    }

    findCustomerById(customerId) {
        return fetch(CUSTOMER_URL + '/' + customerId, {
            credentials: "include"
        })
            .then(response => response.json());
    }

    findUserIdByUsername(username) {
        return fetch(PROFILE_URL + '/' + username,{
            credentials: "same-origin"
        })
            .then(response => response.json());
    }
    deleteCustomer(customerId) {
        return fetch(CUSTOMER_URL + '/' + customerId, {
            method: 'delete',
            credentials: "include"
        })
    }

    findAllCustomers() {
        return fetch(CUSTOMER_URL,{
            credentials: "include"
        })
            .then(response => response.json());
    }

    createCustomer(customer) {
        return fetch(CUSTOMER_URL, {
            method: 'post',
            body: JSON.stringify(customer),
            credentials: "include",
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json());
    }

    updateCustomer(customerId,customer){
        return fetch(CUSTOMER_URL+'/'+customerId,
            {
                body: JSON.stringify(customer),
                headers: { 'Content-Type': 'application/json' },
                method: 'PUT'
            })
    }

    logout(){
        return fetch (LOG_OUT_URL,{
            method: 'post',
            credentials: 'include'
        });
    }

    deleteCustomer(customerId) {
        return fetch(CUSTOMER_URL + '/' + customerId,
            {
                method: 'DELETE'
            }).then(function (response) {
            return response;
        })
    }
    findCurrentUser(){
        return fetch(PROFILE_URL,{
            credentials: "include"
        }).then((response) => {return response.json()});
    }
    isUserLoggedIn(){
        return fetch(PROFILE2_URL,{
            credentials: "include"
        }).then((response) => {return response.status !== 403 ? response.json() : null });
    }
}
export default UserService;