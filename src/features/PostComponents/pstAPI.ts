import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

export const fetchPostsByType = async (postType: string): Promise<Posts[]> => {
    const docRef = doc(db, 'posts', 'posts');
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        const data = docSnap.data();
        return data[postType] as Posts[];
    } else {
        console.log("No such document!");
        return [];
    }
}
export interface Posts {
    dateWritten: string,
    imageUrls: string[],
    mainText: string[],
    subtitle: string,
    title: string
}


