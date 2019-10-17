import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type ActivationResponse = {
  __typename?: 'ActivationResponse';
  success: Scalars['Boolean'];
};

export type Country = {
  __typename?: 'Country';
  id: Scalars['ID'];
  code: Scalars['String'];
  name: Scalars['String'];
};

export type Fermentable = {
  __typename?: 'Fermentable';
  id: Scalars['ID'];
  name: Scalars['String'];
  category: FermentableCategory;
  color?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  origin: Country;
  type?: Maybe<FermentableType>;
  potential?: Maybe<Scalars['Float']>;
  yield: Scalars['Float'];
};

export enum FermentableCategory {
  Adjunct = 'ADJUNCT',
  DryExtract = 'DRY_EXTRACT',
  Fruit = 'FRUIT',
  Grain = 'GRAIN',
  Juice = 'JUICE',
  LiquidExtract = 'LIQUID_EXTRACT',
  Sugar = 'SUGAR',
}

export type FermentableInput = {
  name: Scalars['String'];
  category: FermentableCategory;
  color?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  originId: Scalars['ID'];
  type?: Maybe<FermentableType>;
  yield: Scalars['Float'];
};

export type FermentablesFilter = {
  name?: Maybe<Scalars['String']>;
};

export type FermentablesResponse = {
  __typename?: 'FermentablesResponse';
  pageInfo: PageInfo;
  data: Array<Fermentable>;
};

export enum FermentableType {
  Base = 'BASE',
  Color = 'COLOR',
  CaramelCrystal = 'CARAMEL_CRYSTAL',
  Roasted = 'ROASTED',
  Adjunct = 'ADJUNCT',
  Specialty = 'SPECIALTY',
}

export enum FermentableUnit {
  Lb = 'LB',
  Oz = 'OZ',
}

export type Hop = {
  __typename?: 'Hop';
  id: Scalars['ID'];
  name: Scalars['String'];
  aaLow?: Maybe<Scalars['Float']>;
  aaHigh?: Maybe<Scalars['Float']>;
  betaLow?: Maybe<Scalars['Float']>;
  betaHigh?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  bittering: Scalars['Boolean'];
  aroma: Scalars['Boolean'];
  origin: Country;
};

export type HopInput = {
  name: Scalars['String'];
  aaLow?: Maybe<Scalars['Float']>;
  aaHigh?: Maybe<Scalars['Float']>;
  betaLow?: Maybe<Scalars['Float']>;
  betaHigh?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  bittering: Scalars['Boolean'];
  aroma: Scalars['Boolean'];
  originId: Scalars['ID'];
};

export type Invitation = {
  __typename?: 'Invitation';
  id: Scalars['ID'];
  code: Scalars['String'];
  email: Scalars['String'];
};

export type LimitedUser = {
  __typename?: 'LimitedUser';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createFermentable: Fermentable;
  updateFermentable: Fermentable;
  removeFermentable: Scalars['ID'];
  createHop: Hop;
  updateHop: Hop;
  removeHop: Scalars['ID'];
  _empty?: Maybe<Scalars['String']>;
  createRecipe: Recipe;
  updateRecipe: Recipe;
  removeRecipe: Scalars['ID'];
  activateUser: ActivationResponse;
  createInvitation: Invitation;
  createRole: Role;
  deleteInvitation: Scalars['ID'];
  register?: Maybe<User>;
  removeUser: Scalars['ID'];
  updateUser: User;
  createWater: Water;
  updateWater: Water;
  removeWater: Scalars['ID'];
  createYeast: Yeast;
  updateYeast: Yeast;
  removeYeast: Scalars['ID'];
};

export type MutationCreateFermentableArgs = {
  input: FermentableInput;
};

export type MutationUpdateFermentableArgs = {
  id: Scalars['ID'];
  input: FermentableInput;
};

export type MutationRemoveFermentableArgs = {
  id: Scalars['ID'];
};

export type MutationCreateHopArgs = {
  input: HopInput;
};

export type MutationUpdateHopArgs = {
  id: Scalars['ID'];
  input: HopInput;
};

export type MutationRemoveHopArgs = {
  id: Scalars['ID'];
};

export type MutationCreateRecipeArgs = {
  input: RecipeInput;
};

export type MutationUpdateRecipeArgs = {
  id: Scalars['ID'];
  input: RecipeInput;
};

export type MutationRemoveRecipeArgs = {
  id: Scalars['ID'];
};

