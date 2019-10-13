import { rule, shield, and, or } from 'graphql-shield';
import ROLES from './roles';

// TODO: implement this once users are able to have their own resources
const isOwner = rule()(async (parent, { id }, { user, dataSources }, { fieldName }) => {
  if (fieldName === 'recipe' || fieldName === 'updateRecipe' || fieldName === 'removeRecipe') {
    const count = await dataSources.db.Recipe.count({ where: { id, createdBy: user.id } });
    return !!count;
  }

  return false;
});

const hasRole = (user, role) => {
  const result = user.roles && user.roles.find(r => r.code === role);
  return !!result;
};

const isActiveUser = rule()((parent, args, { user }) => user.status === 'ACTIVE');
const isGuest = rule()((parent, args, { user }) => user.status === 'GUEST');
const hasSameEmail = rule()((parent, args, { user }) => user.email === args.email);

const isIngredientManager = rule()((parent, args, { user }) =>
  hasRole(user, ROLES.INGREDIENT_MANAGER)
);

const isUserManager = rule()((parent, args, { user }) => hasRole(user, ROLES.USER_MANAGER));

const allow = rule()(() => true);
const deny = rule()(() => false);

const middleware = shield(
  {
    Query: {
      '*': deny,
      countries: isActiveUser,
      hops: isActiveUser,
      fermentables: isActiveUser,
      yeast: isActiveUser,
      water: isActiveUser,
      yeastLabs: isActiveUser,
      invitations: and(isActiveUser, isUserManager),
      randomQuote: or(isGuest, isActiveUser),
      users: and(isActiveUser, isUserManager),
      user: and(isActiveUser, isUserManager),
      recipes: isActiveUser,
      recipe: and(isActiveUser, isOwner),
      roles: and(isActiveUser, isUserManager),
      userByEmail: hasSameEmail,
    },
    Mutation: {
      '*': deny,
      // fermentables
      createFermentable: and(isActiveUser, isIngredientManager),
      updateFermentable: and(isActiveUser, isIngredientManager),
      removeFermentable: and(isActiveUser, isIngredientManager),

      // yeast
      createYeast: and(isActiveUser, isIngredientManager),
      updateYeast: and(isActiveUser, isIngredientManager),
      removeYeast: and(isActiveUser, isIngredientManager),

      // water
      createWater: and(isActiveUser, isIngredientManager),
      updateWater: and(isActiveUser, isIngredientManager),
      removeWater: and(isActiveUser, isIngredientManager),

      // hops
      createHop: and(isActiveUser, isIngredientManager),
      removeHop: and(isActiveUser, isIngredientManager),
      updateHop: and(isActiveUser, isIngredientManager),

      // recipes
      createRecipe: isActiveUser,
      updateRecipe: and(isActiveUser, isOwner),
      removeRecipe: and(isActiveUser, isOwner),

      // users
      activateUser: allow,
      createInvitation: and(isActiveUser, isUserManager),
      deleteInvitation: and(isActiveUser, isUserManager),
      removeUser: and(isActiveUser, isUserManager),
      updateUser: and(isActiveUser, isUserManager),
      register: isGuest,
    },
  },
  { fallbackRule: allow, debug: true }
);

export default middleware;
