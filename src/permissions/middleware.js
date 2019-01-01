import {
  rule, shield, and, or,
} from 'graphql-shield';
import ROLES from './roles';


// TODO: implement this once users are able to have their own resources
const isOwner = rule()(async (parent, args, { user }, info) => {
  return true;
});

const isActiveUser = rule()((parent, args, { user }) => user.status === 'ACTIVE');
const isAdmin = rule()((parent, args, { user }) => user.isAdmin);
const isGuest = rule()((parent, args, { user }) => user.status === 'GUEST');
const isInitialAuth = rule()((parent, args, { user }) => !!user.initialAuth);

const isIngredientManager = rule()((parent, args, { user }) => user.roles
  && user.roles.indexOf(ROLES.INGREDIENT_MANAGER) !== -1);

const isUserManager = rule()((parent, args, { user }) => user.roles
  && user.roles.indexOf(ROLES.INGREDIENT_MANAGER) !== -1);

const allow = rule()(() => true);
const deny = rule()(() => false);

const middleware = shield({
  Query: {
    countries: isActiveUser,
    hops: isActiveUser,
    fermentables: isActiveUser,
    yeast: isActiveUser,
    yeastLabs: isActiveUser,
    invitations: and(isActiveUser, or(isAdmin, isUserManager)),
    randomQuote: or(isGuest, isInitialAuth, isActiveUser),
    users: and(isActiveUser, or(isAdmin, isUserManager)),
    userByEmail: isInitialAuth,
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

    // hops
    createHop: and(isActiveUser, or(isAdmin, isIngredientManager)),
    removeHop: and(isActiveUser, or(isAdmin, isIngredientManager)),
    updateHop: and(isActiveUser, or(isAdmin, isIngredientManager)),

    // users
    activateUser: allow,
    createInvitation: and(isActiveUser, or(isAdmin, isUserManager)),
    deleteInvitation: and(isActiveUser, or(isAdmin, isUserManager)),
    removeUser: and(isActiveUser, or(isAdmin, isUserManager)),
    register: isGuest,
  },
  ActivationResponse: allow,
  Country: allow,
  Fermentable: allow,
  FermentablesResponse: allow,
  Hop: allow,
  HopsResponse: allow,
  Invitation: allow,
  PageInfo: allow,
  Role: allow,
  Yeast: allow,
  YeastLab: allow,
  YeastResponse: allow,
  User: allow,
  Quote: allow,
}, { fallbackRule: deny, debug: true });

export default middleware;
