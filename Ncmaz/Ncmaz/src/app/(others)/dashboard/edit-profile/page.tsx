import React, { useState, useEffect } from "react";
import Layout from "../../layout";
import LayoutDashboard from "../layout";
import Input from "components/Input/Input";
import Label from "components/Label/Label";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { PostAuthorType } from "../../../../data/types";

const DashboardEditProfile = () => {
  const [user, setUser] = useState<PostAuthorType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [avatarInput, setAvatarInput] = useState<File | null>(null);

  const [editData, setEditData] = useState({
    username: "",
    email: "",
    bio: ""
  });

  useEffect(() => {
    const mockUserData: PostAuthorType = {
      id: 1,
      username: "JohnDoe",
      avatar: "https://platinumlist.net/guide/wp-content/uploads/2023/03/8359_img_worlds_of_adventure-big1613913137.jpg-1024x683.webp",
      bgImage: "https://platinumlist.net/guide/wp-content/uploads/2023/03/8359_img_worlds_of_adventure-big1613913137.jpg-1024x683.webp",
      email: "john.doe@example.com",
      count: 5,
      bio: "This is John's bio",
      role: "Author",
      href: "/profile/JohnDoe",
    };

    setUser(mockUserData);
  }, []);

  const handleEditClick = () => {
    setEditData({
      username: user?.username || "",
      email: user?.email || "",
      bio: user?.bio || ""
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editData.username || editData.email || editData.bio) {
      setUser(prevUser => {
        if (prevUser) {
          return {
            ...prevUser,
            username: editData.username,
            email: editData.email,
            bio: editData.bio
          };
        }
        return null;
      });
      setIsEditing(false);
    }
  };
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setAvatarInput(event.target.files[0]);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (user) {
          setUser({ ...user, avatar: e.target?.result as string });
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  if (!user) return null;
  return (
      <Layout>
        <LayoutDashboard>
          <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
            <div style={{
              backgroundImage: `url(${user.bgImage})`,
              backgroundSize: 'cover',
              padding: '20px',
              borderRadius: '10px',
              marginBottom: '20px'
            }}>
              <div style={{ marginBottom: '20px' }}>
                <img src={user.avatar} alt="User Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                <input type="file" onChange={handleAvatarChange} style={{ marginTop: '10px' }} />
              </div>
            </div>

            {!isEditing ? (
                <div className="grid md:grid-cols-2 gap-6">
                  <Label>Username:</Label> <span>{user.username}</span>
                  <Label>Email:</Label> <span>{user.email}</span>
                  <Label>Bio:</Label> <span>{user.bio}</span>
                  <ButtonPrimary onClick={handleEditClick}>Edit</ButtonPrimary>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  <React.Fragment>
                    <Label>Username:</Label>
                    <Input value={editData.username} onChange={(e) => setEditData({ ...editData, username: e.target.value })} />
                  </React.Fragment>
                  <React.Fragment>
                    <Label>Email:</Label>
                    <Input value={editData.email} onChange={(e) => setEditData({ ...editData, email: e.target.value })} />
                  </React.Fragment>
                  <React.Fragment>
                    <Label>Bio:</Label>
                    <Input value={editData.bio} onChange={(e) => setEditData({ ...editData, bio: e.target.value })} />
                  </React.Fragment>
                  <ButtonPrimary onClick={handleSave}>Save</ButtonPrimary>
                </div>
            )}
          </div>
        </LayoutDashboard>
      </Layout>
  );
};

export default DashboardEditProfile;






