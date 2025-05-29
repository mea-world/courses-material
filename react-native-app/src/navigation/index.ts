import { CartonDetailScreenProps } from "@/screens/CartonDetailScreen";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type CartonNavigatorParamList = {
  CartonListScreen: undefined;
  CartonDetailScreen: CartonDetailScreenProps;
};

export type TabParamList = {
  GameScreen: undefined;
  CartonNavigator: NavigatorScreenParams<CartonNavigatorParamList>;
};

export type TabNavigatorProps<T extends keyof TabParamList> =
  BottomTabScreenProps<TabParamList, T>;

export type CartonNavigatorProps<T extends keyof CartonNavigatorParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<CartonNavigatorParamList, T>,
    TabNavigatorProps<keyof TabParamList>
  >;
