import {useUserDetails} from "../../shared/hooks"


export const StoreDescription = ({
    name,
    storeId,
    direction,
    score,
}) => {
    const { isLogged } = useUserDetails();

    return (
        <div className="channel-description-container">
            <div className="channel-description-title-box">
                <span className="channel-description-title">
                    {name}
                </span>
            </div>
            <div className="channel-description-box">
                <div className="channel-description-item">
                    <span className="channel-description-title2">Direction:</span>
                    <span className="channel-description">{direction}</span>
                </div>
                <div className="channel-description-item">
                    <span className="channel-description-title2">Score:</span>
                    <span className="channel-description">{score}</span>
                </div>
            </div>
        </div>
    );
};