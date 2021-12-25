const errorMessages = {
  emptyEmail: '"email" is not allowed to be empty',
  emptyPassword: '"password" is not allowed to be empty', 
  invalidEmail: '"email" must be a valid email',
  invalidFields: 'Invalid fields',
  invalidPassword: '"password" must be a valid password',
  invalidToken: 'Expired or invalid token',
  InternalServer: 'Internal Server Error',
  noEmail: '"email" is required',
  nameLength: '"displayName" length must be at least 8 characters long',
  nameRequired: '"name" is required',
  noPassword: '"password" is required',
  noToken: 'Token not found',
  passwordLength: '"password" length must be 6 characters long',
  postNotExists: 'Post does not exist',
  titleRequired: '"title" is required',
  unauthorizedUser: 'Unauthorized user',
  userExists: 'User already registered',
  userNotExists: 'User does not exist',
};

module.exports = errorMessages;
