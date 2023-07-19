import './App.css';

import Home from './scenes/home';
import Spotify from './scenes/spotify';
import Callback from './scenes/callback';
import NotFound from './scenes/notFound';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {

  	return (
		<div className="App" style={{ fontFamily: 'DM Sans', color: 'white' }}>
			<div className="container">

				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Navigate to="/home" />} />
						<Route exact path="/home" element={<Home />} />
						<Route exact path="/spotify-overview" element={<Spotify />} />
						<Route exact path='/redirect' element={<Callback/>} />
						<Route exact path="*" element={<NotFound />} />
					</Routes>
				</BrowserRouter>

			</div>
		</div>
  	);
}

export default App;