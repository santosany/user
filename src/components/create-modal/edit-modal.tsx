import { useEffect, useState } from "react"
import { useUserDataMutate } from "../../hooks/useUserDataCreate"
import { UserData } from "../../Interface/UserData"
import "./modal.css"
import { useUserDataUpdate } from "../../hooks/useUserDataUpdate";

interface InputProps {
    label: string;
    value: string | number;
    updateValue: React.Dispatch<React.SetStateAction<string | number>>;

}

interface ModalProps {
    closeModal(): void
    idUser: string | number
}


const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={(event) => updateValue(event.target.value)} />
        </>
    );
};



export function EditModal({ closeModal, idUser }: ModalProps) {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState(""); // Corrected typo: (0) -> ("")

    const { mutate, isSuccess, isLoading } = useUserDataUpdate(); // Corrected missing parentheses

    const submit = () => { // Corrected syntax: {} -> ()
        const userData: UserData = {
            id,
            name,
            email,
            department
        };
        mutate(userData);
        window.location.reload();
    };

    useEffect(() => {
        if (idUser) {
          setId(String(idUser));
        }
      }, [idUser]);

    useEffect(() => {
        if (!isSuccess) return;
        closeModal();
    }, [isSuccess, closeModal]); // Added missing dependency closeModal

    return (
        <div className="modal-overflow">
            <div className="modal-body">
                <h2>Edite os dados do usuário</h2>
                <form className="input-container">
                    <Input label="id" value={id} updateValue={setId} />
                    <Input label="nome" value={name} updateValue={setName} />
                    <Input label="email" value={email} updateValue={setEmail} />
                    <Input label="departamento" value={department} updateValue={setDepartment} />
                    <button onClick={submit} className="btn-secondary">Submit</button>
                </form>

            </div>
        </div>
    );

}
