import { postDirectRequest } from '../../app/utils/api';
import {
  profile,
  country,
  organization,
  company,
  education,
  competition
} from '../assets';
import _ from 'lodash';
import { getErrorView } from '../server/validator';

/*
/* This Will take server's error response and form SchemaOptions
/* it returns new schema options based on the Server error else same schema options
/* new options contains error field based on server options
/* Eg options.field.email.hasError = true;
*/
export const handleServerResponseError = function(
  serverFormError,
  formSchemaOptions
) {
  let newOptions = formSchemaOptions;
  const data =
    serverFormError &&
    serverFormError.response &&
    serverFormError.response.data;
  if (data && data.code == 400 && data.hasOwnProperty('errors')) {
    for (let property in data.errors.children) {
      if (
        data.errors.children.hasOwnProperty(property) &&
        data.errors.children[property].hasOwnProperty('errors')
      ) {
        newOptions = _.cloneDeep(formSchemaOptions);
        newOptions.fields[property].hasError = true;
        let oldValidator = newOptions.fields[property].error;
        if (typeof oldValidator === 'function') {
          newOptions.fields[property].error = (value, path, context) => {
            let errorReturn = oldValidator(value, path, context);
            if (!errorReturn) {
              errorReturn = getErrorView(
                data.errors.children[property].errors.toString()
              );
            } else {
              //if there are some front end validation error then remove server error from schema options
              newOptions.fields[property].hasError = false;
              newOptions.fields[property].error = oldValidator;
            }
            return errorReturn;
          };
        }
      }
    }
  }
  return newOptions;
};

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