export type MutationActivateUserArgs = {
  token: Scalars['String'];
};

export type MutationCreateInvitationArgs = {
  email: Scalars['String'];
  sendEmail?: Maybe<Scalars['Boolean']>;
};

export type MutationCreateRoleArgs = {
  input: RoleInput;
};

export type MutationDeleteInvitationArgs = {
  email: Scalars['String'];
};

export type MutationRegisterArgs = {
  input: RegistrationInput;
};

export type MutationRemoveUserArgs = {
  id: Scalars['ID'];
};

export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  input: UserInput;
};

export type MutationCreateWaterArgs = {
  input: WaterInput;
};

export type MutationUpdateWaterArgs = {
  id: Scalars['ID'];
  input: WaterInput;
};

export type MutationRemoveWaterArgs = {
  id: Scalars['ID'];
};

export type MutationCreateYeastArgs = {
  input: YeastInput;
};

export type MutationUpdateYeastArgs = {
  id: Scalars['ID'];
  input: YeastInput;
};

export type MutationRemoveYeastArgs = {
  id: Scalars['ID'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  prevCursor?: Maybe<Scalars['String']>;
  nextCursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  countries: Array<Country>;
  fermentables: FermentablesResponse;
  hops: Array<Hop>;
  _empty?: Maybe<Scalars['String']>;
  randomQuote: Quote;
  recipes: Array<Recipe>;
  recipe?: Maybe<Recipe>;
  invitations: Array<Invitation>;
  roles: Array<Role>;
  users: Array<User>;
  user?: Maybe<User>;
  userByEmail?: Maybe<User>;
  water: WaterResponse;
  yeast: YeastResponse;
  yeastLabs: Array<YeastLab>;
};

export type QueryFermentablesArgs = {
  nextCursor?: Maybe<Scalars['String']>;
  prevCursor?: Maybe<Scalars['String']>;
  filter?: Maybe<FermentablesFilter>;
  limit?: Maybe<Scalars['Int']>;
  sortDirection?: Maybe<SortDirection>;
  sortBy?: Maybe<SortableFermentableField>;
};

export type QueryHopsArgs = {
  sortDirection?: Maybe<SortDirection>;
  sortBy?: Maybe<SortableHopField>;
};

export type QueryRecipeArgs = {
  id: Scalars['ID'];
};

export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type QueryUserByEmailArgs = {
  email: Scalars['String'];
};

export type QueryWaterArgs = {
  nextCursor?: Maybe<Scalars['String']>;
  prevCursor?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  sortDirection?: Maybe<SortDirection>;
  sortBy?: Maybe<SortableWaterField>;
};

export type QueryYeastArgs = {
  nextCursor?: Maybe<Scalars['String']>;
  prevCursor?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  sortDirection?: Maybe<SortDirection>;
  sortBy?: Maybe<SortableYeastField>;
};

export type Quote = {
  __typename?: 'Quote';
  text: Scalars['String'];
  author?: Maybe<Scalars['String']>;
};

export type Recipe = {
  __typename?: 'Recipe';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  fermentables: Array<RecipeFermentable>;
  type: RecipeType;
  batchSize: Scalars['Float'];
  boilTime: Scalars['Float'];
  source?: Maybe<Scalars['String']>;
  createdBy: LimitedUser;
};

export type RecipeFermentable = {
  __typename?: 'RecipeFermentable';
  id: Scalars['ID'];
  name: Scalars['String'];
  unit: FermentableUnit;
  amount: Scalars['Float'];
};

export type RecipeFermentableInput = {
  id: Scalars['ID'];
  unit?: Maybe<FermentableUnit>;
  amount: Scalars['Float'];
};

export type RecipeInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
  type: RecipeType;
  batchSize: Scalars['Float'];
  boilTime?: Maybe<Scalars['Float']>;
  fermentables?: Maybe<Array<RecipeFermentableInput>>;
};

export enum RecipeType {
  AllGrain = 'ALL_GRAIN',
  Extract = 'EXTRACT',
  PartialMash = 'PARTIAL_MASH',
  Cider = 'CIDER',
  Mead = 'MEAD',
  Wine = 'WINE',
}

export type RegistrationInput = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  username: Scalars['String'];
  email: Scalars['String'];
  code: Scalars['String'];
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['ID'];
  name: Scalars['String'];
  code: Scalars['String'];
};

