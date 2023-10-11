/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react';
import { TermServiceStyled, TermServiceBoxDiv, TermsHeading, TermsDescription, TermsSubHeading } from './styles';
import { GlobalContainerStyle } from '@components/Global/style';

const TermOfService: FC = () => {
    return (
        <TermServiceStyled>
            <GlobalContainerStyle>
                <TermServiceBoxDiv>
                    <TermsDescription className="mb-4">
                        {' '}
                        Last updated <strong>Yesterday at 8:52 pm</strong>{' '}
                    </TermsDescription>
                    <TermsHeading>Information Collected Automatically</TermsHeading>
                    <TermsDescription>
                        Roundtable's website collects some anonymous information about users automatically when
                        individuals request pages through a browser. When you visit Roundtable-operated sites, we
                        collect the IP address of the device you use to connect to the internet. In addition, we gather
                        information about the type of browser you are using (including the specific version), the type
                        of operating system you have on your computer, and from which site you came.
                    </TermsDescription>
                    <br />
                    <TermsDescription>
                        When you browse our site or receive one of our emails, Roundtable uses cookies and/or web
                        beacons (sometimes referred to as “pixel tags”) to collect information and store your online
                        preferences. Cookies are widely used and most browsers are set up to accept them automatically.
                        If you would prefer, you can set your browser to notify you when you receive a cookie, which
                        lets you choose whether or not to accept it, or set your browser to automatically block any
                        cookies. Please note that if you decide to set your browser to block cookies, some features and
                        services on our site may not work properly because we may not be able to recognize you. In
                        addition, any offers we may provide when you visit us may not be as relevant to you or tailored
                        to your interests.
                    </TermsDescription>
                    <br />
                    <TermsDescription>
                        It is important to note that cookies and web beacons do not capture any information that can
                        personally identify you. The information they gather helps us improve your interactions with
                        Roundtable’s sites, as well as our communications with you, and may include:
                        <ul>
                            <li>Your response to one of our emails</li>
                            <li>Time and duration of your visit to our site</li>
                            <li>Pages you viewed while on our site</li>
                        </ul>
                        This information is used to provide an optimal shopping experience and better service throughout
                        the site. We may also supplement the information we collect with information we receive from
                        other companies. For example, we may use marketing segments developed by us or other companies
                        to customize certain offerings.
                    </TermsDescription>
                    <br />
                    <TermsHeading>Information Collected Voluntarily</TermsHeading>
                    <TermsDescription>
                        Roundtable may also gather personal information that you provide us, including your name or (if
                        applicable) your student’s name, email addresses, address and phone number when you:
                        <ul>
                            <li>
                                {' '}
                                Complete a transaction, including purchases, RSVPs, donations and signing up for
                                communications.
                            </li>
                        </ul>
                    </TermsDescription>
                    <TermsDescription>
                        Personal information we collect may be used alone or in combination with other information about
                        you we have acquired, including information from third parties, or that is publicly available,
                        in order to customize or personalize the communications and offerings you receive.
                    </TermsDescription>
                    <TermsDescription>
                        You can help Roundtable maintain the accuracy of your personal information by updating your
                        profile{' '}
                        <a href="#">
                            <ins>here</ins>
                        </a>
                        . Please let us know when you change your address, phone number or email address. This
                        information may be used to contact you about classes, programs and events that may be of
                        interest to you.
                    </TermsDescription>
                    <br />
                    <TermsHeading>Child Information Policy</TermsHeading>
                    <TermsDescription>
                        We do not knowingly collect any personal information from children under the age of 13. Any
                        portion of Roundtable’s sites intended for children under 13 will not request any personal
                        information. In the event that we learn that we have inadvertently gathered personal information
                        from children under the age of 13, we will take reasonable measures to promptly erase such
                        information from our records.
                    </TermsDescription>
                    <br />
                    <TermsHeading>How the Information is Used</TermsHeading>
                    <TermsDescription>
                        The following are examples of how Roundtable might use the personal information it collects:
                    </TermsDescription>
                    <TermsSubHeading>1. Operation of Our Business and Our Websites</TermsSubHeading>
                    <TermsDescription>
                        Roundtable uses the information we collect about and from you in connection with the operation
                        of our business (for example, to communicate with you concerning events to which you have
                        purchased tickets), and to offer an enhanced, personalized online experience on our site. The
                        information we collect allows us to:
                        <ul>
                            <li>Recognize you when you return to our site so we can personalize your experience</li>
                            <li> Process applications and transactions</li>
                            <li> Respond to your requests</li>{' '}
                            <li>
                                Provide you with relevant product and service offers on our site and in email
                                advertising
                            </li>
                        </ul>
                    </TermsDescription>
                    <TermsSubHeading>2. Sharing Information With Certain Third Parties</TermsSubHeading>
                    <TermsDescription>
                        With the exceptions below, we will not share personal information about you with any other
                        entity.
                    </TermsDescription>
                    <TermsSubHeading>2.A. Our Service Providers</TermsSubHeading>
                    <TermsDescription>
                        We provide your information to third-party companies to perform services on our behalf,
                        including payment processing, data analysis, email delivery, hosting services, customer care,
                        and to assist in our marketing efforts. We direct all such third-party service providers to
                        maintain the confidentiality of the information disclosed to them and not to use your
                        information for any purpose other than to provide services on Roundtable’s behalf.
                    </TermsDescription>
                    <TermsDescription>
                        Third party vendors, including Google, use cookies to serve ads based on your prior visits to
                        our website or other websites. Google’s use of advertising cookies enables it and its partners
                        to serve ads to you based on their visit to our site and/or other sites on the Internet. You may
                        opt out of personalized advertising by visiting Ads Settings.
                    </TermsDescription>
                    <TermsSubHeading>2.B. Co-Presentations and Rentals</TermsSubHeading>
                    <TermsDescription>
                        We may share personal information that you give us with third-party co-presenters and rental
                        clients, and partners but only if you purchase tickets to their events.
                    </TermsDescription>
                    <TermsSubHeading>2.C. Purposes of Safety, Security, and Compliance With the Law</TermsSubHeading>
                    <TermsDescription>
                        Your information and the contents of your private online communications may be accessed and
                        disclosed (i) in response to legal process (for example, a court order, search warrant, or
                        subpoena); (ii) when we have a good-faith belief that we are required to disclose the
                        information in response to legal process; (iii) in other circumstances in which Roundtable
                        believes the{' '}
                        <a href="#" className="link-default">
                            <ins>Roundtable.org </ins>
                        </a>
                        site is being used in the commission of a crime (including exchanging information with other
                        companies and organizations for the purposes of fraud protection and credit-risk reduction);
                        (iv) when we have a good-faith belief that there is an emergency that poses a threat to the
                        safety of you or another person; and (v) when necessary either to protect the rights or property
                        of Roundtable, including to enforce our Terms of Service or to render the service you have
                        requested.
                    </TermsDescription>
                    <br />
                    <TermsHeading>Security Statement</TermsHeading>
                    <TermsDescription>
                        Roundtable works to ensure that all of the transactions that occur on its website are secure.
                        All credit card numbers submitted to the site are encrypted using 128-bit Secure Socket Layer
                        (SSL) encryption, which is the industry standard. You may further ensure your security by
                        protecting against unauthorized access to your login and password, and you should sign off after
                        using a shared computer.
                    </TermsDescription>
                    <TermsDescription>
                        Should you purchase any products directly from Roundtable, we will use your credit card number
                        only to process your transactions. Your credit card information will not be stored on our
                        servers.
                    </TermsDescription>
                    <br />
                    <TermsHeading>Terms and Conditions of Use</TermsHeading>
                    <TermsDescription>
                        Access to and use of Roundtable website's text, images and data is subject to the following
                        terms and conditions:
                    </TermsDescription>
                    <TermsDescription>
                        Roundtable retains all rights, including copyright, in data, image, text and any other
                        information contained in these files.
                    </TermsDescription>
                    <TermsDescription>
                        The material contained in this website is copyrighted by Roundtable or by third parties from
                        whom we have obtained permission to publish their materials on the website and whose credit line
                        appears in association with their copyrighted information. Any commercial use or publication of
                        Roundtable material is strictly prohibited. Public use requires prior authorization from
                        Roundtable.
                    </TermsDescription>
                    <TermsDescription>
                        Roundtable's image and text files on this website are made available for noncommercial,
                        educational and personal use only.
                    </TermsDescription>
                    <br />
                    <TermsHeading>Linking to Third-Party Sites</TermsHeading>
                    <TermsDescription>
                        Roundtable has not reviewed all of the sites linked to the website and is not responsible for
                        the content of any off-site pages or other sites linked to the website. Your linking to any
                        off-site pages or other sites is at your own risk. Roundtable provides these links as a
                        convenience only, and a link does not imply endorsement of, sponsorship of, or affiliation with
                        the linked site by Roundtable.
                    </TermsDescription>
                    <br />
                    <TermsHeading>Warranty Disclaimer and Limitation of Liability</TermsHeading>
                    <TermsDescription>
                        Roundtable has not reviewed all of the sites linked to the website and is not responsible for
                        the content of any off-site pages or other sites linked to the website. Your linking to any
                        off-site pages or other sites is at your own risk. Roundtable provides these links as a
                        convenience only, and a link does not imply endorsement of, sponsorship of, or affiliation with
                        the linked site by Roundtable.
                    </TermsDescription>
                    <br />
                    <TermsHeading>Governing Law</TermsHeading>
                    <TermsDescription>
                        These terms and conditions are governed by applicable Federal law and the law of New York State,
                        without regard to its conflict of laws or choice of laws provisions.
                    </TermsDescription>
                    <br />
                    <TermsHeading>Policy Changes</TermsHeading>
                    <TermsDescription>
                        Occasional changes may be made to this document as new services and content are added to our
                        site or to reflect changes in Roundtable's policies. Visitors to Roundtable's website are
                        encouraged to check this document periodically to stay informed of current privacy guidelines.
                    </TermsDescription>
                    <br />
                    <TermsHeading>Acceptance of Terms</TermsHeading>
                    <TermsDescription>
                        By using Roundtable's website, you signify your acceptance of our Privacy Statement. If you do
                        not agree to this, please do not use our sites. Your continued use of any Roundtable site
                        following the posting of changes to these terms will indicate your acceptance of those changes.
                    </TermsDescription>
                    <br />
                    <TermsHeading>Contact Information</TermsHeading>
                    <TermsDescription>
                        For more information, contact us via 
                        <a href="#">
                            <ins>email</ins>
                        </a>
                        .
                    </TermsDescription>
                    <br />
                    <TermsHeading id="refund_policy">Refund Policy</TermsHeading>
                    <TermsDescription>
                        <ul>
                            <li>100% up to one week (7 calendar days) before the start of the first session.</li>
                            <li>50% up to 24 hours before the start of the first session</li>
                            <li>No refunds once the first session of a class has started.</li>
                        </ul>
                    </TermsDescription>
                </TermServiceBoxDiv>
            </GlobalContainerStyle>
        </TermServiceStyled>
    );
};

export default TermOfService;
