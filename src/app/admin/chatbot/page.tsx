
import PageHeader from '@/components/admin/page-header';
import ChatbotPageClient from '@/components/admin/chatbot-page-client';

import { getAbout } from '@/lib/actions/about.actions';
import { getBlogs } from '@/lib/actions/blog.actions';
import { getCertificates } from '@/lib/actions/certificate.actions';
import { getEducationHistory } from '@/lib/actions/education.actions';
import { getExperienceHistory } from '@/lib/actions/experience.actions';
import { getFaqs } from '@/lib/actions/faq.actions';
import { getIntro } from '@/lib/actions/intro.actions';
import { getProjects } from '@/lib/actions/project.actions';

export default async function AdminChatbotPage() {
    const [
        intro,
        about,
        projects,
        blogs,
        experience,
        education,
        certificates,
        faqs,
    ] = await Promise.all([
        getIntro(),
        getAbout(),
        getProjects(),
        getBlogs(),
        getExperienceHistory(),
        getEducationHistory(),
        getCertificates(),
        getFaqs(),
    ]);

    const portfolioContext = JSON.stringify({
        intro,
        about,
        projects,
        blogs,
        experience,
        education,
        certificates,
        faqs,
    }, null, 2);

    return (
        <div>
            <PageHeader
                title="AI Chatbot Assistant"
                description="Test the chatbot and see the content it uses to answer questions."
            />
            <ChatbotPageClient context={portfolioContext} />
        </div>
    );
}
