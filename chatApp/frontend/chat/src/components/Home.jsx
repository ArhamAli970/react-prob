import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Home.css'
import { useNavigate } from "react-router-dom";

export default function Home(){

    let [chat,setChat]=useState([]);

    let nav=useNavigate();
    // const chat={};

    function fun(){
        nav('/newChat');
    }

    useEffect(()=>{
        
        async function fun(){
        await axios.get('http://localhost:8080/getData')
        .then((res)=>{
            console.log(res,"dfd");
          setChat(res.data.chat);


        })
        .catch((err)=>{
            console.log("err fnd");
        })}

        fun();
    },[])

    async function edit(id){
        console.log(id);
        await axios.get(`http://localhost:8080/get/${id}`)
        .then((res)=>{
            let data=res.data.chat;
            // console.log(data,"hi");
            nav('/editChat',{state:data});
        })
        .catch((err)=>{
            console.log(err.message);
        })
    }

    async function del(id){
        // console.log(id);
        await axios.delete(`http://localhost:8080/delete/${id}`)
        .then((res)=>{
            nav('/')
        })
        .catch((err)=>{
            console.log(err.message);
        })
    }
    return(
    <>
        <h1>home world</h1>
        <Link to='/login' >Login</Link>
        <Link to='/sign' >Sign</Link>
<br /><br />
        <button onClick={fun}>NewChat add</button>

        <div className="parCar">
            {
                chat.map((c,i)=>{
                    return(
                        <div className="card" key={c._id}>
                        <h4>{c.from}</h4>
                        <h4>{c.to}</h4>
                        <p>meassage: {c.mess}</p>
                        
                        <button onClick={()=>{edit(c._id)}}>Edit Chat</button>

                        <button onClick={()=>{del(c._id)}}>Delete Chat</button>
                        
                        </div>
                    )
                })
            }
        </div>
        

    </>
    )
}