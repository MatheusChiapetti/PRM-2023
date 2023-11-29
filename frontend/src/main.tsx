import ReactDOM from 'react-dom/client'
import App from './App'

import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import { TopicContextProvider } from './contexts/TopicContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <AuthContextProvider>
      <TopicContextProvider>
        <App />
      </TopicContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
)