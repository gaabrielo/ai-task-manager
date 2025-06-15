import ChatInterface from '~/components/chat-interface';
import { TaskSuggestions } from '~/features/tasks/task-suggestions';

export default function TasksChatbot() {
  return (
    <div className="flex h-full overflow-hidden gap-4">
      <section className="flex flex-1 p-4 pr-0">
        <ChatInterface />
      </section>
      <section className="flex flex-1">
        <TaskSuggestions />
      </section>
    </div>
  );
}
