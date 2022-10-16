import {
  Outlet,
  ReactLocation,
  Router,
} from "@tanstack/react-location";
import Navbar from './Components/Navbar/Navbar';
import Homepage from './Components/Homepage/Homepage';
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup';
import Courses from './Components/Couses/Courses';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import CertificationsGuest from './Components/Certifications/CertificationsGuest';
import Profile from "./Components/Profile/Profile";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity // czas w ms po jakim dane są przestarzałe,
    },
  },
});

const routes = [
  {
    path: '/', element: <div><Navbar></Navbar> <Homepage></Homepage></div>
  },
  {
    path: '/signin', element: <div><Signin></Signin></div>
  },
  {
    path: '/signup', element: <div><Signup></Signup></div>
  },
  {
    path: '/courses', element: <div><Navbar></Navbar><Courses></Courses></div>
  },
  {
    path: '/certificationsGuest', element: <div><Navbar></Navbar><CertificationsGuest></CertificationsGuest></div>
  },
  {
    path: '/search/path', element: <div><Navbar></Navbar><Courses></Courses></div>
  },
  {
    path: '/profile', element: <div><Navbar></Navbar><Profile></Profile></div>
  }
]

const location = new ReactLocation();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Router
        location={location}
        routes={routes}
        >
        
        <Outlet />
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
