import { useStickerFieldVisibility } from '../../../hooks/useStickerFieldVisibility.ts';
import { StickerTopBar } from '../../sticker-top-bar';
import { StickerControlPanel } from '../../sticker-control-panel';
import { CupAndStickerBgImages } from '../../cup-and-sticker-bg-images';
import { StickerEditorLayer } from '../../sticker-editor-layer';

import type { MainStickerProps } from '../types.ts';

import './style.scss';

export const StickerWithCupPreview = (props: MainStickerProps) => {
    const {
        initialVisible,
        formData,
        setFormData,
        formRef,
    } = props;

    const { visible, toggleVisible, onlyTitleVisible } = useStickerFieldVisibility(initialVisible);

    return (
        <div className="coffee-cup-wrapper">
            <StickerTopBar
                colorSchema={formData.colorSchema}
                onColorSchemaChange={(next) => setFormData((p) => ({ ...p, colorSchema: next }))}
            />

            <StickerControlPanel
                visible={visible}
                onToggleVisible={toggleVisible}
            />

            <CupAndStickerBgImages />

            <StickerEditorLayer
                formRef={formRef}
                formData={formData}
                setFormData={setFormData}
                visible={visible}
                onlyTitleVisible={onlyTitleVisible}
            />
        </div>
    )
}

