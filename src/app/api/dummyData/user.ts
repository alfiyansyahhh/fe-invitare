// Dummy Users Array (ganti dengan DB di production)
export let users: {
  id: number;
  name: string;
  email: string;
  password?: string;
  image?: string;
  role: string;
  provider: string;
}[] = [
  {
    id: 1,
    name: 'Admin Recruiter',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    provider: 'credentials',
  },
  {
    id: 2,
    name: 'Applicant User',
    email: 'applicant@example.com',
    password: 'applicant123',
    role: 'applicant',
    provider: 'credentials',
  },
  {
    id: 3,
    name: 'My Google Admin',
    email: 'muhamadilhamalfiyansyah@gmail.com',
    role: 'admin',
    provider: 'google',
  },
];
