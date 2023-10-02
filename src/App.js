import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Root from './components/Root';
import "./style.css"
import HomePage from './pages/HomePage';
import TransactionPage from './pages/TransactionPage';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root/>}>
      <Route index element={<HomePage/>}/>
      <Route path='history'/>
      <Route path='expenses'/>
      <Route path='transaction' element={<TransactionPage/>}/>
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
