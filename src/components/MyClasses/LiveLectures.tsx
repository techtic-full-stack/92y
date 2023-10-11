import { FC } from 'react';
import { GlobalContainerStyle } from '@components/Global/style';
import { MyClassesStyled } from './style';
import ClassesCard from './ClassesCard';
import { ShapeType } from '@components/ImageShaper/types';
import theme from 'theme';
import foodImg from 'public/classes/food.png';
import Link from 'next/link';

const LiveLectures: FC = () => {
    return (
        <MyClassesStyled className="details">
            <GlobalContainerStyle>
                <Link href="/my-courses" passHref>
                    <div className="main-heading banner">Back to Classes</div>
                </Link>
                <ClassesCard
                    registrationImage={foodImg}
                    totalSessions={3}
                    classTime=" 7:30 - 10:30PM EST"
                    classDate="August 5th - September 6th"
                    title="Bob Dylan: Highway 61 Revisited, Blues, Poetry and Electricity"
                    btnColor={theme.orange.secondary}
                    imgHeight={300}
                    imgWidth={300}
                    shapes={ShapeType.hexagon}
                    linkText="Zoom Link"
                    live
                />
            </GlobalContainerStyle>
        </MyClassesStyled>
    );
};

export default LiveLectures;
