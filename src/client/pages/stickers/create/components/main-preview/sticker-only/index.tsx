import { StickerTopBar } from '../../sticker-top-bar';
import { StickerControlPanel } from '../../sticker-control-panel';
import { StickerEditorLayer } from '../../sticker-editor-layer';
import { useStickerFieldVisibility } from '../../../hooks/useStickerFieldVisibility.ts';

import type { MainStickerProps } from '../types.ts';

import './style.scss';

export const StickerOnlyPreview = (props: MainStickerProps) => {
  const { initialVisible, formData, setFormData, formRef } = props;
  const { visible, toggleVisible, onlyTitleVisible } = useStickerFieldVisibility(initialVisible);

  return (
    <div className="stickerPreview">
      <div className="stickerPreview__paper">
        <div className="sticker sticker--2x3" data-sticker>
          <div className="sticker__chrome no-print">
            <StickerTopBar
              colorSchema={formData.colorSchema}
              onColorSchemaChange={(next) => setFormData((p) => ({ ...p, colorSchema: next }))}
            />

            <StickerControlPanel
              visible={visible}
              onToggleVisible={toggleVisible}
            />
          </div>

          <div className="sticker__canvas">
            <StickerEditorLayer
              formRef={formRef}
              formData={formData}
              setFormData={setFormData}
              visible={visible}
              onlyTitleVisible={onlyTitleVisible}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

