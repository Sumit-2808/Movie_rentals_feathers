export const admin = ()=> {
  return async (context) => {
    if (!context.params.user.isAdmin)
      throw new Error({ message: "Access Forbidden" });
    return context;
  };
};
