import React, { useContext, useEffect, useState } from 'react'
import './RightSideBar.css'
import assets from '../../assets/assets'
import { logout } from '../../config/firebase'
import { AppContext } from '../../context/AppContext'


const RightSideBar = () => {

  const {chatUser,messages}=useContext(AppContext);
  const [msgImages,setMsgImages]=useState([]);

  useEffect(()=>{
    let tempVar=[];
    messages.map((msg)=>{
      if(msg.image){
        tempVar.push(msg.image);
      }
    })
    setMsgImages(tempVar);
  },[messages]);

  return chatUser? (
    <div className='rs'>
      <div className="rs-profile">
        <img src={chatUser.userData.avatar} alt="9" />
        <h3>{Date.now()- chatUser.userData.lastSeen<=70000?<img src={assets.green_dot} className='dot' alt="10" />:null} {chatUser.userData.name} </h3>
        <p>{chatUser.userData.bio}</p>
      </div>
      <hr />
      <div className="rs-media">
        <p>Media</p>
        <div>
          {msgImages.map((url,index)=>(<img key={index} src={url} onClick={()=>window.open(url)}></img>))}
          {/* <img src={assets.pic1} alt="11" />
          <img src={assets.pic2} alt="11" />
          <img src={assets.pic3} alt="11" />
          <img src={assets.pic4} alt="11" />
          <img src={assets.pic1} alt="11" />
          <img src={assets.pic2} alt="11" /> */}
        </div>
      </div>
      <button onClick={()=>logout()}>Logout</button>
    </div>
  ): (
    <div className='rs'>
      <button onClick={()=>logout()}>Logout</button>
    </div>
  )
}

export default RightSideBar