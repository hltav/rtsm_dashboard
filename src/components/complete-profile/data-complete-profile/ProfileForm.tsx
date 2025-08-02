// import React from "react";
// import { Box, Alert, Button } from "@mui/material";
// import PageHeader from "../PageHeader";
// import NonEditableUserInfo from "../NonEditableUserInfo";
// import EditableUserInfo from "../EditableUserInfo";
// import ProfileImageUploader from "../ProfileImageUploader";
// import useProfileData from "@/hooks/useProfileData";
// import { ProfileFormProps } from "@/modules/user/props/profileFormProps";

// const ProfileForm: React.FC<ProfileFormProps> = ({
//   user,
//   token,
//   onComplete,
//   setIsLoading,
// }) => {
//   const {
//     clientData,
//     profileImagePreview,
//     imageUploadMessage,
//     isImageUploadError,
//     profileSaveMessage,
//     isProfileSaveError,
//     isSavingProfile,
//     handleImageChange,
//     handleOffsetChange,
//     handleScaleChange,
//     handleProfileImageUploadSuccess,
//     handleFieldChange,
//     handleAddressFieldChange,
//     handleSubmit,
//   } = useProfileData(user, token, onComplete, setIsLoading);

//   return (
//     <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
//       <PageHeader />
//       <NonEditableUserInfo
//         firstName={user.firstname}
//         lastName={user.lastname}
//         username={user.nickname}
//         email={user.email}
//       />

//       <EditableUserInfo
//         {...clientData}
//         onCpfChange={(value) => handleFieldChange("cpf", value)}
//         onGenderChange={(value) => handleFieldChange("gender", value)}
//         onPhoneChange={(value) => handleFieldChange("phone", value)}
//         onNeighborhoodChange={(value) =>
//           handleAddressFieldChange("neighborhood", value)
//         }
//         onCityChange={(value) => handleAddressFieldChange("city", value)}
//         onStateChange={(value) => handleAddressFieldChange("state", value)}
//       />

//       {imageUploadMessage && (
//         <Alert
//           severity={isImageUploadError ? "error" : "success"}
//           sx={{ mb: 2 }}
//         >
//           {imageUploadMessage}
//         </Alert>
//       )}

//       <ProfileImageUploader
//         imagePreview={profileImagePreview}
//         imageOffsetX={imageOffsetX}
//         imageOffsetY={imageOffsetY}
//         imageScale={imageScale}
//         onUploadError={handleUploadError}
//         onImageChange={handleImageChange}
//         onOffsetChange={handleOffsetChange}
//         onScaleChange={handleScaleChange}
//         onUploadSuccess={handleProfileImageUploadSuccess}
//         userId={user.id}
//         authToken={token}
//       />

//       {profileSaveMessage && (
//         <Alert
//           severity={isProfileSaveError ? "error" : "success"}
//           sx={{ mb: 2 }}
//         >
//           {profileSaveMessage}
//         </Alert>
//       )}

//       <Button
//         type="submit"
//         variant="contained"
//         color="primary"
//         fullWidth
//         size="large"
//         sx={{ py: 1.5 }}
//         disabled={isSavingProfile}
//       >
//         {isSavingProfile ? "Salvando..." : "Salvar Perfil"}
//       </Button>
//     </Box>
//   );
// };

// const styles = {
//   form: {
//     flex: 1,
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     p: { xs: 3, sm: 4, md: 6 },
//     bgcolor: "background.paper",
//     overflowY: "auto",
//     maxHeight: {
//       xs: "calc(100vh - 40px)",
//       sm: "calc(100vh - 60px)",
//       md: "unset",
//     },
//   },
// };

// export default ProfileForm;
