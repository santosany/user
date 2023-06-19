import "./card.css"
interface CardProps {
    name: string,
    email: string,
    department: string | number
    id: string | number

}

export function Card({ name, email, department, }: CardProps) {

    return (
        <div className="card">
            <h2>Nome: {name}</h2>
            <p><b>Email:</b>{email}</p>
            <p><b>Departamento:</b>{department}</p>
        </div>
    )

}