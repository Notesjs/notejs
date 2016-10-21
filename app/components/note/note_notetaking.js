import React from 'react'
import ReactDOM from 'react-dom'
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw} from 'draft-js'
import styles from './style.css'

class MyEditor extends React.Component {
  constructor (props) {
    super(props)
    this.state = { value: '', editorState: EditorState.createEmpty() }
    this.onChange = (editorState) => this.setState({editorState})
  }
  _createContent () {
    let content = convertToRaw(this.state.editorState.getCurrentContent())
    console.log(content)
  }
  _onBoldClick () {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
  }
  _onUnderlineClick () {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'))
  }
  _onItalicClick () {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'))
  }
  render () {
    return (
      <div id='content'>
      <h1>Notejs</h1>
      <div id='editor'>
      <button onClick={this._onBoldClick.bind(this)}>Bold</button>
      <button onClick={this._onUnderlineClick.bind(this)}>Underline</button>
      <button onClick={this._onItalicClick.bind(this)}>Italic</button>
      <button>Code Block</button>
      <Editor editorState={this.state.editorState} onChange={this.onChange}>
      {this.props.noteData}
      </Editor>
      <button onClick={this._createContent.bind(this)}>Log content</button>
      </div>
      </div>
    )
  }
}

export default MyEditor
