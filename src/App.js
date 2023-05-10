/*import "./App.css";
import Login from "./Login";
import UserDashboard from "./UserDashBoard";
import Error from "./Error";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  //return <UserDashboard userId={1} />;
  return (
    <BrowserRouter>
      <Routes>
       
        <Route path="/login" element={<Login />} />
        <Route path="/users/:userid" element={<div>users</div>}>
          
          <Route path="*" element={<div>user *</div>} />
          <Route path="info" element={<div>info</div>} />
          <Route path="todos/:id" element={<div>todos</div>} />
          <Route path="posts/:id" element={<div>posts</div>} />
          <Route path="albums/:id" element={<div>albums</div>} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;*/

import "./App.css";
import Login from "./Login";
import UserDashboard from "./UserDashBoard";
import Error from "./Error";
import Users from "./Users";
import Posts from "./Posts";
import Todos from "./Todos";
import Info from "./Info";
import { BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/users/:userid" element={<Users />}>
          <Route path="info" element={<Info />} />
          <Route path="todos/:id?" element={<Todos />} />
          <Route path="posts/:id?" element={<Posts />} />
          <Route path="albums/:id?" element={<div>albums</div>} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
