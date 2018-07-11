let _singleton = Symbol();
const ROOM_URL = 'http://sheltered-brook-33412.herokuapp.com/api/room';

class RoomService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new RoomService(_singleton);
        return this[_singleton]
    }

    findRoomById(roomId) {
        return fetch(ROOM_URL+'/'+roomId)
            .then(function(response){
                return response.json();
            });
    }

    createRoom(room) {
        return fetch(ROOM_URL, {
            body: JSON.stringify(room),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
                return response.json();
            }
        )
    }

    updateRoom(roomId,room){
        return fetch(ROOM_URL+'/'+roomId),
            {
                body: JSON.stringify(room),
                headers: { 'Content-Type': 'application/json' },
                method: 'PUT'
            }
                .then(function (response)
                {
                    return response.json();
                })
    }

    deleteRoom(roomId) {
        return fetch(ROOM_URL + '/' + roomId,
            {
                method: 'DELETE'
            }).then(function (response) {
            return response;
        })
    }

}
export default RoomService;
