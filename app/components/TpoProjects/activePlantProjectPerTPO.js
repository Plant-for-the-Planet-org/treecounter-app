import React from 'react';
import TpoCardText from './TpoCardText';
import i18n from '../../locales/i18n.js';

const activePlantProjectPerTPO = (userTpos, plantProjects, treeCountid) => {
  //    treeCountid=31;
  //debug(treeCountid)
  let prev = plantProjects.map(arr => arr);
  let Featured = i18n.t('label.iscertified');
  const tpoId = prev.find(value => value.tpoId === treeCountid).tpoId;
  let result = prev.filter(
    value => value && value.tpoId && value.tpoId === tpoId
  );
  let projects = [];
  let cnt = 0;
  result.map((value, index) => {
    if (value && value[Featured]) {
      let name = cnt === 0 ? 'item_active' : 'item';
      cnt = cnt + 1;
      projects.push(
        <TpoCardText
          name={name}
          key={index}
          tponame={userTpos[value.tpoId].name}
          cardtext={value}
        />
      );
    }
  });
  return projects;
};

export { activePlantProjectPerTPO };
