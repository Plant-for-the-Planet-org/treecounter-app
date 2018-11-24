import { postDirectRequest } from '../../app/utils/api';
import {
  profile,
  country,
  organization,
  company,
  education,
  competition
} from '../assets';

export function queryParamsToObject(queryParams) {
  let returnObject = {};
  try {
    returnObject = JSON.parse(
      '{"' +
        decodeURI(queryParams)
          .replace('?', '')
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"') +
        '"}'
    );
  } catch (err) {
    console.log(err);
  }
  console.log('object to return ', returnObject);
  return returnObject;
}

export function objectToQueryParams(objectValue) {
  let valueString = Object.keys(objectValue)
    .map(key => key + '=' + objectValue[key])
    .join('&');

  console.log('object to return ', valueString);
  return valueString;
}

export function formatDate(date) {
  console.log('formatDate', date);

  let dd = date.getDate();
  let mm = date.getMonth() + 1; //January is 0!
  let yyyy = date.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }

  date = yyyy + '-' + mm + '-' + dd;
  return date;
}

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
const getSuggestionValue = suggestion => `${suggestion.name}`;

export function getSuggestions(value) {
  return new Promise(resolve => {
    postDirectRequest('/suggest', 'q=' + value.trim()).then(result => {
      let jdata = result.data;
      const escapedValue = escapeRegexCharacters(value.trim());
      if (escapedValue === '') {
        resolve([]);
      }
      const regex = new RegExp('\\b' + escapedValue, 'i');

      resolve(jdata.filter(person => regex.test(getSuggestionValue(person))));
    });
  });
}

export const profileTypeToImage = {
  individual: profile,
  country,
  tpo: organization,
  organization,
  company,
  education,
  competition
};

export function mergeContributionImages(updatedTreeContribution) {
  if (
    !updatedTreeContribution ||
    !updatedTreeContribution.contributionImages ||
    updatedTreeContribution.contributionImages.length == 0
  ) {
    return updatedTreeContribution;
  }
  const newContributionImages = updatedTreeContribution.contributionImages;
  let contributionImages = [];
  contributionImages = newContributionImages.map(newContributionImage => {
    if (newContributionImage.image.includes('base64')) {
      let { image: imageFile } = newContributionImage;

      return newContributionImage.id
        ? { imageFile, id: newContributionImage.id }
        : { imageFile };
    }
    return newContributionImage;
  });
  return {
    ...updatedTreeContribution,
    contributionImages
  };
}

export function getDocumentTitle(pageTitle, siteRequired = true) {
  const siteTitle = 'Trillion Tree Campaign';
  if (!pageTitle) {
    return siteTitle;
  }
  if (siteRequired && pageTitle != siteTitle) {
    pageTitle = `${pageTitle} | ${siteTitle}`;
  }
  return pageTitle;
}

export function getPlantProjectEnum(currentUserProfile) {
  if (currentUserProfile && currentUserProfile.type === 'tpo') {
    let newEnum = [];
    for (let plantProject in currentUserProfile.plantProjects) {
      newEnum.push({
        value: currentUserProfile.plantProjects[plantProject].id,
        text: currentUserProfile.plantProjects[plantProject].name
      });
    }
    return newEnum;
  }
  return undefined;
}
export function isTpo(currentUserProfile) {
  let tpo = false;
  if (currentUserProfile && currentUserProfile.type === 'tpo') {
    tpo = true;
  }
  return tpo;
}

export const paymentFee = 0;
