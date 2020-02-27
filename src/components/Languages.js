import React from 'react';
import { navigate } from 'gatsby';
import { Dropdown, DropdownButton } from 'react-bootstrap';

import locales from '../../config/i18n';

const Languages = ({ location }) => {
  const path = location.pathname;
  let pathSuffix = path.substr(1);
  let currLang = 'En';
  if (path.length > 1) {
    Object.keys(locales).some(lang => {
      const { locationPath } = locales[lang];
      if (locationPath.length > 1 && path.startsWith(locationPath)) {
        pathSuffix = path.substr(locationPath.length);
        currLang = `${lang[0].toUpperCase()}${lang[1]} `;
        return true;
      }
      return false;
    });
  }
  return (
    <DropdownButton id="dropdown-basic-button" title={currLang} size="sm">
      {Object.keys(locales).map(lang => (
        <Dropdown.Item
          key={locales[lang].path}
          onSelect={() => {
            navigate(`${locales[lang].locationPath}${pathSuffix}`);
          }}
        >
          {locales[lang].name}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default Languages;
