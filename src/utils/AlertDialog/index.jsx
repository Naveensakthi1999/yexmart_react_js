import AlertDialog from "./AlertDialog";

export const UpdateSuccessful = () =>
    AlertDialog({
      title: "Updated!",
      message: "Your data has been updated successfully.",
      icon: "success",
    });
  
  export const UpdateFailed = () =>
    AlertDialog({
      title: "Update Failed!",
      message: "Your data could not be updated. Please try again.",
      icon: "error",
    });
  
  export const CreateSuccessful = () =>
    AlertDialog({
      title: "Created!",
      message: "Your data has been created successfully.",
      icon: "success",
    });
  
  export const CreateFailed = () =>
    AlertDialog({
      title: "Creation Failed!",
      message: "Your data could not be created. Please try again.",
      icon: "error",
    });
  
  export const DeleteSuccessful = () =>
    AlertDialog({
      title: "Deleted!",
      message: "Your data has been deleted successfully.",
      icon: "success",
    });
  
  export const DeleteFailed = () =>
    AlertDialog({
      title: "Deletion Failed!",
      message: "Your data could not be deleted. Please try again.",
      icon: "error",
    });
  
  export const LoginSuccessful = () =>
    AlertDialog({
      title: "Login Successful!",
      message: "You have logged in successfully.",
      icon: "success",
    });
  
  export const LoginFailed = () =>
    AlertDialog({
      title: "Login Failed!",
      message: "Login failed. Please check your credentials and try again.",
      icon: "error",
    });
  
  export const ServerError = () =>
    AlertDialog({
      title: "Error!",
      message: "An internal server error occurred. Please try again later.",
      icon: "error",
    });
  