// Copyright 2020-2023, University of Colorado Boulder

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */
/* eslint-disable */
import getStringModule from '../chipper/getStringModule';
import type LocalizedStringProperty from '../chipper/LocalizedStringProperty';
import sun from './sun';

type StringsType = {
  'sun': {
    'titleStringProperty': LocalizedStringProperty;
  };
  'screen': {
    'buttonsStringProperty': LocalizedStringProperty;
    'componentsStringProperty': LocalizedStringProperty;
    'dialogsStringProperty': LocalizedStringProperty;
  };
  'a11y': {
    'numberSpinnerRoleDescriptionStringProperty': LocalizedStringProperty;
    'closeStringProperty': LocalizedStringProperty;
    'closedStringProperty': LocalizedStringProperty;
    'titleClosePatternStringProperty': LocalizedStringProperty;
  }
};

const SunStrings = getStringModule('SUN') as StringsType;

sun.register('SunStrings', SunStrings);

export default SunStrings;
