import { useEffect } from "react";
import { UserSettings } from './user/UserSettings.jsx';
import { useUserSettings, useUserDetails, useUserStore } from "../../shared/hooks";
import { LoadingSpinner } from "../LoadingSpinner";
import { PasswordSettings } from "./user/PasswordSettings.jsx";
import { StoreSettings } from './store/StoreSettings.jsx'

export const Settings = () => {
    const { userSettings, isFetching: isFetchingUser, saveSettings } = useUserSettings();
    const { storeDetails, isFetching: isFetchingStore, saveSettingsStore } = useUserStore();

    const { isLogged } = useUserDetails();

    if (isFetchingUser || isFetchingStore) {
        return <LoadingSpinner />;
    }

    return (
        <div className="settings-container">
            {userSettings.role === 'client' ? (
                <>
                    <div>
                        <span>Account settings</span>
                        <UserSettings settings={userSettings} saveSettings={saveSettings} />
                    </div>
                    <div>
                        <span>Change password</span>
                        <PasswordSettings />
                    </div>
                    <div className="deactivate-section">
                        <span>Deactivate your account</span>
                        <button className="deactivate-btn">Deactivate</button>
                    </div>
                </>
            ) : (
                <>
                    <div>
                        <span>Account settings</span>
                        <UserSettings settings={userSettings} saveSettings={saveSettings} />
                    </div>
                    <div>
                        <span>Store settings</span>
                        <StoreSettings settings={storeDetails} saveSettings={saveSettingsStore} />
                    </div>
                    <div>
                        <span>Change password</span>
                        <PasswordSettings />
                    </div>

                    <div className="deactivate-section">
                        <span>Deactivate your account</span>
                        <button className="deactivate-btn">Deactivate</button>
                    </div>
                </>
            )}
        </div>
    );
};