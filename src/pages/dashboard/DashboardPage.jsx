/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Navbar } from "../../components/navbars/Navbar";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { Content } from "../../components/dashboard/Content";
import { useUserDetails } from "../../shared/hooks";
import { useStores } from "../../shared/hooks/store/useStore.jsx";

import "./dashboardPage.css";
import './estilos/settings.css'
import './estilos/finishZolve.css'

import { useParams } from "react-router-dom";

export const DashboardPage = () => {

    const { getStores, allStores, isFetching: isStoresFetching } = useStores();
    const { isLogged } = useUserDetails();

    useEffect(() => {
        getStores(isLogged);
    }, []);

    if (isStoresFetching) {
        return <LoadingSpinner />;
    }

    return (
        <div className="dashboard-container">
            <Navbar />
            <Content 
            stores={allStores || []} getStores={getStores}
            />
        </div>
    );
};

