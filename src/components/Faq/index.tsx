/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react';
import { TermServiceStyled, TermServiceBoxDiv } from '../TermsOfService/styles';
import { FaqHeading, FaqDescription, FaqUl, FaqLi, FaqTitle } from './styles';
import { GlobalContainerStyle } from '@components/Global/style';

const Faq: FC = () => {
    return (
        <TermServiceStyled>
            <GlobalContainerStyle>
                <TermServiceBoxDiv>
                    <FaqTitle>ABOUT </FaqTitle>
                    <FaqDescription>
                        <FaqHeading className="round-table">Roundtable by The 92nd Street Y, New York</FaqHeading> is a
                        global destination that fosters real engagement between renowned experts in the fields of arts,
                        culture, and humanities with individuals seeking personal enrichment in these areas.
                        Enthusiastic participants are inspired to join the conversation. The result is live,
                        in-the-moment discourse between curious minds and acclaimed thinkers — an experience that can’t
                        be duplicated. Our destination is designed to curate the kind of exceptional content that’s
                        always been the cornerstone of The 92nd Street Y. What’s new is how you seek and find your
                        courses. It’s become a smoother, more contemporary experience. Roundtable is much more than a
                        name change, it’s an innovation. We’ve always believed learning is living, so it’s not
                        surprising while cultivating our space as a destination for enrichment, we’ve learned better
                        ways we can serve you and our participants.
                    </FaqDescription>
                    <FaqHeading>Is Roundtable still part of 92Y?</FaqHeading>
                    <FaqDescription>
                        Absolutely. The 92nd Street Y, New York is the founder of this experience. Roundtable is an
                        extension of their curated conversations with the world’s foremost thought leaders. And like all
                        the programming from 92Y, Roundtable courses are designed to deepen understanding and engage
                        both the mind and spirit of our audiences. This high-quality experience of online learning is
                        delivered globally from Roundtable by The 92nd Street Y, New York.
                    </FaqDescription>
                    <FaqHeading>What is happening to 92U?</FaqHeading>
                    <FaqDescription>
                        All the courses you've enjoyed and many more to come will now be found on{' '}
                        <a href="https://roundtable.org/">www.roundtable.org</a> A few courses will go back to 92Y Live
                        Events, but most of the online learning is now found here. The 92U name will be retired. The
                        Roundtable name is more descriptive of our unique interactive experience. Our new site is
                        designed as a destination where courses are easier to find, and the experience can consistently
                        improve.
                    </FaqDescription>
                    <FaqTitle>PRICING, PAYMENTS, AND POLICIES </FaqTitle>
                    <FaqHeading>What's your refund policy?</FaqHeading>
                    <FaqDescription>
                        If you cancel your purchase 7 calendar days before the start of the first session, you get a
                        full 100% refund. If you cancel your purchase up to 24 hours before the start of the first
                        session, you get a 50% refund. No refunds will be issued 24 hours before the start of the first
                        session.
                    </FaqDescription>
                    <FaqHeading>How do I receive my refund?</FaqHeading>
                    <FaqDescription>Roundtable will refund directly to your credit card.</FaqDescription>
                    <FaqHeading>What is the cost of a course?</FaqHeading>
                    <FaqDescription>
                        The cost of a course ranges in price depending on the number of hours of the course. Each hour
                        of instruction is $40 for standard courses and $80 for intensive courses. Other special event
                        courses may also vary.
                    </FaqDescription>
                    <FaqHeading>Why are courses offered at different prices?</FaqHeading>
                    <FaqDescription>
                        Not all our courses are the same. We offer standard courses – 1-hour sessions, and intensive
                        courses which are 2-hour sessions. Some courses have multiple sessions, and some are special
                        event courses.
                    </FaqDescription>
                    <FaqHeading>How do subscriptions work?</FaqHeading>
                    <FaqDescription>
                        Subscriptions are $250 for a 30-day period, beginning from the date of purchase, giving you
                        unlimited access to any of our live course sessions and recordings within that 30-day period.
                        When that 30-day period has expired, the subscription ends: live course sessions and recordings
                        will no longer be accessible unless the subscription is renewed. Please note that any courses
                        that have live sessions extending beyond the 30-day subscription period will not be accessible
                        unless the subscription is renewed. (So, for example, if you purchase a subscription on June 1,
                        it will give you access until midnight on June 30: if a course starts in June but has one or
                        more sessions in July, you will have to renew your subscription to access any sessions after
                        June 30.) All courses priced at or above $320 are excluded from subscriptions.
                    </FaqDescription>
                    <FaqHeading>Can I purchase a course as a gift for someone else?</FaqHeading>
                    <FaqDescription>
                        Currently we are not offering gift cards or the option to purchase a course for someone else,
                        but we plan to make that available in the future.
                    </FaqDescription>
                    <FaqHeading>Does Roundtable save my credit card for payment?</FaqHeading>
                    <FaqDescription>
                        When you make a purchase on Roundtable with your credit card, you can choose to save the
                        information for secure future purchases. When saved, Roundtable does not have direct access to
                        your credit card number, and it cannot be used without your permission.
                    </FaqDescription>
                    <FaqTitle>MANAGING YOUR ACCOUNT</FaqTitle>
                    <FaqHeading>Why do I need a password?</FaqHeading>
                    <FaqDescription>
                        All accounts require a password so you can access your course materials, order history, and
                        other important information. You can also always find your Zoom link for your course in My
                        Courses. All your purchase information is kept here – all in one place.
                    </FaqDescription>
                    <FaqHeading>Why is my password different than my 92Y password?</FaqHeading>
                    <FaqDescription>
                        Roundtable is founded by The 92nd Street Y, New York. It is a new, standalone site allowing us
                        to use the best technology to offer our courses.
                    </FaqDescription>
                    <FaqHeading>Why must I use a first and last name?</FaqHeading>
                    <FaqDescription>
                        Your first and last name helps us ensure best purchase processing, better communications with
                        you, and better assistance should you need help from our support team.
                    </FaqDescription>
                    <FaqHeading>Why do you need my email?</FaqHeading>
                    <FaqDescription>
                        To send you Zoom links to our courses. We’ll also send you important information like payment
                        confirmation and course reminders.
                    </FaqDescription>
                    <FaqTitle>COURSES AND REGISTRATION</FaqTitle>
                    <FaqHeading>How close to the course start date can I purchase a course?</FaqHeading>
                    <FaqDescription>
                        You may purchase most courses (provided space is available) up to the start of the first
                        session. For some select series, sales will end a few days prior to the course start date to
                        allow Experts and Artists time to prepare for the course size and composition.
                    </FaqDescription>
                    <FaqHeading>Can I purchase a course series after it has started?</FaqHeading>
                    <FaqDescription>
                        Yes. If you purchase a multi-session course after one or more sessions have transpired, you will
                        get access to the recordings and course materials of past sessions.
                    </FaqDescription>
                    <FaqHeading> Can I see my 92U courses? </FaqHeading>
                    <FaqDescription>
                        If you'd like to see a history of your 92U courses, please reach out to hello@roundtable.org and
                        we will add it to your account.
                    </FaqDescription>
                    <FaqHeading>
                        I did not receive a confirmation email after purchase or have not received any emails pertaining
                        to this course. What should I do?
                    </FaqHeading>
                    <FaqDescription>
                        <FaqUl>
                            <FaqLi>
                                Double check the email address you entered when registering on{' '}
                                <a href="#">roundtable.org</a> is correct. That is where all communications will be
                                sent.
                            </FaqLi>
                            <FaqLi>
                                Occasionally, emails from us can end up in your spam folder in your email account. So,
                                check your spam folder and add{' '}
                                <a href="mailto: hello@roundtable.org">hello@roundtable.org</a> to your email contacts
                                or on your email provider’s safe sender list. Write to{' '}
                                <a href="mailto: hello@roundtable.org">hello@roundtable.org</a> if you want help with
                                this.
                            </FaqLi>
                            <FaqLi>
                                To receive our emails, please do not unsubscribe from emails from{' '}
                                <a href="mailto: hello@roundtable.org">hello@roundtable.org</a>.
                            </FaqLi>
                            <FaqLi>
                                If you find you have not received any communications from us within 24 hours after your
                                purchase, please contact us as soon as possible to ensure we have time to address your
                                issue. Contact us at <a href="mailto: hello@roundtable.org">hello@roundtable.org</a>.
                            </FaqLi>
                        </FaqUl>
                    </FaqDescription>
                    <FaqHeading>What happens if I need to miss a course?</FaqHeading>
                    <FaqDescription>
                        If you are enrolled in a course or series and need to miss a course, no need to let us know in
                        advance or reach out to request a recording of the session you missed. Session recordings are
                        available in the My Courses section of your account (
                        <a href="https://roundtable.org/my-courses" target="_blank" rel="noreferrer">
                            https://roundtable.org/my-courses
                        </a>
                        ). Please note that our courses are designed for and best experienced as live participation.
                    </FaqDescription>
                    <FaqHeading>Will I get a reminder before each course session? </FaqHeading>
                    <FaqDescription>
                        Emails with a link to the session are sent the morning of the course.
                    </FaqDescription>
                    <FaqHeading>How do I access my course?</FaqHeading>
                    <FaqDescription>
                        The link for your course can be found in three places:
                        <ol>
                            <li>The confirmation email you receive after registering.</li>
                            <li>The reminder email you receive the day before the course.</li>
                            <li>
                                In the My Courses section of your account (
                                <a href="https://roundtable.org/my-courses" target="__blank">
                                    https://roundtable.org/my-courses
                                </a>
                                ).
                            </li>
                        </ol>
                    </FaqDescription>
                    <FaqHeading>
                        Are sessions recorded and will I receive a copy of the recording after the course?
                    </FaqHeading>
                    <FaqDescription>
                        All of our courses take place live over Zoom. If you are an enrolled participant, we will email
                        you a temporary link to view the recording of the session within 72 hours after each live
                        session.
                    </FaqDescription>
                    <FaqHeading>Can I interact with the expert or other participants during the course?</FaqHeading>
                    <FaqDescription>You will be able to interact using the chat function on Zoom.</FaqDescription>
                    <FaqHeading>Can I interact with the expert or other participants during the course?</FaqHeading>
                    <FaqDescription>You will be able to interact using the chat function on Zoom.</FaqDescription>
                    <FaqHeading>Should I have my camera on?</FaqHeading>
                    <FaqDescription>It is optional, but we encourage having it on to foster community.</FaqDescription>
                    <FaqHeading>Can I interact with the expert or other participants during the course?</FaqHeading>
                    <FaqDescription>You will be able to interact using the chat function on Zoom.</FaqDescription>
                    <FaqHeading> Can I ask questions during the course? </FaqHeading>
                    <FaqDescription>
                        Questions about course content should be addressed during course sessions. Other questions can
                        be directed to <a href="mailto: hello@roundtable.org">hello@roundtable.org</a>.
                    </FaqDescription>
                    <FaqTitle>TECHNICAL TOOLS AND TIPS</FaqTitle>
                    <FaqHeading>What platform is used for the courses?</FaqHeading>
                    <FaqDescription>Our live courses are hosted on Zoom.</FaqDescription>
                    <FaqHeading>Do I need to use a certain browser like Google Chrome?</FaqHeading>
                    <FaqDescription>
                        <a href="www.Roundtable.org" target="_blank">
                            www.Roundtable.org
                        </a>{' '}
                        is optimized for recent versions of popular browsers like Chrome and Safari.
                    </FaqDescription>
                    <FaqHeading>The link doesn’t appear to be working. What should I do?</FaqHeading>
                    <FaqDescription>
                        Please double-check if you are using the correct link, which can be found in three places:
                        <ol>
                            <li>The confirmation email you receive after registering.</li>
                            <li>The reminder email you receive the day before the course.</li>
                            <li>
                                In the My Courses section of your account (
                                <a href="https://roundtable.org/my-courses">https://roundtable.org/my-courses</a>).
                            </li>
                        </ol>
                        If the issue persists, please reach out to{' '}
                        <a href="mailto: hello@roundtable.org">hello@roundtable.org</a>.
                    </FaqDescription>
                    <FaqHeading>Should I have my camera on?</FaqHeading>
                    <FaqDescription>It is optional, but we encourage having it on to foster community.</FaqDescription>
                    <FaqHeading>Should I use the chat function during the session?</FaqHeading>
                    <FaqDescription>
                        Please follow the direction set by the expert leading your course as to whether you should chat
                        throughout or during the open chat near the end of your session. In general, we encourage
                        participants to use the chat throughout the course – specifically to ask questions or provide
                        compliments or acknowledgements about your course.
                    </FaqDescription>
                    <FaqHeading>Should I have my mic on?</FaqHeading>
                    <FaqDescription>
                        Yes. Your device’s mic should be on. However, we recommend always keeping your mic on mute in
                        the Zoom app except for when you want to/are invited to speak.
                    </FaqDescription>
                    <FaqHeading>What accessibility features do you offer?</FaqHeading>
                    <FaqDescription>
                        We provide closed captioning for all our courses as well as transcripts upon request. Please
                        reach out to us at <a href="mailto: hello@roundtable.org">hello@roundtable.org</a>. if you have
                        any questions, requests, or access needs.
                    </FaqDescription>
                    <FaqTitle>GENERAL QUESTIONS</FaqTitle>
                    <FaqHeading>Will I be able to email my course expert directly?</FaqHeading>
                    <FaqDescription>
                        The expert may or may not provide an email to be contacted directly during the course. This is a
                        discretionary choice of each expert. We encourage you to follow any experts on their social
                        media platforms like Facebook, Twitter, or Instagram as well as visit their websites and
                        subscribe to their newsletters if they have them.
                    </FaqDescription>
                    <FaqHeading>How can I provide advice or feedback?</FaqHeading>
                    <FaqDescription>
                        Please share your feedback by writing to us at{' '}
                        <a href="mailto: hello@roundtable.org">hello@roundtable.org</a>.
                    </FaqDescription>
                    <FaqHeading>I have a question that you haven’t answered. How can I get help?</FaqHeading>
                    <FaqDescription>
                        If you cannot find what you are looking for here in our general FAQ information, please email us
                        at <a href="mailto: hello@roundtable.org">hello@roundtable.org</a> or call us by phone at{' '}
                        <a href="tel:212-699-7200">212-699-7200</a>. We are available to assist Monday through Friday
                        from 10:00 a.m. to 7:00 p.m. (ET). We'd love to hear from you! 
                    </FaqDescription>
                </TermServiceBoxDiv>
            </GlobalContainerStyle>
        </TermServiceStyled>
    );
};

export default Faq;
