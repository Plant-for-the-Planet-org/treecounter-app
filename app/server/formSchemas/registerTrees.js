export default {
  'single-tree': {
    title: 'plant_contribution',
    type: 'object',
    properties: {
      treeCount: {
        type: 'number',
        title: 'Tree Count',
        widget: 'hidden',
        icon: null,
        help: null,
        propertyOrder: 1
      },
      treeSpecies: {
        type: 'string',
        title: 'Tree Species',
        icon: null,
        help: null,
        propertyOrder: 2
      },
      plantDate: {
        type: 'string',
        title: 'Plant Date',
        widget: 'date',
        icon: null,
        help: null,
        propertyOrder: 3
      },
      geoLocation: {
        type: 'string',
        title: 'Geo Location',
        widget: 'map',
        icon: null,
        help: null,
        propertyOrder: 4
      },
      contributionImages: {
        type: 'array',
        title: 'Add Images',
        items: {
          title: 'prototype',
          type: 'object',
          properties: {
            imageFile: {
              type: 'string',
              title: 'label.upload_profile_picture',
              widget: 'file',
              icon: null,
              help: null,
              propertyOrder: 1
            }
          },
          required: ['imageFile'],
          icon: null,
          help: null
        },
        icon: null,
        help: null,
        propertyOrder: 5
      },
      treeClassification: {
        type: 'string',
        title: 'Tree Classification',
        attr: { maxlength: 255 },
        icon: null,
        help: null,
        maxLength: 255,
        propertyOrder: 6
      },
      treeScientificName: {
        type: 'string',
        title: 'Tree Scientific Name',
        attr: { maxlength: 255 },
        icon: null,
        help: null,
        maxLength: 255,
        propertyOrder: 7
      },
      contributionMeasurements: {
        type: 'array',
        title: 'Add Measurements',
        items: {
          title: 'prototype',
          type: 'object',
          properties: {
            diameter: {
              type: 'integer',
              title: 'Tree Diameter',
              icon: null,
              help: null,
              propertyOrder: 1
            },
            height: {
              type: 'integer',
              title: 'Tree Height',
              icon: null,
              help: null,
              propertyOrder: 2
            },
            measurementDate: {
              type: 'string',
              title: 'Measurement Date',
              widget: 'date',
              icon: null,
              help: null,
              propertyOrder: 3
            }
          },
          required: ['diameter', 'height', 'measurementDate'],
          icon: null,
          help: null
        },
        icon: null,
        help: null,
        propertyOrder: 8
      }
    },
    required: ['treeCount', 'plantDate'],
    submit_url: '',
    submit_method: 'POST'
  },
  'multiple-trees': {
    title: 'plant_contribution',
    type: 'object',
    properties: {
      treeCount: {
        type: 'number',
        title: 'Tree Count',
        icon: null,
        help: null,
        propertyOrder: 1
      },
      treeSpecies: {
        type: 'string',
        title: 'Tree Species',
        icon: null,
        help: null,
        propertyOrder: 2
      },
      plantDate: {
        type: 'string',
        title: 'Plant Date',
        widget: 'date',
        icon: null,
        help: null,
        propertyOrder: 3
      },
      geoLocation: {
        type: 'string',
        title: 'Geo Location',
        widget: 'map',
        icon: null,
        help: null,
        propertyOrder: 4
      },
      contributionImages: {
        type: 'array',
        title: 'Add Images',
        items: {
          title: 'prototype',
          type: 'object',
          properties: {
            imageFile: {
              type: 'string',
              title: 'label.upload_profile_picture',
              widget: 'file',
              icon: null,
              help: null,
              propertyOrder: 1
            }
          },
          required: ['imageFile'],
          icon: null,
          help: null
        },
        icon: null,
        help: null,
        propertyOrder: 5
      }
    },
    required: ['treeCount', 'plantDate'],
    submit_url: '',
    submit_method: 'POST'
  }
};
