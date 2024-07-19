import { useState } from "react";
import {
  validateUsername,
  validationEmail,
} from "../../../shared/validators";
import { Input } from "../../Input.jsx";

const userId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : null;

const inputs = [
  {
    field: "username",
    label: "Username",
    validateUsername,
    type: "text",
  },
  {
    field: "email",
    label: "Email",
    validationEmail,
    type: "text",
  },
];
export const UserSettings = ({ settings, saveSettings }) => {

  const [formState, setFormState] = useState({
    username: {
      isValid: validateUsername(settings.username),
      showError: false,
      value: settings.username,
    },
    email: {
      isValid: validationEmail(settings.email),
      showError: false,
      value: settings.email,
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

  const handleInputValidationOnBlur = (value, field) => {
    let isValid = false;
    switch (field) {
      case "username":
        isValid = validateUsername(value);
        break;
      case "email":
        isValid = validationEmail(value);
        break;
      default:
        break;
    }
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        isValid,
        showError: !isValid
      }
    }))
  };

  const handleFormSubmit = (event) => {
    event.preventDefault()

    saveSettings({
      username: formState.username.value,
      email: formState.email.value,
      userId: userId
    })

  }

  const isSubmitButtonDisabled = !formState.username.isValid ||
    !formState.email.isValid

  return (
    <form className="settings-form" onSubmit={handleFormSubmit}>
      {inputs.map((input) => (
        <div className="input-container" key={input.field}>
          <label htmlFor={input.field}>{input.label}</label>
          <input
            id={input.field}
            type={input.type}
            value={formState[input.field].value}
            onChange={(e) => handleInputValueChange(e.target.value, input.field)}
            onBlur={(e) => handleInputValidationOnBlur(e.target.value, input.field)}
          />
          {formState[input.field].showError && (
            <span className="error-message">{input.validationMessage}</span>
          )}
        </div>
      ))}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button type="submit" className="save-btn" disabled={isSubmitButtonDisabled}>
          Save Changes
        </button>
      </div>
    </form>
  );
}