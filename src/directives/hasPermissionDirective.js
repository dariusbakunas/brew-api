import { AuthenticationError, SchemaDirectiveVisitor, ForbiddenError } from 'apollo-server-express';

class HasPermissionDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve } = field;
    const { permissions: expectedPermissions } = this.args;
    field.resolve = async (...args) => {
      const [, , context] = args;
      if (context.user) {
        const { user: { permissions = [] } } = context;

        if (expectedPermissions.some(permission => permissions.indexOf(permission) !== -1)) {
          return resolve.apply(this, args);
        }

        throw new ForbiddenError(`You are not authorized. Expected permissions: ${expectedPermissions.join(', ')}`);
      } else {
        throw new AuthenticationError(
          'You must be signed in to view this resource.',
        );
      }
    };
  }
}

export default HasPermissionDirective;
