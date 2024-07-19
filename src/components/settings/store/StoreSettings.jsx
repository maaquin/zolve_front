import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { Input } from "../../Input";
import { storePin } from "../../pages/pins/StorePin";
import {
    validationEmail,
    validateTitle,
    validateDescription,
    validateCoo,
} from "../../../shared/validators";

// Reusable image preview component
const ImgPreview = ({ file }) => {
    const defaultImageUrl =
        "https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg";
    const imageUrl = file ? URL.createObjectURL(file) : defaultImageUrl;

    return (
        <div className="img-preview" style={{ width: "100%", height: "100%" }}>
            <img
                src={imageUrl}
                width="100%"
                height="100%"
                alt="Preview"
                style={{ objectFit: "cover" }}
            />
        </div>
    );
};

// Reusable map click handler
function MapClickHandler({ onClick }) {
    useMapEvents({
        click: onClick,
    });
    return null;
}

export const StoreSettings = ({ settings, saveSettings }) => {

    const [storeData] = settings.data || [{}];

    const [formState, setFormState] = useState({
        name: {
            value: storeData.name || "",
            isValid: validateTitle(storeData.name),
            showError: false,
        },
        phone: {
            value: storeData.phone || "",
            isValid: validateTitle(storeData.phone),
            showError: false,
        },
        direction: {
            value: storeData.direction || "",
            isValid: validateDescription(storeData.direction),
            showError: false,
        },
        coordenadas: {
            value: storeData.coordenadas || "0, 0",
            isValid: validateCoo(storeData.coordenadas),
            showError: false,
        },
        base64Img: {
            value: null,
            isValid: true, // No validation for image
            showError: false,
        },
    });

    const [coordinates, setCoordinates] = useState(storeData.coordenadas?.split(", ") || [0, 0]);
    const [files, setFiles] = useState({ imgUrl: null });
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation([latitude, longitude]);
                },
                (error) => {
                    console.error("Error al obtener la ubicación:", error);
                }
            );
        } else {
            console.error("Geolocalización no es compatible en este navegador.");
        }
    }, []);

    const handleInputValueChange = (value, field) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value,
            },
        }));
    };

    const handleInputValidationOnBlur = (value, field) => {
        let isValid = false;
        switch (field) {
            case "name":
                isValid = validateTitle(value);
                break;
            case "phone":
                isValid = validateTitle(value);
                break;
            case "direction":
                isValid = validateDescription(value);
                break;
            case "coordenadas":
                isValid = validateCoo(value);
                break;
            default:
                break;
        }
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                isValid,
                showError: !isValid,
            },
        }));
    };

    const handleMapClick = (e) => {
        const { lat, lng } = e.latlng;
        setCoordinates([lat, lng]);
        handleInputValueChange(`${lat}, ${lng}`, "coordenadas");
        setUserLocation(null);
    };

    const handleImageDrop = (acceptedFiles) => {
        setFiles((prevState) => ({
            ...prevState,
            imgUrl: acceptedFiles[0],
        }));
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        saveSettings({
            id: storeData._id,
            name: formState.name.value,
            phone: formState.phone.value,
            direction: formState.direction.value,
            coordenadas: formState.coordenadas.value,
            base64Img: files.imgUrl ? URL.createObjectURL(files.imgUrl) : null,
        });
    };

    const isSubmitButtonDisabled =
        !formState.name.isValid ||
        !formState.phone.isValid ||
        !formState.direction.isValid ||
        !formState.coordenadas.isValid;

    const { getRootProps: getImgRootProps, getInputProps: getImgInputProps } = useDropzone({
        onDrop: handleImageDrop,
        accept: "image/*",
    });

    return (
        <form className="settings-form" onSubmit={handleFormSubmit}>
            <div className="input-container">
                <label htmlFor="name">Name store</label>
                <Input
                    field="name"
                    value={formState.name.value}
                    onChangeHandler={handleInputValueChange}
                    onBlurHandler={handleInputValidationOnBlur}
                    placeholder="Name store"
                />
                {formState.name.showError && (
                    <span className="error-message">Invalid name</span>
                )}
            </div>

            <div className="input-container">
                <label htmlFor="phone">Phone store</label>
                <Input
                    field="phone"
                    value={formState.phone.value}
                    onChangeHandler={handleInputValueChange}
                    onBlurHandler={handleInputValidationOnBlur}
                    placeholder="Phone store"
                />
                {formState.phone.showError && (
                    <span className="error-message">Invalid phone</span>
                )}
            </div>

            <div className="input-container">
                <label htmlFor="direction">Direction store</label>
                <Input
                    field="direction"
                    value={formState.direction.value}
                    onChangeHandler={handleInputValueChange}
                    onBlurHandler={handleInputValidationOnBlur}
                    placeholder="Direction store"
                />
                {formState.direction.showError && (
                    <span className="error-message">Invalid direction</span>
                )}
            </div>

            <div className="dropzone-container" style={{ width: "90%" }} {...getImgRootProps()}>
                <input {...getImgInputProps()} />
                {files.imgUrl ? (
                    <ImgPreview file={files.imgUrl} />
                ) : (
                    <>
                        <p>Drag and drop an image or click to select one</p>
                        <i className="fa-solid fa-image" style={{ color: "white" }}></i>
                    </>
                )}
            </div>

            <div className="input-container">
                <label htmlFor="coordenadas">Coordinates</label>
                <Input
                    field="coordenadas"
                    value={formState.coordenadas.value}
                    onChangeHandler={handleInputValueChange}
                    onBlurHandler={handleInputValidationOnBlur}
                    placeholder=""
                    disabled={true}
                />
                {formState.coordenadas.showError && (
                    <span className="error-message">Invalid coordinates</span>
                )}
            </div>

            <MapContainer
                center={userLocation || coordinates}
                zoom={10}
                style={{ height: "300px", width: "80%", marginTop: "25px" }}
            >
                <TileLayer
                    className="tile-layer"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapClickHandler onClick={handleMapClick} />
                {userLocation && (
                    <Marker position={userLocation} icon={storePin}>
                        <Popup>Your location</Popup>
                    </Marker>
                )}
                {coordinates && (
                    <Marker position={coordinates} icon={storePin}>
                        <Popup>Selected location</Popup>
                    </Marker>
                )}
            </MapContainer>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button type="submit" className="save-btn" disabled={isSubmitButtonDisabled}>
                    Save Changes
                </button>
            </div>
        </form>
    );
};