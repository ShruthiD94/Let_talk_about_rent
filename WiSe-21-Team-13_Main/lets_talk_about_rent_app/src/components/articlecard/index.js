import { useNavigate } from "react-router-dom";
import OverviewTable from "../overviewtable";
import { SecondaryButton } from "../buttons/buttons";


const ArticleCard = ({ article }) => {
    const articleUID = article.uid;
  
    const navigate = useNavigate();
  
    return (
      <div className="card mx-auto mt-3 text-dark" style={{ maxWidth: "50rem", borderRadius: "17px 17px 17px 17px"}}>
        <div className="card-header" style={{ backgroundColor: "#ffffff",  borderRadius: "17px 17px 0px 0px"}}>
          <h5 className="card-title text-uppercase">{article.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {article.address &&
              article.address.city + " | " + article.address.postalcode}
          </h6>
        </div>
        <div className="card-body" style={{backgroundColor: "#E5E5E5",  borderRadius: "0px 0px 17px 17px"}}>
          <OverviewTable
            appartment={article.appartmentData}
            ratings={article.ratings}
          />
          <SecondaryButton
            className="btn btn-primary w-100 mt-3"
            onClick={() =>
              navigate("/view-article", { state: { articleUID: articleUID } })
            }
          >
            View
          </SecondaryButton>
        </div>
      </div>
    );
};

export default ArticleCard;