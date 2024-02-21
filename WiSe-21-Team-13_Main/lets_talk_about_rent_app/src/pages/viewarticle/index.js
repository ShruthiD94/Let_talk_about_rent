import React, { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { database } from '../../firebase';
import OverviewTable from '../../components/overviewtable';
import AuthorPanel from '../../components/authorpanel';
/* import ArticleSidebar from '../../components/articlesidebar'; */

export default function ViewArticle() {

    const location = useLocation()
    const { articleUID } = location.state ? location.state : ""

    const [article, setArticle] = useState()

    useEffect(() => {
        database.ref("articles/" + articleUID).get().then((snap) => {
            if (!snap.exists()) return;
            setArticle(snap.val())
        })
    }, [articleUID])

    return <>
        { !articleUID && <Navigate to="/" />}
        {
            article ?
            <>
            <div className="p-2 d-flex justify-content-center container-sm">
                <ArticlePageCard article={article}/>
                <AuthorPanel authorUID={article.author}/>
            </div>
            </>
            :
            <span> Loading </span>
        }    
        { /* Add a cool loading buffer from bootstrap here */}
    </>;
}

const ArticlePageCard = ({article}) => {

    return (
    <div className="border border-1 rounded-3 p-3 container-lg" style={{backgroundColor: "white", maxWidth:"1000px"}}>
        <h2>{article.title}</h2>   
        <p className="fs-5 fw-light text-muted">
            {article.address.city +" | " + article.address.postalcode}
        </p>
        <OverviewTable appartment={article.appartmentData} ratings={article.ratings}/>
        <div className="m-3"></div>
        <div className="bg-light border-1 border rounded px-3 pt-2">
            { article.questionnaire && article.questionnaire.map((q, idx) => (
                <TextField key={idx} title={q.title} tooltip={"Write about your experience with the landlord"}>
                {q.content}
                </TextField>
            ))}
        </div>
        {/* <ArticleSidebar/> * Likes, Views, etc*/}
    </div>
    )
}

const TextField = ({title, tooltip, children}) => (
    <div>
        <p className="fs-5 fw-bold mb-0"> {title} </p>
        {children && children}
    </div>
)

