import { useNavigate } from "react-router-dom";
function FirstPage(){
    const navigate = useNavigate();
   
    const loginpage = () => {
        navigate("/login");
    };
    const viewsignup = () => {
        navigate("/signup");
    };
    const viewcustomerpage = () => {
        navigate("/customer");
    };
    const viewadminpage = () => {
        navigate("/admin");
    };
    const goToAddFlights = () => {
        navigate("/addflights");
    };
    const goToViewFlights = () => {
        navigate("/viewflights");
    };
    const goToViewPrice = () => {
        navigate("/ViewPrice");
    };
    const viewaddbooking = () => {
        navigate("/AddBooking");
    };   
     const viewpayment = () => {
        navigate("/Payment");
    };

    return (
        <div>
<h1> page to test all js Components</h1>
        <div>
        <button className="btn btn-success" onClick={loginpage}>  login </button> <br></br>
        <button className="btn btn-success" onClick={viewsignup}>  signup </button> <br></br>
        <button className="btn btn-success" onClick={viewcustomerpage}>  customer </button> <br></br>
        <button className="btn btn-success" onClick={viewadminpage}>  admin </button> <br></br>
        <button className="btn btn-success" onClick={goToAddFlights}>  add flights </button> <br></br>
        <button className="btn btn-success" onClick={goToViewFlights}>  view flights </button> <br></br>
        <button className="btn btn-success" onClick={goToViewPrice}>  view price </button> <br></br>
        <button className="btn btn-success" onClick={viewaddbooking}>  add booking </button> <br></br>
        <button className="btn btn-success" onClick={viewpayment}>  payment </button> <br></br>

        </div>
        </div>
    );
}

export default FirstPage;