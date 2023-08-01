import './App.css';

import Home from './scenes/home';
import About from './scenes/about';
import Welcome from './scenes/welcome';
import Redirect from './scenes/redirect';
import NotFound from './scenes/notFound';
import Recommendations from './scenes/recommendations';

import Navbar from './scenes/global/Navbar';

import TopTensOverview from './scenes/top-ten';
import RecentlyPlayedOverview from './scenes/recently-played';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TimeRangeProvider } from './contexts/TimeRangeContext';

function App() {
	const client = new QueryClient()
	const navbarPaths = ['/about', '/welcome', '/redirect', '/top-ten', '/recently-played', '/recommendations']

  	return (
		<div className="App">
			<main className="container">
				<BrowserRouter>
					<QueryClientProvider client={client}>
					<TimeRangeProvider>
					{navbarPaths.includes(window.location.pathname) && <Navbar />}
					<Routes>
						<Route path="/" element={<Navigate to="/home" />} />
						<Route exact path="/home" element={<Home />} />
						<Route exact path="/about" element={<About />} />
						<Route exact path='/welcome' element={<Welcome />} />
						<Route exact path='/redirect' element={<Redirect/>} />
						<Route exact path='/top-ten' element={<TopTensOverview />} />
						<Route exact path='/recommendations' element={<Recommendations />} />
						<Route exact path='/recently-played' element={<RecentlyPlayedOverview />} />
						<Route exact path="*" element={<NotFound />} />
					</Routes>
					</TimeRangeProvider>
					</QueryClientProvider>
				</BrowserRouter>
			</main>
		</div>
  	);
}

export default App;