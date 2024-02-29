
import { Route, BrowserRouter as Router, Routes} from "react-router-dom";
import CreateTache from 'component/tache/CreateTache';
import UpdateTache from 'component/tache/UpdateTache';
import Home from 'pages/Home';

function App() {
  return (
    <div className="bg-sky-100 h-[200vh]">
         <Router>
          <Routes>
          <Route exact  path="/" element={<Home/>}/>
          <Route exact  path= '/createTache' element={<CreateTache/>}/>
          <Route exact  path= '/updateTache/:id' element={<UpdateTache/>}/>
          </Routes>
          </Router>
      </div>
  );
}

export default App;
