import { useRoutes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import routes from './routes.jsx'
import Modal from 'react-modal';

export const App = () => {
  let element = useRoutes(routes)
  Modal.setAppElement('#root');

  return (
    <>
      {element}
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </>
  )
}
