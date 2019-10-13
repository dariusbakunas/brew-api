import { Resolvers as GQLResolvers } from './__generated__/types';
import { IDataSources } from './dataSources';

export interface ContextUser {
  id?: string;
  email: string;
  status: 'ACTIVE' | 'INACTIVE' | 'GUEST';
}

export interface ApolloContext {
  user?: ContextUser;
}

export type Maybe<T> = T | null;

export type Resolvers = GQLResolvers<{ dataSources: IDataSources; user?: ContextUser }>;
