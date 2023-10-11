import React, { FC, useMemo } from 'react';

const HtmlContent: FC<{ content?: string }> = ({ content = '' }) => {
    const cleaned = useMemo(() => {
        return content.replace('<p>', '').replace(new RegExp('</p>$'), '');
    }, [content]);

    return (
        <>
            <p dangerouslySetInnerHTML={{ __html: cleaned }} />
        </>
    );
};
export default HtmlContent;
