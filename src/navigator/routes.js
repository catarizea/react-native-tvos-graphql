import Activation from '../modules/activation/containers/Activation';

import Home from '../modules/generated/containers/Home/index';
import HomeDetails from '../modules/generated/containers/Home/Details';
import HomeCategory from '../modules/generated/containers/Home/Category';
import Setting from '../modules/generated/containers/Setting/index';
import SettingDetails from '../modules/generated/containers/Setting/Details';
import SettingCategory from '../modules/generated/containers/Setting/Category';

export const activationRoute = {
  component: Activation,
  title: 'Activation',
};

export const homeRoute = {
  component: Home,
  title: 'Home',
};

export const homeDetailsRoute = {
  component: HomeDetails,
  title: 'Details',
};

export const homeCategoryRoute = {
  component: HomeCategory,
  title: 'Category',
};

export const settingRoute = {
  component: Setting,
  title: 'Settings',
};

export const settingDetailsRoute = {
  component: SettingDetails,
  title: 'Details',
};

export const settingCategoryRoute = {
  component: SettingCategory,
  title: 'Category',
};
