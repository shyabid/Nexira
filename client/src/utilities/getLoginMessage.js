import { getAlert } from "./getAlert";

export const loginSuccessMessage = (name) => {
  getAlert({
    title: `Welcome ${name || ""}`,
    showConfirmButton: false,
    timer: 2000,
  });
};
