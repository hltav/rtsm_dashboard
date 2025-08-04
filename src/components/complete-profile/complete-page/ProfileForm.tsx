// import React from "react";
// import { Box, Button, Alert } from "@mui/material";


// const ProfileForm: React.FC<CompleteProfilePageProps> = ({
//   user,
//   token,
//   clientData,
//   profileImagePreview,
//   imageOffsetX,
//   imageOffsetY,
//   imageScale,
//   imageUploadMessage,
//   isImageUploadError,
//   profileSaveMessage,
//   isProfileSaveError,
//   isSavingProfile,
//   handleFieldChange,
//   handleAddressFieldChange,
//   handleImageChange,
//   handleOffsetChange,
//   handleScaleChange,
//   handleProfileImageUploadSuccess,
//   handleProfileImageUploadError,
//   handleSubmit,
// }) => (
//   <Box
//     component="form"
//     onSubmit={handleSubmit}
//     sx={{
//       flex: 1,
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "center",
//       p: { xs: 3, sm: 4, md: 6 },
//       bgcolor: "background.paper",
//       overflowY: "auto",
//       maxHeight: {
//         xs: "calc(100vh - 40px)",
//         sm: "calc(100vh - 60px)",
//         md: "unset",
//       },
//     }}
//   >
//     <PageHeader />
//     <NonEditableUserInfo
//       firstName={user.firstname}
//       lastName={user.lastname}
//       username={user.nickname}
//       email={user.email}
//     />
//     <EditableUserInfo
//       cpf={clientData.cpf || ""}
//       gender={clientData.gender || ""}
//       phone={clientData.phone || ""}
//       neighborhood={clientData.address?.neighborhood || ""}
//       city={clientData.address?.city || ""}
//       state={clientData.address?.state || ""}
//       onCpfChange={(value) => handleFieldChange("cpf", value)}
//       onGenderChange={(value) => handleFieldChange("gender", value)}
//       onPhoneChange={(value) => handleFieldChange("phone", value)}
//       onNeighborhoodChange={(value) => handleAddressFieldChange("neighborhood", value)}
//       onCityChange={(value) => handleAddressFieldChange("city", value)}
//       onStateChange={(value) => handleAddressFieldChange("state", value)}
//     />
//     {imageUploadMessage && (
//       <Alert severity={isImageUploadError ? "error" : "success"} sx={{ mb: 2 }}>
//         {imageUploadMessage}
//       </Alert>
//     )}
//     <ProfileImageUploader
//       imagePreview={profileImagePreview}
//       onImageChange={handleImageChange}
//       imageOffsetX={imageOffsetX}
//       imageOffsetY={imageOffsetY}
//       imageScale={imageScale}
//       onOffsetChange={handleOffsetChange}
//       onScaleChange={handleScaleChange}
//       userId={user?.id}
//       authToken={token}
//       onUploadSuccess={handleProfileImageUploadSuccess}
//       onUploadError={handleProfileImageUploadError}
//     />
//     {profileSaveMessage && (
//       <Alert severity={isProfileSaveError ? "error" : "success"} sx={{ mb: 2 }}>
//         {profileSaveMessage}
//       </Alert>
//     )}
//     <Button
//       type="submit"
//       variant="contained"
//       color="primary"
//       fullWidth
//       size="large"
//       sx={{ py: 1.5 }}
//       disabled={isSavingProfile}
//     >
//       {isSavingProfile ? "Salvando..." : "Salvar Perfil"}
//     </Button>
//   </Box>
// );

// export default ProfileForm;