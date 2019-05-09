export default function (state = {}, action) {
    switch (action.type) {
        case "CART_COUNT": {
            return { count: action.payload }
        }
        default: {
            return state
        }
    }
}