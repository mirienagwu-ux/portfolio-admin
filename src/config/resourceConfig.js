import { usersApi, projectsApi, servicesApi, referencesApi } from '../api/resources';

// Each entry describes one backend model:
// - api: the CRUD functions for that resource
// - label: human-readable name (singular / plural)
// - fields: form fields -> { name, label, type, required }
// - columns: which fields to show in the list table

export const resourceConfig = {
  users: {
    api: usersApi,
    label: 'User',
    labelPlural: 'Users',
    fields: [
      { name: 'firstname', label: 'First Name', type: 'text', required: true },
      { name: 'lastname', label: 'Last Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'password', label: 'Password', type: 'password', required: true },
    ],
    columns: ['firstname', 'lastname', 'email'],
  },
  projects: {
    api: projectsApi,
    label: 'Project',
    labelPlural: 'Projects',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'completion', label: 'Completion Date', type: 'date', required: false },
      { name: 'description', label: 'Description', type: 'textarea', required: false },
      { name: 'image', label: 'Image URL', type: 'text', required: false },
    ],
    columns: ['title', 'completion'],
  },
  services: {
    api: servicesApi,
    label: 'Service',
    labelPlural: 'Services',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: false },
    ],
    columns: ['title'],
  },
  references: {
    api: referencesApi,
    label: 'Reference',
    labelPlural: 'References',
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'position', label: 'Position', type: 'text', required: false },
      { name: 'company', label: 'Company', type: 'text', required: false },
      { name: 'testimonial', label: 'Testimonial', type: 'textarea', required: false },
    ],
    columns: ['name', 'company'],
  },
};

export const resourceKeys = Object.keys(resourceConfig); // ['users','projects','services','references']
