import React, { Component } from 'react';
import PropTypes from 'prop-types';
import en from '../i18n/en';
import fr from '../i18n/fr';
import { I18nProvider as Provider } from './I18nContext';

export default class I18nProvider extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      currentLanguage: 'en',
      translationFile: en
    };
    this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
    this.translate = this.translate.bind(this);
  }

  static getTranslationFile(lang) {
    switch (lang) {
      case 'fr':
        return fr;
      case 'en':
      default:
        return en;
    }
  }

  handleChangeLanguage(lang) {
    const translationFile = I18nProvider.getTranslationFile(lang);
    this.setState({
      currentLanguage: lang,
      translationFile
    });
  }

  translate(key) {
    const { translationFile } = this.state;
    if (translationFile[key]) {
      return translationFile[key];
    }
    return `#${key}`;
  }

  render() {
    const { children } = this.props;
    const { currentLanguage } = this.state;
    return (
      <Provider
        value={{
          currentLanguage,
          changeLanguage: this.handleChangeLanguage,
          _: this.translate
        }}
      >
        {children}
      </Provider>
    );
  }
}
