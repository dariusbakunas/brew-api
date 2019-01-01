import merge from 'lodash.merge';
import country from './country';
import hop from './hop';
import user from './user';
import quote from './quote';
import fermentable from './fermentable';

export default merge(
  country,
  hop,
  user,
  quote,
  fermentable,
);
