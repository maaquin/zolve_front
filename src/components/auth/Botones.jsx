import { useNavigate } from "react-router-dom";
import { useRolePut } from '../../shared/hooks'

export const Botones = () => {
  const navigate = useNavigate();
  const { isLoading, updateRole } = useRolePut();

  const handleUserTypeSelection = (userType) => {
    if (userType === "storeOwner") {
      updateRole('owner')
      navigate("/auth/store-owner");
    } else {
      updateRole('client')
      navigate("/");
    }
  };

  return (
    <div className="btn-container">
      <button className="btn-user consumer-btn" onClick={() => handleUserTypeSelection("consumer")}>
        Soy consumidor
      </button>
      <button className="btn-user owner-btn" onClick={() => handleUserTypeSelection("storeOwner")}>
        Soy dueño de tienda
      </button>
    </div>
  );
  
};


