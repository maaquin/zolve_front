import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { StoreDescription } from "./StoreDescription";
import { useStoreDetails } from "../../shared/hooks/store/useStoreDetails";
import { LoadingSpinner } from "../LoadingSpinner";

export const ImgStore = ({ imgUrl }) => {
    return (
        <div className="channel-video-container">
            <img src={imgUrl} width='100%' height='100%' alt="Store Image" />
        </div>
    );
}

export const StoreView = ({ getStores }) => {
    const { isFetching, getStoresDetails, storeDetails } = useStoreDetails();
    const { id } = useParams();

    useEffect(() => {
        getStoresDetails(id);
    }, []);

    console.log(storeDetails)

    if (isFetching) {
        return <LoadingSpinner />;
    }

    if (!storeDetails) {
        return <div>No store details available.</div>;
    }

    return (
        <div className="channel-container">
            <div className="channel-video-description-section">
                <ImgStore imgUrl={storeDetails.data.imgUrl} />
                <div className="channel-description-box2">
                    <StoreDescription
                        storeId={storeDetails.data._id}
                        name={storeDetails.data.name}
                        direction={storeDetails.data.direction}
                        score={storeDetails.data.score}
                        getStores={getStores}
                    />
                </div>
            </div>
        </div>
    );
}
