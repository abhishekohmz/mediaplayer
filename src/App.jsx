
import './App.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Landing from './pages/Landing';
import Home from './pages/Home';
import WatchHistory from './pages/WatchHistory';
import { Route, Routes } from 'react-router-dom';
import Header from './component/Header';
import Footer from './component/Footer';


function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/watchHistory' element={<WatchHistory/>}/>
      </Routes>
      <Footer/>
     
    </div>
  );
}

export default App;
