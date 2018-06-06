import i18n from '../../locales/i18n.js';
let lng = 'en';
export const singleTreeForm = {
  title: 'plant_contribution',
  type: 'object',
  properties: {
    treeCount: {
      type: 'integer',
      title: i18n.t('label.registerTreeslabels.tree_count', { lng }),
      attr: {
        pattern: '.{1,}'
      },
      pattern: '.{1,}',
      widget: 'hidden',
      propertyOrder: 1
    },
    treeSpecies: {
      type: 'string',
      title: i18n.t('label.registerTreeslabels.tree_species', { lng }),
      propertyOrder: 2
    },
    plantDate: {
      type: 'string',
      title: i18n.t('label.registerTreeslabels.plant_date', { lng }),
      widget: 'date',
      propertyOrder: 3
    },
    geoLocation: {
      type: 'string',
      title: i18n.t('label.registerTreeslabels.geo_location', { lng }),
      widget: 'map',
      propertyOrder: 4
    },
    contributionImages: {
      type: 'array',
      title: i18n.t('label.registerTreeslabels.add_images', { lng }),
      items: {
        title: 'prototype',
        type: 'object',
        properties: {
          imageFile: {
            type: 'string',
            title: 'imageFile',
            widget: 'file',
            propertyOrder: 1
          }
        },
        required: ['imageFile']
      },
      propertyOrder: 5
    },
    treeClassification: {
      type: 'string',
      title: i18n.t('label.registerTreeslabels.tree_classification', { lng }),
      attr: {
        maxlength: 255
      },
      maxLength: 255,
      propertyOrder: 6
    },
    treeScientificName: {
      type: 'string',
      title: i18n.t('label.registerTreeslabels.tree_scientific_name', { lng }),
      attr: {
        maxlength: 255
      },
      maxLength: 255,
      propertyOrder: 7
    },
    contributionMeasurements: {
      type: 'array',
      title: i18n.t('label.registerTreeslabels.add_measurements', { lng }),
      items: {
        title: 'prototype',
        type: 'object',
        properties: {
          diameter: {
            type: 'integer',
            title: i18n.t('label.registerTreeslabels.tree_diameter', { lng }),
            propertyOrder: 1
          },
          height: {
            type: 'integer',
            title: i18n.t('label.registerTreeslabels.tree_height', { lng }),
            propertyOrder: 2
          },
          measurementDate: {
            type: 'string',
            title: i18n.t('label.registerTreeslabels.measurement_date', {
              lng
            }),
            widget: 'date',
            propertyOrder: 3
          }
        },
        required: ['diameter', 'height', 'measurementDate']
      },
      propertyOrder: 8
    }
  },
  required: ['treeCount', 'treeSpecies', 'plantDate'],
  submit_url: '',
  submit_method: 'POST'
};

export const multipleTreesForm = {
  title: 'plant_contribution',
  type: 'object',
  properties: {
    treeCount: {
      type: 'integer',
      title: i18n.t('label.registerTreeslabels.tree_count', { lng }),
      attr: {
        pattern: '.{1,}'
      },
      pattern: '.{1,}',
      propertyOrder: 1
    },
    treeSpecies: {
      type: 'string',
      title: i18n.t('label.registerTreeslabels.tree_species', { lng }),
      propertyOrder: 2
    },
    plantDate: {
      type: 'string',
      title: i18n.t('label.registerTreeslabels.plant_date', { lng }),
      widget: 'date',
      propertyOrder: 3
    },
    geoLocation: {
      type: 'string',
      title: i18n.t('label.registerTreeslabels.geo_location', { lng }),
      widget: 'map',
      propertyOrder: 4
    },
    contributionImages: {
      type: 'array',
      title: i18n.t('label.registerTreeslabels.add_images', { lng }),
      items: {
        title: 'prototype',
        type: 'object',
        properties: {
          imageFile: {
            type: 'string',
            title: 'imageFile',
            widget: 'file',
            propertyOrder: 1
          }
        },
        required: ['imageFile']
      },
      propertyOrder: 5
    }
  },
  required: ['treeCount', 'treeSpecies', 'plantDate'],
  submit_url: '',
  submit_method: 'POST'
};
