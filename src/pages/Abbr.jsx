import { useState, Fragment } from 'react'
import './Abbr.css'

const abbrIndexLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const abbrIndexColumns = [abbrIndexLetters, abbrIndexLetters, abbrIndexLetters]

import { abbrGroups } from '../data/abbr'

const abbrIdsSorted = abbrGroups
    .flatMap(group => group.items)
    .map(item => item.id.toLowerCase())
    .sort()

const findBestIdByPrefix = (prefix) => {
    if (!prefix) return null

    const lower = prefix.toLowerCase()
    let left = 0
    let right = abbrIdsSorted.length - 1
    let candidate = null

    while (left <= right) {
        const mid = (left + right) >> 1
        const id = abbrIdsSorted[mid]

        if (id === lower) {
            return id
        } else if (id < lower) {
            candidate = id
            left = mid + 1
        } else {
            right = mid - 1
        }
    }

    return candidate
}

export function Abbr() {
    const [visibleColumns, setVisibleColumns] = useState(1)
    const [activeLetters, setActiveLetters] = useState(() => abbrIndexColumns.map(() => ''))
    const [abbrIndexChain, setAbbrIndexChain] = useState(() => ['', '', ''])

    const handleLetterClick = (letter, columnIndex) => {
        const nextChain = [...abbrIndexChain]
        nextChain[columnIndex] = letter
        nextChain.fill('', columnIndex + 1)
        setActiveLetters(nextChain)
        setAbbrIndexChain(nextChain)

        if (columnIndex + 2 > visibleColumns && columnIndex + 2 < 4) {
            setVisibleColumns(columnIndex + 2)
        }

        const prefix = nextChain.join('').toLowerCase()
        if (prefix.length > 0) {
            const bestId = findBestIdByPrefix(prefix)
            if (bestId) {
                const anchor = document.getElementById(bestId)
                if (anchor) {
                    anchor.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    window.history.replaceState(null, '', `#${bestId}`)
                }
            }
        }
    }

    return (
        <div className="abbr-container">
            <main className="abbr-main">
                <div className="abbr-content" onClick={() => {
                    setVisibleColumns(1)
                    setActiveLetters(abbrIndexColumns.map(() => ''))
                    setAbbrIndexChain(['', '', ''])
                }}>
                    {abbrGroups.map(({ letter, items }) => (
                        <Fragment key={letter}>
                            <h2 className="abbr-group-heading text">{letter}</h2>
                            {items.map(({ id, short, description }) => (
                                <p id={id} key={id} className="text abbr-item">
                                    <span className="abbr-short">{short}:</span>
                                    <span className="abbr-full">{description}</span>
                                </p>
                            ))}
                        </Fragment>
                    ))}
                </div>

                <div className="abbr-index">
                    {abbrIndexColumns.map((letters, columnIndex) => (
                        <div
                            key={`abbr-index-${columnIndex}`}
                            className={`abbr-index-column ${visibleColumns > columnIndex ? 'is-visible' : ''}`}
                        >
                            {letters.map((letter) => {
                                const isActive = activeLetters[columnIndex] === letter
                                return (
                                    <p
                                        key={`${columnIndex}-${letter}`}
                                        className={`abbr-index-letter text ${isActive ? 'active' : ''}`}
                                        onClick={() => handleLetterClick(letter, columnIndex)}
                                        aria-pressed={isActive}
                                    >
                                        {letter}
                                    </p>
                                )
                            })}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}

export default Abbr