export const role = ["admin", "user"];
export const roleOptions = role.map((role: string) => {
  return {
    label: role,
    value: role,
  };
});
export const status = ["pending", "accepted", "rejected"];
export const statusOptions = status.map((role: string) => {
  return {
    label: role,
    value: role,
  };
});

export const location = [
  "Mirpur",
  "Uttara",
  "Gulshan",
  "Banani",
  "Dhanmondi",
  "Mohammadpur",
  "Motijheel",
  "Khilgaon",
  "Shyamoli",
  "Farmgate",
  "Mohakhali",
  "Tejgaon",
  "Rampura",
  "Badda",
  "Malibagh",
  "Jatrabari",
  "Demra",
  "Kadamtali",
  "Keraniganj",
];

export const locationOption = location.map((location: string) => {
  return {
    label: location,
    value: location,
  };
});
