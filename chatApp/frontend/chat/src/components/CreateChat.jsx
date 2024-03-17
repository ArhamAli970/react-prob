import { useState } from 'react'
import './CreateChat.css'
import { useNavigate } from 'react-router-dom';

export default function CreateChat(){
    let navigate=useNavigate();
let data={from:"",to:"",message:""}
    let [frm,setFrm]=useState(data);

    function fun(e){
        // console.log(e.target.name,[e.target.name]);
        
        setFrm({...frm,[e.target.name]:e.target.value});
    }

    async function sub(e){
     e.preventDefault();
     console.log(frm); 

     await axios.post('http://localhost:8080/subData',{frm}).
     then((res)=>{
        const{succ}=res.data;
        console.log(succ);
        navigate('/');
     })
     .catch((err)=>{
       console.log(err.message); 
     })

    }


    return(
         <div className="par">
                 
         <form>
             <label htmlFor="from">Sender</label>
             <input type="text" name="from" onChange={fun} value={frm.from} />
             <br /><br /><br />
             <label htmlFor="Reciever">Reciever</label>
             <input type="text" name="to" onChange={fun} value={frm.to}  />
             <br /><br /><br />
             <label htmlFor="from">message</label>
              <textarea name="mess"  cols="30" rows="10" onChange={fun} value={frm.mess} ></textarea>
             <br /><br /><br />
             <button onClick={sub}>submit</button>
         </form>

         </div>
    )
}