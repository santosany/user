import { useState } from 'react';
import './App.css';
import { Card } from './components/card';
import { UserData } from './Interface/UserData';
import { useUserData } from './hooks/useUserData';
import { CreateModal } from './components/create-modal/create-modal'
import { EditModal } from './components/create-modal/edit-modal'
import { useUserDelete } from './hooks/useUserDataRemove';



function App() {
  const { data } = useUserData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);


  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev);
  }

  const handleOpenEdit = (id: number) => {
    setSelectedUserId(id);
    setIsModalEdit(prev => !prev);
  };

  const handleOpenDelete = (id) => {
    const confirmDelete = window.confirm("Deseja realmente excluir este usuário?");
    if (confirmDelete) {
      useUserDelete(id);
      alert("Usario excluido com sucesso!")
      window.location.reload(); 
    }
  }

  return (
    <div className="container">
      <h1>Usuário</h1>
      <div className="card-grid">

        {data?.map(userData =>
          <div>
            <Card
              key={userData.id}
              name={userData.name}
              email={userData.email}
              department={userData.department}
            />
             <button onClick={() => handleOpenEdit(userData.id)}>editar</button>
            <button id="but_delete" onClick={() => handleOpenDelete(userData.id)}>deletar</button>
          </div>
        )}

      </div>



      {isModalOpen && <CreateModal closeModal={handleOpenModal} />}
      {isModalEdit && <EditModal closeModal={handleOpenEdit} idUser={selectedUserId} />}

      <button onClick={handleOpenModal}>novo</button>
    </div>
  )
}

export default App;


function setSelectedUserId(id: number) {
  throw new Error('Function not implemented.');
}

