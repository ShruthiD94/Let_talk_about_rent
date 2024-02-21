import React from 'react';
import {AiFillHeart} from 'react-icons/ai'
import {BsBookmark} from 'react-icons/bs'
import {BiDotsHorizontalRounded} from 'react-icons/bi'

export default function ArticleSidebar() {
  return <div className="d-flex justify-content-center me-4 mt-3">
    <SidebarIcon icon={<AiFillHeart size={25}/>} subtext={13}/>
    <SidebarIcon icon={<BsBookmark size={25}/>} subtext={5}/>
    <SidebarIcon icon={<BiDotsHorizontalRounded size={25}/>}/>
  </div>
  
  ;
}

const SidebarIcon = ({icon, subtext, onClick}) => (
    <div className="d-flex flex-column text-center mx-3" onClick={onClick}>
        {icon}
        <p className="text-muted">{subtext ? subtext : ""}</p>
    </div>
)
