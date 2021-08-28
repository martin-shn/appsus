const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;
import { Home } from './js/pages/app-home.jsx';
import { About } from './js/pages/app-about.jsx';
import { AppHeader } from './js/cmps/AppHeader.jsx';
import { EmailApp } from './js/apps/email/pages/EmailApp.jsx';
import { MissKeep } from './js/apps/keep/pages/note-index.jsx';
import { MissBooks } from './js/apps/book/pages/MissBooks.jsx';
import { BookDetails } from './js/apps/book/cmps/BookDetails.jsx';
import { UserMsg } from './js/cmps/user-msg.jsx';
import { EmailDetails } from './js/apps/email/cmps/email-details.jsx';
// import { EmailHeader } from './cmps/email-header.jsx';
import { EditMail } from './js/apps/email/cmps/edit-mail.jsx';

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
                    <Route path='/email/edit/:emailId' component={EditMail} />
                    <Route path='/email/read/:emailId' component={EmailDetails} />
                    <Route path='/email/:folder?' component={EmailApp} />
                    <Route path='/note' component={MissKeep} />
                    <Route path='/book' component={MissBooks} />
                    <Route path='/about' component={About} />
                    <Route path='/' component={Home} />
                </Switch>
            </main>
        </Router>
    );
}
