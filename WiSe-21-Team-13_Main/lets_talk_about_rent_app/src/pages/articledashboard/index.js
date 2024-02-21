import React, { useState, useEffect } from "react";
import { CreateArticleFilterQuery } from "../../components/util/DataManager";
import "./articledashboard.css"
import ArticleCard from "../../components/articlecard";
import { useAuth } from "../../context/AuthContext";
import { GetUserData } from "../../components/util/DataManager";

export default function ArticleDashboard() {
  // dummy data

  const [cards, SetCards] = useState([]);

  const {currentUser} = useAuth();

  useEffect(() => {
    GetUserData(currentUser.uid).then((snap) => {
      if (!snap.exists()) return;
      const cities = [].concat(snap.val().city);
      fetchArticlesByCities(cities);
    })
  }, []);

  const fetchArticlesByCities = async (cityArray) => {
    let cityCards = [];
    for (const city of cityArray) {
      const ref = CreateArticleFilterQuery("address/city", city);
      const data = await ref.get().then((snapshot) => {
        if (!snapshot.exists()) return;
        return Object.values(snapshot.val());
      });

      if (data !== undefined) {
        cityCards = cityCards.concat(
          data.map((article) => <ArticleCard article={article} />)
        );
      }
    }
    SetCards(cityCards);
  };

  const CardCollection = () => {
    return cards.map((c, idx) => (
      <div
        className="w-100 my-3 flex flex-column justify-content-center"
        key={idx}
      >
        {c}
      </div>
    ));
  };

  if (!currentUser) {
    return (
      <p className="text-center mt-5">
        You have to be logged in see your dashboard!
      </p>
    )
  }

  return (
    <div name="Article Dashboard" className="mt-3 rounded-10 w-100 mx-auto m-5 p-5 card-blue-header" style={{backgroundColor : "#1E25CA", maxWidth: "700px"}}>
      <h1 style={{ fontWeight: 700 }} className="text-center dashboard-title">
        Dashboard
      </h1>
      <div className="d-flex justify-content-center align-items-center w-100 flex-column dashboard-feed">
        {CardCollection()}
        {cards.length === 0 && (
          <div
            className="spinner-border flex justify-self-center"
            role="status"
          >
            <span className="sr-only"></span>
          </div>
        )}
      </div>
    </div>
  );
}

