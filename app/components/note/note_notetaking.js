import React, {Component, PropTypes} from 'react'
import {EditorState, RichUtils, ContentState, createFromBlockArray, contentBlock, convertToRaw, convertFromRaw} from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import createLinkifyPlugin from 'draft-js-linkify-plugin'
import AppBar from 'material-ui/AppBar'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import KeyBinding from 'react-keybinding-component'

const linkifyPlugin = createLinkifyPlugin()

const styleMap = {
  'CODE': {
    color: '#535353',
    background: 'none',
    backgroundColor: '#E4E3E4',
    textShadow: '0 1px rgba(0, 0, 0, 0.3)',
    fontFamily: 'monospace',
    textAlign: 'left',
    margin: 'none',
    padding: '7px',
    borderLeft: 'solid 4px #1EAAF1',
    fontSize: '14px',
    whiteSpace: 'pre',
    width: '100%',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    lineHeight: 2.0,
    hyphens: 'none'
  },
  'H1': {
    fontSize: '45px'
  },
  'H2': {
    fontSize: '35px'
  },
  'H3': {
    fontSize: '25px'
  },
  'P': {
    fontSize: '14px'
  },
  'STRIKETHROUGH': {
    textDecoration: 'line-through'
  },
  'RED': {
    color: '#FC2F35'
  },
  'BLUE': {
    color: '#0B24FB'
  },
  'PURPLE': {
    color: '#7E25FB'
  },
  'GREEN': {
    color: '#21B725'
  },
  'ORANGE': {
    color: '#FD7F24'
  },
  'TEAL': {
    color: '#1DE9B6'
  },
  'CYAN': {
    color: '#00BCD4'
  }
}

class MyEditor extends Component {

  constructor (props) {
    super(props)
    const DBEditorState = convertFromRaw(JSON.parse(this.props.noteData))
    this.state = { editorState: EditorState.createWithContent(DBEditorState) }

    this.onChange = (editorState) => this.setState({editorState})
  }

  handleKeyEvent (e) {
    if (e === 192) {
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'CODE'))
    }
  }

  logContent () {
    // Using this to test keybinding
  }

  _saveContent () {
    let noteId = this.props.idData
    let content = convertToRaw(this.state.editorState.getCurrentContent())
    let saveObj = {
      id: noteId,
      content: content
    }

    this.props.updateNoteData(saveObj)
    this.context.router.push('/folders')
  }
  _deleteNote () {
    let noteId = this.props.idData
    this.props.deleteNoteData(noteId)

    this.context.router.push('/folders')
  }
  _onH1Click () {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'H1'))
  }
  _onH2Click () {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'H2'))
  }
  _onH3Click () {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'H3'))
  }
  _onPClick () {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'P'))
  }
  _onBoldClick () {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
  }
  _onCodeblockClick () {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'CODE'))
  }
  _onUnderlineClick () {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'))
  }
  _onItalicClick () {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'))
  }
  _onStrikethroughClick () {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'STRIKETHROUGH'))
  }
  _onRedClick () {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'RED'))
  }
  _onBlueClick () {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BLUE'))
  }
  _onPurpleClick () {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'PURPLE'))
  }
  _onGreenClick () {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'GREEN'))
  }
  _onOrangeClick () {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ORANGE'))
  }
  _onTealClick () {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'TEAL'))
  }
  _onCyanClick () {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'CYAN'))
  }

  render () {
    return (

      <div>
        <AppBar title='NoteJS' className='noteNavbar' />

        <div id='content' className='noteView'>
          <div id='editor'>

            <div className='stylingDiv'>
              <button className='noteStylingButtons' onClick={this._onH1Click.bind(this)}>H1</button>
              <button className='noteStylingButtons' onClick={this._onH2Click.bind(this)}>H2</button>
              <button className='noteStylingButtons' onClick={this._onH3Click.bind(this)}>H3</button>
              <button className='noteStylingButtons' onClick={this._onPClick.bind(this)}>P</button>
              <button className='noteStylingButtons' onClick={this._onBoldClick.bind(this)}>B</button>
              <button className='noteStylingButtons' onClick={this._onUnderlineClick.bind(this)}>U</button>
              <button className='noteStylingButtons' onClick={this._onItalicClick.bind(this)}>I</button>
              <button className='noteStylingButtons' onClick={this._onStrikethroughClick.bind(this)}>S</button>
              <button className='noteStylingButtons' onClick={this._onCodeblockClick.bind(this)}>Code</button>
              <br />
              <button className='noteColorButtons' onClick={this._onRedClick.bind(this)}><span className='square red' /></button>
              <button className='noteColorButtons' onClick={this._onBlueClick.bind(this)}><span className='square blue' /></button>
              <button className='noteColorButtons' onClick={this._onPurpleClick.bind(this)}><span className='square violet' /></button>
              <button className='noteColorButtons' onClick={this._onGreenClick.bind(this)}><span className='square green' /></button>
              <button className='noteColorButtons' onClick={this._onOrangeClick.bind(this)}><span className='square orange' /></button>
              <button className='noteColorButtons' onClick={this._onTealClick.bind(this)}><span className='square teal' /></button>
              <button className='noteColorButtons' onClick={this._onCyanClick.bind(this)}><span className='square cyan' /></button>
            </div>
            <br /><br />

            <Editor placeholder="What's on your mind?" className='editNoteBlock' editorState={this.state.editorState} onChange={this.onChange} customStyleMap={styleMap} plugins={[linkifyPlugin]} />

            <KeyBinding onKey={(e) => { /* this.handleKeyEvent(e); */ this.logContent() }} />
            <br /><br />
            <RaisedButton className='noteBottomButtons' label='Save' onClick={this._saveContent.bind(this)} />
            <RaisedButton className='noteBottomButtons' label='Delete Note' onClick={this._deleteNote.bind(this)} />

          </div>
        </div>

      </div>
    )
  }
}

MyEditor.contextTypes = {
  router: PropTypes.object
}

export default MyEditor
