const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;
import { Home } from './js/pages/app-home.jsx';
import { About } from './js/pages/app-about.jsx';
import { AppHeader } from './js/cmps/AppHeader.jsx';
// import { MisterEmail } from './js/pages/MisterEmail.jsx';
// import { MissKeep } from './js/pages/MissKeep.jsx';
import { MissBooks } from './js/pages/MissBooks.jsx';
import { BookDetails } from './js/apps/book/cmps/BookDetails.jsx';
import { UserMsg } from './js/cmps/user-msg.jsx';

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
                    {/* <Route path='/mail' component={MisterEmail} /> */}
                    {/* <Route path='/note' component={MissKeep} /> */}
                    <Route path='/book' component={MissBooks} />
                    <Route path='/about' component={About} />
                    <Route path='/' component={Home} />
                </Switch>
            </main>
        </Router>
    );
}
