import Element from './editor/Element';

function Editor() {
    const tabNext = () => {
      console.log('tabNext')
    }
    return (
      <div className="editor">
        <Element
            value="default"
            tagName="p"
            tabNext={tabNext}
        />
      </div>
    );
  }
  
  export default Editor;
  