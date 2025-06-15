import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { ScrollArea } from '~/components/ui/scroll-area';
import {
  ClockIcon,
  CheckSquareIcon,
  ListChecksIcon,
  BeakerIcon,
  CodeIcon,
} from 'lucide-react';
import { Button } from '~/components/ui/button';

export function TaskSuggestions() {
  const taskData = {
    title: 'Secure Login Form with Authentication',
    description:
      'Implement a modern login form with field validation, session-based authentication, and real-time error feedback.',
    estimated_time: '2 days',
    steps: [
      'Create a form component using React',
      'Add field validation using a suitable library',
      'Connect backend for user authentication',
      'Persist sessions using SQLite',
      'Test full login and logout flow',
    ],
    suggested_tests: [
      "it('should render login form correctly')",
      "it('should validate input fields')",
      "it('should authenticate valid credentials')",
      "it('should prevent access with invalid credentials')",
    ],
    acceptance_criteria: [
      'Login form displays properly with required fields',
      'Invalid input is correctly flagged',
      'Valid users can log in and maintain a session',
      'Users are redirected upon login and logout',
    ],
    implementation_suggestion:
      'Use React Hook Form for input validation, Prisma ORM for managing user data, and configure protected routes using React Router 7.',
  };

  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1 overflow-auto">
        <div className="space-y-4 my-4 mr-6">
          {/* Main Task Card */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <ClockIcon className="w-5 h-5" />
                Estimated time
                <Badge>{taskData.estimated_time}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <CodeIcon className="w-4 h-4 text-muted-foreground" />
                <h3 className="text-sm">{taskData.title}</h3>
              </div>
              <span className="text-sm text-muted-foreground">
                {taskData.description}
              </span>
            </CardContent>
          </Card>

          {/* Steps Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ListChecksIcon className="w-5 h-5" />
                Implementation Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {taskData.steps.map((step, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Badge variant="outline">{index + 1}</Badge>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Tests Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BeakerIcon className="w-5 h-5" />
                Suggested Tests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="pr-4">
                <ul className="space-y-2">
                  {taskData.suggested_tests.map((test, index) => (
                    <li key={index} className="text-sm font-mono">
                      {test}
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Acceptance Criteria Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CheckSquareIcon className="w-5 h-5" />
                Acceptance Criteria
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {taskData.acceptance_criteria.map((criteria, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Badge variant="outline" className="shrink-0">
                      {index + 1}
                    </Badge>
                    <span>{criteria}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Implementation Suggestion Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CodeIcon className="w-5 h-5" />
                Implementation Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {taskData.implementation_suggestion}
              </p>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button>Salvar Task</Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
