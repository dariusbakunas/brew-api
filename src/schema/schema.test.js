import {
  makeExecutableSchema, addMockFunctionsToSchema, mockServer, MockList,
} from 'graphql-tools';
import { graphql } from 'graphql';
import loadSchemas from './loadSchemas';

const typeDefs = loadSchemas();

const testGetAll = {
  id: 'Get All Countries',
  query: `
    query {
      countries {
         name
         code
      }
    }
  `,
  variables: { },
  context: { },
  expected: { data: { countries: [{ name: 'Country 1', code: 'Code 1' }] } },
};

describe('Schema', () => {
  const cases = [testGetAll];
  const mockSchema = makeExecutableSchema({ typeDefs });

  addMockFunctionsToSchema({
    schema: mockSchema,
    mocks: {
      Query: () => ({
        countries: () => new MockList(1),
      }),
      Country: () => ({ name: 'Country 1', code: 'Code 1' }),
    },
  });

  test('has valid type definitions', async () => {
    expect(async () => {
      const MockServer = mockServer(typeDefs);
      await MockServer.query('{ __schema { types { name } } }');
    }).not.toThrow();
  });

  cases.forEach((testCase) => {
    const {
      id, query, variables, context: ctx, expected,
    } = testCase;

    test(`query: ${id}`, async () => expect(
      graphql(mockSchema, query, null, { ctx }, variables),
    ).resolves.toEqual(expected));
  });
});
