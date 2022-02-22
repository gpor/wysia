import { useContext, useEffect, useState } from 'react';
import EditorContext from '../context/EditorContext';
import { tagNames } from '../lib/elements.js'
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
  const insertBeneath = (elementI, tagI, htmlLeft, htmlRight, hasRight) => {
    console.log('tagI', tagI)
    console.log('hasRight', hasRight)
    console.log('(tagI && ! hasRight)', (tagI && ! hasRight))
    // setContent(content => {
    //   return content.insertElement(elementI, htmlLeft, {
    //     tagName: (tagI && ! hasRight) ? tagNames[tagI - 1] : tagNames[tagI],
    //     value: htmlRight,
    //     isFocused: true,
    //   })
    // })
  }
  return (
    <div className="flex-end">
      <div className="editor">
        <div className="-input-container">
          {elements.map((element, i) => (
            <Element
              key={element.id}
              elementI={i}
              element={element}
              content={element.content}
              tagName={element.tagName}
              toNext={toNext}
              insertBeneath={insertBeneath}
              isFocused={element.isFocused}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
  
export default Editor;
  