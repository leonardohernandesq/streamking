import { Link } from 'react-router-dom';
import './erro.css'

function Erro() {
    return (
        <div className="notFound">
            <h1>Erro 404</h1>
            <h2>Página não encontrada!</h2>
            <Link to="/"> Veja todo os filmes!</Link>
        </div>
    )
}

export default Erro;