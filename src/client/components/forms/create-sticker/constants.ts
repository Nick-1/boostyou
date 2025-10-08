
import {ColorCode, ColorName, TextStyle} from '../../../enum';
import type {colorSelectOptionsItem} from './sticker-color-select';
import type {textStyleSelectOptionsItem} from './text-style-select';

export const STICKER_COLOR_SELECT_OPTIONS: colorSelectOptionsItem[] = [
    {
        value: ColorName.WHITE,
        markerColor: ColorCode.WHITE,
        label: 'White',
    },
    {
        value: ColorName.RED,
        markerColor: ColorCode.RED,
        label: 'Red',
    },
    {
        value: ColorName.GREEN,
        markerColor: ColorCode.GREEN,
        label: 'Green',
    },
    {
        value: ColorName.BLUE,
        markerColor: ColorCode.BLUE,
        label: 'Blue',
    },
    {
        value: ColorName.ORANGE,
        markerColor: ColorCode.ORANGE,
        label: 'Orange',
    },
]

export const TEXT_COLOR_SELECT_OPTIONS: colorSelectOptionsItem[] = [
    {
        value: ColorName.BLACK,
        markerColor: ColorCode.BLACK,
        label: 'Black',
    },
    {
        value: ColorName.WHITE,
        markerColor: ColorCode.WHITE,
        label: 'White',
    },
]

export const TEXT_STYLE_SELECT_OPTIONS: textStyleSelectOptionsItem[] = [
    {
        value: TextStyle.NORMAL,
        label: 'Normal',
    },
    {
        value: TextStyle.ITALIC,
        label: 'Italic',
    },
]
