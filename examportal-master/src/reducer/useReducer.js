export const intitialState = null;

export const reducer = (state , action)=>{

    console.log(state)
    console.log(action)
    console.log(action.payload)
    if(action.type === "USER"){
        return ("USER");

    }else if(action.type === "ADMIN"){

        return ("ADMIN")
    }

    return "HOME";
}