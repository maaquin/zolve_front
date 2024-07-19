import { useState } from "react"
import { Login } from '../../components/Login'
import { Register } from '../../components/Register'
import { CheckEmail } from '../../components/auth/ConfirmEmail'
import { NewUser } from '../../components/auth/NewUser'
import { Route, Routes } from "react-router-dom";
import { Botones } from '../../components/auth/Botones';

import './authPage.css'

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)

  const handlerAuthPageToggle = () => {
    setIsLogin((prev) => !prev)
  }
  return (
    <div>
      <Routes>
        <Route path="/" element={
          <div className="container">
            <div className="auth-container">
              {isLogin ? (
                <Login switchAuthHandler={handlerAuthPageToggle} />
              ) : (
                <Register switchAuthHandler={handlerAuthPageToggle} />
              )}
            </div>
          </div>
        } />
      </Routes>
      <div className="container-extra">
        <Routes>
          <Route path='/confirm' element={<CheckEmail />} />
          <Route path='/confirme' element={<Botones />} />
          <Route path='/store-owner' element={<NewUser />} />
        </Routes>
      </div>
    </div>
  )
}