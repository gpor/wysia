import { useState } from 'react';
import { initContent } from '../lib/content';
import { tagNames } from '../lib/elements.js'
import Element from './editor/Element';

function Editor() {
  const [content, setContent] = useState(initContent(1))
  const toNext = () => {
    console.log('toNext') /* todo */
  }
  const insertBeneath = (elementI, tagI, htmlLeft, htmlRight, hasRight) => {
    console.log('tagI', tagI)
    console.log('hasRight', hasRight)
    console.log('(tagI && ! hasRight)', (tagI && ! hasRight))
    setContent(content => {
      return content.insertElement(elementI, htmlLeft, {
        tagName: (tagI && ! hasRight) ? tagNames[tagI - 1] : tagNames[tagI],
        value: htmlRight,
        isFocused: true,
      })
    })
  }
  return (
    <div className="flex-end">
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
    </div>
  );
}
  
export default Editor;
  