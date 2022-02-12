import Element from './editor/Element';

function Editor() {
  const toNext = () => {
    console.log('toNext')
  }
  const insertBeneath = ({left, right}) => {
    console.log('insertBeneath', left, right)
  }
  return (
    <div className="editor">
      <div className="-input-container">
        <Element
          value="Header"
          tagName="h2"
          toNext={toNext}
          insertBeneath={insertBeneath}
          isFocused={false}
        />
        <Element
          value="one <b>two <i>thr four</i> five</b> six"
          tagName="h3"
          toNext={toNext}
          insertBeneath={insertBeneath}
          isFocused={true}
        />
        <Element
          value=""
          tagName="p"
          toNext={toNext}
          insertBeneath={insertBeneath}
          isFocused={false}
        />
      </div>
    </div>
  );
}
  
export default Editor;
  