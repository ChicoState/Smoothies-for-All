export const initialState = null;

export const reducer = (state, action) => {
    switch (action.type) {
        case "USER":
            return action.payload; // Set state to user data

        case "CLEAR":
            return null; // Clear state to null

        case "UPDATE":
            // Only update if state is not null
            if (state) {
                return {
                    ...state,
                    followers: action.payload.followers,
                    following: action.payload.following
                };
            }
            // Optionally, handle the case where state is null
            // Could log an error or initialize state differently
            console.error("Attempted to update state when it was null");
            return state;
            case "UPDATEPIC":
                if (state) {
                    return {
                        ...state,
                        pic: action.payload
                    };
                }
                console.error("Attempted to update pic when state was null");
                return state;
            

        default:
            return state; // Default case to handle other types, returns current state
    }
};
