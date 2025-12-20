from app.models import Issue, IssueStatus, IssuePriority, IssueState, IssueType

MOCK_ISSUES = [
    Issue(
        id="ISS-001",
        title="Fix order validation for negative quantities",
        status=IssueStatus.OPEN,
        priority=IssuePriority.HIGH,
        type=IssueType.BUG,
        assignee="John Trader",
        createdAt="2024-01-15T10:30:00Z",
        updatedAt="2024-01-15T10:30:00Z",
        state=IssueState.CLOSED,
    ),
    Issue(
        id="ISS-002",
        title="Add dark mode support to blotter",
        status=IssueStatus.IN_PROGRESS,
        priority=IssuePriority.MEDIUM,
        type=IssueType.FEATURE,
        assignee="Sarah Developer",
        createdAt="2024-01-14T14:20:00Z",
        updatedAt="2024-01-16T09:15:00Z",
        state=IssueState.CLOSED,
    ),
]
