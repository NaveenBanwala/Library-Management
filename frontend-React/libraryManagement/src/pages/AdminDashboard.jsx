function AdminDashboard(){
    return (
    <>
    <div className="admin-dashboard">

    {/* first */}
    <div class="card shadow-sm inner-items" style={{height:"200px" ,width:"250px"}}> 
            <p class="card-text">Registered Users</p> 
            <div class="btn-group"> 
                <button type="button" class="btn btn-sm btn-outline-secondary">View</button> 
                <button type="button" class="btn btn-sm btn-outline-secondary">
                Edit
                </button> 
            </div> 
            </div>
            
            {/* second */}
            <div class="card shadow-sm inner-items" style={{height:"200px" ,width:"250px"}}> 
            <p class="card-text">Handle Users</p>  
            <div class="btn-group"> 
                <button type="button" class="btn btn-sm btn-outline-secondary">View</button> 
                <button type="button" class="btn btn-sm btn-outline-secondary">
                Edit
                </button> 
            </div> 
            </div> 

            {/* Third */}
            <div class="card shadow-sm inner-items" style={{height:"200px" ,width:"250px"}}> 
            <p class="card-text">Add/Remove Book</p> 
            <div class="btn-group"> 
                <button type="button" class="btn btn-sm btn-outline-secondary">View</button> 
                <button type="button" class="btn btn-sm btn-outline-secondary">
                Edit
                </button> 
            </div>  
            </div>

            {/* Fourth */}
            <div class="card shadow-sm inner-items" style={{height:"200px" ,width:"250px"}}> 
            <p class="card-text">Issued books to Users</p> 
            <div class="btn-group"> 
                <button type="button" class="btn btn-sm btn-outline-secondary">View</button> 
                <button type="button" class="btn btn-sm btn-outline-secondary">
                Edit
                </button> 
            </div> 
            </div>

            {/* Fifth */}

            <div class="card shadow-sm inner-items" style={{height:"200px" ,width:"250px"}}> 
            <p class="card-text">All Book</p> 
            <div class="btn-group"> 
                <button type="button" class="btn btn-sm btn-outline-secondary">View</button> 
                <button type="button" class="btn btn-sm btn-outline-secondary">
                Edit
                </button> 
            </div> 
            </div>

            {/* Sixth */}

            <div class="card shadow-sm inner-items" style={{height:"200px" ,width:"250px"}}> 
            <p class="card-text">Inventory</p> 
            <div class="btn-group"> 
                <button type="button" class="btn btn-sm btn-outline-secondary">View</button> 
                <button type="button" class="btn btn-sm btn-outline-secondary">
                Edit
                </button> 
            </div> 
            </div> 

            </div>

    </>
    );

}

export default AdminDashboard;