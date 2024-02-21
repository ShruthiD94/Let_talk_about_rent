import React, { useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom'
import { database } from '../../firebase';
import { GrLocation } from 'react-icons/gr';
import { ImSearch } from 'react-icons/im';
import OverviewTable from '../../components/overviewtable';

export default function ArticleDashboard() {

  const [cards, setCards] = useState([]);
  const searchRef = useRef("");

  const handleSearch = (e) => {
    e.preventDefault();

    const value = searchRef.current.value
    if (!Number.isInteger(Number(value)) || value.length !== 5) return;

    fetchSpecificArticles(value);
  }

  const fetchSpecificArticles = async (zip) => {
    const ref = database.ref("articles/").orderByChild("address/postalcode").equalTo(zip);
    
    const data = await ref.get().then((snapshot) => {
      if (!snapshot.exists()) return;

      return Object.values(snapshot.val());
    })

    if (!data) {
      setCards([<p>We found no articles to that postal code :(</p>]);
      return;
    }

    const cards = data.map((article) => (
      <ArticleCard 
      article={article}
      />
    ))

    setCards(cards)
  }

  const CardCollection = () => {
    return cards.map((c, idx) => (
      <span className="w-100 mx-5" key={idx}>{c}</span>
    ))
  }

  return (
    <div name="Article Dashboard" className="mt-3">
      <h1 style={{fontWeight:700}} className="text-center"> Explore <span style={{verticalAlign:"10%"}}><ImSearch/></span></h1>
      <form className="input-group mb-3">
        <div className="input-group-prepend ms-5">
          <span className="input-group-text" id="basic-addon1"><GrLocation size="25"/></span>
        </div>
        <input type="text" ref={searchRef} className="form-control" placeholder="Postalcode. e.g. 52024" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
        <div className="input-group-append me-5">
          <button type="submit" className="btn btn-primary px-5" onClick={handleSearch}>
            Search
          </button>
        </div>
      </form>
      <div className="d-flex justify-content-center">
        {cards && CardCollection()}
      </div>
    </div>
  );
}

const ArticleCard = ({article}) => {

  const articleUID = article.uid;

  const navigate = useNavigate();

  return <div className="card w-100 me-5">
    <div className="card-header" style={{backgroundColor:"white"}}>
      <h5 className="card-title text-uppercase">{article.title}</h5>
      <h6 className="card-subtitle mb-2 text-muted">{article.address && article.address.city + " | " + article.address.postalcode}</h6>
    </div>
    <div className="card-body bg-light">
      <OverviewTable appartment={article.appartmentData} ratings={article.ratings}/>
      <button className="btn btn-primary w-100 mt-3" onClick={() => navigate("/view-article", {state: {articleUID : articleUID}})}>
        View
      </button>
    </div>
  </div>
}
