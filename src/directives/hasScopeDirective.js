import { AuthenticationError, SchemaDirectiveVisitor, ForbiddenError } from 'apollo-server-express';

class HasScopeDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve } = field;
    const { scope: expectedScopes } = this.args;
    field.resolve = async function (...args) {
      const [, , context] = args;
      if (context.user) {
        const { user } = context;

        if (expectedScopes.some(scope => user.scopes.indexOf(scope) !== -1)) {
          const result = await resolve.apply(this, args);
          return result;
        } else {
          throw new ForbiddenError(`You are not authorized. Expected scopes: ${expectedScopes.join(', ')}`);
        }
      } else {
        throw new AuthenticationError(
          'You must be signed in to view this resource.',
        );
      }
    };
  }
}

export default HasScopeDirective;
