import merge from 'lodash.merge';
import country from './country';
import hop from './hop';
import user from './user';

export default merge(
  country,
  hop,
  user,
);
