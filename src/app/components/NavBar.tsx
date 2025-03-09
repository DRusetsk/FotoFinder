export default function NavBar() {
    return (
        <div>
            <div id="header-nav">
                <div className="container">
                    <div className="brand">
                        <a href="/"><h1>FotoFinder</h1></a>
                    </div>
                    <a href="#menu" className="menu-link">
                        <span className="bar1"></span>
                        <span className="bar2"></span>
                        <span className="bar3"></span>
                    </a>

                    <nav id="menu" role="navigation">
                        <ul>
                            <li><a href="#"></a>Signup</li>
                            <li><a></a></li>
                            <li><a href="#"></a>Login</li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}