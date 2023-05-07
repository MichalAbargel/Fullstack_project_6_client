import './App.css';
import Login from './Login';

function App() {
  return (
    <Login onLogin={(u)=>alert(u)}/>
  );
}

export default App;
