export function getDocument() {
  const elements: string[] = []
  for (const key in document.documentElement)
    elements.push(key)
  return { elements }
}
