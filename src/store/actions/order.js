import * as actions from './actionsTypes';
import axios from '../../axios';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actions.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actions.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = (error) => {
    return {
        type: actions.PURCHASE_BURGER_START
    }
}

export const onInitPurchase = () => {
    return {
        type: actions.PURCHASE_INIT
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            });
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actions.FETCH_ORDERS_START
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actions.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actions.FETCH_ORDERS_FAIL,
        error: error
    }

}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId+ '"';
        axios.get('/orders.json'+queryParams)
            .then(
                res => {
                    const fetchOrders = [];
                    for (let key in res.data) {
                        fetchOrders.push({
                            ...res.data[key],
                            id: key
                        });
                    }
                    dispatch(fetchOrdersSuccess(fetchOrders));
                })
            .catch(
                error => {
                    dispatch(fetchOrdersFail());
                })
    }
}