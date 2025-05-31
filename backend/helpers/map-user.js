export const mapUser = (user) => ({
  id: user._id,
  login: user.login,
  registredAt: user.createdAt,
  defaultStartTimeInAnalytics: user.defaultStartTimeInAnalytics,
  imageURL: user.imageURL,
});
