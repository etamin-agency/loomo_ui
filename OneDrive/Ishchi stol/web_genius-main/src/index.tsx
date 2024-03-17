import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Routes from 'routes/routes';
 
import 'assets/styles/tailwind.css';
import { App } from 'pages';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <BrowserRouter>
  <div className='flex'>
    <App/>
    <Routes/>
  </div>
    
  </BrowserRouter>
);