export type RoleInput = {
  name: Scalars['String'];
  code: Scalars['String'];
};

export enum SortableFermentableField {
  Name = 'NAME',
}

export enum SortableHopField {
  Name = 'NAME',
}

export enum SortableWaterField {
  Name = 'NAME',
}

export enum SortableYeastField {
  Name = 'NAME',
}

export enum SortDirection {
  Ascending = 'ASCENDING',
  Descending = 'DESCENDING',
}

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  status: UserStatus;
};

export type UserInput = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  isAdmin?: Maybe<Scalars['Boolean']>;
  roleIds?: Maybe<Array<Scalars['String']>>;
};

export enum UserStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}

export type Water = {
  __typename?: 'Water';
  id: Scalars['ID'];
  name: Scalars['String'];
  pH: Scalars['Float'];
  alkalinity: Scalars['Int'];
  calcium: Scalars['Float'];
  magnesium: Scalars['Float'];
  sodium: Scalars['Float'];
  sulfate: Scalars['Float'];
  chloride: Scalars['Float'];
  bicarbonate: Scalars['Float'];
  description?: Maybe<Scalars['String']>;
};

export type WaterInput = {
  name: Scalars['String'];
  pH: Scalars['Float'];
  alkalinity: Scalars['Int'];
  calcium: Scalars['Float'];
  magnesium: Scalars['Float'];
  sodium: Scalars['Float'];
  sulfate: Scalars['Float'];
  chloride: Scalars['Float'];
  bicarbonate: Scalars['Float'];
  description?: Maybe<Scalars['String']>;
};

export type WaterResponse = {
  __typename?: 'WaterResponse';
  pageInfo: PageInfo;
  data: Array<Water>;
};

export type Yeast = {
  __typename?: 'Yeast';
  id: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  flocculation?: Maybe<YeastFlocculation>;
  form: YeastForm;
  lab: YeastLab;
  minTemp?: Maybe<Scalars['Float']>;
  maxTemp?: Maybe<Scalars['Float']>;
  minAttenuation?: Maybe<Scalars['Float']>;
  maxAttenuation?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  type: YeastType;
};

export enum YeastFlocculation {
  Low = 'LOW',
  Medium = 'MEDIUM',
  High = 'HIGH',
}

export enum YeastForm {
  Liquid = 'LIQUID',
  Dry = 'DRY',
}

export type YeastInput = {
  description?: Maybe<Scalars['String']>;
  flocculation?: Maybe<YeastFlocculation>;
  form: YeastForm;
  labId: Scalars['ID'];
  minTemp?: Maybe<Scalars['Float']>;
  maxTemp?: Maybe<Scalars['Float']>;
  minAttenuation?: Maybe<Scalars['Float']>;
  maxAttenuation?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  type: YeastType;
};

