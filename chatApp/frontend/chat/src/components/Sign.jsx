import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Sign(){

    let nav=useNavigate();
    let [logi,setLogi]=useState({
    mail:"",
    username:"",
    password:""
});


function chn(e){
    setLogi({...logi,[e.target.name]:e.target.value})
}



async function log(e){
    e.preventDefault();
    await axios.post('http://localhost:8080/sign',{logi})
    .then((res)=>{
        console.log(res.data.user);
        nav('/login');
    })
}




    return(
        <form>
        <input placeholder="mail" onChange={chn}  type="mail" name="mail"/>
<br />
        <input placeholder="username" onChange={chn} type="text" name="username" />
        <br />
        <input placeholder="password" onChange={chn} type="password" name="password" />
        <br />
        <button onClick={log}>Login</button>
      </form>
    )
}