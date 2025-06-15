import { useLoaderData } from 'react-router';
import type { loader } from '~/routes/tasks';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { Badge } from '~/components/ui/badge';
import { ScrollArea } from '~/components/ui/scroll-area';
import { CircleIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { Button } from '~/components/ui/button';

export default function TasksList() {
  const { tasks } = useLoaderData<typeof loader>();

  return (
    <ScrollArea className="h-full w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Status</TableHead>
            <TableHead className="w-[200px]">Título</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead className="w-[100px]">Data de Entrega</TableHead>
            <TableHead className="w-[150px]">Estimativa</TableHead>
            <TableHead className="w-[150px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>
                <CircleIcon className="w-4 h-4 mx-auto" />
              </TableCell>
              <TableCell className="font-medium truncate max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
                {task.title}
              </TableCell>
              <TableCell>
                <div className="max-w-[300px] truncate">{task.description}</div>
              </TableCell>
              <TableCell>
                {new Date(task.created_at).toLocaleDateString()}
                {/* {formatDistanceToNow(new Date(task.updated_at), {
                  addSuffix: true,
                  locale: ptBR,
                })} */}
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{task.estimated_time}</Badge>
              </TableCell>

              <TableCell>
                <div className="flex gap-0">
                  <Button variant="ghost" size="icon">
                    <PencilIcon className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <TrashIcon className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
