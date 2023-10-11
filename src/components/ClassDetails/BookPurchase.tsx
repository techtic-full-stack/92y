import { FC, useMemo } from 'react';
import { BookPurchaseCard, BookRow, BookCol, PurchaseBookCol } from './style';
import { GlobalContainerStyle } from '@components/Global/style';
import theme from 'theme';
import Button from '@components/Button';
import Image from 'next/image';
import booksIcon from 'public/icons/books.svg';
// import { Book } from 'queries/types';
type BookPurchaseProps = {
    bgColor?: string;
    // bookDetails?: Book;
    bookTitle?: string;
    bookLink?: string;
};

const BookPurchase: FC<BookPurchaseProps> = ({ bgColor, bookTitle, bookLink }) => {
    const href = useMemo(() => {
        if (!bookLink) {
            return '';
        }

        try {
            const url = new URL(bookLink);

            return url.toString();
        } catch (e) {
            return `https://${bookLink}`;
        }
    }, [bookLink]);
    return (
        <BookPurchaseCard className="mb-2">
            <GlobalContainerStyle>
                <BookRow color={bgColor}>
                    <BookCol sm={12} md={8} lg={8} className="d-flex align-items-center">
                        <Image src={booksIcon} alt="bookIcon" loading="eager" />
                        <strong className="ms-3 me-1">Book Purchase:</strong>
                        {bookTitle}
                    </BookCol>
                    <PurchaseBookCol sm={12} md={4} lg={4} className="d-flex align-items-center">
                        <a href={href} target="_blank" rel="noreferrer">
                            <Button bgcolor={theme.yellow.secondary} color={theme.black} rightIcon lg>
                                Purchase Book
                            </Button>
                        </a>
                    </PurchaseBookCol>
                </BookRow>
            </GlobalContainerStyle>
        </BookPurchaseCard>
    );
};

export default BookPurchase;
