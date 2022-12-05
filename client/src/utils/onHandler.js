
export const onHandler = (text)=>{
    switch(text){
        case 'Login': return '/signin';
        case 'Signup': return '/signup';
        default: return '#'
    }
}