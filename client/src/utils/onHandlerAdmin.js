// import { useHref } from "react-router-dom";

    export const onHandlerAdmin = (text)=>{
    switch(text){
        case 'Logout': 
            localStorage.removeItem('click')
            window.location.href ='/adminlogin'
            break;
        case 'Users':
            window.location.href = '/users' 
            break;
        case 'Seating':
            window.location.href = '/seating'
            break;
        default: return '#'
    }
    
}