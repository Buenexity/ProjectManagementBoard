using ProjectBoard.Models;

namespace ProjectBoard.Data
{
    public static class DbInitializer
    {
        public static void Seed(TicketContext context)
        {
            if (context.Tickets.Any())
                return;

            context.Tickets.AddRange(
                new Ticket
                {
                    title = "set up project repository",
                    description = "initialize angular workspace and configure linting",
                    status = "backlog",
                    category = "feature"
                },
                new Ticket
                {
                    title = "design board layout",
                    description = "create swimlane layout for kanban board",
                    status = "backlog",
                    category = "r&d"
                },
                new Ticket
                {
                    title = "define ticket data model",
                    description = "create shared ticket interface and enums",
                    status = "backlog",
                    category = "feature"
                },
                new Ticket
                {
                    title = "research drag and drop library",
                    description = "compare angular cdk vs third party solutions",
                    status = "backlog",
                    category = "r&d"
                },
                new Ticket
                {
                    title = "implement ticket card component",
                    description = "reusable ticket ui with title and description",
                    status = "in progress",
                    category = "feature"
                },
                new Ticket
                {
                    title = "fix login issue on safari",
                    description = "investigate cookie handling causing login failure",
                    status = "in progress",
                    category = "bug"
                },
                new Ticket
                {
                    title = "wire board columns to ticket data",
                    description = "filter tickets by status per column",
                    status = "in progress",
                    category = "feature"
                },
                new Ticket
                {
                    title = "improve mobile responsiveness",
                    description = "adjust layout for small screen widths",
                    status = "in progress",
                    category = "bug"
                },
                new Ticket
                {
                    title = "clamp long ticket titles",
                    description = "prevent overflow using css line clamp",
                    status = "review",
                    category = "feature"
                },
                new Ticket
                {
                    title = "refactor board column styles",
                    description = "clean up flexbox styles and fix invisible headers",
                    status = "review",
                    category = "r&d"
                },
                new Ticket
                {
                    title = "persist ticket status changes",
                    description = "update backend when tickets move between columns",
                    status = "done",
                    category = "feature"
                },
                new Ticket
                {
                    title = "fix card hover flicker",
                    description = "resolve css transition causing jitter",
                    status = "done",
                    category = "bug"
                }
            );

            context.SaveChanges();
        }
    }
}
