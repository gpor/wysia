import { useContext, useEffect, useState } from 'react';
import EditorContext from '../context/EditorContext';
import Element from './editor/Element';

function Editor() {
  const { elements, elementsTable, dispatch } = useContext(EditorContext)
  
  useEffect(() => {
    dispatch({ type: 'SET_ELEMENTS', payload: elementsTable.dummyElements() })
  }, [])
  /*
  todo
  replace all below (was using Content instance)
  with elements above
  in EditorReducers, use new Elements table to instantiate Element objects
   - use elementsTable.dummyElements()
  */
  // const [content, setContent] = useState(initContent(1))
  const toNext = () => {
    console.log('toNext') /* todo */
  }
  return (
    <div className="flex-end">
      <div className="editor">
        <div className="-input-container">
          {elements.map((element, i) => (
            <Element
              key={element.id}
              elI={i}
              toNext={toNext}
              isFocused={element.isFocused}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
  
export default Editor;
  