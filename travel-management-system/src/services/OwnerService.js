let _singleton = Symbol();
const LOG_IN_URL = 'http://sheltered-brook-33412.herokuapp.com/api/businessLogin';
const PROFILE_URL = 'http://sheltered-brook-33412.herokuapp.com/api/businessProfile';
const LOG_OUT_URL = 'http://sheltered-brook-33412.herokuapp.com/api/logout';
const OWNER_URL = 'http://sheltered-brook-33412.herokuapp.com/api/owner';

class OwnerService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new OwnerService(_singleton);
        return this[_singleton]
    }

    loginOwner(username,password){
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

    findOwnerById(userId) {
        return fetch(OWNER_URL + '/' + userId,{
            credentials: "include"
        }).then(response => response.json());
    }

    findOwnerByUsername(username) {
        return fetch(PROFILE_URL + '/' + username,{
            credentials: "include"
        }).then(response => response.json());
    }
    deleteOwner(ownerId) {
        return fetch(OWNER_URL + '/' + ownerId, {
            method: 'delete',
            credentials: "include"
        })
    }
    findAllOwners() {
        return fetch(OWNER_URL,{
            credentials: "include"
        })
            .then(response => response.json());
    }
    createOwner(user) {
        return fetch(OWNER_URL, {
            method: 'post',
            body: JSON.stringify(user),
            credentials: "include",
            headers: {
                'content-type': 'application/json'
            }
        })
    .then(response => response.json());
    }
    updateOwner(user) {
        return fetch(OWNER_URL + '/' + user._id,
            {
                body: JSON.stringify(user),
                headers: { 'Content-Type': 'application/json' },
                method: 'PUT',
                credentials: 'include'
            })
    }
    logout() {
        return fetch(LOG_OUT_URL, {
            method: 'post',
            credentials: 'include'
        });
    }
    findCurrentOwner(){
        return fetch(PROFILE_URL,{
            credentials: 'include'
        })
            .then((response) => {return response})
    }


}
export default OwnerService;