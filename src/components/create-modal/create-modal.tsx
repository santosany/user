import { useEffect, useState } from "react"
import { useUserDataMutate } from "../../hooks/useUserDataMutate"
import { UserData } from "../../Interface/UserData"
import "./modal.css"

interface InputProps{
    label:string,
    value:string | number,
    updateValue:{value:any}; void: any;
}

interface ModalProps{
    closeModal():void
}

const Input = ({label, value, updateValue}: InputProps) => {
    return{
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)}> </input>
        </>
    }
}



export function CreateModal({closeModal}: ModalProps){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [department, setDepartment] = (0);
    const {mutate, isSuccess, isLoading} = useUserDataMutate

    const submit = {} => {
        const userData: UserData = {
            name,
            email,
            department
        }
        mutate(userData)
    }

    useEffect(()=>{
        if(!isSuccess) return
            closeModal();
    }, [isSuccess])

    return(
        <div className="modal-overflow">
            <div className="modal-body">
                <h2>Cadastre um novo usuário</h2>
                <form className="input-container">
                    <Input label="nome" value={name} updateValue={setName}></>
                    <Input label="email" value={email} updateValue={setEmail}></>
                    <Input label="departamento" value={department} updateValue={setDepartment}></>
                </form>
                <button onClick={submit} className="btn-secondary"></>
                    {isLoading ? 'postando...' : 'postar'}
            </div>
        </div>
    )

}