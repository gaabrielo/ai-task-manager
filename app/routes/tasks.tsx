import prisma from 'prisma/prisma';
import TasksList from '~/features/tasks/tasks-list';

export async function loader() {
  return {
    tasks: await prisma.task.findMany(),
  };
}

export default function () {
  return (
    <div className="w-full h-full">
      <TasksList />
    </div>
  );
}
