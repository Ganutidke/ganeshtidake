
import PageHeader from '@/components/admin/page-header';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, UserCircle, FolderKanban, Briefcase, GraduationCap, Award, Image as ImageIcon, Newspaper, HelpCircle, Inbox, Palette, Lightbulb, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

const sections = [
  {
    title: "Core Setup: Your Identity",
    items: [
      {
        icon: Home,
        title: "Intro Section",
        link: "/admin/intro",
        description: "This is the first thing visitors see. Customize your hero section, including your main headline, role, social media links, and contact information. A good hero image makes a strong first impression.",
        tips: [
          "Your 'Headline' is your name, and 'Role' is your main job title.",
          "Fill out all social links (GitHub, LinkedIn) to show your online presence.",
          "The email, phone, and address here are used on the Contact page and in the admin header."
        ]
      },
      {
        icon: UserCircle,
        title: "About Me",
        link: "/admin/about",
        description: "Tell your professional story. Your bio should be engaging, and the skills section is crucial for showing what you can do. Your profile picture will be used across the site.",
        tips: [
          "For 'Skills', use the format 'Category: Skill1, Skill2'. For example: 'Languages: JavaScript, Python'. Each category should be on a new line.",
          "Upload a clear, professional profile picture."
        ]
      }
    ]
  },
  {
    title: "Showcasing Your Work & Experience",
    items: [
      {
        icon: FolderKanban,
        title: "Projects",
        link: "/admin/projects",
        description: "The heart of your portfolio. Add detailed descriptions of your projects. Use the 'Categories' page to organize them first.",
        tips: [
          "Use markdown in the description to add formatting like headings, lists, and links.",
          "A good cover image makes your project stand out.",
          "Tags help with searchability on your site and for SEO."
        ]
      },
      {
        icon: Briefcase,
        title: "Experience",
        link: "/admin/experience",
        description: "Detail your professional work history. The most recent entry without an end date will be highlighted on your homepage.",
        tips: [
          "Be clear and concise in your role descriptions.",
          "Leave the 'End Date' blank for your current position."
        ]
      },
      {
        icon: GraduationCap,
        title: "Education",
        link: "/admin/education",
        description: "List your academic background and degrees.",
        tips: [
          "Add relevant coursework or achievements in the description field."
        ]
      },
      {
        icon: Award,
        title: "Certificates",
        link: "/admin/certificates",
        description: "Display your certifications to validate your skills.",
        tips: [
          "Include the 'Credential URL' if available so visitors can verify it.",
          "Upload a clear image of the certificate."
        ]
      },
      {
        icon: ImageIcon,
        title: "Gallery",
        link: "/admin/gallery",
        description: "A visual space for your photography, design mockups, or any other images you want to showcase.",
        tips: [
          "Upload high-quality images for the best visual impact."
        ]
      }
    ]
  },
  {
    title: "Content & Engagement",
    items: [
      {
        icon: Newspaper,
        title: "Blogs",
        link: "/admin/blogs",
        description: "Share your knowledge and thoughts. Writing articles is a great way to demonstrate expertise and improve your site's SEO.",
        tips: [
          "Use the built-in markdown editor and preview to format your posts.",
          "Try the 'AI Generate' feature for unique cover images based on a text prompt.",
          "A compelling 'Excerpt' will encourage users to click and read more."
        ]
      },
      {
        icon: HelpCircle,
        title: "FAQ",
        link: "/admin/faq",
        description: "Proactively answer common questions visitors might have about you or your work process.",
        tips: [
          "Keep answers clear and concise."
        ]
      },
      {
        icon: Inbox,
        title: "Messages",
        link: "/admin/messages",
        description: "View and manage messages sent to you through the contact form on your site. Unread messages will be highlighted.",
        tips: []
      }
    ]
  },
  {
    title: "Advanced Customization & AI Tools",
    items: [
      {
        icon: Palette,
        title: "Theme Customizer",
        link: "/admin/theme",
        description: "Change the entire look and feel of your website. You can customize the color palette to match your personal brand.",
        tips: [
          "Enter HSL color values (e.g., '217.2 91.2% 59.8%') to change colors.",
          "The changes apply site-wide in real-time as you type.",
          "You can always 'Reset to Default' if you're not happy with the changes."
        ]
      },
      {
        icon: Lightbulb,
        title: "AI SEO Helper",
        link: "/admin/seo",
        description: "Improve your site's search engine visibility. Paste in content from your portfolio to get AI-generated keyword suggestions.",
        tips: [
          "Combine content from your 'About' page and a few project descriptions for the best results."
        ]
      },
      {
        icon: MessageSquare,
        title: "AI Chatbot",
        link: "/admin/chatbot",
        description: "Your portfolio has an AI assistant! It automatically uses all your portfolio content to answer visitor questions. This page allows you to test it and see the data it's using.",
        tips: [
          "The chatbot learns automatically. Just keep your portfolio content up-to-date.",
          "Ask it questions like 'What are your top skills?' or 'Tell me about the project named...' to test its knowledge."
        ]
      }
    ]
  }
];

export default function GetStartedPage() {
  return (
    <div>
      <PageHeader
        title="Getting Started Guide"
        description="Welcome to your new portfolio! This guide will help you customize and manage your site."
      />

      <div className="space-y-8">
        {sections.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {section.items.map((item, index) => (
                  <AccordionItem value={`item-${index}`} key={item.title}>
                    <AccordionTrigger>
                      <div className="flex items-center gap-4">
                        <item.icon className="h-6 w-6 text-primary" />
                        <span className="text-lg font-semibold">{item.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-14">
                      <p className="text-muted-foreground mb-4">{item.description}</p>
                      {item.tips.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-semibold mb-2">Quick Tips:</h4>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            {item.tips.map((tip, i) => <li key={i}>{tip}</li>)}
                          </ul>
                        </div>
                      )}
                      <Link href={item.link}>
                        <Badge>Go to {item.title} page</Badge>
                      </Link>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
