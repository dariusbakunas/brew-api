import merge from 'lodash.merge';
import country from './country';
import hop from './hop';
import flavorProfile from './flavorProfile';

export default merge(
  country,
  hop,
  flavorProfile,
);
