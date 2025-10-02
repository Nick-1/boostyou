import './style.scss'
import {ColorCode} from '../../enum';

interface ColorMarkerProps {
    color: string;
    label?: string;
}

const ColorMarker = (props: ColorMarkerProps) => {
    const { color, label } = props;

    const getBorderColor = (color: string) => (color === ColorCode.WHITE ? ColorCode.BLACK : color);

    return (
        <>
            <span className="color-circle" style={{  backgroundColor: color, borderColor: getBorderColor(color)  }}></span>
            {label ?? <span>{label}</span>}
        </>
    )
}

export default ColorMarker;
