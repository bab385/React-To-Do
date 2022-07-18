import { HashRouter as Router, Route, Routes } from 'react-router-dom';
//changed the above from BrowserRouter to HashRouter to make routes work with Django but it makes the url have a /#/ in it. Can make routes in Django.
import './App.css';
import Header from './components/header';
import NotesListPage from "./pages/NotesListPage";
import NotePage from './pages/NotePage';

function App() {
  return (
    <Router>
      <div className="containter dark">
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" exact element={<NotesListPage />}/>
            <Route path="/note/:id" element={<NotePage />}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;