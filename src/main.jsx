import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router'
import NavRoutes from './NavRoutes.jsx'
import Navbar from './components/Navbar.jsx'

import SuperTokens from 'supertokens-web-js';
import Session from 'supertokens-web-js/recipe/session';
import EmailPassword from 'supertokens-web-js/recipe/emailpassword'

SuperTokens.init({
    appInfo: {
        apiDomain: import.meta.env.VITE_FINANCE_API_URL,
        apiBasePath: "/auth",
        appName: "finance-harmertech"
    },
    recipeList: [
        Session.init(),
        EmailPassword.init(),
    ],
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <NavRoutes />
    </BrowserRouter>
  </StrictMode>,
)
