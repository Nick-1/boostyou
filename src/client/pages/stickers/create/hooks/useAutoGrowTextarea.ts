import { type ChangeEvent, type KeyboardEvent, useCallback, useEffect, useRef } from 'react';

type UseAutoGrowTextareaArgs = {
    value: string;
    maxLines: number;
    onValueChange: (next: string) => void;
};

const getNums = (el: HTMLTextAreaElement) => {
    const style = window.getComputedStyle(el);
    const lineHeight = Number.parseFloat(style.lineHeight || '0') || 0;
    const paddingTop = Number.parseFloat(style.paddingTop || '0') || 0;
    const paddingBottom = Number.parseFloat(style.paddingBottom || '0') || 0;
    return { lineHeight, paddingTop, paddingBottom };
};

export const useAutoGrowTextarea = ({ value, maxLines, onValueChange }: UseAutoGrowTextareaArgs) => {
    const ref = useRef<HTMLTextAreaElement>(null);

    const applyResizeAndClamp = useCallback(
        (el: HTMLTextAreaElement) => {
            const { lineHeight, paddingTop, paddingBottom } = getNums(el);

            // 1) clamp explicit new lines
            const explicitLines = el.value.split('\n');
            if (explicitLines.length > maxLines) {
                el.value = explicitLines.slice(0, maxLines).join('\n');
            }

            // 2) resize to content
            el.style.height = '0px';
            el.style.height = `${el.scrollHeight}px`;

            if (!lineHeight) return;

            // 3) clamp soft-wrapped lines by max height
            const maxHeight = paddingTop + paddingBottom + lineHeight * maxLines;

            // if overflow -> trim chars until it fits (covers soft-wrap)
            let safety = 6000;
            while (el.scrollHeight > maxHeight && el.value.length > 0 && safety-- > 0) {
                el.value = el.value.slice(0, -1);
                el.style.height = '0px';
                el.style.height = `${el.scrollHeight}px`;
            }

            // set final height (never more than maxHeight)
            if (el.scrollHeight > maxHeight) {
                el.style.height = `${maxHeight}px`;
            }
        },
        [maxLines]
    );

    const onChange = useCallback(
        (e: ChangeEvent<HTMLTextAreaElement>) => {
            const el = e.target;
            applyResizeAndClamp(el);
            onValueChange(el.value);
        },
        [applyResizeAndClamp, onValueChange]
    );

    const onKeyDown = useCallback(
        (e: KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key !== 'Enter') return;

            const el = e.currentTarget;
            const explicitLineCount = el.value.split('\n').length;

            // block Enter if already at max explicit lines
            if (explicitLineCount >= maxLines) {
                e.preventDefault();
            }
        },
        [maxLines]
    );

    // keep height synced on prefills / programmatic changes
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        el.value = value;
        applyResizeAndClamp(el);
    }, [value, applyResizeAndClamp]);

    return { ref, onChange, onKeyDown };
};
