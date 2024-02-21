import StarBar from "../starbar";

const OverviewTable = ({appartment, ratings}) => {
    return (
    <div className="bg-light border-1 border rounded pt-3">
        <div className="row justify-content-center">
            <div className="d-flex flex-column text-center mx-3 col-sm-2 col-5">
                <p className="m-0">{appartment["cold-rent"]}€</p>
                <p className="text-muted m-0">Kalt</p>
            </div>
            <div className="d-flex flex-column text-center mx-3 col-sm-2 col-5">
                <p className="m-0">{appartment["rooms"]}</p>
                <p className="text-muted m-0">Zimmer</p>
            </div>
            <div className="d-flex flex-column text-center mx-3 col-sm-2 col-5">
                <p className="m-0">{appartment["area"]}m²</p>
                <p className="text-muted m-0">Fläche</p>
            </div>
            <div className="d-flex flex-column text-center mx-3 col-sm-2 col-5">
                <p className="m-0">{appartment["warm-rent"]}€</p>
                <p className="text-muted m-0">Warm</p>
            </div>
        </div>  
        <hr/>
        <div className="containe m-1">
            <div className="row">         
                <div className="col-12 col-sm-4">
                    <p className="text-center mb-0">
                        <StarBar amount={ratings.appartment} maxAmount={5} size={20}/>
                    </p>
                    <p className="fs-6 text-center mb-2 text-muted"> Wohnung </p>
                </div>
                <div className="col-12 col-sm-4">
                    <p className="text-center mb-0">
                        <StarBar amount={ratings.landlord} maxAmount={5} size={20}/>
                    </p>
                    <p className="fs-6 text-center mb-1 text-muted"> Vermieter </p>
                </div>
                <div className="col-12 col-sm-4">
                    <p className="text-center mb-0">
                        <StarBar amount={ratings.location} maxAmount={5} size={20}/>
                    </p>
                    <p className="fs-6 text-center mb-1 text-muted"> Umgebung </p>
                </div>
            </div>
        </div>
    </div>
    );
}

export default OverviewTable;