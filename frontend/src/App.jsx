import './App.css';
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Features from "./components/Features/Features";
import { data as movieData } from './utils/movieData';
import { data as musicData } from './utils/musicData';
import Values from './components/Values/Values';
import Reasons from './components/Reasons/Reasons';
import Footer from './components/Footer/Footer';
import { Routes, Route } from "react-router-dom";
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Appheader from './components/Header/Appheader';
import Appfooter from './components/Footer/Appfooter';
import Moviecontent from './components/Movies/MovieContent/Moviecontent';
import Musiccontent from './components/Music/Muisccontent/Musiccontent';
import Downloadcontent from './components/Content/Downloadcontent';
import Accountcontent from './components/Content/Accountcontent';
import Albumlist from './components/Music/Albumcontent/Albumlist';
import Songheader from './components/Header/Songheader';
import Moviegenre from './components/Movies/MovieContent/Moviegenre';
import Music from './components/Music/Music';
import Artist from './components/Music/Albumcontent/Artist';
import Downloadheader from './components/Header/Downloadheader';
import Accountheader from './components/Header/Accountheader';
import Topartistsong from './components/Music/Muisccontent/Topartistsong';
import Card from './components/Movies/MovieContent/Card';

function Home() {
  return (
    <>
      <div className='hero'>
        <Header />
        <Hero />
      </div>
       <Card title='Top Rated' genre='top_rated' />
      <Topartistsong />
      <Reasons />
      <Values />
      <Footer />
    </>
  );
}

function Signpage() {
  return (
    <>
      <div className='hero'>
        <Header />
        <Signup />
      </div>
    </>
  );
}

function Loginpage() {
  return (
    <>
      <div className='hero'>
        <Header />
        <Login />
      </div>
    </>
  );
}

function Moviepage() {
  return (
    <div className='flex flex-col min-h-screen'>
    <div className='fixed top-0 left-0 right-0 z-50 '>
      <Appheader title={"Movies"}/>
    </div>

    <main className='flex-grow mt-[65px] mb-[55px]'>
      <Moviecontent />
    </main>

    <div className='fixed bottom-0 left-0 right-0 z-50'>
      <Appfooter />
    </div>
  </div>
  );
}

function Moviegenrepage() {
  return (
    <div className='flex flex-col min-h-screen'>
    <div className='fixed top-0 left-0 right-0 z-50 '>
      <Appheader title={"Movies"}/>
    </div>

    <main className='flex-grow mt-[65px] mb-[55px]'>
      <Moviegenre />
    </main>

    <div className='fixed bottom-0 left-0 right-0 z-50'>
      <Appfooter />
    </div>
  </div>
  );
}
function Musicpage() {
  return (
    <div className='flex flex-col min-h-screen'>
    <div className='fixed top-0 left-0 right-0 z-50 '>
      <Songheader title={"Music"}/>
    </div>

    <main className='flex-grow mt-[65px] mb-[55px] bg-black'>
      <Music />
    </main>

    <div className='fixed bottom-0 left-0 right-0 z-50'>
      <Appfooter />
    </div>
  </div>
  );
}
function Downloadpage() {
  return (
    <div className='flex flex-col min-h-screen'>
    <div className='fixed top-0 left-0 right-0 z-50 '>
      <Downloadheader title={"Movies,Music"} />
    </div>

    <main className='flex-grow mt-[65px] mb-[55px] bg-black'>
      <Downloadcontent />
    </main>

    <div className='fixed bottom-0 left-0 right-0 z-50'>
      <Appfooter />
    </div>
  </div>
  );
}function Accountpage() {
  return (
    <div className='flex flex-col min-h-screen'>
    <div className='fixed top-0 left-0 right-0 z-50 '>
      <Accountheader />
    </div>

    <main className='flex-grow mt-[65px] mb-[55px] bg-black'>
      <Accountcontent />
    </main>

    <div className='fixed bottom-0 left-0 right-0 z-50'>
      <Appfooter />
    </div>
  </div>
  );
}


function Songpage(){
  return (
    <div className='flex flex-col min-h-screen'>
    <div className='fixed top-0 left-0 right-0 z-50 '>
      <Songheader />
    </div>

    <main className='flex-grow mt-[65px] mb-[55px]'>
      <Albumlist />
    </main>

    <div className='fixed bottom-0 left-0 right-0 z-50'>
      <Appfooter />
    </div>
  </div>
  );
}

function Artistpage(){
  return (
    <div className='flex flex-col min-h-screen'>
    <div className='fixed top-0 left-0 right-0 z-50 '>
      <Songheader />
    </div>

    <main className='flex-grow mt-[65px] mb-[55px]'>
      <Artist />
    </main>

    <div className='fixed bottom-0 left-0 right-0 z-50'>
      <Appfooter />
    </div>
  </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signpage />} />
      <Route path="/login" element={<Loginpage />} />
      <Route path="/movies" element={<Moviepage />} />
      <Route path='/:menuType-genre-based/:genreId' element={<Moviegenrepage />} />
      <Route path="/music" element={<Musicpage />} />
      <Route path="/artist/:artist" element={<Artistpage />} />
      <Route path="/downloads" element={<Downloadpage />} />
      <Route path="/user" element={<Accountpage />} />
      <Route path="/songs/:albumName" element={<Songpage />} />

    </Routes>
  );
}

export default App;
