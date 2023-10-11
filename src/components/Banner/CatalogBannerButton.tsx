/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react';
import { CatalogueButtons } from './style';
import Button from '@components/Button';
import { Row } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Topic } from '@queries/topics';

export interface CatalogueProps {
    dataTopic?: Topic[];
    data?: {
        id?: number;
        buttonText?: string;
        class?: string;
    }[];
    bgcolor?: string;
    path?: string;
}

const CatalogBannerButton: FC<CatalogueProps> = ({ dataTopic, data, path }) => {
    const router = useRouter();
    return (
        <Row className="m-0 catalog-btn">
            {data &&
                data.map((items) => {
                    return (
                        <CatalogueButtons key={items.id}>
                            {router.query?.slug === items.class ? (
                                <Button bgcolor="#ffffff" type="primary" color="#000000" active>
                                    {items.buttonText}
                                </Button>
                            ) : (
                                <Link href={`${path}/${items.class}`} passHref>
                                    <a>
                                        <Button type="secondary" bgcolor="transparent" color="#ffffff">
                                            {items.buttonText}
                                        </Button>
                                    </a>
                                </Link>
                            )}
                        </CatalogueButtons>
                    );
                })}
            {router.pathname === '/courses' && (
                <CatalogueButtons>
                    {router.asPath === '/courses' ? (
                        <Button bgcolor="#ffffff" type="primary" color="#000000" active>
                            Curated for You
                        </Button>
                    ) : (
                        <Link href={`courses`} passHref>
                            <a>
                                <Button type="secondary" bgcolor="transparent" color="#ffffff">
                                    Curated for You
                                </Button>
                            </a>
                        </Link>
                    )}
                </CatalogueButtons>
            )}
            {(router.pathname === '/courses' || router.pathname === '/experts-and-artists') && (
                <CatalogueButtons>
                    {router.query?.filter === 'all' ||
                    (router.pathname === '/experts-and-artists' && router.query?.filter === undefined) ? (
                        <Button bgcolor="#ffffff" type="primary" color="#000000" active>
                            All {router.pathname === '/courses' && 'Courses'}
                        </Button>
                    ) : (
                        <Link href={{ pathname: path, query: { filter: 'all' } }} passHref>
                            <a>
                                <Button type="secondary" bgcolor="transparent" color="#ffffff">
                                    All {router.pathname === '/courses' && 'Courses'}
                                </Button>
                            </a>
                        </Link>
                    )}
                </CatalogueButtons>
            )}
            {dataTopic &&
                dataTopic.map((items) => {
                    return (
                        <CatalogueButtons key={items.id}>
                            {router.query?.filter === items.slug ? (
                                <Button bgcolor="#ffffff" type="primary" color="#000000" active>
                                    {items.name}
                                </Button>
                            ) : (
                                <Link href={{ pathname: path, query: { filter: items.slug } }} passHref>
                                    <a>
                                        <Button type="secondary" bgcolor="transparent" color="#ffffff">
                                            {items.name}
                                        </Button>
                                    </a>
                                </Link>
                            )}
                        </CatalogueButtons>
                    );
                })}
        </Row>
    );
};
export default CatalogBannerButton;
