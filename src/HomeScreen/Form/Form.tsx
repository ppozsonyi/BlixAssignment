import React from 'react';
import {Formik} from 'formik';
import styled from 'styled-components/native';
import {Alert, Button, Text} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import PickerSelect from 'react-native-picker-select';
import * as Yup from 'yup';

const Container = styled.View`
  align-items: center;
  justify-content: center;
`;

const Row = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;

const FieldName = styled.Text`
  flex: 1;
  align-items: center;
  text-align: right;
  margin-right: 4px;
`;

const InputWrapper = styled.View`
  flex: 1;
`;

const StyledInput = styled.TextInput`
  align-items: center;
  justify-content: flex-start;
  width: 150px;
  border-width: 1px;
  border-color: gray;
  border-radius: 5px;
  padding: 1px;
`;

const PortInput = styled(StyledInput)`
  width: 50px;
`;

const PortInputWrapper = styled(InputWrapper)`
  flex-direction: row;
`;

const StyledCheckBox = styled(CheckBox)`
  height: 12px;
  margin-left: 16px;
  margin-top: 4px;
  margin-right: -12px;
`;

const ErrorText = styled.Text`
  color: red;
`;

interface FormValues {
  accountType: 'advanced' | 'manual';
  username: string;
  password: string;
  serverAddress: string;
  serverPath: string;
  port: number;
  useSSL: boolean;
}

const initialValues: FormValues = {
  accountType: 'manual',
  username: '',
  password: '',
  serverAddress: '',
  serverPath: '',
  port: 0,
  useSSL: false,
};

const validationSchema = Yup.object().shape({
  username: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
  serverAddress: Yup.string().matches(
    /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/,
    'Invalid server address',
  ),
  serverPath: Yup.string().matches(/^[a-zA-Z0-9/]*$/, 'Invalid server path'),
  port: Yup.number()
    .min(0, 'Invalid port number')
    .max(65353, 'Invalid port number'),
});

const Form: React.FC = () => {
  const onSubmit = (values: FormValues) => {
    console.log(values);
    Alert.alert('Form values:', JSON.stringify(values));
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({handleSubmit, setFieldValue, values, errors}) => (
        <Container>
          <Row>
            <FieldName>Account Type:</FieldName>
            <InputWrapper>
              <PickerSelect
                placeholder={{}}
                items={[
                  {label: 'Advanced', value: 'advanced'},
                  {label: 'Manual', value: 'manual'},
                ]}
                onValueChange={value => setFieldValue('accountType', value)}
                value={values.accountType}
              />
            </InputWrapper>
          </Row>
          <Row>
            <FieldName>User Name:</FieldName>
            <InputWrapper>
              <StyledInput
                keyboardType="email-address"
                placeholder="name@example.com"
                onChangeText={value => setFieldValue('username', value)}
              />
              {errors.username ? (
                <ErrorText>{errors.username}</ErrorText>
              ) : null}
            </InputWrapper>
          </Row>
          <Row>
            <FieldName>Password:</FieldName>
            <InputWrapper>
              <StyledInput
                secureTextEntry
                placeholder="Required"
                onChangeText={value => setFieldValue('password', value)}
              />
              {errors.password ? (
                <ErrorText>{errors.password}</ErrorText>
              ) : null}
            </InputWrapper>
          </Row>
          <Row>
            <FieldName>Server Address:</FieldName>
            <InputWrapper>
              <StyledInput
                placeholder="example.com"
                onChangeText={value => setFieldValue('serverAddress', value)}
              />
              {errors.serverAddress ? (
                <ErrorText>{errors.serverAddress}</ErrorText>
              ) : null}
            </InputWrapper>
          </Row>
          {values.accountType === 'manual' ? null : (
            <>
              <Row>
                <FieldName>Server Path:</FieldName>
                <InputWrapper>
                  <StyledInput
                    placeholder="/calendars/user"
                    onChangeText={value => setFieldValue('serverPath', value)}
                  />
                  {errors.serverPath ? (
                    <ErrorText>{errors.serverPath}</ErrorText>
                  ) : null}
                </InputWrapper>
              </Row>
              <Row>
                <FieldName>Port:</FieldName>
                <PortInputWrapper>
                  <PortInput
                    keyboardType="numeric"
                    onChangeText={value =>
                      setFieldValue('port', parseInt(value, 10))
                    }
                  />
                  <StyledCheckBox
                    boxType="square"
                    lineWidth={1}
                    value={values.useSSL}
                    onValueChange={value => setFieldValue('useSSL', value)}
                  />
                  <Text>Use SSL</Text>
                </PortInputWrapper>
              </Row>
              {errors.port ? <ErrorText>{errors.port}</ErrorText> : null}
            </>
          )}
          <Button onPress={() => handleSubmit()} title="Submit" />
        </Container>
      )}
    </Formik>
  );
};

export default Form;
