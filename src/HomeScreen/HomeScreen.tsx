import React from 'react';
import {SafeAreaView} from 'react-native';
import styled from 'styled-components/native';
import Form from './Form/Form';

const Title = styled.Text`
  text-align: center;
  margin-vertical: 32px;
`;

const HomeScreen: React.FC = () => (
  <SafeAreaView>
    <Title>Hello! Please complete the form!</Title>
    <Form />
  </SafeAreaView>
);

export default HomeScreen;
