let _singleton = Symbol();
const BOOKING_URL ='';


class HotelService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new HotelService(_singleton);
        return this[_singleton]
    }

    findAllBooking(){
        return fetch(BOOKING_URL)
            .then(function(response){
                return response.json();
            })
    }
    createBooking(booking, userId){
        return fetch(BOOKING_URL
                .replace('UID', userId),
            {
                body: JSON.stringify(booking),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            })
            .then(function (response)
            {
                return response.json();
            })
    }
    updateBooking(booking, userId){
        return fetch(BOOKING_URL
                .replace('UID', userId),
            {
                body: JSON.stringify(booking),
                headers: { 'Content-Type': 'application/json' },
                method: 'PUT'
            })
            .then(function (response)
            {
                return response.json();
            })
    }

    deleteBooking(hotelId){
        return fetch('http://sheltered-brook-33412.herokuapp.com/api/hotel/'
            + hotelId, {method: 'delete'})
    }
    findAllBookingsByUserId(userId) {
        return fetch(BOOKING_URL + '/' + userId,{
            credentials: "same-origin"
        }).then(response => response.json());
    }


}
export default HotelService;
