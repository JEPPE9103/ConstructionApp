import { auth, db } from '../config/firebase';
import { doc, getDoc, setDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

export interface UserData {
  uid: string;
  email: string;
  name: string;
  role: 'montor' | 'admin';
  companyId: string;
  createdAt: string;
}

export const getCurrentUserWithRole = async (): Promise<UserData | null> => {
  const user = auth.currentUser;
  if (!user) {
    console.log('No authenticated user found');
    return null;
  }

  console.log('Fetching user data for:', user.uid);
  const userDoc = await getDoc(doc(db, 'users', user.uid));
  
  if (!userDoc.exists()) {
    console.log('No user document found, creating one...');
    return createUserDocumentIfNotExists();
  }

  const userData = {
    uid: user.uid,
    ...userDoc.data()
  } as UserData;

  console.log('Retrieved user data:', userData);
  return userData;
};

export const createUserDocumentIfNotExists = async (): Promise<UserData | null> => {
  const user = auth.currentUser;
  if (!user) return null;

  try {
    // Kontrollera om användardokumentet redan finns
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
      return {
        uid: user.uid,
        ...userDoc.data()
      } as UserData;
    }

    // Om dokumentet inte finns, skapa det
    console.log('Creating user document for:', user.uid);

    const userData: UserData = {
      uid: user.uid,
      email: user.email || '',
      name: user.displayName || user.email?.split('@')[0] || 'User',
      role: 'montor',
      companyId: 'elfirma123',
      createdAt: new Date().toISOString()
    };

    await setDoc(doc(db, 'users', user.uid), userData);
    console.log('Created user document:', userData);
    
    return userData;
  } catch (error) {
    console.error('Error creating user document:', error);
    return null;
  }
};

export async function registerUser(email: string, password: string, name: string, companyId: string) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  await updateProfile(user, { displayName: name });

  // Kontrollera om det finns någon användare i users-kollektionen
  const usersSnapshot = await getDocs(collection(db, 'users'));
  const isFirstUser = usersSnapshot.empty;
  const role = isFirstUser ? 'admin' : 'montor';

  await setDoc(doc(db, 'users', user.uid), {
    uid: user.uid,
    email: user.email,
    name,
    role,
    companyId,
    createdAt: serverTimestamp(),
  });

  return { ...user, role };
}

export const registerUserOld = async (
  email: string,
  password: string,
  name: string
): Promise<UserData> => {
  try {
    // 1. Skapa användaren i Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 2. Skapa användardokument i Firestore
    const userData: UserData = {
      uid: user.uid,
      email: email,
      name: name,
      role: 'montor',
      companyId: 'elfirma123',
      createdAt: new Date().toISOString()
    };

    await setDoc(doc(db, 'users', user.uid), userData);
    console.log('Created user document:', userData);

    return userData;
  } catch (error: any) {
    console.error('Error registering user:', error);
    throw new Error(error.message || 'Failed to register user');
  }
}; 