const bgCup = `${import.meta.env.BASE_URL}redactor-images/bg-cup.jpg`;
const bgStickerWhite = `${import.meta.env.BASE_URL}redactor-images/bg-sticker-white.png`;
const bgStickerShadow = `${import.meta.env.BASE_URL}redactor-images/bg-sticker-shadow.png`;

export const CupAndStickerBgImages = () => (
    <>
        <img
            className="coffee-cup__image"
            src={bgCup}
            alt="Coffee cup"
        />

        <img
            className="sticker__image"
            src={bgStickerWhite}
            alt="Sticker"
        />

        <img
            className="sticker__image_shadow"
            src={bgStickerShadow}
            alt="Sticker shadow"
        />
    </>
)
