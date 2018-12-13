import merge from 'lodash.merge';
import country from './country';
import hop from './hop';
import user from './user';
import quote from './quote';

export default merge(
  country,
  hop,
  user,
  quote,
);
