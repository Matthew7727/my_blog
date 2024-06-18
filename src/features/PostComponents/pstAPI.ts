import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

export interface Posts {
  id: string; // Include the document ID
  path: string;
  dateWritten: string;
  imageUrls: string[];
  mainText: string[];
  subtitle: string;
  title: string;
  postType: 'article' | 'blog'
}

export const fetchAllPosts = async (): Promise<Posts[]> => {
  const querySnapshot = await getDocs(collection(db, 'posts'));
  const posts: Posts[] = [];
  querySnapshot.forEach((doc) => {
    posts.push({ id: doc.id, ...doc.data() } as Posts);
  });
  return posts;
};

export const fetchPostById = async (id: string): Promise<Posts | null> => {
  const docRef = doc(db, 'posts', id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    console.log('No such document!');
    return null;
  }

  return { id: docSnap.id, ...docSnap.data() } as Posts;
};