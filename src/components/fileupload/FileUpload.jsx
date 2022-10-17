import React from "react";

// const convertBase64 = (file) => {
//   return new Promise((resolve, reject) => {
//     const fileReader = new FileReader();
//     fileReader.readAsDataURL(file);

//     fileReader.onload = () => {
//       resolve(fileReader.result);
//     };

//     fileReader.onerror = (error) => {
//       reject(error);
//     };
//   });
// };

const FileUpload = ({ setImageFile }) => {
  const handleChange = async (e) => {
    // const base64Image = await convertBase64(e.target.files[0]);
    setImageFile(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div>
      <label htmlFor="file-upload">Upload your image: </label>
      <input
        onChange={handleChange}
        type="file"
        name="file-upload"
        id="file-upload"
      />
    </div>
  );
};

export default FileUpload;
