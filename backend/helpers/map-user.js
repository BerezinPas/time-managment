export const mapUser = (user) => ({
  id: user._id,
  login: user.login,
  createdAt: user.createdAt,
  defaultStartTimeInAnalytics: user.defaultStartTimeInAnalytics,
  imageURL: user.imageURL,
});
