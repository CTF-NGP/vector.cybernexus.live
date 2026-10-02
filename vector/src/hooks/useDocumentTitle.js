import { useEffect } from 'react'

const SITE_SUFFIX = 'V3CT0R CTF 26'

export default function useDocumentTitle(title) {
  useEffect(() => {
    const previous = document.title
    document.title = title ? `${title} — ${SITE_SUFFIX}` : SITE_SUFFIX
    return () => {
      document.title = previous
    }
  }, [title])
}
