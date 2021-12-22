export const genericFunction = () => {
  return setTimeout(() => {
    localStorage.clear();
    console.log("remove cookies");
    window.location = "/sign-in";
  }, 36000);
};
