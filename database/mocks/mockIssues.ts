export interface Issue {
  id: string;
  title: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "critical";
  state: "open" | "closed";
  type: "bug" | "feature" | "task" | "improvement";
  assignee: string;
  createdAt: string;
  updatedAt: string;
}

export const MOCK_ISSUES: Issue[] = [
  {
    id: "ISS-001",
    title: "Fix order validation for negative quantities",
    status: "open",
    priority: "high",
    type: "bug",
    assignee: "John Trader",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    state: "closed",
  },
  {
    id: "ISS-002",
    title: "Add dark mode support to blotter",
    status: "in_progress",
    priority: "medium",
    type: "feature",
    assignee: "Sarah Developer",
    createdAt: "2024-01-14T14:20:00Z",
    updatedAt: "2024-01-16T09:15:00Z",
    state: "closed",
  },
  {
    id: "ISS-003",
    title: "Improve API response time for large datasets",
    status: "open",
    priority: "critical",
    type: "improvement",
    assignee: "Mike DevOps",
    createdAt: "2024-01-16T08:45:00Z",
    updatedAt: "2024-01-16T08:45:00Z",
    state: "open",
  },
  {
    id: "ISS-004",
    title: "Add export to CSV functionality",
    status: "open",
    priority: "medium",
    type: "feature",
    assignee: "Unassigned",
    createdAt: "2024-01-13T16:10:00Z",
    updatedAt: "2024-01-13T16:10:00Z",
    state: "open",
  },
  {
    id: "ISS-005",
    title: "Fix mobile responsive layout",
    status: "resolved",
    priority: "high",
    type: "bug",
    assignee: "Alex Frontend",
    createdAt: "2024-01-10T11:25:00Z",
    updatedAt: "2024-01-15T13:40:00Z",
    state: "open",
  },
  {
    id: "ISS-006",
    title: "Update documentation for new API endpoints",
    status: "open",
    priority: "low",
    type: "task",
    assignee: "David Tech Writer",
    createdAt: "2024-01-16T09:30:00Z",
    updatedAt: "2024-01-16T09:30:00Z",
    state: "open",
  },
  {
    id: "ISS-007",
    title: "Implement real-time notifications",
    status: "in_progress",
    priority: "high",
    type: "feature",
    assignee: "Emma Backend",
    createdAt: "2024-01-11T15:45:00Z",
    updatedAt: "2024-01-15T11:20:00Z",
    state: "open",
  },
  {
    id: "ISS-008",
    title: "Add user role management interface",
    status: "open",
    priority: "medium",
    type: "feature",
    assignee: "Unassigned",
    createdAt: "2024-01-12T13:15:00Z",
    updatedAt: "2024-01-12T13:15:00Z",
    state: "open",
  },
];
