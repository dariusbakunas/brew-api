import {
  rule, shield, and, or,
} from 'graphql-shield';
import ROLES from './roles';


// TODO: implement this once users are able to have their own resources
const isOwner = rule()(async (parent, args, { user }, info) => {
  return true;
});

const isActiveUser = rule()(async (parent, args, { user }) => user.status === 'ACTIVE');
const isAdmin = rule()(async (parent, args, { user }) => user.isAdmin);
const isGuest = rule()(async (parent, args, { user }) => user.status === 'GUEST');
const isInitialAuth = rule()(async (parent, args, { user }) => !!user.initialAuth);

const isIngredientManager = rule()(async (parent, args, { user }) => user.roles
  && user.roles.indexOf(ROLES.INGREDIENT_MANAGER) !== -1);

const isUserManager = rule()(async (parent, args, { user }) => user.roles
  && user.roles.indexOf(ROLES.INGREDIENT_MANAGER) !== -1);

const middleware = shield({
  Query: {
    countries: isActiveUser,
    hops: isActiveUser,
    invitations: and(isActiveUser, or(isAdmin, isUserManager)),
    randomQuote: or(isGuest, isInitialAuth, isActiveUser),
    users: and(isActiveUser, or(isAdmin, isUserManager)),
    userByEmail: isInitialAuth,
  },
  Mutation: {
    // hops
    createHop: and(isActiveUser, or(isAdmin, isIngredientManager)),
    removeHop: and(isActiveUser, or(isAdmin, isIngredientManager)),
    updateHop: and(isActiveUser, or(isAdmin, isIngredientManager)),

    // users
    createInvitation: and(isActiveUser, or(isAdmin, isUserManager)),
    deleteInvitation: and(isActiveUser, or(isAdmin, isUserManager)),
    removeUser: and(isActiveUser, or(isAdmin, isUserManager)),
    register: isGuest,
  },
});

export default middleware;
