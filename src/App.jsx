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
import Profile from "./Components/Profile/Profile";
import Paths from "./Components/Paths/Paths";
import PathsGuest from "./Components/Paths/PathsGuest";
import AddCourse from "./Components/Couses/AddCourse";


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
    path: "/",
    element: (
      <div>
        <Navbar></Navbar> 
        <Homepage></Homepage>
      </div>
    ),
  },
  {
    path: "signin",
    element: (
      <div>
        <Signin></Signin>
      </div>
    ),
  },
  {
    path: "signup",
    element: (
      <div>
        <Signup></Signup>
      </div>
    ),
  },
  {
    path: "pathsGuest",
    element: (
      <div>
        <Navbar></Navbar>
        <PathsGuest></PathsGuest>
      </div>
    ),
  },
  {
    path: "paths",
    children: [
      {
        path: "/",
        element: (
          <div>
            <Navbar></Navbar>
            <Paths></Paths>
          </div>
        ),
      },
      {
        path: ":id",
        element: () => import("./Pages/PathPage.jsx").then(({ PathPage }) => <PathPage />),
        },
    ],
  },
 {
    path: "course",
    children: [
      {
        path: "/",
        element: (
          <div>
            <Navbar></Navbar>
            <Courses></Courses>
          </div>
        ),
      },
      {
        path: "search",
        children: [
          {
            path: ":title",
            element: () =>
              import("./Pages/CoursesPage").then(({ CoursesPage }) => (
                <CoursesPage />
              )),
          },
        ],
      },
      {
        path: ":id",
        element: () =>
          import("./Pages/CoursePage").then(({ CoursePage }) => <CoursePage />),
      },
    ],
  },
  {
    path: "search/path",
    element: (
      <div>
        <Navbar></Navbar>
        <Courses></Courses>
      </div>
    ),
  },
  {
    path: "profile",
    element: (
      <div>
        <Navbar></Navbar>
        <Profile></Profile>
      </div>
    ),
  },
  {
    path: "add_course",
    element: (
      <div>
        <Navbar></Navbar>
        <AddCourse></AddCourse>
      </div>
    ),
  },
];

const location = new ReactLocation();

function App() {

  return (
      <Router
          location={location}
          routes={routes}
          >
      <QueryClientProvider client={queryClient}>
          
          <ReactQueryDevtools initialIsOpen={false} />
          <Outlet />
      </QueryClientProvider>
        </Router>
  )
}

export default App
