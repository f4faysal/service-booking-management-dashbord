export const role = ["admin", "user"];
export const roleOptions = role.map((role: string) => {
  return {
    label: role,
    value: role,
  };
});
