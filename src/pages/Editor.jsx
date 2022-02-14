import { useState } from 'react';
import { initContent } from '../lib/content';
import { tagNames } from '../lib/elements.js'
import Element from './editor/Element';

function Editor() {
  const [content, setContent] = useState(initContent(1))
  const toNext = () => {
    console.log('toNext') /* todo */
  }
  const insertBeneath = (elementI, tagI, htmlLeft, htmlRight) => {
    setContent(content => {
      return content.insertElement(elementI, htmlLeft, {
        tagName: tagNames[tagI],
        value: htmlRight,
        isFocused: true,
      })
    })
  }
  return (
    <div className="editor">
      <div className="-input-container">
        {content.elements.map((element, i) => (
          <Element
            key={element.id}
            elementI={i}
            value={element.value}
            tagName={element.tagName}
            toNext={toNext}
            insertBeneath={insertBeneath}
            isFocused={element.isFocused}
          />
        ))}
      </div>
    </div>
  );
}
  
export default Editor;
  