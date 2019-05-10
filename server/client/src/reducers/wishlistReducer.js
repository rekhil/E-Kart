export default function (state = {}, action) {
    switch (action.type) {
        case "WISHLIST_DETAILS": {
            return action.payload
        }
        default: {
            return state
        }
    }
}