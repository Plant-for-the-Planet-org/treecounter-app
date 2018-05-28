export const singleTreeForm = {
  title: 'plant_contribution',
  type: 'object',
  properties: {
    treeCount: {
      type: 'integer',
      title: 'label.tree_count',
      attr: {
        pattern: '.{1,}'
      },
      pattern: '.{1,}',
      propertyOrder: 1
    },
    treeSpecies: {
      type: 'string',
      title: 'label.tree_species',
      propertyOrder: 2
    },
    plantDate: {
      type: 'string',
      title: 'label.plant_date',
      widget: 'date',
      propertyOrder: 3
    },
    geoLocation: {
      type: 'string',
      title: 'label.geo_location',
      widget: 'map',
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
      title: 'label.tree_classification',
      attr: {
        maxlength: 255
      },
      maxLength: 255,
      propertyOrder: 6
    },
    treeScientificName: {
      type: 'string',
      title: 'label.tree_scientific_name',
      attr: {
        maxlength: 255
      },
      maxLength: 255,
      propertyOrder: 7
    },
    contributionMeasurements: {
      type: 'array',
      title: 'label.add_measurements',
      items: {
        title: 'prototype',
        type: 'object',
        properties: {
          diameter: {
            type: 'integer',
            title: 'label.tree_diameter',
            propertyOrder: 1
          },
          height: {
            type: 'integer',
            title: 'label.tree_height',
            propertyOrder: 2
          },
          measurementDate: {
            type: 'string',
            title: 'label.measurement_date',
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
      title: 'label.tree_count',
      attr: {
        pattern: '.{1,}'
      },
      pattern: '.{1,}',
      propertyOrder: 1
    },
    treeSpecies: {
      type: 'string',
      title: 'label.tree_species',
      propertyOrder: 2
    },
    plantDate: {
      type: 'string',
      title: 'label.plant_date',
      widget: 'date',
      propertyOrder: 3
    },
    geoLocation: {
      type: 'string',
      title: 'label.geo_location',
      widget: 'map',
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
