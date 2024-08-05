import UserSettingForm from "../_components/user-setting-form";

const testUserData = {
  image:
    "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/85/585960601535448881.jpeg",
  name: "xxx",
  email: "test@test.com",
  password: "test12345!!",
};

const UserSetting = () => (
  <div className="flex w-full flex-col items-center justify-center">
    <UserSettingForm userData={testUserData} />
  </div>
);

export default UserSetting;
