import foodImg from 'public/classes/food.png';
import theme from 'theme';
import { ShapeType } from '@components/ImageShaper/types';

export const upcomingClassesData = [
    {
        id: '9a9b8e62-83d7-4f5d-a8ff-dce89e909c27',
        status: 1,
        registrationImage: foodImg,
        title: 'Bob Dylan: Highway 61 Revisited, Blues, Poetry and Electricity',
        btnColor: theme.orange.secondary,
        imgHeight: 300,
        imgWidth: 300,
        shapes: ShapeType.hexagon,
        linkText: 'Video Link',
        btn: true,
    },
    {
        id: 2,
        registrationImage: foodImg,
        title: 'Bob Dylan: Highway 61 Revisited, Blues, Poetry and Electricity',
        btnColor: theme.orange.secondary,
        imgHeight: 300,
        imgWidth: 300,
        shapes: ShapeType.hexagon,
        linkText: 'Zoom Link',
        btn: true,
    },
    {
        id: 3,
        status: 2,
        registrationImage: foodImg,
        title: 'Bob Dylan: Highway 61 Revisited, Blues, Poetry and Electricity',
        btnColor: theme.orange.secondary,
        imgHeight: 300,
        imgWidth: 300,
        shapes: ShapeType.hexagon,
        linkText: 'Zoom Link',
        btn: true,
    },
];

export const pastClassesData = [
    {
        id: 1,
        status: 3,
        registrationImage: foodImg,
        timing: 'August 5th - September 6th •  7:30 - 10:30PM EST • 3 Sessions',
        title: 'Bob Dylan: Highway 61 Revisited, Blues, Poetry and Electricity',
        btnColor: theme.orange.secondary,
        imgHeight: 300,
        imgWidth: 300,
        shapes: ShapeType.hexagon,
        linkText: 'View Recording',
    },
    {
        id: 2,
        status: 3,
        registrationImage: foodImg,
        timing: 'August 5th - September 6th •  7:30 - 10:30PM EST • 3 Sessions',
        title: 'Bob Dylan: Highway 61 Revisited, Blues, Poetry and Electricity',
        btnColor: theme.orange.secondary,
        imgHeight: 300,
        imgWidth: 300,
        shapes: ShapeType.hexagon,
        linkText: 'View Recording',
    },
    {
        id: 3,
        registrationImage: foodImg,
        timing: 'August 5th - September 6th •  7:30 - 10:30PM EST • 3 Sessions',
        title: 'Bob Dylan: Highway 61 Revisited, Blues, Poetry and Electricity',
        btnColor: theme.orange.secondary,
        imgHeight: 300,
        imgWidth: 300,
        shapes: ShapeType.hexagon,
        linkText: 'View Recording',
    },
];
