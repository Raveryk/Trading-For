import { Link } from "react-router-dom";

function Header() {
    return(
        <>
            <Link to="/home">
            <h2 className="nav-title">Trading For</h2>
          </Link>
        </>
    )
}

export default Header