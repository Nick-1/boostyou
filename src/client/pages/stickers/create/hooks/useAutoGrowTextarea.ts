import { type ChangeEvent, type KeyboardEvent, useCallback, useEffect, useRef } from 'react';

type UseAutoGrowTextareaArgs = {
    value: string;
    maxLines: number;
    onValueChange: (next: string) => void;
};

const getNums = (el: HTMLTextAreaElement) => {
    const cs = window.getComputedStyle(el);

    const fontSize = Number.parseFloat(cs.fontSize || '16') || 16;

    let lineHeight = Number.parseFloat(cs.lineHeight);
    if (!Number.isFinite(lineHeight)) {
        // line-height: normal -> fallback
        lineHeight = fontSize * 1.2;
    }

    const paddingTop = Number.parseFloat(cs.paddingTop || '0') || 0;
    const paddingBottom = Number.parseFloat(cs.paddingBottom || '0') || 0;

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
            el.style.height = 'auto';
            el.style.height = `${el.scrollHeight}px`;

            const maxHeight = paddingTop + paddingBottom + lineHeight * maxLines;

            // якщо не можемо порахувати адекватно — не робимо height-clamp
            if (!Number.isFinite(maxHeight) || maxHeight <= 0) return;

            // 3) clamp soft-wrapped lines with small tolerance (rounding in browsers)
            const EPS = 2; // px
            let safety = 6000;

            while (el.scrollHeight - maxHeight > EPS && el.value.length > 0 && safety-- > 0) {
                el.value = el.value.slice(0, -1);
                el.style.height = 'auto';
                el.style.height = `${el.scrollHeight}px`;
            }

            if (el.scrollHeight - maxHeight > EPS) {
                el.style.height = `${Math.ceil(maxHeight)}px`;
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

            if (explicitLineCount >= maxLines) {
                e.preventDefault();
            }
        },
        [maxLines]
    );

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        el.value = value;
        applyResizeAndClamp(el);
    }, [value, applyResizeAndClamp]);

    return { ref, onChange, onKeyDown };
};
