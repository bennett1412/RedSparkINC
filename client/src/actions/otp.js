import * as api from "../api";

export const getOTP = (formData,router) => async (dispatch) => {
    try{
        const {email,type} = formData
        const {data} = await api.getOTP({email:email,type:type});
        dispatch({type:'GET_OTP',data});
    }catch(error){
        console.log(error)
    }
}

// export const verifyOTP = (formData,router) => async(dispatch) => {
//     try {
//         const response = await api.verifyOTP(formData);
//         console.log(data);
//     }
// }