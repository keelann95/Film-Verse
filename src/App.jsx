import Home from './components/Home'
import Tracker from './components/Tracker'

const App = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
      setIsLogin(!isLogin);
  };

  return (
    <>
    {/* <Home /> */}
    <Tracker />
    </>
  )
}

export default App
