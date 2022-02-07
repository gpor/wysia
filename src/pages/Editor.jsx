import Element from './editor/Element';

function Editor() {
  const tabNext = () => {
    console.log('tabNext')
  }
  return (
    <div className="editor">
      <div className="-input-container">
        <Element
          value="default"
          tagName="p"
          tabNext={tabNext}
          isFocused={true}
        />
      </div>
    </div>
  );
}
  
export default Editor;
  