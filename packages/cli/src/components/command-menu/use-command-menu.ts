import type { ScrollBoxRenderable } from "@opentui/core"
import { useMemo, useRef, useState, type RefObject } from "react"
import type { Command } from "./types"
import { getFilterCommands } from "./filter-commands"
import { useKeyboard } from "@opentui/react"

type UseCommandMenuReturn = {
    showCommandMenu: boolean,
    commandQuery: string,
    selectedIndex: number,
    scrollRef: RefObject<ScrollBoxRenderable | null>,
    handleContentChange: (text: string) => void
    resolveCommand: (index: number) => Command | undefined,
    setSelectedIndex: (index: number) => void
}

export function useCommandMenu(): UseCommandMenuReturn {
    const [textValue, setTextValue] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [showCommandMenu, setShowCommandMenu] = useState(false);
    const scrollRef = useRef<ScrollBoxRenderable>(null);


    const commandQuery = showCommandMenu && textValue.startsWith("/") ? textValue.slice(1) : "";

    const filtredCommands = useMemo(() => getFilterCommands(commandQuery),
        [commandQuery])

    const handleContentChange = (text: string) => {
        setTextValue(text),
            setSelectedIndex(0)

        const scrollbox = scrollRef.current;
        if (scrollbox) {
            scrollbox.scrollTo(0)
        }

        const prefix = text.startsWith("/") ? text.slice(1) : null

        if (prefix !== null && !prefix.includes(" ")) {
            setShowCommandMenu(true)
        } else {
            setShowCommandMenu(false)
        }
    }
    const resolveCommand = (index: number): Command | undefined => {
        const command = filtredCommands[index]
        if (command) {

            setShowCommandMenu(false)
        }
        return command
    }

    useKeyboard((key) => {
        if (!showCommandMenu) return

        if (key.name === "escape") {
            key.preventDefault()
            setShowCommandMenu(false)
        } else if (key.name === "up") {
            key.preventDefault()
            setSelectedIndex((i: number) => {
                const nextIndex = Math.max(0, i - 1)
                const sb = scrollRef.current
                if (sb && nextIndex < sb.scrollTop) {
                    sb.scrollTo(nextIndex)
                }
                return nextIndex
            })
        } else if (key.name === "down") {
            key.preventDefault()
            setSelectedIndex((i: number) => {
                if (filtredCommands.length === 0) {
                    return 0
                }
                const nextIndex = Math.min(filtredCommands.length - 1, i + 1)
                const sb = scrollRef.current
                if (sb) {
                    const viewportHeight = sb.viewport.height
                    const visibleEnd = sb.scrollTop + viewportHeight - 1
                    if (nextIndex > visibleEnd) {
                        sb.scrollTo(nextIndex - viewportHeight + 1)
                    }
                }
                return nextIndex
            })
        }
    })
    return {
        showCommandMenu,
        commandQuery,
        selectedIndex,
        scrollRef,
        handleContentChange,
        resolveCommand,
        setSelectedIndex
    }
}