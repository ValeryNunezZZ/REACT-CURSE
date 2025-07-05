import { NavLink } from "react-router";

export function NavBar(){
    return(
        <nav>
            <NavLink to="/" end>
                Home
            </NavLink>

            <NavLink to="/citas" end>
                Citas
            </NavLink>
{/* 
            <NavLink to="*" end>
                Error
            </NavLink> */}
        </nav>
    );
}