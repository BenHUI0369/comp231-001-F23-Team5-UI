const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Patient Record</h1>
            <div className="links">
                <a href="/">Home</a>
                <a href="/Login" style={{
                    color: "white",
                    backgroundColor: "#f1356d",
                    borderRadius: "8px"
                }}>Login</a>
            </div>
        </nav>
    );
}
 
export default Navbar;