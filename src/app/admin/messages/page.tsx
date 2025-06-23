import PageHeader from '@/components/admin/page-header';
import MessagesList from '@/components/admin/messages-list';
import { getMessages } from '@/lib/actions/message.actions';

export default async function AdminMessagesPage() {
  const messages = await getMessages();

  return (
    <div>
      <PageHeader
        title="Contact Messages"
        description="View and manage messages sent through your contact form."
      />
      <MessagesList messages={messages} />
    </div>
  );
}
