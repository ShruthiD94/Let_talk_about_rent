import React, { useState } from 'react';
import { GetArticleSchema, PublishArticle, GetAllArticles } from '../.././components/util/DataManager'
import { useAuth } from '../../context/AuthContext';
import { database } from "../../firebase";

export default function CrudExample() {

    const { currentUser, signIn } = useAuth();

    const [currentArticle, setCurrentArticle] = useState();
    const [allArticles, setAllArticles] = useState();

    // create a article (C) 
    const createTemplateArticle = () => {
        const article = GetArticleSchema()
        article.author = currentUser ? currentUser.uid : "0pLHcOtpJMPUWLJwG3dLpH22Dg62" // user id
        article.title = "Test Title"
        article.appartmentData = {
            "cold-rent" : "800",
            "warm-rent" : "1000",
            "area" : "32",
            "rooms" : "1", 
        }
        article.ratings = {
            "appartment" : "3",
            "landlord" : "4",
            "location" : "1",
        }
        article.questionnaire = { // these categories are not predefined
            "Landlord" : "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
            "Location" : "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
            "Atmosphere" : "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
            "Extra" : "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
        }
        /* notice that we dont need to add the metadata tag because
         it's already provided by GetArticleSchema() */
        article.userType = "Tenant"
        return article;
    }

    // Wrapper for publishing an article
    const publishArticle = () => {
        PublishArticle(currentArticle)
    }

    // Read all Articles
    /*
    There are many ways to retrieve data from the database.
    This ( '.get()' ) is a static one way retrieve when the website loads but there are also more dynamic ones.
    Please checkout the firebase documentation for that. 
    */
    const retrieveArticles = async () => {
        const db = database
        const ref = db.ref("articles")
        ref.get().then((snapshot) => { // snapshot is the retrieved value package
            console.log(snapshot.val())
            setAllArticles(snapshot.val())
        })
    }

    // Update Article
    const updateArticle = (newTitle) => {
        const exampleArticleUID = "-MtKCEpa-GYZMUbnuNzU"

        const db = database;
        const ref = db.ref("articles/" + exampleArticleUID)

        const newData = createTemplateArticle()
        newData.title = newTitle

        ref.set(newData)
    }

    // Delete Article 
    const deleteArticle = (articleUID) => {
        const db = database;
        const ref = db.ref("articles/" + articleUID)

        ref.set(null) // both work
        //ref.remove()
    }

    return <>
        <span>
            { /* Some Database Interaction require to be logged in */ }
            { currentUser ? "signed in" : <button onClick={() => signIn("tom@gmail.com", "123456")}> Sign In </button>}
        </span>
        <div>
            <button onClick={() => setCurrentArticle(createTemplateArticle())}> Create Article </button>
        </div>
        <div>
            <h3> Article </h3>
            {currentArticle ? "Current Article" + JSON.stringify(currentArticle) : "No Article yet"}
        </div>
        <div>
            {currentArticle && 
            <button onClick={publishArticle}>
                Publish Article
            </button>}
        </div>
        <hr/>
        <div>
            {console.log(allArticles)}
            <button onClick={retrieveArticles}> Retrieve All Articles </button>
            <ol>
                {allArticles && Object.values(allArticles).map((a, idx) => {
                    return <li key={idx}>
                        {a.title}
                    </li>
                })}
            </ol>
        </div>
    </>
}
