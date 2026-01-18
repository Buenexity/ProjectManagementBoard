import { Ticket } from '../models/ticket';

export const MOCK_TICKETS: Ticket[] = [
  // -------- Backlog --------
  {
    id: 1,
    title: 'Set up project repository',
    description: 'Initialize Angular workspace and configure linting',
    status: 'Backlog',
    category: 'Feature',
  },
  {
    id: 2,
    title: 'Design board layout',
    description: 'Create swimlane layout for Kanban board',
    status: 'Backlog',
    category: 'R&D',
  },
  {
    id: 3,
    title: 'Define ticket data model',
    description: 'Create shared Ticket interface and enums',
    status: 'Backlog',
    category: 'Feature',
  },
  {
    id: 4,
    title: 'Research drag-and-drop library',
    description: 'Compare Angular CDK vs third-party solutions',
    status: 'Backlog',
    category: 'R&D',
  },
  {
    id: 5,
    title: 'Add category filtering',
    description: 'Allow filtering tickets by Feature, Bug, or R&D',
    status: 'Backlog',
    category: 'Feature',
  },

  // -------- In Progress --------
  {
    id: 6,
    title: 'Implement ticket card component',
    description: 'Reusable ticket UI with title and description',
    status: 'In Progress',
    category: 'Feature',
  },
  {
    id: 7,
    title: 'Fix login issue on Safari',
    description: 'Investigate cookie handling causing login failure',
    status: 'In Progress',
    category: 'Bug',
  },
  {
    id: 8,
    title: 'Wire board columns to ticket data',
    description: 'Filter tickets by status per column',
    status: 'In Progress',
    category: 'Feature',
  },
  {
    id: 9,
    title: 'Improve mobile responsiveness',
    description: 'Adjust layout for small screen widths',
    status: 'In Progress',
    category: 'Bug',
  },
  {
    id: 10,
    title: 'Create mock data service',
    description: 'Move hardcoded tickets into a mock data provider',
    status: 'In Progress',
    category: 'R&D',
  },

  // -------- Review --------
  {
    id: 11,
    title: 'Clamp long ticket titles',
    description: 'Prevent overflow using CSS line-clamp',
    status: 'Review',
    category: 'Feature',
  },
  {
    id: 12,
    title: 'Refactor board column styles',
    description: 'Clean up flexbox styles and fix invisible headers',
    status: 'Review',
    category: 'R&D',
  },
  {
    id: 13,
    title: 'Audit component inputs/outputs',
    description: 'Ensure clean data flow between board components',
    status: 'Review',
    category: 'Feature',
  },
  {
    id: 14,
    title: 'Fix inconsistent spacing',
    description: 'Normalize margins and gaps across components',
    status: 'Review',
    category: 'Bug',
  },
  {
    id: 15,
    title: 'Review drag-and-drop UX',
    description: 'Check placeholder sizing and hover states',
    status: 'Review',
    category: 'R&D',
  },

  // -------- Done --------
  {
    id: 16,
    title: 'Persist ticket status changes',
    description: 'Update backend when tickets move between columns',
    status: 'Done',
    category: 'Feature',
  },
  {
    id: 17,
    title: 'Polish UI spacing',
    description: 'Adjust padding, gaps, and shadows across the board',
    status: 'Done',
    category: 'R&D',
  },
  {
    id: 18,
    title: 'Create base board layout',
    description: 'Initial four-column Kanban layout',
    status: 'Done',
    category: 'Feature',
  },
  {
    id: 19,
    title: 'Fix card hover flicker',
    description: 'Resolve CSS transition causing jitter',
    status: 'Done',
    category: 'Bug',
  },
  {
    id: 20,
    title: 'Set up shared styles',
    description: 'Centralize colors, spacing, and fonts',
    status: 'Done',
    category: 'R&D',
  },

  // -------- Extra volume --------
  {
    id: 21,
    title: 'Add empty state messaging',
    description: 'Show placeholder text when a column has no tickets',
    status: 'Backlog',
    category: 'Feature',
  },
  {
    id: 22,
    title: 'Optimize change detection',
    description: 'Reduce unnecessary re-renders during drag',
    status: 'In Progress',
    category: 'R&D',
  },
  {
    id: 23,
    title: 'Fix status mismatch bug',
    description: 'Ensure enum values match ticket status strings',
    status: 'Review',
    category: 'Bug',
  },
  {
    id: 24,
    title: 'Add keyboard accessibility',
    description: 'Support keyboard navigation for tickets',
    status: 'Backlog',
    category: 'Feature',
  },
  {
    id: 25,
    title: 'Finalize demo data',
    description: 'Ensure mock tickets cover all edge cases',
    status: 'Done',
    category: 'R&D',
  },
];
