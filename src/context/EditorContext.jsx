import { createContext, useReducer } from 'react'
import editorReducer from './EditorReducer'
import Elements from "../model/Elements" /* todo - here or reducer? */

const EditorContext = createContext()

const elementsTable = new Elements
console.log('in EditorContext.jsx elementsTable', elementsTable)

// eslint-disable-next-line react/prop-types
export const EditorProvider = ({ children }) => {
  const initialState = {
    elementsTable,
    elements: [],
  }

  const [state, dispatch] = useReducer(editorReducer, initialState)

  return (
    <EditorContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </EditorContext.Provider>
  )
}

export default EditorContext
