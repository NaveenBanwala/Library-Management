
import { Link } from 'react-router-dom';

function NavbarH(){
    return (
    <>
    <header class="p-3 text-bg-dark navbar"> 
        <div class="container"> 
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"> 
                <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"> 
                <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
                    <use xlink:href="#bootstrap"></use></svg> </a> 
                    <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"> 
    <li><Link to="/home" class="nav-link px-2 text-secondary">Home</Link> </li>
    <li><Link to="#" class="nav-link px-2 text-white">Features</Link></li> 
    <li><Link to="#" class="nav-link px-2 text-white">Book Pricing</Link></li> 
    <li><Link to="#" class="nav-link px-2 text-white">FAQs</Link></li> 
    <li><Link to="#" class="nav-link px-2 text-white">About</Link></li> 
    </ul> 
    
    <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search"> 
        <input type="search" class="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search"/> </form> 
    <button style={{padding:"5px" , borderRadius:"10px",marginRight:"5px"}}>Search</button>
    <div class="text-end"> 
        <Link to="/login" className="btn btn-primary">Login</Link>
        <Link to="/register" class="btn btn-warning">Sign-up</Link>
        </div> 
        </div> 
        </div> 
        </header>
    </>
    );
}
export default NavbarH;