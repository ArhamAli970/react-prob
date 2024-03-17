import { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom"
export default function Editchat(){
    let loc=useLocation();
    let nav=useNavigate();
    let chat=loc.state;
    // console.log(chat.from,"fgf");
    let [message,setMessage]=useState(chat.mess)
   
    function mes(e){
        setMessage(e.target.value)
    }

   async function chng(e){
        e.preventDefault();
        await axios.post(`http://localhost:8080/editChat/${chat._id}`,{message})
        .then((res)=>{
            nav('/')
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return(
        <>
        <p>{chat.from}</p>
        <p>{chat.to}</p>
         <form >
            <textarea name="mess"  cols="30" rows="10" value={message} onChange={mes}>
                
            </textarea>
            <button onClick={chng}>edit Message</button>
         </form>

        </>
    )
}