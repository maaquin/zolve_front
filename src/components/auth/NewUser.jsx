import { useNavigate } from "react-router-dom";
import { Input } from "../Input";
import { useEffect, useState } from "react";
import { Logo } from '../Logo'
import { useDropzone } from "react-dropzone";
import {
  validateTitle,
  validateDescription,
  validateCoo,
} from "../../shared/validators";
import { useNewStore } from "../../shared/hooks";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { storePin } from "../pages/pins/StorePin";

export const ImgPreview = ({ file }) => {
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

export const NewUser = () => {

  const navigate = useNavigate();
  const { newStore } = useNewStore();
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState({ imgUrl: null });

  const [formState, setFormState] = useState({
    name: {
      value: "",
      isValid: false,
      showError: false,
    },
    phone: {
      value: "",
      isValid: false,
      showError: false,
    },
    direction: {
      value: "",
      isValid: false,
      showError: false,
    },
    coordenadas: {
      value: "0, 0",
      isValid: false,
      showError: false,
    },
  });

  const handleInputValueChange = (value, field) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        value,
      },
    }));
  };

  const [coordinates, setCoordinates] = useState([0, 0]);
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

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setCoordinates([lat, lng]);
    handleInputValueChange(`${lat}, ${lng}`, "coordenadas");
    setUserLocation(null);
  };

  function MapClickHandler() {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  }

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

  const handleNewStore = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const reader = new FileReader();
    reader.readAsDataURL(files.imgUrl);
    reader.onload = async () => {
      const base64Img = reader.result;

      await newStore(
        formState.name.value,
        formState.phone.value,
        formState.direction.value,
        base64Img,
        formState.coordenadas.value
      );
      setIsLoading(false);
      navigate("/");
    };
  };


  const isSubmitButtonDisable =
    isLoading ||
    !formState.name.isValid ||
    !formState.phone.isValid ||
    !formState.direction.isValid;

  const onDrop = (acceptedFiles, field) => {
    setFiles((prevState) => ({
      ...prevState,
      [field]: acceptedFiles[0],
    }));
  };

  const { getRootProps: getImgRootProps, getInputProps: getImgInputProps } =
    useDropzone({
      onDrop: (files) => onDrop(files, "imgUrl"),
      accept: "image/*",
    });


  return (
    <div className="auth-container">
      <div className="continue-container">
        <div className="new-store-container">
          <Logo text={'About your store'} />
          <form className="auth-form" onSubmit={handleNewStore}>
            <div className="input-box">
              <Input
                field="name"
                placeholder="Name store"
                className="login-input"
                value={formState.name.value}
                onChangeHandler={handleInputValueChange}
                type="text"
                onBlurHandler={handleInputValidationOnBlur}
              />
              <i className="fa-solid fa-signature"></i>
            </div>

            <div className="input-box">
              <Input
                field="phone"
                placeholder="Phone store"
                className="login-input"
                value={formState.phone.value}
                onChangeHandler={handleInputValueChange}
                type="text"
                onBlurHandler={handleInputValidationOnBlur}
              />
              <i className="fa-solid fa-phone"></i>
            </div>

            <div className="input-box" style={{ marginBottom: "20px" }}>
              <Input
                field="direction"
                placeholder="Direction store"
                className="login-input"
                value={formState.direction.value}
                onChangeHandler={handleInputValueChange}
                type="text"
                onBlurHandler={handleInputValidationOnBlur}
              />
              <i className="fa-solid fa-route"></i>
            </div>

            <div
              className="dropzone-container"
              style={{ width: "90%" }}
              {...getImgRootProps()}
            >
              <input {...getImgInputProps()} />
              {files.imgUrl ? (
                <ImgPreview file={files.imgUrl} />
              ) : (
                <>
                  <p>
                    Drag and drop an image from the store or click to select one
                  </p>
                  <i className="fa-solid fa-image" style={{ color: "white" }}></i>
                </>
              )}
            </div>

            <div className="input-box">
              <Input
                field="coordenadas"
                placeholder=""
                className="login-input"
                value={userLocation || formState.coordenadas.value}
                onChangeHandler={handleInputValueChange}
                disabled={true}
                type="text"
                onBlurHandler={handleInputValidationOnBlur}
              />
              <i className="fa-solid fa-compass"></i>
            </div>
            <MapContainer
              center={userLocation || [14.64072, -90.51327]}
              zoom={10}
              style={{ height: "300px", width: "80%", marginTop: "25px" }}
            >
              <TileLayer
                className="tile-layer"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <MapClickHandler />

              {userLocation && (
                <Marker position={userLocation} icon={storePin}>
                  <Popup>Selected location</Popup>
                </Marker>
              )}

              {coordinates && (
                <Marker position={coordinates} icon={storePin}>
                  <Popup>Selected location</Popup>
                </Marker>
              )}
            </MapContainer>
            <button type="submit" disabled={isSubmitButtonDisable}>
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};