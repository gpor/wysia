import './sass/app.scss';
import Editor from './components/Editor';
import { EditorProvider } from './context/EditorContext';

function App() {
  return (
    <EditorProvider>
      <div className="App">
        <div className="center-frame">
          {/* <Foo /> */}
          <Editor />
        </div>
      </div>
    </EditorProvider>
  );
}

export default App;
