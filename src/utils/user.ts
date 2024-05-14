export const GroupedByDepartment = (data: {
  users: { company: { department: string } }[];
}) => {
  const groupedByDepartment: Record<string, any[]> = {};

  data.users.forEach((person) => {
    const department = person.company.department;
    if (!groupedByDepartment[department]) {
      groupedByDepartment[department] = [];
    }
    groupedByDepartment[department].push(person);
  });

  return groupedByDepartment;
};