export function getCountryIso2(countryCode) {
  let codes = {
    AND: 'AD',
    ARE: 'AE',
    AFG: 'AF',
    ATG: 'AG',
    AIA: 'AI',
    ALB: 'AL',
    ARM: 'AM',
    ANT: 'AN',
    AGO: 'AO',
    ATA: 'AQ',
    ARG: 'AR',
    ASM: 'AS',
    AUT: 'AT',
    AUS: 'AU',
    ABW: 'AW',
    ALA: 'AX',
    AZE: 'AZ',
    BIH: 'BA',
    BRB: 'BB',
    BGD: 'BD',
    BEL: 'BE',
    BFA: 'BF',
    BGR: 'BG',
    BHR: 'BH',
    BDI: 'BI',
    BEN: 'BJ',
    BMU: 'BM',
    BRN: 'BN',
    BOL: 'BO',
    BRA: 'BR',
    BHS: 'BS',
    BTN: 'BT',
    BVT: 'BV',
    BWA: 'BW',
    BLR: 'BY',
    BLZ: 'BZ',
    CAN: 'CA',
    CCK: 'CC',
    COD: 'CD',
    CAF: 'CF',
    COG: 'CG',
    CHE: 'CH',
    CIV: 'CI',
    COK: 'CK',
    CHL: 'CL',
    CMR: 'CM',
    CHN: 'CN',
    COL: 'CO',
    CRI: 'CR',
    CUB: 'CU',
    CPV: 'CV',
    CXR: 'CX',
    CYP: 'CY',
    CZE: 'CZ',
    DEU: 'DE',
    DJI: 'DJ',
    DNK: 'DK',
    DMA: 'DM',
    DOM: 'DO',
    DZA: 'DZ',
    ECU: 'EC',
    EST: 'EE',
    EGY: 'EG',
    ESH: 'EH',
    ERI: 'ER',
    ESP: 'ES',
    ETH: 'ET',
    FIN: 'FI',
    FJI: 'FJ',
    FLK: 'FK',
    FSM: 'FM',
    FRO: 'FO',
    FRA: 'FR',
    GAB: 'GA',
    GBR: 'GB',
    GRD: 'GD',
    GEO: 'GE',
    GUF: 'GF',
    GGY: 'GG',
    GHA: 'GH',
    GIB: 'GI',
    GRL: 'GL',
    GMB: 'GM',
    GIN: 'GN',
    GLP: 'GP',
    GNQ: 'GQ',
    GRC: 'GR',
    SGS: 'GS',
    GTM: 'GT',
    GUM: 'GU',
    GNB: 'GW',
    GUY: 'GY',
    HKG: 'HK',
    HMD: 'HM',
    HND: 'HN',
    HRV: 'HR',
    HTI: 'HT',
    HUN: 'HU',
    IDN: 'ID',
    IRL: 'IE',
    ISR: 'IL',
    IMN: 'IM',
    IND: 'IN',
    IOT: 'IO',
    IRQ: 'IQ',
    IRN: 'IR',
    ISL: 'IS',
    ITA: 'IT',
    JEY: 'JE',
    JAM: 'JM',
    JOR: 'JO',
    JPN: 'JP',
    KEN: 'KE',
    KGZ: 'KG',
    KHM: 'KH',
    KIR: 'KI',
    COM: 'KM',
    KNA: 'KN',
    PRK: 'KP',
    KOR: 'KR',
    KWT: 'KW',
    CYM: 'KY',
    KAZ: 'KZ',
    LAO: 'LA',
    LBN: 'LB',
    LCA: 'LC',
    LIE: 'LI',
    LKA: 'LK',
    LBR: 'LR',
    LSO: 'LS',
    LTU: 'LT',
    LUX: 'LU',
    LVA: 'LV',
    LBY: 'LY',
    MAR: 'MA',
    MCO: 'MC',
    MDA: 'MD',
    MNE: 'ME',
    MAF: 'MF',
    MDG: 'MG',
    MHL: 'MH',
    MKD: 'MK',
    MLI: 'ML',
    MMR: 'MM',
    MNG: 'MN',
    MAC: 'MO',
    MNP: 'MP',
    MTQ: 'MQ',
    MRT: 'MR',
    MSR: 'MS',
    MLT: 'MT',
    MUS: 'MU',
    MDV: 'MV',
    MWI: 'MW',
    MEX: 'MX',
    MYS: 'MY',
    MOZ: 'MZ',
    NAM: 'NA',
    NCL: 'NC',
    NER: 'NE',
    NFK: 'NF',
    NGA: 'NG',
    NIC: 'NI',
    NLD: 'NL',
    NOR: 'NO',
    NPL: 'NP',
    NRU: 'NR',
    NIU: 'NU',
    NZL: 'NZ',
    OMN: 'OM',
    PAN: 'PA',
    PER: 'PE',
    PYF: 'PF',
    PNG: 'PG',
    PHL: 'PH',
    PAK: 'PK',
    POL: 'PL',
    SPM: 'PM',
    PCN: 'PN',
    PRI: 'PR',
    PSE: 'PS',
    PRT: 'PT',
    PLW: 'PW',
    PRY: 'PY',
    QAT: 'QA',
    REU: 'RE',
    ROU: 'RO',
    SRB: 'RS',
    RUS: 'RU',
    RWA: 'RW',
    SAU: 'SA',
    SLB: 'SB',
    SYC: 'SC',
    SDN: 'SD',
    SWE: 'SE',
    SGP: 'SG',
    SHN: 'SH',
    SVN: 'SI',
    SJM: 'SJ',
    SVK: 'SK',
    SLE: 'SL',
    SMR: 'SM',
    SEN: 'SN',
    SOM: 'SO',
    SUR: 'SR',
    STP: 'ST',
    SLV: 'SV',
    SYR: 'SY',
    SWZ: 'SZ',
    TCA: 'TC',
    TCD: 'TD',
    ATF: 'TF',
    TGO: 'TG',
    THA: 'TH',
    TJK: 'TJ',
    TKL: 'TK',
    TLS: 'TL',
    TKM: 'TM',
    TUN: 'TN',
    TON: 'TO',
    TUR: 'TR',
    TTO: 'TT',
    TUV: 'TV',
    TWN: 'TW',
    TZA: 'TZ',
    UKR: 'UA',
    UGA: 'UG',
    UMI: 'UM',
    USA: 'US',
    URY: 'UY',
    UZB: 'UZ',
    VAT: 'VA',
    VCT: 'VC',
    VEN: 'VE',
    VGB: 'VG',
    VIR: 'VI',
    VNM: 'VN',
    VUT: 'VU',
    WLF: 'WF',
    WSM: 'WS',
    YEM: 'YE',
    MYT: 'YT',
    ZAF: 'ZA',
    ZMB: 'ZM',
    ZWE: 'ZW',
    AAA: 'AA',
    ASC: 'AC',
    BLM: 'BL',
    BES: 'BQ',
    BUR: 'BU',
    CPT: 'CP',
    SCG: 'CS',
    CUW: 'CW',
    DDR: 'DD',
    DGA: 'DG',
    QUU: 'EU',
    FXX: 'FX',
    NTZ: 'NT',
    QMM: 'QM',
    QNN: 'QN',
    QOO: 'QO',
    QPP: 'QP',
    QQQ: 'QQ',
    QRR: 'QR',
    QSS: 'QS',
    QTT: 'QT',
    QVV: 'QV',
    QWW: 'QW',
    QXX: 'QX',
    QYY: 'QY',
    QZZ: 'QZ',
    SSD: 'SS',
    SUN: 'SU',
    SXM: 'SX',
    TAA: 'TA',
    TMP: 'TP',
    XAA: 'XA',
    XBB: 'XB',
    XCC: 'XC',
    XDD: 'XD',
    XEE: 'XE',
    XFF: 'XF',
    XGG: 'XG',
    XHH: 'XH',
    XII: 'XI',
    XJJ: 'XJ',
    XKK: 'XK',
    XLL: 'XL',
    XMM: 'XM',
    XNN: 'XN',
    XOO: 'XO',
    XPP: 'XP',
    XQQ: 'XQ',
    XRR: 'XR',
    XSS: 'XS',
    XTT: 'XT',
    XUU: 'XU',
    XVV: 'XV',
    XWW: 'XW',
    XXX: 'XX',
    XYY: 'XY',
    XZZ: 'XZ',
    YMD: 'YD',
    YUG: 'YU',
    ZAR: 'ZR',
    ZZZ: 'ZZ'
  };
  if (codes[countryCode]) {
    return codes[countryCode];
  } else {
    return countryCode;
  }
}

export function isTpo(currentUserProfile) {
  let tpo = false;
  if (currentUserProfile && currentUserProfile.type === 'tpo') {
    tpo = true;
  }
  return tpo;
}

export const paymentFee = 0;
