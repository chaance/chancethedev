import {
  black,
  black100,
  blue,
  blue10,
  blue20,
  blue30,
  blue40,
  blue50,
  blue60,
  gray,
  gray10,
  gray20,
  gray30,
  gray40,
  gray50,
  gray60,
  green,
  green10,
  green20,
  green30,
  green40,
  green50,
  green60,
  red,
  red10,
  red20,
  red30,
  red40,
  red50,
  red60,
  yellow,
  yellow10,
  yellow20,
  yellow30,
  yellow40,
  yellow50,
  yellow60,
  white,
} from '@chancethedev/colors';

export default {
  black,
  black100,
  white,
  blue,
  blue10,
  blue20,
  blue30,
  blue40,
  blue50,
  blue60,
  gray,
  gray10,
  gray20,
  gray30,
  gray40,
  gray50,
  gray60,
  green,
  green10,
  green20,
  green30,
  green40,
  green50,
  green60,
  red,
  red10,
  red20,
  red30,
  red40,
  red50,
  red60,
  yellow,
  yellow10,
  yellow20,
  yellow30,
  yellow40,
  yellow50,
  yellow60,
};

////////////////////////////////////////////////////////////////////////////////
// TYPES
////////////////////////////////////////////////////////////////////////////////
export type ColorOptions =
  | 'black'
  | 'black100'
  | 'blue'
  | 'blue10'
  | 'blue20'
  | 'blue30'
  | 'blue40'
  | 'blue50'
  | 'blue60'
  | 'gray'
  | 'gray10'
  | 'gray20'
  | 'gray30'
  | 'gray40'
  | 'gray50'
  | 'gray60'
  | 'green'
  | 'green10'
  | 'green20'
  | 'green30'
  | 'green40'
  | 'green50'
  | 'green60'
  | 'red'
  | 'red10'
  | 'red20'
  | 'red30'
  | 'red40'
  | 'red50'
  | 'red60'
  | 'yellow'
  | 'yellow10'
  | 'yellow20'
  | 'yellow30'
  | 'yellow40'
  | 'yellow50'
  | 'yellow60'
  | 'white';

export type ColorMap = {
  [key in ColorOptions]: string;
};
