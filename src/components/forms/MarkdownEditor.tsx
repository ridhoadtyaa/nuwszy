import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/react-editor'
import { useRef } from 'react'

// if you want to use this component, use dynamic import
// https://nextjs.org/docs/advanced-features/dynamic-import

/* eslint-disable react/require-default-props */
interface MarkdownEditorProps {
  placeholder: string
  value: string
  height?: string
  changeValue: (value: string) => void
}

const MarkdownEditor: React.FunctionComponent<MarkdownEditorProps> = ({
  placeholder,
  value,
  height = '400px',
  changeValue
}) => {
  const editorRef = useRef<Editor>()

  return (
    <Editor
      initialValue={value}
      ref={editorRef}
      placeholder={placeholder}
      previewStyle='vertical'
      height={height}
      initialEditType='markdown'
      useCommandShortcut
      onChange={() => {
        if (editorRef.current) changeValue(editorRef?.current.getInstance().getMarkdown())
      }}
      autofocus={false}
    />
  )
}

export default MarkdownEditor
