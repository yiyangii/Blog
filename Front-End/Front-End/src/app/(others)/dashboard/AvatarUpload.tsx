import React from "react";

const AvatarUpload = ({ onFileSelect }: { onFileSelect: (file: File) => void }) => {

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            onFileSelect(event.target.files[0]);
        }
    };

    return (
        <div style={{ border: "1px solid black", padding: "20px" }}>
            <p>Drag & Drop your image here</p>
            <p>OR</p>
            <input type="file" onChange={handleFileChange} />
        </div>
    );
};

export default AvatarUpload;
