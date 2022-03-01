import { createContext, useReducer } from 'react'
import editorReducer from './EditorReducer'
import ElementsTable from "../model/Elements"
import PropTypes from 'prop-types';

const EditorContext = createContext()

export const EditorProvider = ({ children }) => {
  const initialState = {
    elementsTable: new ElementsTable,
    elements: [],
    caretX: null,
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

EditorProvider.propTypes = {
  children: PropTypes.node.isRequired,
}



export default EditorContext
