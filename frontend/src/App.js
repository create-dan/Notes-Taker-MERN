import "./App.css";
import Header from './components/Header/header';
import LandingPage from './screens/LandingPage/LandingPage';
import MyNotes from "./screens/MyNotes/MyNotes";
import Footer from './components/Footer/footer';


import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>

      <Routes>
        <Route path="/" element={<LandingPage/>} exact  />
        <Route path="/login" element={<LoginScreen/>} exact  />
        <Route path="/register" element={<RegisterScreen/>} exact  />
        <Route path="/mynotes" element={<MyNotes/>} exact />
        </Routes>
      </main> 

      <Footer />
    </BrowserRouter>
  );
}

export default App;
