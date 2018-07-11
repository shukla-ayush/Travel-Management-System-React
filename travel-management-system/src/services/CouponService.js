let _singleton = Symbol();
const LOG_IN_URL = 'http://sheltered-brook-33412.herokuapp.com/api/businessLogin';
const PROFILE_URL = 'http://sheltered-brook-33412.herokuapp.com/api/businessProfile';
const LOG_OUT_URL = 'http://sheltered-brook-33412.herokuapp.com/api/logout';
const LOCAL_COUPON_URL = 'http://sheltered-brook-33412.herokuapp.com/api/coupon/hotel';
const COUPON_URL = 'http://sheltered-brook-33412.herokuapp.com/api/coupon';

class CouponService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new CouponService(_singleton);
        return this[_singleton]
    }

    findCouponByHotelId(hotelId) {
        return fetch(LOCAL_COUPON_URL +'/'+hotelId)
            .then(function(response){
                return response.json();
            });
    }

    createCoupon(coupon) {
        return fetch(COUPON_URL, {
            method: 'post',
            body: JSON.stringify(coupon),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        });
    }
    deleteCoupon(couponId) {
        return fetch(COUPON_URL + '/' + couponId, {
            method: 'delete',
            credentials: "same-origin"
        })
    }
    findAllCoupons() {
        return fetch(COUPON_URL,{
            credentials: "same-origin"
        }).then(response => response.json());
    }
    updateCoupon(coupon) {
        return fetch(COUPON_URL + '/' + coupon._id,
            {
                body: JSON.stringify(coupon),
                headers: { 'Content-Type': 'application/json' },
                method: 'PUT'
            })
    }
}

export default CouponService;