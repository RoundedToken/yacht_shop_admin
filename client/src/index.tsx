import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';
import { Home } from './pages/Home.jsx';
import { NotFound } from './pages/_404.jsx';
import './style.css';
import Order from './pages/Order.js';

export function App() {
    return (
        <LocationProvider>
            <Router>
                <Route path="/" component={Home} />
                <Route path="/order/:id" component={Order} />
                <Route default component={NotFound} />
            </Router>
        </LocationProvider>
    );
}

render(<App />, document.getElementById('app'));
