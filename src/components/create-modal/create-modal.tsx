import { useEffect, useState } from "react"
import { useUserDataMutate } from "../../hooks/useUserDataCreate"
import { UserData } from "../../Interface/UserData"
import "./modal.css"

interface InputProps {
    label: string;
    value: string | number;
    updateValue: React.Dispatch<React.SetStateAction<string | number>>;

}

interface ModalProps {
    closeModal(): void
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={(event) => updateValue(event.target.value)} />
        </>
    );
};



export function CreateModal({ closeModal }: ModalProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState(""); // Corrected typo: (0) -> ("")

    const { mutate, isSuccess, isLoading} = useUserDataMutate(); // Corrected missing parentheses

    const submit = () => { // Corrected syntax: {} -> ()
        const userData: UserData = {
            name,
            email,
            department
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
                    <Input label="nome" value={name} updateValue={setName} />
                    <Input label="email" value={email} updateValue={setEmail} />
                    <Input label="departamento" value={department} updateValue={setDepartment} />
                    <button onClick={submit} className="btn-secondary">Submit</button>
                </form>
            </div>
        </div>
    );

}
