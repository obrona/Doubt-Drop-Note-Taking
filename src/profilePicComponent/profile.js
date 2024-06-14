import './profileStyle.css'
import { useContext, useState } from 'react'
import UserContext from '../UserContext'
import { addDoc, getDocs, doc, query, where, updateDoc, getDoc } from 'firebase/firestore'
import { profilePicRef, imageDb } from '../firebase'
import { v4 } from 'uuid'

import { uploadBytes, deleteObject, ref } from 'firebase/storage'











function ProfilePic() {
   
    const [img, setImg] = useState('')
    const userContext = useContext(UserContext)
    const [imgUrl, setImgUrl] = useState(userContext.imgUrl)

    function onFileChange(e) {
        const url = URL.createObjectURL(e.target.files[0])
        setImgUrl(url)
        userContext.setImgUrl(url)
        setImg(e.target.files[0])
    }
    

    function onUpload() {
        if (img === '') return
        const fileName = `DoubtDropProfileImages/${v4()}`
        uploadProfilePic(fileName)
        uploadBytes(ref(imageDb, fileName), img)
        setImg('')
    }

    function uploadProfilePic(fileName) {
    const q = query(profilePicRef, where('email', '==', userContext.email));
    
    getDocs(q).then((querySnapshot) => {
        if (querySnapshot.empty) {
            // No document found, add a new document
            addDoc(profilePicRef, {
                email: userContext.email,
                imageId: fileName
            })
            .then(() => {
                alert("Successfully updated profile pic. Sign out and login again")
            })
            .catch((error) => {
                console.error('Error adding document: ', error);
            });
        } else {
            // Document found, update the existing document
            querySnapshot.docs.forEach(document => {
                const id = document.id
                const docRef = doc(profilePicRef, document.id)
                deleteObject(ref(imageDb, document.data().imageId))
                updateDoc(docRef, {
                    imageId: fileName
                })
                .then(() => uploadBytes(ref(imageDb, fileName), img))
                .then(alert("Successfully updated profile pic. Sign Out and login again"))
                
            })
        }
    })
    .catch((error) => {
        console.error('Error getting documents: ', error);
    });
}


    return <div className='hero'>
        <div className='card'>
            <h1>{userContext.email}</h1>
            <img src={imgUrl} />
            <button onClick={onUpload}>Update Image</button>

            <input type='file' accept='image/jpg, image/png, image/jpeg' id='input-file' onChange={e => onFileChange(e)} />
            <p>Please be patient, it is quite laggy as I am using free firebase tier. If you dont click update image, the changes will be temporary only</p>
        </div>
    </div>
        
}

export default ProfilePic