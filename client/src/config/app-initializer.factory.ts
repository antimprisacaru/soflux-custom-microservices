export const appInitializerFactory =
  (userService: UserService, userFacade: UserFacade) =>
    async () => {
      // TODO: Add tenant related information getter
      await userService.loadCurrentUser().then((currentUser) => userFacade.loadCurrentUserSuccess(currentUser));
    };
