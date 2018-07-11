var restaurantUrl = 'http://opentable.herokuapp.com/api/restaurants';
const LOCAL_RESTAURANT_URL = 'http://sheltered-brook-33412.herokuapp.com/api/restaurant';

let _singleton = Symbol();

export default class RestaurantService{
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new RestaurantService(_singleton);
        return this[_singleton]
    }

    findAllRestaurants() {
        return fetch(LOCAL_RESTAURANT_URL)
            .then(function(response){
                return response.json();
            });
    }

    findDbRestaurantByCity(city) {
        return fetch(LOCAL_RESTAURANT_URL+'/city/'+city)
            .then(function(response){
                return response.json();
            });
    }

    findDbRestaurantByName(name) {
        return fetch(LOCAL_RESTAURANT_URL+'/name/'+name)
            .then(function(response){
                return response.json();
            });
    }

    createRestaurant( owner, restaurantName, restaurantAddress, restaurantCity, restaurantPhone, restaurantPrice) {
        const restaurant = {
            owners: owner,
            name: restaurantName,
            address: restaurantAddress,
            city: restaurantCity,
            phone: restaurantPhone,
            price: restaurantPrice
        };
        return fetch(LOCAL_RESTAURANT_URL, {
            method: 'post',
            body: JSON.stringify(restaurant),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        });
    }
    findRestaurantByOwnerId(ownerId) {
        return fetch(LOCAL_RESTAURANT_URL+'/owner/'+ownerId)
            .then(function(response){
                return response.json();
            });
    }
    updateRestaurant(restaurantId, restaurantName, restaurantAddress, restaurantCity, restaurantPhone, restaurantPrice){
        const restaurant = {
            _id: restaurantId,
            name: restaurantName,
            address: restaurantAddress,
            city: restaurantCity,
            phone: restaurantPhone,
            price: restaurantPrice};
        return fetch(LOCAL_RESTAURANT_URL+'/'+restaurantId,
            {
                body: JSON.stringify(restaurant),
                headers: { 'Content-Type': 'application/json' },
                method: 'PUT'
            })
    }

    deleteRestaurant(restaurantId) {
        return fetch(LOCAL_RESTAURANT_URL + '/' + restaurantId,
            {
                method: 'DELETE'
            }).then(function (response) {
            return response;
        })
    }
}