export type YeastLab = {
  __typename?: 'YeastLab';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type YeastResponse = {
  __typename?: 'YeastResponse';
  pageInfo: PageInfo;
  data: Array<Yeast>;
};

export enum YeastType {
  Ale = 'ALE',
  Champagne = 'CHAMPAGNE',
  Lager = 'LAGER',
  Wheat = 'WHEAT',
  Wine = 'WINE',
}

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  Country: ResolverTypeWrapper<Partial<Country>>;
  ID: ResolverTypeWrapper<Partial<Scalars['ID']>>;
  String: ResolverTypeWrapper<Partial<Scalars['String']>>;
  FermentablesFilter: ResolverTypeWrapper<Partial<FermentablesFilter>>;
  Int: ResolverTypeWrapper<Partial<Scalars['Int']>>;
  SortDirection: ResolverTypeWrapper<Partial<SortDirection>>;
  SortableFermentableField: ResolverTypeWrapper<Partial<SortableFermentableField>>;
  FermentablesResponse: ResolverTypeWrapper<Partial<FermentablesResponse>>;
  PageInfo: ResolverTypeWrapper<Partial<PageInfo>>;
  Fermentable: ResolverTypeWrapper<Partial<Fermentable>>;
  FermentableCategory: ResolverTypeWrapper<Partial<FermentableCategory>>;
  Float: ResolverTypeWrapper<Partial<Scalars['Float']>>;
  FermentableType: ResolverTypeWrapper<Partial<FermentableType>>;
  SortableHopField: ResolverTypeWrapper<Partial<SortableHopField>>;
  Hop: ResolverTypeWrapper<Partial<Hop>>;
  Boolean: ResolverTypeWrapper<Partial<Scalars['Boolean']>>;
  Quote: ResolverTypeWrapper<Partial<Quote>>;
  Recipe: ResolverTypeWrapper<Partial<Recipe>>;
  RecipeFermentable: ResolverTypeWrapper<Partial<RecipeFermentable>>;
  FermentableUnit: ResolverTypeWrapper<Partial<FermentableUnit>>;
  RecipeType: ResolverTypeWrapper<Partial<RecipeType>>;
  LimitedUser: ResolverTypeWrapper<Partial<LimitedUser>>;
  Invitation: ResolverTypeWrapper<Partial<Invitation>>;
  Role: ResolverTypeWrapper<Partial<Role>>;
  User: ResolverTypeWrapper<Partial<User>>;
  UserStatus: ResolverTypeWrapper<Partial<UserStatus>>;
  SortableWaterField: ResolverTypeWrapper<Partial<SortableWaterField>>;
  WaterResponse: ResolverTypeWrapper<Partial<WaterResponse>>;
  Water: ResolverTypeWrapper<Partial<Water>>;
  SortableYeastField: ResolverTypeWrapper<Partial<SortableYeastField>>;
  YeastResponse: ResolverTypeWrapper<Partial<YeastResponse>>;
  Yeast: ResolverTypeWrapper<Partial<Yeast>>;
  YeastFlocculation: ResolverTypeWrapper<Partial<YeastFlocculation>>;
  YeastForm: ResolverTypeWrapper<Partial<YeastForm>>;
  YeastLab: ResolverTypeWrapper<Partial<YeastLab>>;
  YeastType: ResolverTypeWrapper<Partial<YeastType>>;
  Mutation: ResolverTypeWrapper<{}>;
  FermentableInput: ResolverTypeWrapper<Partial<FermentableInput>>;
  HopInput: ResolverTypeWrapper<Partial<HopInput>>;
  RecipeInput: ResolverTypeWrapper<Partial<RecipeInput>>;
  RecipeFermentableInput: ResolverTypeWrapper<Partial<RecipeFermentableInput>>;
  ActivationResponse: ResolverTypeWrapper<Partial<ActivationResponse>>;
  RoleInput: ResolverTypeWrapper<Partial<RoleInput>>;
  RegistrationInput: ResolverTypeWrapper<Partial<RegistrationInput>>;
  UserInput: ResolverTypeWrapper<Partial<UserInput>>;
  WaterInput: ResolverTypeWrapper<Partial<WaterInput>>;
  YeastInput: ResolverTypeWrapper<Partial<YeastInput>>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  Country: Partial<Country>;
  ID: Partial<Scalars['ID']>;
  String: Partial<Scalars['String']>;
  FermentablesFilter: Partial<FermentablesFilter>;
  Int: Partial<Scalars['Int']>;
  SortDirection: Partial<SortDirection>;
  SortableFermentableField: Partial<SortableFermentableField>;
  FermentablesResponse: Partial<FermentablesResponse>;
  PageInfo: Partial<PageInfo>;
  Fermentable: Partial<Fermentable>;
  FermentableCategory: Partial<FermentableCategory>;
  Float: Partial<Scalars['Float']>;
  FermentableType: Partial<FermentableType>;
  SortableHopField: Partial<SortableHopField>;
  Hop: Partial<Hop>;
  Boolean: Partial<Scalars['Boolean']>;
  Quote: Partial<Quote>;
  Recipe: Partial<Recipe>;
  RecipeFermentable: Partial<RecipeFermentable>;
  FermentableUnit: Partial<FermentableUnit>;
  RecipeType: Partial<RecipeType>;
  LimitedUser: Partial<LimitedUser>;
  Invitation: Partial<Invitation>;
  Role: Partial<Role>;
  User: Partial<User>;
  UserStatus: Partial<UserStatus>;
  SortableWaterField: Partial<SortableWaterField>;
  WaterResponse: Partial<WaterResponse>;
  Water: Partial<Water>;
  SortableYeastField: Partial<SortableYeastField>;
  YeastResponse: Partial<YeastResponse>;
  Yeast: Partial<Yeast>;
  YeastFlocculation: Partial<YeastFlocculation>;
  YeastForm: Partial<YeastForm>;
  YeastLab: Partial<YeastLab>;
  YeastType: Partial<YeastType>;
  Mutation: {};
  FermentableInput: Partial<FermentableInput>;
  HopInput: Partial<HopInput>;
  RecipeInput: Partial<RecipeInput>;
  RecipeFermentableInput: Partial<RecipeFermentableInput>;
  ActivationResponse: Partial<ActivationResponse>;
  RoleInput: Partial<RoleInput>;
  RegistrationInput: Partial<RegistrationInput>;
  UserInput: Partial<UserInput>;
  WaterInput: Partial<WaterInput>;
  YeastInput: Partial<YeastInput>;
};

