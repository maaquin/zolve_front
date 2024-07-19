/* eslint-disable react/prop-types */

const imageUrl = 'https://www.msi-viking.com/sca-dev-2023-1-0/img/no_image_available.jpeg'

const StoreAvatar = ({url}) => {
    return(
        <div className="channels-img-container">
            <img src={url ? url: imageUrl} width='100%' height='100%' alt="Default img" />
        </div>
    )
}

export const StoreCard = ({
    name,
    _id,
    direction,
    score,
    imgUrl,
    handleNavigateToStore
}) => {
    const handleNavigate = () => {
        handleNavigateToStore(_id)
    }

    return(
        <div className="channels-card" onClick={handleNavigate}>
            <StoreAvatar url={imgUrl}/>
            <span className="channels-card-title">{name}</span>
            <span className="channels-card-text">{direction}</span>
            <span className="channels-card-text">{score}</span>
        </div>
    )

}