import './App.css';

import Home from './scenes/home';
import About from './scenes/about';
import Redirect from './scenes/redirect';
import NotFound from './scenes/notFound';

import Navbar from './scenes/global/Navbar';

import TopTensOverview from './scenes/top-ten';
import RecentlyPlayedOverview from './scenes/recently-played';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TimeRangeProvider } from './contexts/TimeRangeContext';

function App() {
	const client = new QueryClient()
	const isHomePage = window.location.pathname === '/home';

  	return (
		<div className="App">
			<main className="container">
				<BrowserRouter>
					<QueryClientProvider client={client}>
					<TimeRangeProvider>
					{isHomePage ? null : <Navbar />}
					<Routes>
						<Route path="/" element={<Navigate to="/home" />} />
						<Route exact path="/home" element={<Home />} />
						<Route exact path="/about" element={<About />} />
						<Route exact path='/redirect' element={<Redirect/>} />
						{/* <Route exact path='/overview' element={<Overview />} /> */}
						<Route exact path='/top-ten' element={<TopTensOverview />} />
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