export type ActivationResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ActivationResponse'] = ResolversParentTypes['ActivationResponse']
> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type CountryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Country'] = ResolversParentTypes['Country']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type FermentableResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Fermentable'] = ResolversParentTypes['Fermentable']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  category?: Resolver<ResolversTypes['FermentableCategory'], ParentType, ContextType>;
  color?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  origin?: Resolver<ResolversTypes['Country'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['FermentableType']>, ParentType, ContextType>;
  potential?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  yield?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
};

export type FermentablesResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FermentablesResponse'] = ResolversParentTypes['FermentablesResponse']
> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  data?: Resolver<Array<ResolversTypes['Fermentable']>, ParentType, ContextType>;
};

export type HopResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Hop'] = ResolversParentTypes['Hop']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  aaLow?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  aaHigh?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  betaLow?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  betaHigh?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bittering?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  aroma?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  origin?: Resolver<ResolversTypes['Country'], ParentType, ContextType>;
};

export type InvitationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Invitation'] = ResolversParentTypes['Invitation']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type LimitedUserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['LimitedUser'] = ResolversParentTypes['LimitedUser']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  createFermentable?: Resolver<
    ResolversTypes['Fermentable'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateFermentableArgs, 'input'>
  >;
  updateFermentable?: Resolver<
    ResolversTypes['Fermentable'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateFermentableArgs, 'id' | 'input'>
  >;
  removeFermentable?: Resolver<
    ResolversTypes['ID'],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveFermentableArgs, 'id'>
  >;
  createHop?: Resolver<
    ResolversTypes['Hop'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateHopArgs, 'input'>
  >;
  updateHop?: Resolver<
    ResolversTypes['Hop'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateHopArgs, 'id' | 'input'>
  >;
  removeHop?: Resolver<
    ResolversTypes['ID'],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveHopArgs, 'id'>
  >;
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createRecipe?: Resolver<
    ResolversTypes['Recipe'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateRecipeArgs, 'input'>
  >;
  updateRecipe?: Resolver<
    ResolversTypes['Recipe'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateRecipeArgs, 'id' | 'input'>
  >;
  removeRecipe?: Resolver<
    ResolversTypes['ID'],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveRecipeArgs, 'id'>
  >;
  activateUser?: Resolver<
    ResolversTypes['ActivationResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationActivateUserArgs, 'token'>
  >;
  createInvitation?: Resolver<
    ResolversTypes['Invitation'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateInvitationArgs, 'email'>
  >;
  createRole?: Resolver<
    ResolversTypes['Role'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateRoleArgs, 'input'>
  >;
  deleteInvitation?: Resolver<
    ResolversTypes['ID'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteInvitationArgs, 'email'>
  >;
  register?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<MutationRegisterArgs, 'input'>
  >;
  removeUser?: Resolver<
    ResolversTypes['ID'],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveUserArgs, 'id'>
  >;
  updateUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserArgs, 'id' | 'input'>
  >;
  createWater?: Resolver<
    ResolversTypes['Water'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateWaterArgs, 'input'>
  >;
  updateWater?: Resolver<
    ResolversTypes['Water'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateWaterArgs, 'id' | 'input'>
  >;
  removeWater?: Resolver<
    ResolversTypes['ID'],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveWaterArgs, 'id'>
  >;
  createYeast?: Resolver<
    ResolversTypes['Yeast'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateYeastArgs, 'input'>
  >;
  updateYeast?: Resolver<
    ResolversTypes['Yeast'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateYeastArgs, 'id' | 'input'>
  >;
  removeYeast?: Resolver<
    ResolversTypes['ID'],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveYeastArgs, 'id'>
  >;
};

export type PageInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']
> = {
  prevCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nextCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  countries?: Resolver<Array<ResolversTypes['Country']>, ParentType, ContextType>;
  fermentables?: Resolver<
    ResolversTypes['FermentablesResponse'],
    ParentType,
    ContextType,
    RequireFields<QueryFermentablesArgs, 'limit' | 'sortDirection' | 'sortBy'>
  >;
  hops?: Resolver<
    Array<ResolversTypes['Hop']>,
    ParentType,
    ContextType,
    RequireFields<QueryHopsArgs, 'sortDirection' | 'sortBy'>
  >;
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  randomQuote?: Resolver<ResolversTypes['Quote'], ParentType, ContextType>;
  recipes?: Resolver<Array<ResolversTypes['Recipe']>, ParentType, ContextType>;
  recipe?: Resolver<
    Maybe<ResolversTypes['Recipe']>,
    ParentType,
    ContextType,
    RequireFields<QueryRecipeArgs, 'id'>
  >;
  invitations?: Resolver<Array<ResolversTypes['Invitation']>, ParentType, ContextType>;
  roles?: Resolver<Array<ResolversTypes['Role']>, ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  user?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, 'id'>
  >;
  userByEmail?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<QueryUserByEmailArgs, 'email'>
  >;
  water?: Resolver<
    ResolversTypes['WaterResponse'],
    ParentType,
    ContextType,
    RequireFields<QueryWaterArgs, 'limit' | 'sortDirection' | 'sortBy'>
  >;
  yeast?: Resolver<
    ResolversTypes['YeastResponse'],
    ParentType,
    ContextType,
    RequireFields<QueryYeastArgs, 'limit' | 'sortDirection' | 'sortBy'>
  >;
  yeastLabs?: Resolver<Array<ResolversTypes['YeastLab']>, ParentType, ContextType>;
};

export type QuoteResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Quote'] = ResolversParentTypes['Quote']
> = {
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  author?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type RecipeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Recipe'] = ResolversParentTypes['Recipe']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fermentables?: Resolver<Array<ResolversTypes['RecipeFermentable']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['RecipeType'], ParentType, ContextType>;
  batchSize?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  boilTime?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  source?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['LimitedUser'], ParentType, ContextType>;
};

export type RecipeFermentableResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RecipeFermentable'] = ResolversParentTypes['RecipeFermentable']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  unit?: Resolver<ResolversTypes['FermentableUnit'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
};

export type RoleResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Role'] = ResolversParentTypes['Role']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['UserStatus'], ParentType, ContextType>;
};

export type WaterResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Water'] = ResolversParentTypes['Water']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pH?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  alkalinity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  calcium?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  magnesium?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  sodium?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  sulfate?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  chloride?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  bicarbonate?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type WaterResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['WaterResponse'] = ResolversParentTypes['WaterResponse']
> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  data?: Resolver<Array<ResolversTypes['Water']>, ParentType, ContextType>;
};

export type YeastResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Yeast'] = ResolversParentTypes['Yeast']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  flocculation?: Resolver<Maybe<ResolversTypes['YeastFlocculation']>, ParentType, ContextType>;
  form?: Resolver<ResolversTypes['YeastForm'], ParentType, ContextType>;
  lab?: Resolver<ResolversTypes['YeastLab'], ParentType, ContextType>;
  minTemp?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  maxTemp?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  minAttenuation?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  maxAttenuation?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['YeastType'], ParentType, ContextType>;
};

export type YeastLabResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['YeastLab'] = ResolversParentTypes['YeastLab']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type YeastResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['YeastResponse'] = ResolversParentTypes['YeastResponse']
> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  data?: Resolver<Array<ResolversTypes['Yeast']>, ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  ActivationResponse?: ActivationResponseResolvers<ContextType>;
  Country?: CountryResolvers<ContextType>;
  Fermentable?: FermentableResolvers<ContextType>;
  FermentablesResponse?: FermentablesResponseResolvers<ContextType>;
  Hop?: HopResolvers<ContextType>;
  Invitation?: InvitationResolvers<ContextType>;
  LimitedUser?: LimitedUserResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Quote?: QuoteResolvers<ContextType>;
  Recipe?: RecipeResolvers<ContextType>;
  RecipeFermentable?: RecipeFermentableResolvers<ContextType>;
  Role?: RoleResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Water?: WaterResolvers<ContextType>;
  WaterResponse?: WaterResponseResolvers<ContextType>;
  Yeast?: YeastResolvers<ContextType>;
  YeastLab?: YeastLabResolvers<ContextType>;
  YeastResponse?: YeastResponseResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
