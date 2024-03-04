
import { Navigate, Outlet, Route, BrowserRouter as Router, Routes} from "react-router-dom";
import CreateTache from 'component/tache/CreateTache';
import UpdateTache from 'component/tache/UpdateTache';
import Home from 'pages/Home';
import { SignIn, SignUp } from "component/auth";
import PrivateRoutes from "routes/ProtectedRoute";
import ErrorPage from "component/error/ErrorPage";
import ForgotPassword from "component/auth/ForgotPassword";
import ResetPassword from "component/auth/ResetPassword";
import { List, ListItem } from "@mui/material";
import { Draggable, Droppable } from "react-beautiful-dnd";


function App() {
  return(
  <div>

    <Router>
    <Routes>
      <Route element={<PrivateRoutes/>}>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/createTache" element={<CreateTache/>}/>
        <Route exact path ="/updateTache/:id" element={<UpdateTache/>}/>
      </Route>
      <Route exact path="/" element={<SignIn/>}/>
      <Route exact path="/SignUp" element={<SignUp/>}/>
      <Route exact path="/forgotPassword" element={<ForgotPassword/>}/>
      <Route exact path="/resetPassword" element={<ResetPassword/>}/>
      <Route exact path="/*" element={<ErrorPage/>}/>
      </Routes>
    </Router>
  </div>)

  
}

export default App;
 