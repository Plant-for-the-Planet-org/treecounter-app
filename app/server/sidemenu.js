import i18n from '../locales/i18n.js';
let lng = 'en';

export default {
  loggedOut: [
    {
      enabled: 1,
      sequence: 1,
      caption: i18n.t('label.menulabels.logged_out_caption1', { lng }),
      help: 'menu_group.world.help',
      icon: 'none',
      menuItems: [
        {
          enabled: 1,
          sequence: 1,
          caption: i18n.t('label.menulabels.logged_out_caption1seq1', { lng }),
          help: 'menu_item.trillion_tree_campaign.help',
          icon: 'tree_outline',
          uri: '/app_dev.php/en'
        },
        {
          enabled: 1,
          sequence: 2,
          caption: i18n.t('label.menulabels.logged_out_caption1seq2', { lng }),
          help: 'menu_item.explore.help',
          icon: 'rocket_outline',
          uri: '#'
        }
      ]
    },
    {
      enabled: 1,
      sequence: 2,
      caption: i18n.t('label.menulabels.logged_out_caption2', { lng }),
      help: 'menu_group.user.help',
      icon: 'none',
      menuItems: [
        {
          enabled: 1,
          sequence: 1,
          caption: i18n.t('label.menulabels.logged_out_caption2seq1', { lng }),
          help: 'menu_item.register_trees.help',
          icon: 'shovel_outline',
          uri: '/app_dev.php/en/registerTrees'
        },
        {
          enabled: 1,
          sequence: 2,
          caption: i18n.t('label.menulabels.logged_out_caption2seq2', { lng }),
          help: 'menu_item.donate_trees.help',
          icon: 'heart_outline',
          uri: '#'
        },
        {
          enabled: 1,
          sequence: 3,
          caption: i18n.t('label.menulabels.logged_out_caption2seq3', { lng }),
          help: 'menu_item.my_trees.help',
          icon: 'tree_outline',
          uri: '/app_dev.php/en/myTrees'
        },
        {
          enabled: 1,
          sequence: 4,
          caption: i18n.t('label.menulabels.logged_out_caption2seq4', { lng }),
          help: 'Set your personal target',
          icon: 'target_outline',
          uri: '/app_dev.php/en/target'
        }
      ]
    },
    {
      enabled: 1,
      sequence: 3,
      caption: i18n.t('label.menulabels.logged_out_caption3', { lng }),
      help: 'menu_group.community.help',
      icon: 'none',
      menuItems: [
        {
          enabled: 1,
          sequence: 1,
          caption: i18n.t('label.menulabels.logged_out_caption3seq1', { lng }),
          help: 'menu_item.challenge.help',
          icon: 'challenge_outline',
          uri: '#'
        },
        {
          enabled: 1,
          sequence: 2,
          caption: i18n.t('label.menulabels.logged_out_caption3seq2', { lng }),
          help: 'menu_item.tree_gift.help',
          icon: 'gift_outline',
          uri: '#'
        }
      ]
    }
  ],
  loggedIn: [
    {
      enabled: 1,
      sequence: 1,
      caption: i18n.t('label.menulabels.logged_in_caption1', { lng }),
      help: 'menu_group.world.help',
      icon: 'none',
      menuItems: [
        {
          enabled: 1,
          sequence: 1,
          caption: i18n.t('label.menulabels.logged_in_caption1seq1', { lng }),
          help: 'menu_item.trillion_tree_campaign.help',
          icon: 'tree_outline',
          uri: '/app_dev.php/en'
        },
        {
          enabled: 1,
          sequence: 2,
          caption: i18n.t('label.menulabels.logged_in_caption1seq2', { lng }),
          help: 'menu_item.explore.help',
          icon: 'rocket_outline',
          uri: '#'
        }
      ]
    },
    {
      enabled: 1,
      sequence: 2,
      caption: i18n.t('label.menulabels.logged_in_caption2', { lng }),
      help: 'menu_group.user.help',
      icon: 'none',
      menuItems: [
        {
          enabled: 1,
          sequence: 1,
          caption: i18n.t('label.menulabels.logged_in_caption2seq1', { lng }),
          help: 'menu_item.register_trees.help',
          icon: 'shovel_outline',
          uri: '/app_dev.php/en/registerTrees'
        },
        {
          enabled: 1,
          sequence: 2,
          caption: i18n.t('label.menulabels.logged_in_caption2seq2', { lng }),
          help: 'menu_item.donate_trees.help',
          icon: 'heart_outline',
          uri: '#'
        },
        {
          enabled: 1,
          sequence: 3,
          caption: i18n.t('label.menulabels.logged_in_caption2seq3', { lng }),
          help: 'menu_item.my_trees.help',
          icon: 'tree_outline',
          uri: '/app_dev.php/en/myTrees'
        },
        {
          enabled: 1,
          sequence: 4,
          caption: i18n.t('label.menulabels.logged_in_caption2seq4', { lng }),
          help: 'Set your personal target',
          icon: 'target_outline',
          uri: '/app_dev.php/en/target'
        }
      ]
    },
    {
      enabled: 1,
      sequence: 3,
      caption: i18n.t('label.menulabels.logged_in_caption3', { lng }),
      help: 'menu_group.community.help',
      icon: 'none',
      menuItems: [
        {
          enabled: 1,
          sequence: 1,
          caption: i18n.t('label.menulabels.logged_in_caption3seq1', { lng }),
          help: 'menu_item.challenge.help',
          icon: 'challenge_outline',
          uri: '#'
        },
        {
          enabled: 1,
          sequence: 2,
          caption: i18n.t('label.menulabels.logged_in_caption3seq2', { lng }),
          help: 'menu_item.tree_gift.help',
          icon: 'gift_outline',
          uri: '#'
        }
      ]
    }
  ]
};
