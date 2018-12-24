export const singleTreeForm = {
  title: 'plant_contribution',
  type: 'object',
  properties: {
    treeCount: {
      type: 'number',
      title: 'Tree Count',
      widget: 'hidden',
      propertyOrder: 1
    },
    plantProject: {
      enum: ['1', '2', '3', '5'],
      enum_titles: [
        'Campeche Rainforest Restoration',
        'project_2',
        'project_3',
        'project_5'
      ],
      type: 'string',
      title: 'Plant Project',
      propertyOrder: 2
    },
    treeSpecies: {
      type: 'string',
      title: 'Tree Species',
      propertyOrder: 3
    },
    plantDate: {
      type: 'string',
      title: 'Plant Date',
      widget: 'date',
      propertyOrder: 4
    },
    geoLocation: {
      type: 'string',
      title: 'Geo Location',
      widget: 'map',
      propertyOrder: 5
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
            propertyOrder: 1
          }
        },
        required: ['imageFile']
      },
      propertyOrder: 6
    },
    treeClassification: {
      type: 'string',
      title: 'Tree Classification',
      attr: {
        maxlength: 255
      },
      maxLength: 255,
      propertyOrder: 7
    },
    treeScientificName: {
      type: 'string',
      title: 'Tree Scientific Name',
      attr: {
        maxlength: 255
      },
      maxLength: 255,
      propertyOrder: 8
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
            propertyOrder: 1
          },
          height: {
            type: 'integer',
            title: 'Tree Height',
            propertyOrder: 2
          },
          measurementDate: {
            type: 'string',
            title: 'Measurement Date',
            widget: 'date',
            propertyOrder: 3
          }
        },
        required: ['diameter', 'height', 'measurementDate']
      },
      propertyOrder: 9
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
          image: {
            type: 'string',
            title: 'label.browse',
            widget: 'file',
            propertyOrder: 1
          }
        },
        required: ['image']
      },
      propertyOrder: 5
    }
  },
  required: ['treeCount', 'treeSpecies', 'plantDate', 'geoLocation'],
  submit_url: '',
  submit_method: 'POST'
};
