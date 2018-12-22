import { AuthenticationError, SchemaDirectiveVisitor, ForbiddenError } from 'apollo-server-express';

class HasScopeDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve } = field;
    const { scope: expectedScopes } = this.args;
    field.resolve = async (...args) => {
      const [, , context] = args;
      if (context.user) {
        const { user: { scopes = [] } } = context;

        if (expectedScopes.some(scope => scopes.indexOf(scope) !== -1)) {
          return resolve.apply(this, args);
        }

        throw new ForbiddenError(`You are not authorized. Expected scopes: ${expectedScopes.join(', ')}`);
      } else {
        throw new AuthenticationError(
          'You must be signed in to view this resource.',
        );
      }
    };
  }
}

export default HasScopeDirective;
