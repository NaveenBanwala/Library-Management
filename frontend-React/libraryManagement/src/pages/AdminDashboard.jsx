import {Link} from "react-router-dom";

function AdminDashboard(){
    return (
    <>
    <div className="admin-dashboard">

    {/* first */}
    <div class="card shadow-sm inner-items" style={{height:"200px" ,width:"250px"}}> 
            <p class="card-text">Registered Users</p> 
            <div class="btn-group"> 
                <Link to="/view" className="btn btn-sm btn-outline-secondary" role="button">
    View
  </Link>
  <Link to="/edit" className="btn btn-sm btn-outline-secondary" role="button">
    Edit
  </Link> 
            </div> 
            </div>
            
            {/* second */}
            <div class="card shadow-sm inner-items" style={{height:"200px" ,width:"250px"}}> 
            <p class="card-text">Handle Users</p>  
            <div class="btn-group"> 
                <Link to="/view" className="btn btn-sm btn-outline-secondary" role="button">
    View
  </Link>
  <Link to="/edit" className="btn btn-sm btn-outline-secondary" role="button">
    Edit
  </Link> 
            </div> 
            </div> 

            {/* Third */}
            <div class="card shadow-sm inner-items" style={{height:"200px" ,width:"250px"}}> 
            <p class="card-text">Add/Remove Book</p> 
            <div class="btn-group"> 
                <Link to="/view" className="btn btn-sm btn-outline-secondary" role="button">
    View
  </Link>
  <Link to="/edit" className="btn btn-sm btn-outline-secondary" role="button">
    Edit
  </Link> 
            </div>  
            </div>

            {/* Fourth */}
            <div class="card shadow-sm inner-items" style={{height:"200px" ,width:"250px"}}> 
            <p class="card-text">Issued books to Users</p> 
           
            <div class="btn-group"> 
             <Link to="/view" className="btn btn-sm btn-outline-secondary" role="button">
                  View
               </Link>
             <Link to="/edit" className="btn btn-sm btn-outline-secondary" role="button">
                 Edit
              </Link>
            </div> 
            </div>

            {/* Fifth */}

            <div class="card shadow-sm inner-items" style={{height:"200px" ,width:"250px"}}> 
            <p class="card-text">All Book</p> 
            <div class="btn-group"> 
               <Link to="/view" className="btn btn-sm btn-outline-secondary" role="button">
    View
  </Link>
  <Link to="/edit" className="btn btn-sm btn-outline-secondary" role="button">
    Edit
  </Link>
            </div> 
            </div>

            {/* Sixth */}

            <div class="card shadow-sm inner-items" style={{height:"200px" ,width:"250px"}}> 
            <p class="card-text">Inventory</p> 
            <div class="btn-group">  
                <Link to="/view" className="btn btn-sm               btn-outline-secondary" role="button">
                 View
                </Link>
              <Link to="/edit" className="btn btn-sm btn-outline-secondary" role="button">
                 Edit
               </Link>
                
            </div> 
            </div> 

            </div>

    </>
    );

}

export default AdminDashboard;