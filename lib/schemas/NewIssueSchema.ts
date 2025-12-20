import { z } from "zod";

export const IssueStatus = z.enum([
  "open",
  "in_progress",
  "resolved",
  "closed",
]);
export const IssuePriority = z.enum(["low", "medium", "high", "critical"]);
export const IssueState = z.enum(["open", "closed"]);
export const IssueType = z.enum(["bug", "feature", "task", "improvement"]);

export const NewIssueSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: IssueStatus,
  priority: IssuePriority,
  state: IssueState,
  type: IssueType,
  assignee: z.string(),
  createdAt: z.string(),
});

export const NewIssuesArraySchema = z.array(NewIssueSchema);

export type INewIssueType = z.infer<typeof NewIssueSchema>;
