import { DrawerNavigator } from 'react-navigation';
import React, { Component } from 'react';
import Trillion from '../TreecounterGraphics/Trillion';
import Login from '../Authentication/Login';

export const AppDrawerNavigator = DrawerNavigator(
  {
    //TODO hkurra import routing config from config file or rest API
    Login: {
      screen: Login
    },
    Home: {
      screen: Trillion
    }
  },
  {
    gesturesEnabled: false
    //TODO @hkurra Create custom side menu compnent like web
    // contentComponent: SideNavigationMenu
  }
);
