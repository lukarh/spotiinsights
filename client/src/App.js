import './App.css';
import './styles/Home.css';
import './styles/Overview.css';

import Home from './scenes/home';
import Redirect from './scenes/redirect';
import NotFound from './scenes/notFound';
import Overview from './scenes/overview';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {

  	return (
		<div className="App">
			<div className="container">

				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Navigate to="/home" />} />
						<Route exact path="/home" element={<Home />} />
						<Route exact path='/redirect' element={<Redirect/>} />
						<Route exact path="*" element={<NotFound />} />
						<Route exact path='/overview' element={<Overview />} />
					</Routes>
				</BrowserRouter>

			</div>
		</div>
  	);
}

export default App;