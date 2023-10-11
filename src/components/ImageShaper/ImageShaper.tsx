import React from 'react';
import { MainImageContainer } from './style';
import { ShapeProps } from './types';
import testImg from '../../public/edu2.png';
import { Cross } from './IconShapes/cross';
import { Eight } from './IconShapes/eight';
import { Circle } from './IconShapes/circle';
import { Hexa } from './IconShapes/hexagon';
import Image from 'next/image';

type ImageShaperProps = {
    imgHeight?: number;
    imgWidth?: number;
};

const ImageShaper: React.FC<ShapeProps & ImageShaperProps> = ({
    image,
    shape,
    shapeColor,
    imgWidth,
    imgHeight,
    fillColor,
    onLoad,
}) => {
    let shapeImg;
    let customCss = '';
    switch (shape) {
        case 'eight':
            customCss = 'eightShape';
            shapeImg = <Eight shapeColor={shapeColor} />;
            break;
        case 'circle':
            customCss = 'circleShape';
            shapeImg = <Circle shapeColor={shapeColor} />;
            break;
        case 'cross':
            customCss = 'crossShape';
            shapeImg = <Cross shapeColor={shapeColor} />;
            break;
        case 'hexagon':
            customCss = 'hexagonShape';
            shapeImg = <Hexa shapeColor={shapeColor} />;
            break;
        default:
            shapeImg = <Eight shapeColor={shapeColor} />;
            break;
    }

    return (
        <MainImageContainer fillColor={fillColor}>
            <Image
                src={image || testImg}
                alt="teachImg"
                loading="eager"
                width={imgWidth || 350}
                height={imgHeight || 350}
                className="Image"
                onLoad={onLoad}
            />
            <div className={`shapeImage  ${customCss}`}>{shapeImg}</div>
        </MainImageContainer>
    );
};

export default ImageShaper;
