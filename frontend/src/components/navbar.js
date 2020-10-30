import Navbar from 'react-bootstrap/Navbar'

export default function TopNavbar() {
    return (
        <Navbar bg="dark" variant="dark" className="mb-5">
            <Navbar.Brand href="#home">
                <img
                    alt=""
                    src="logo192.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                Croppy
            </Navbar.Brand>
        </Navbar>
    )
}