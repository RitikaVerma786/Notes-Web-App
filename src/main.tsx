import { createRoot } from 'react-dom/client'
import { RouterProvider} from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer } from "react-toastify";
import { Suspense } from 'react';

import "react-toastify/dist/ReactToastify.css";

import './index.css';
import Routes from './routes/routes';
import { NotesProvider } from './contexts/NotesContext';
import { AuthContextProvider } from './contexts/AuthContext';

createRoot(document.getElementById('root')!).render(
   <>
   <ToastContainer theme='colored'autoClose={1500}/>
   <ErrorBoundary fallback={"Something went Wrong"}>
   <Suspense fallback='Loading...'>
   <AuthContextProvider>
   <NotesProvider>
    <RouterProvider router={Routes}/>
   </NotesProvider>
   </AuthContextProvider>
   </Suspense>
   </ErrorBoundary>
   </>
)
