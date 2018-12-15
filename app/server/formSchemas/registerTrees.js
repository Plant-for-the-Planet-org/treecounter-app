export default {
  'single-tree': {
    title: 'plant_contribution',
    type: 'object',
    properties: {
      treeCount: {
        type: 'number',
        title: 'label.tree_count',
        widget: 'hidden',
        icon: null,
        help: null,
        propertyOrder: 1
      },
      treeSpecies: {
        type: 'string',
        title: 'label.tree_species',
        icon: null,
        help: null,
        propertyOrder: 2
      },
      plantDate: {
        type: 'string',
        title: 'label.plant_date',
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
        title: 'label.add_images',
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
        title: 'label.tree_classification',
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
              title: 'label.tree_diameter',
              icon: null,
              help: null,
              propertyOrder: 1
            },
            height: {
              type: 'integer',
              title: 'label.tree_height',
              icon: null,
              help: null,
              propertyOrder: 2
            },
            measurementDate: {
              type: 'string',
              title: 'label.measurement_date',
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
        title: 'label.tree_count',
        icon: null,
        help: null,
        propertyOrder: 1
      },
      treeSpecies: {
        type: 'string',
        title: 'label.tree_species',
        icon: null,
        help: null,
        propertyOrder: 2
      },
      plantDate: {
        type: 'string',
        title: 'label.plant_date',
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
        title: 'label.add_images',
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
