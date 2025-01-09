export interface Division {
  id: string;
  name: string;
}

export interface Employee {
  id: string;
  name: string;
  phone: string;
  division: Division;
  position: string;
}

const defaultEmployees: Employee[] = [
  {
    id: "1",
    name: "John Doe",
    phone: "123-456-7890",
    division: { id: "101", name: "IT" },
    position: "Developer",
  },
  {
    id: "2",
    name: "Jane Smith",
    phone: "987-654-3210",
    division: { id: "102", name: "HR" },
    position: "HR Manager",
  },
  {
    id: "3",
    name: "Michael Johnson",
    phone: "555-123-4567",
    division: { id: "101", name: "IT" },
    position: "System Analyst",
  },
  {
    id: "4",
    name: "Emily Davis",
    phone: "555-234-5678",
    division: { id: "103", name: "Sales" },
    position: "Sales Executive",
  },
  {
    id: "5",
    name: "William Brown",
    phone: "555-345-6789",
    division: { id: "102", name: "HR" },
    position: "Recruiter",
  },
  {
    id: "6",
    name: "Sophia Wilson",
    phone: "555-456-7890",
    division: { id: "104", name: "Marketing" },
    position: "Marketing Manager",
  },
  {
    id: "7",
    name: "James Lee",
    phone: "555-567-8901",
    division: { id: "101", name: "IT" },
    position: "Developer",
  },
  {
    id: "8",
    name: "Liam Harris",
    phone: "555-678-9012",
    division: { id: "103", name: "Sales" },
    position: "Sales Manager",
  },
  {
    id: "9",
    name: "Ava Clark",
    phone: "555-789-0123",
    division: { id: "102", name: "HR" },
    position: "HR Assistant",
  },
  {
    id: "10",
    name: "Ethan Lewis",
    phone: "555-890-1234",
    division: { id: "101", name: "IT" },
    position: "Database Administrator",
  },
  {
    id: "11",
    name: "Olivia Walker",
    phone: "555-901-2345",
    division: { id: "103", name: "Sales" },
    position: "Sales Executive",
  },
  {
    id: "12",
    name: "Mason Scott",
    phone: "555-012-3456",
    division: { id: "104", name: "Marketing" },
    position: "Content Writer",
  },
  {
    id: "13",
    name: "Isabella Young",
    phone: "555-123-4567",
    division: { id: "102", name: "HR" },
    position: "HR Specialist",
  },
  {
    id: "14",
    name: "Lucas Walker",
    phone: "555-234-5678",
    division: { id: "101", name: "IT" },
    position: "Web Developer",
  },
  {
    id: "15",
    name: "Charlotte King",
    phone: "555-345-6789",
    division: { id: "103", name: "Sales" },
    position: "Regional Sales Manager",
  },
  {
    id: "16",
    name: "Benjamin Carter",
    phone: "555-456-7890",
    division: { id: "104", name: "Marketing" },
    position: "SEO Specialist",
  },
  {
    id: "17",
    name: "Amelia Baker",
    phone: "555-567-8901",
    division: { id: "101", name: "IT" },
    position: "UI/UX Designer",
  },
  {
    id: "18",
    name: "Henry Gonzalez",
    phone: "555-678-9012",
    division: { id: "103", name: "Sales" },
    position: "Account Executive",
  },
  {
    id: "19",
    name: "Ella Rodriguez",
    phone: "555-789-0123",
    division: { id: "104", name: "Marketing" },
    position: "Graphic Designer",
  },
  {
    id: "20",
    name: "Sebastian Martinez",
    phone: "555-890-1234",
    division: { id: "102", name: "HR" },
    position: "HR Director",
  },
  {
    id: "21",
    name: "Jack Hernandez",
    phone: "555-901-2345",
    division: { id: "101", name: "IT" },
    position: "Network Engineer",
  },
  {
    id: "22",
    name: "Zoe Perez",
    phone: "555-012-3456",
    division: { id: "103", name: "Sales" },
    position: "Sales Associate",
  },
  {
    id: "23",
    name: "Alexander White",
    phone: "555-123-4567",
    division: { id: "104", name: "Marketing" },
    position: "Digital Marketing Specialist",
  },
  {
    id: "24",
    name: "Mia Davis",
    phone: "555-234-5678",
    division: { id: "101", name: "IT" },
    position: "Software Engineer",
  },
  {
    id: "25",
    name: "Daniel Miller",
    phone: "555-345-6789",
    division: { id: "103", name: "Sales" },
    position: "Sales Director",
  },
  {
    id: "26",
    name: "Natalie Anderson",
    phone: "555-456-7890",
    division: { id: "102", name: "HR" },
    position: "Employee Relations Specialist",
  },
  {
    id: "27",
    name: "Matthew Robinson",
    phone: "555-567-8901",
    division: { id: "101", name: "IT" },
    position: "Cloud Engineer",
  },
  {
    id: "28",
    name: "Victoria Green",
    phone: "555-678-9012",
    division: { id: "104", name: "Marketing" },
    position: "Marketing Analyst",
  },
  {
    id: "29",
    name: "David Thomas",
    phone: "555-789-0123",
    division: { id: "103", name: "Sales" },
    position: "Sales Executive",
  },
  {
    id: "30",
    name: "Grace Moore",
    phone: "555-890-1234",
    division: { id: "101", name: "IT" },
    position: "Product Manager",
  },
  {
    id: "31",
    name: "Ryan Jackson",
    phone: "555-901-2345",
    division: { id: "102", name: "HR" },
    position: "Training Manager",
  },
  {
    id: "32",
    name: "Hannah Lee",
    phone: "555-012-3456",
    division: { id: "103", name: "Sales" },
    position: "Customer Service Representative",
  },
  {
    id: "33",
    name: "Eliot Harris",
    phone: "555-123-4567",
    division: { id: "104", name: "Marketing" },
    position: "PPC Specialist",
  },
  {
    id: "34",
    name: "Amos Young",
    phone: "555-234-5678",
    division: { id: "101", name: "IT" },
    position: "Full Stack Developer",
  },
  {
    id: "35",
    name: "Charlotte Adams",
    phone: "555-345-6789",
    division: { id: "102", name: "HR" },
    position: "HR Assistant",
  },
  {
    id: "36",
    name: "Daniel Lee",
    phone: "555-456-7890",
    division: { id: "103", name: "Sales" },
    position: "Business Development Manager",
  },
  {
    id: "37",
    name: "Megan Collins",
    phone: "555-567-8901",
    division: { id: "104", name: "Marketing" },
    position: "Social Media Manager",
  },
  {
    id: "38",
    name: "Andrew Carter",
    phone: "555-678-9012",
    division: { id: "101", name: "IT" },
    position: "Security Specialist",
  },
  {
    id: "39",
    name: "Ariana Roberts",
    phone: "555-789-0123",
    division: { id: "102", name: "HR" },
    position: "Payroll Specialist",
  },
  {
    id: "40",
    name: "Sophia Mitchell",
    phone: "555-890-1234",
    division: { id: "103", name: "Sales" },
    position: "Regional Sales Executive",
  },
  {
    id: "41",
    name: "Isabella Walker",
    phone: "555-901-2345",
    division: { id: "104", name: "Marketing" },
    position: "Brand Manager",
  },
  {
    id: "42",
    name: "Mason White",
    phone: "555-012-3456",
    division: { id: "101", name: "IT" },
    position: "DevOps Engineer",
  },
  {
    id: "43",
    name: "Ella Williams",
    phone: "555-123-4567",
    division: { id: "103", name: "Sales" },
    position: "Account Manager",
  },
  {
    id: "44",
    name: "Aiden King",
    phone: "555-234-5678",
    division: { id: "102", name: "HR" },
    position: "Recruitment Coordinator",
  },
  {
    id: "45",
    name: "Chloe Lewis",
    phone: "555-345-6789",
    division: { id: "104", name: "Marketing" },
    position: "Email Marketing Specialist",
  },
  {
    id: "46",
    name: "Liam Harris",
    phone: "555-456-7890",
    division: { id: "101", name: "IT" },
    position: "Software Engineer",
  },
  {
    id: "47",
    name: "Grace Moore",
    phone: "555-567-8901",
    division: { id: "103", name: "Sales" },
    position: "Customer Success Manager",
  },
  {
    id: "48",
    name: "Benjamin Young",
    phone: "555-678-9012",
    division: { id: "104", name: "Marketing" },
    position: "Marketing Research Analyst",
  },
  {
    id: "49",
    name: "Mia Thomas",
    phone: "555-789-0123",
    division: { id: "101", name: "IT" },
    position: "Mobile Developer",
  },
  {
    id: "50",
    name: "Lucas Roberts",
    phone: "555-890-1234",
    division: { id: "103", name: "Sales" },
    position: "Field Sales Representative",
  },
];

export const getEmployees = (): Employee[] => {
  const employees = localStorage.getItem("employees");
  return employees ? JSON.parse(employees) : defaultEmployees;
};

export const saveEmployees = (employees: Employee[]): void => {
  localStorage.setItem("employees", JSON.stringify(employees));
};
