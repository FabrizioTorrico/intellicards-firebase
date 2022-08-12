import dynamic from 'next/dynamic'
import 'easymde/dist/easymde.min.css'
import { useMemo } from 'react'

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
})

export default function MarkdownInput({ value, onChange }) {
  const options = useMemo(() => {
    return {
      spellChecker: false,
      sideBySideFullscreen: false,
      toolbar: [
        'bold',
        'italic',
        'heading',
        'quote',
        'unordered-list',
        'ordered-list',
        'link',
        'image',
        'table',
        'guide',
      ],
      maxHeight: '38vh',
    }
  }, [])

  return <SimpleMDE options={options} value={value} onChange={onChange} />
}
