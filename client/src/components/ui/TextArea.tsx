"use client"
import React, { KeyboardEvent, useRef } from 'react';

const TextArea = () => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Tab") {
            e.preventDefault();
            const textArea = textAreaRef.current;
            if (!textArea) return;

            const selectionStart = textArea.selectionStart;
            const selectionEnd = textArea.selectionEnd;
            const value = textArea.value;

            const newValue = value.substring(0, selectionStart) + "    " + value.substring(selectionEnd);
            textArea.value = newValue;

            const newPosition = selectionStart + 4;
            textArea.selectionStart = newPosition;
            textArea.selectionEnd = newPosition;
        }
    };

    return (
        <textarea
            onKeyDown={handleKeyDown}
            name="code"
      
            ref={textAreaRef}
            placeholder={`function greet(userName) {
                return "Welcome to" + userName;
            }
console.log(greet("$name"))`}
            className="flex-1 bg-gray-700 text-gray-300 outline-none resize-none placeholder-placeholder-center h-96"
            required
        />
    );
};

export default TextArea;
