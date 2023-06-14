import { useState } from 'react'
import './App.css'
import { Card } from './components/card';
import { UserData } from './Interface/UserData';
import { useUserData } from './hooks/useUserData';

function App() {
  const {data} = useUserData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev)
  }

  return (
      <div className="container">
       <h1>Usuario</h1>
       <div className="card-grid">
          {data?.map(userData => 
          <Card 
          name={userData.name} 
          email={userData.email} 
          department={userData.department}
          />
          )}
       </div>
       {isModalOpen && <CreateModal closeModal={handleOpenModal}/>}
       <button onClick={handleOpenModal}>novo</button>
      </div>    
  )
}

export default App
