import './style.css';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <Link to="/"><img src={logo} alt='logo streamking' /></Link>

            <div>
                <Link to="/">Filmes em Cartaz</Link>
                <Link to="/favoritos">Favoritos</Link>
            </div>


        </header>
    );
}

export default Header;