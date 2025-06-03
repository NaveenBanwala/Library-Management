
function Login(){
    const handleOnLoginSubmit =()=>{
        return null;
    }
    return (
    <>
    <form onSubmit={handleOnLoginSubmit} className="login-container">
        <h2>Login Page </h2>
        <input type="text" placeholder="Enter your email/username."></input>
        <input type="password" placeholder="Enter your password."></input>
        <button type="submit" className=" button-style">Login</button>
    </form>

    </>
    );
}
export default Login;