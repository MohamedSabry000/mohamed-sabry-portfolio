import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach } from 'vitest'
import { emptyAssistantContent, primeAssistantContent } from '../agent/sanityContent'

beforeEach(() => primeAssistantContent(emptyAssistantContent))

afterEach(() => {
  cleanup()
  localStorage.clear()
  sessionStorage.clear()
})

if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList
}
Element.prototype.scrollIntoView = function () {}
window.scrollTo = (() => {}) as typeof window.scrollTo
Element.prototype.scrollTo = function () {} as typeof Element.prototype.scrollTo
