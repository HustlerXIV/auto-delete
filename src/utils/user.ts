type User = {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  hair: { color: string; type: string };
  address: { postalCode: string };
  company: { department: string };
};

type GroupedData = Record<
  string,
  {
    male: number;
    female: number;
    ageRange: string;
    hair: Record<string, number>;
    addressUser: Record<string, string>;
  }
>;

const MALE = "male";
const FEMALE = "female";

export const GroupedByDepartment = (data: { users: User[] }): GroupedData => {
  const groupedByDepartment: GroupedData = {};

  data.users.forEach((user) => {
    const {
      company: { department },
      gender,
      hair: { color: hairColor },
      firstName,
      lastName,
      address: { postalCode },
    } = user;

    if (!groupedByDepartment[department]) {
      groupedByDepartment[department] = {
        male: 0,
        female: 0,
        ageRange: "",
        hair: {},
        addressUser: {},
      };
    }

    const departmentData = groupedByDepartment[department];

    if (gender === MALE) {
      departmentData.male += 1;
    } else if (gender === FEMALE) {
      departmentData.female += 1;
    }

    if (!departmentData.hair[hairColor]) {
      departmentData.hair[hairColor] = 0;
    }
    departmentData.hair[hairColor] += 1;

    const userName = `${firstName} ${lastName}`;
    departmentData.addressUser[userName] = postalCode;
  });

  for (const department in groupedByDepartment) {
    const departmentUsers = data.users.filter(
      (user) => user.company.department === department
    );
    const ages = departmentUsers.map((user) => user.age);

    if (ages.length > 0) {
      const minAge = Math.min(...ages);
      const maxAge = Math.max(...ages);
      groupedByDepartment[department].ageRange = `${minAge}-${maxAge}`;
    }
  }

  return groupedByDepartment;
};
