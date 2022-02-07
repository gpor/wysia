import Element from './editor/Element';

function Editor() {
  const tabNext = () => {
    console.log('tabNext')
  }
  return (
    <div className="editor">
      <div className="-input-container">
        <Element
          value="Header"
          tagName="h2"
          tabNext={tabNext}
          isFocused={false}
        />
        <Element
          value=""
          tagName="h3"
          tabNext={tabNext}
          isFocused={true}
        />
        <Element
          value=""
          tagName="p"
          tabNext={tabNext}
          isFocused={false}
        />
      </div>
    </div>
  );
}
  
export default Editor;
  