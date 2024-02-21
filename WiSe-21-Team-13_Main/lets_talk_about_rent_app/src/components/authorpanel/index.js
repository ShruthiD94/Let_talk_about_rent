import React, {useEffect, useState} from 'react';
import { AiFillCalendar, AiOutlinePlusCircle } from 'react-icons/ai'
import { database } from '../../firebase';

export default function AuthorPanel({authorUID}) {

    const [author, setAuthor] = useState()

    useEffect(() =>{
        database.ref("users/"+ authorUID).get().then((snap) => {
        if (!snap.exists()) return;
        setAuthor(snap.val())
        })
    },[authorUID])

    return <div className="border-primary rounded-3 p-0 mx-3 h-25 sticky-top d-none d-lg-block" 
    style={{backgroundColor: "white", borderTop:"2rem solid blue", minWidth:"250px"}}>
        <div className="placeholder-glow d-flex align-items-center p-2" name="top-header">
            <span className="placeholder border rounded-circle border-primary border-5" style={{width:"50px", height: "50px"}}></span>
            <p className="lh-sm mb-0 mx-2 fw-bold fs-5"> {author ? author.displayName : "deleted user"} </p>
        </div>
        <div name="panel-body" className="d-flex flex-column p-2">
            <span className="text-muted text-wrap">
                Right now our database doesn't support a bio, location or post count.
            </span>
            <span className="mt-3" style={{fontWeight: "500"}}>
                Location
            </span>
            <p className="m-0">
                Aachen, Germany
            </p>
            <span className="fw-normal d-flex lh-base mt-3">
                <AiOutlinePlusCircle size={25}/> <p className="mx-2 mb-1 mt">4 Post created</p>
            </span>
            <span className="fw-normal d-flex m-0">
                <AiFillCalendar size={25}/> <p className="mx-2">Joined September 2021</p>
            </span>
        </div>
    </div>;
}
