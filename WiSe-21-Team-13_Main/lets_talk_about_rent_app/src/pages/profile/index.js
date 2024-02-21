import {database} from '../../firebase';
import React, {useState,useEffect} from 'react'
import './profile.css';
import { useAuth } from '../../context/AuthContext'
import { FaGratipay } from "react-icons/fa";
import { AiFillMail } from 'react-icons/ai';
import { BsPersonCircle } from "react-icons/bs";
import { BsFillCaretRightFill } from "react-icons/bs";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { BsFillHandThumbsUpFill } from "react-icons/bs";
import { BsEyeFill } from "react-icons/bs";
import ArticleCard from '../../components/articlecard';

// For content in readmore
const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(false);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p className="text ">
        {isReadMore ?  text :null }
        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ?   " show less" :"...read more"}
        </span>
      </p>
    );
  };

  export default function App({authorUID}) {
    const [author, setAuthor] = useState()
    const [article, setArticle] = useState()
    const { currentUser }= useAuth()  
    
    useEffect(() =>{
      if(currentUser)
      {
        database.ref("users/"+ currentUser.uid).get().then((snap) => {
          if (!snap.exists()) return;
          setAuthor(snap.val())
          })
        database.ref("articles/").orderByChild("author").equalTo(currentUser.uid).get().then((snap) => {
            if (!snap.exists()) return;
            const result = Object.values(snap.val());
            setArticle(result)  
            console.log(result)    
            })
        console.log(author)
      }
    },[currentUser])

    return (
    <div name="Profile Page" className="abc">
      <div className="mx-5 profile-author-body" style={{backgroundColor: "#1E25CA",maxWidth: "400px", maxHeight: "300px"}}>
        <div className="profile-author-header">
          <h1 className="text-center mt-1"> 
            {author ? author.displayName + " ": "..."}
          </h1>
        </div>
  
        <div className="mt-4 w-100 px-5">
          Bio of the Profile Page <hr/><hr/><hr/>
        </div>
        <div className="d-flex justify-content-around w-100 mt-2 px-5">
          <p><BsPersonCircle />&nbsp;{author && author.displayName}</p>
          <p><AiFillMail />&nbsp;{currentUser && currentUser.email}</p>
          <p><FaGratipay />&nbsp;<span className="join">Joined May,2021</span></p>
        </div>
      </div>
      <div className="profile-article-feed w-100" style={{backgroundColor: "#1E25CA", maxWidth:"700px"}}>
        <div className="profile-author-header">
          <h1 className="text-center mt-1"> Posts </h1>
          <div className="px-3 pb-5">
          { article && article.map((art, idx) => (
            <ArticleCard article={art}/>
          )
          )}
          </div>
        </div>
      </div>
    </div>     
  );        
}

// eslint-disable-next-line no-lone-blocks
{/*}
const SmallArticle = ({art, idx}) => {
  console.log(art)
  return (
    <div className='articles' key={idx}>
      <h3 className='title'>{art.title}</h3> 
      <h4 className='content'>
        <div ><BsFillCaretRightFill/>
        <b>{art.address.city}</b>
        <b>{art.address.country}</b>
        <b>{art.address.postalcode}</b>
        </div>
        
        <div ><BsFillCaretRightFill/><b className='font'>Area:</b> {art.appartmentData.area} &nbsp;&nbsp;&nbsp;
          <b className='font'> Rooms:</b> {art.appartmentData.rooms}&nbsp;&nbsp;&nbsp;
          <b className='font'>Coldrent:</b> {art.appartmentData["cold-rent"]}&nbsp; &nbsp;&nbsp;
          <b className='font'>Warmrent:</b> {art.appartmentData["warm-rent"]}</div> 
        <div>
        <BsFillCaretRightFill/><b className='font'>Usertype:</b> {art.userType}</div>
        <ReadMore>
        <div className="fs-5 fw-bold mb-0 title">Ratings:&nbsp;</div>
        
        <div ><BsFillCaretRightFill/><b className='font'>Appartment:</b> {art.ratings.appartment}&nbsp;&nbsp;&nbsp;
        <b className='font'>Landlord:</b> {art.ratings.landlord}&nbsp;&nbsp;&nbsp; 
        <b className='font'>Location:</b> {art.ratings.location}</div>
            {art.questionnaire && art.questionnaire.map((q) => 
          <div>
            <BsFillCaretRightFill/> <b className='font'>Title:</b> {q.title}&nbsp;&nbsp;&nbsp; <b className='font'>Content:</b> {q.content}</div>
            )}
        </ReadMore>
        <div className="flex-items1 ">
          <BsFillBookmarkHeartFill/>{art.metaData.bookmarks} &nbsp;
          <BsFillHandThumbsUpFill/>{art.metaData.likes} &nbsp; 
          <BsEyeFill/>{art.metaData.views} 
        </div>
      </h4>
    </div>
  )
}*/}