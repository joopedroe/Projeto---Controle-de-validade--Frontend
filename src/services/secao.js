export const logado= ()=>{
    const token= localStorage.getItem('token')
    if (token !== null){
        return true
    }
    else{
        return false
    }
}