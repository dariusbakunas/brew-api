import {
  rule, shield, and, or,
} from 'graphql-shield';
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
  const result = user.roles
    && user.roles.find(r => r.code === role);
  return !!result;
};

const isActiveUser = rule()((parent, args, { user }) => user.status === 'ACTIVE');
const isAdmin = rule()((parent, args, { user }) => user.isAdmin);
const isGuest = rule()((parent, args, { user }) => user.status === 'GUEST');
const isInitialAuth = rule()((parent, args, { user }) => !!user.initialAuth);

const isIngredientManager = rule()((parent, args, { user }) => hasRole(
  user, ROLES.INGREDIENT_MANAGER,
));

const isUserManager = rule()((parent, args, { user }) => hasRole(
  user, ROLES.USER_MANAGER,
));

const allow = rule()(() => true);
const deny = rule()(() => false);

const middleware = shield({
  Query: {
    countries: isActiveUser,
    hops: isActiveUser,
    fermentables: isActiveUser,
    yeast: isActiveUser,
    water: isActiveUser,
    yeastLabs: isActiveUser,
    invitations: and(isActiveUser, or(isAdmin, isUserManager)),
    randomQuote: or(isGuest, isInitialAuth, isActiveUser),
    users: and(isActiveUser, or(isAdmin, isUserManager)),
    user: and(isActiveUser, or(isAdmin, isUserManager)),
    recipes: isActiveUser,
    recipe: and(isActiveUser, isOwner),
    roles: and(isActiveUser, or(isAdmin, isUserManager)),
    userByEmail: or(isInitialAuth, isAdmin),
  },
  Mutation: {
    // fermentables
    createFermentable: and(isActiveUser, or(isAdmin, isIngredientManager)),
    updateFermentable: and(isActiveUser, or(isAdmin, isIngredientManager)),
    removeFermentable: and(isActiveUser, or(isAdmin, isIngredientManager)),

    // yeast
    createYeast: and(isActiveUser, or(isAdmin, isIngredientManager)),
    updateYeast: and(isActiveUser, or(isAdmin, isIngredientManager)),
    removeYeast: and(isActiveUser, or(isAdmin, isIngredientManager)),

    // water
    createWater: and(isActiveUser, or(isAdmin, isIngredientManager)),
    updateWater: and(isActiveUser, or(isAdmin, isIngredientManager)),
    removeWater: and(isActiveUser, or(isAdmin, isIngredientManager)),

    // hops
    createHop: and(isActiveUser, or(isAdmin, isIngredientManager)),
    removeHop: and(isActiveUser, or(isAdmin, isIngredientManager)),
    updateHop: and(isActiveUser, or(isAdmin, isIngredientManager)),

    // recipes
    createRecipe: isActiveUser,
    updateRecipe: and(isActiveUser, isOwner),
    removeRecipe: and(isActiveUser, isOwner),

    // users
    activateUser: allow,
    createInvitation: and(isActiveUser, or(isAdmin, isUserManager)),
    deleteInvitation: and(isActiveUser, or(isAdmin, isUserManager)),
    removeUser: and(isActiveUser, or(isAdmin, isUserManager)),
    updateUser: and(isActiveUser, or(isAdmin, isUserManager)),
    register: isGuest,
  },
  ActivationResponse: allow,
  Country: allow,
  Fermentable: allow,
  FermentablesResponse: allow,
  Hop: allow,
  HopsResponse: allow,
  Invitation: allow,
  LimitedUser: allow,
  PageInfo: allow,
  Recipe: allow,
  RecipeFermentable: allow,
  Role: allow,
  Yeast: allow,
  YeastLab: allow,
  YeastResponse: allow,
  Water: allow,
  WaterResponse: allow,
  User: allow,
  Quote: allow,
}, { fallbackRule: deny, debug: true });

export default middleware;
