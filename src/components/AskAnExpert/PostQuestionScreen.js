import React, { useState } from 'react';
import { StyleSheet, Text, View, Keyboard } from 'react-native';
import { Input, CheckBox, Button, Icon } from 'react-native-elements';
import { Formik } from 'formik';
import { object, string } from 'yup';
import moment from 'moment';

import { database } from '../../config/config';
import { RoundButton } from '../../../Utils/RoundButton';
import { ScreenHeight, ScreenWidth } from '../../../constant/Constant';

import MenuScreen from '../../../Utils/MenuScreen';

const PostQuestionSchema = object({
  title: string().required('此項必填'),
  content: string().required('此項必填'),
});

const PostQuestionScreen = ({ route, navigation }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <MenuScreen>
      <View style={styles.container}>
        {!isSubmitted ? (
          <Formik
            initialValues={{
              title: '',
              content: '',
              allowInspect: false,
            }}
            validationSchema={PostQuestionSchema}
            onSubmit={(values) => {
              if (values.title.length != 0 && values.content.length != 0) {
                database
                  .ref('contents/askProf/' + values.title)
                  .set({
                    content: values.content,
                    author: 'firebase.auth.currentUser.userName',
                    createdBy: 'firebase.auth.currentUser.uid',
                    createdDate: moment().format('YYYY-MM-DD HH:mm:ss'),
                    settings: {
                      allowInspect: values.allowInspect,
                    },
                  })
                  .catch((err) => console.log(err));

                setIsSubmitted(true);
              }
            }}
          >
            {(formikProps) => (
              <View style={styles.form}>
                <Input
                  label="主題"
                  onChangeText={formikProps.handleChange('title')}
                  maxLength={20}
                  onSubmitEditing={() => {
                    Keyboard.dismiss;
                  }}
                  labelStyle={styles.label}
                  inputContainerStyle={styles.textContainer}
                  inputStyle={styles.input}
                  rightIcon={
                    <Text style={styles.wordCounter}>
                      {formikProps.values.title.length}/20
                    </Text>
                  }
                  errorMessage={formikProps.errors.title}
                />

                <Input
                  label="內容"
                  onChangeText={formikProps.handleChange('content')}
                  maxLength={200}
                  multiline={true}
                  returnKeyLabel="done"
                  returnKeyType={'done'}
                  placeholder={
                    formikProps.values.content.length == 0
                      ? '由於我們會在本程式內發佈專家回應，請注意不要留下個人資料'
                      : ''
                  }
                  labelStyle={styles.label}
                  inputContainerStyle={styles.contentContainer}
                  inputStyle={styles.textAreaContainer}
                  rightIcon={
                    <Text style={styles.wordCounter}>
                      {formikProps.values.content.length}/200
                    </Text>
                  }
                  rightIconContainerStyle={{
                    position: 'absolute',
                    bottom: 0,
                    right: 15,
                  }}
                  errorMessage={formikProps.errors.content}
                />

                <CheckBox
                  title="我同意專家察看我的度數紀錄"
                  iconType="fontisto"
                  checkedIcon="checkbox-active"
                  checkedColor="#E1EDFF"
                  uncheckedIcon="checkbox-passive"
                  uncheckedColor="#E1EDFF"
                  containerStyle={{
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                    paddingBottom: 10,
                  }}
                  textStyle={{ color: '#E1EDFF', fontSize: 18 }}
                  size={18}
                  onPress={() =>
                    formikProps.setFieldValue(
                      'allowInspect',
                      !formikProps.values.allowInspect
                    )
                  }
                  checked={formikProps.values.allowInspect}
                />

                <RoundButton
                  onPress={() => formikProps.handleSubmit()}
                  title="提交"
                  buttonStyle={{ width: 96 }}
                  textStyle={{ color: '#3CA1B7' }}
                />
              </View>
            )}
          </Formik>
        ) : (
          <View
            style={{
              justifyContent: 'center',
              height: ScreenHeight * 0.6,
              width: ScreenWidth * 0.82,
              top: 60,
            }}
          >
            <Text style={styles.farewellTitle}>謝謝你的提問</Text>
            <Text style={styles.farewellMessage}>
              收集問題後，我們的專家會在一星期內回答你的，請耐心等候。如有緊急需要，請聯絡你的眼科醫生。
            </Text>
            <Button
              title="返回"
              type="clear"
              containerStyle={{
                width: 120,
                position: 'absolute',
                bottom: 0,
                right: 15,
              }}
              titleStyle={{ color: 'white', fontSize: 23 }}
              iconContainerStyle={{ position: 'absolute', bottom: 0 }}
              icon={
                <Icon
                  type="antdesign"
                  name="swapleft"
                  size={50}
                  color="white"
                />
              }
              onPress={() => {
                setIsSubmitted(false);
              }}
            />
          </View>
        )}
      </View>
    </MenuScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    alignItems: 'center',
  },
  form: {
    height: ScreenHeight * 0.6,
    width: ScreenWidth * 0.82,
  },
  label: {
    color: '#E1EDFF',
    fontSize: 25,
    marginBottom: 25,
  },
  textContainer: {
    height: 40,
    borderWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#E1EDFF',
    borderRadius: 13,
    paddingHorizontal: 15,
  },
  input: {
    color: 'white',
  },
  contentContainer: {
    borderWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#E1EDFF',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 230,
  },
  textAreaContainer: {
    color: 'white',
    height: 230,
    textAlignVertical: 'top',
    paddingTop: 10,
  },
  wordCounter: {
    color: '#B8CAE4',
    fontSize: 16,
    fontWeight: 'bold',
  },
  farewellTitle: {
    fontSize: 38,
    color: 'white',
  },
  farewellMessage: {
    fontSize: 18,
    color: 'white',
  },
});

export default PostQuestionScreen;