const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;
import { BookApp } from './pages/BookApp.jsx';
import { Home } from './pages/Home.jsx';
import { About } from './pages/About.jsx';
import { AppHeader } from './cmps/Header.jsx';
import { BookDetails } from './pages/BookDetails.jsx';
import { UserMsg } from './cmps/UserMsg.jsx';

export function App() {
    return (
        <Router>
            <header>
                <AppHeader />
            </header>

            <UserMsg />

            <main className='app'>
                <Switch>
                    {/* <Route path="/book/edit/:bookId?" component={BookEdit} /> */}
                    <Route path='/book/:bookId' component={BookDetails} />
                    <Route path='/book' component={BookApp} />
                    <Route path='/about' component={About} />
                    <Route path='/' component={Home} />
                </Switch>
            </main>
        </Router>
    );
}
