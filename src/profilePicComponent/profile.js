import './profileStyle.css';
import { useContext, useState } from 'react';
import UserContext from '../UserContext';
import { addDoc, getDocs, doc, query, where, updateDoc } from 'firebase/firestore';
import { profilePicRef, imageDb } from '../firebase';
import { v4 } from 'uuid';
import { uploadBytes, ref, deleteObject } from 'firebase/storage'; // Corrected import
import { Button, Card, CardContent, Typography, Avatar, CircularProgress } from '@material-ui/core';

function ProfilePic() {
  const [img, setImg] = useState('');
  const userContext = useContext(UserContext);
  const [imgUrl, setImgUrl] = useState(userContext.imgUrl);
  const [loading, setLoading] = useState(false);

  function onFileChange(e) {
    const url = URL.createObjectURL(e.target.files[0]);
    setImgUrl(url);
    userContext.setImgUrl(url);
    setImg(e.target.files[0]);
  }

  async function onUpload() {
    if (img === '') return;
    setLoading(true);
    const fileName = `DoubtDropProfileImages/${v4()}`;
    await uploadBytes(ref(imageDb, fileName), img);
    await uploadProfilePic(fileName);
    setImg('');
    setLoading(false);
  }

  async function uploadProfilePic(fileName) {
    const q = query(profilePicRef, where('email', '==', userContext.email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      await addDoc(profilePicRef, {
        email: userContext.email,
        imageId: fileName,
      });
      alert('Successfully updated profile pic. Sign out and login again');
    } else {
      for (const document of querySnapshot.docs) {
        const docRef = doc(profilePicRef, document.id);
        await deleteObject(ref(imageDb, document.data().imageId)); // Using deleteObject from firebase/storage
        await updateDoc(docRef, { imageId: fileName });
      }
      alert('Successfully updated profile pic.');
    }
  }

  return (
    <div className="hero">
      <Card className="card">
        <CardContent>
          <Typography variant="h6">{userContext.email}</Typography>
          <Avatar src={imgUrl} alt="Profile Picture" style={{ height: 100, width: 100, margin: '20px auto' }} />
          <input
            type="file"
            accept="image/jpg, image/png, image/jpeg"
            id="input-file"
            onChange={onFileChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="input-file">
            <Button variant="contained" component="span" color="primary">
              Choose Image
            </Button>
          </label>
          <Button
            onClick={onUpload}
            variant="contained"
            color="primary"
            style={{ marginTop: 20 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Update Image'}
          </Button>
          <Typography variant="body2" color="textSecondary" style={{ marginTop: 20 }}>
            Please be patient, it is quite laggy as I am using the free Firebase tier. If you don't click "Update Image", the changes will be temporary only.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProfilePic;
