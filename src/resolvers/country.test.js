import countryResolvers from './country';

describe('Country', () => {
  it('returns a list of countries', async () => {
    const dbMock = {
      Country: {
        findAll: jest.fn().mockResolvedValueOnce([
          { id: 1, code: 'AU', name: 'Australia' },
        ]),
      },
    };

    const result = await countryResolvers.Query.countries(
      null, null, { dataSources: { db: dbMock } },
    );
    expect(dbMock.Country.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual([{ code: 'AU', id: 1, name: 'Australia' }]);
  });
});
