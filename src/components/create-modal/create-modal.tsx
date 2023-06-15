import { useEffect, useState } from "react"
import { useUserDataMutate } from "../../hooks/useUserDataMutate"
import { UserData } from "../../Interface/UserData"
import './modal.css';

interface InputProps {
    label: string,
    value: string | number | [],
    updateValue: (value: any)=> void
}

interface ModalProps {
    closeModal(): void
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)}></input>
        </>
    );
};



export function CreateModal({ closeModal }: ModalProps) {
    const [userName, setName] = useState("");
    const [userEmail, setEmail] = useState("");
    const [userDepartment, setDepartment] = useState(""); // Corrected typo: (0) -> ("")

    const { mutate, isSuccess, isLoading } = useUserDataMutate(); // Corrected missing parentheses

    const submit = () => { // Corrected syntax: {} -> ()
        const userData: UserData = {
            name: userName,
            email: userEmail,
            department: userDepartment
        };
        mutate(userData);
    };

    useEffect(() => {
        if (!isSuccess) return;
        closeModal();
    }, [isSuccess, closeModal]); // Added missing dependency closeModal

    return (
        <div className="modal-overflow">
            <div className="modal-body">
                <h2>Cadastre um novo usuário</h2>
                <form className="input-container">
                    <Input label="nome" value={userName} updateValue={setName} /> {/* Corrected closing tags */}
                    <Input label="email" value={userEmail} updateValue={setEmail} /> {/* Corrected closing tags */}
                    <Input label="departamento" value={userDepartment} updateValue={setDepartment} /> {/* Corrected closing tags */}
                </form>
                <button onClick={submit} className="btn-secondary">Submit</button> {/* Added button text */}
                {isLoading ? 'postando...' : 'postar'}
            </div>
        </div>
    );
}