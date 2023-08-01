import { Nav, NavLink, Bars, NavMenu } from './NavbarElements';
import Stack from "@mui/material/Stack";
import LogoutButton from '../../components/FunctionalComponents/LogoutButton';

const Navbar = () => {

    return ( 
        <Nav>
            <Bars />
            <NavMenu>
                <h2>Vibeify</h2> 
                <Stack direction="row">
                    <NavLink to='/welcome' >
                        Welcome
                    </NavLink>
                    <NavLink to='/recently-played' >
                        Recently Played
                    </NavLink>
                    <NavLink to='/top-ten' >
                        Top 10s
                    </NavLink>
                    <NavLink to='/recommendations' >
                        Recommendations
                    </NavLink>
                    <NavLink to='/about' >
                        About
                    </NavLink>
                </Stack>
                <LogoutButton />
            </NavMenu>

        </Nav>
    )
}

export default Navbar;