import './sass/app.scss';
import Editable from './pages/Editable';
import Foo from './pages/Foo.jsx'

function App() {
  return (
    <div className="App">
      <header className="center-frame">
        {/* <Foo /> */}
        <Editable
          value="default"
        />
      </header>
    </div>
  );
}

export default App;
