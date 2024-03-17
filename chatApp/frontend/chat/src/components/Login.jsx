import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Login(){
    let nav=useNavigate();


    let [logi,setLogi]=useState({
        username:"",
        password:""
    });

    function chn(e){
        setLogi({...logi,[e.target.name]:e.target.value})
    }

   async function log(e){
    // console.log("fd");
        e.preventDefault();
        await axios.post('http://localhost:8080/login',{username: logi.username,password:logi.password})
        .then((res)=>{
            console.log(res.data.user);
            nav('/');
        })
    }



    return(

       <form>
       

       <input placeholder="username" onChange={chn} type="text" name="username" />
        <br />
        <input placeholder="password" onChange={chn} type="password" name="password" />
         <button onClick={log}>Login</button>
       </form>
        
    )
}