import { FC } from 'react';
import { GlobalContainerStyle } from '@components/Global/style';
import { AuthorSummaryStyled, AuthorBox } from './style';
import { Typography, Carousel } from 'antd';
import { Testimonial } from '@queries/educators';

const { Title } = Typography;

type AuthorSummaryProps = {
    bgColor?: string;
    testimonials: Testimonial[];
};

const AuthorSummary: FC<AuthorSummaryProps> = ({ bgColor, testimonials }) => {
    if (!testimonials.length) {
        return null;
    }
    return (
        <AuthorSummaryStyled color={bgColor}>
            <GlobalContainerStyle>
                <Carousel autoplay>
                    {testimonials.map((testimonial, index) => {
                        return (
                            <AuthorBox key={testimonial.title + '' + index}>
                                <Title level={2} className="desc">
                                    {testimonial.content}
                                </Title>
                                <br />
                                <Title level={3} className="name">
                                    {testimonial.title}
                                </Title>
                                <p className="title">{testimonial.subTitle}</p>
                            </AuthorBox>
                        );
                    })}
                </Carousel>
            </GlobalContainerStyle>
        </AuthorSummaryStyled>
    );
};

export default AuthorSummary;
