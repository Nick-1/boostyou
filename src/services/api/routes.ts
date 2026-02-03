const buildApiV1Path = (path: string) => (`/api/v1${path}`);

export const API_ROUTE = {
    stickers: buildApiV1Path('/stickers'),
} as const;
