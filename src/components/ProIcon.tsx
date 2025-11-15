import React, { type JSX } from "react";
import {
    View360,
    Box3dThreePoints,
    SelectPoint3d,
    ColorFilter,
} from "iconoir-react";

type ProIconName = "cinematic" | "layers" | "interaction" | "studio";

interface ProIconProps {
    type: ProIconName;
    size?: number;
}

const ProIcon: React.FC<ProIconProps> = ({ type, size = 48 }) => {
    const ICONS: Record<ProIconName, JSX.Element> = {
        cinematic: <SelectPoint3d width={size} height={size} />,
        layers: <Box3dThreePoints width={size} height={size} />,
        interaction: <View360 width={size} height={size} />,
        studio: <ColorFilter width={size} height={size} />, // 3D Design Studio
    };

    return (
        <div className="pro-icon-wrapper">
            <div className="pro-icon">{ICONS[type]}</div>
        </div>
    );
};

export default ProIcon;
